import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import * as Sentry from '@sentry/react-native';

import {useContext, useState} from 'react';
import {Alert, Platform} from 'react-native';
import moment from 'moment';
import {components} from '@invited-only/invited-only-api';

import {showToast, UseToastType} from 'helpers/showToast';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {useAuthStore} from 'src/store/authStore';
import {BackendApiContext} from 'contexts/BackendApiContex';

const useCreateEvent = () => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const {userMetadata} = useAuthStore.getState();
  const {data: userHost} = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: userMetadata.uid ?? '',
      },
    },
  });

  const {mutate: updateEventMutation} = invitedOnlyBackendApi.useMutation('patch', '/events/{eventId}');

  const {mutate: createEventMutation} = invitedOnlyBackendApi.useMutation('post', '/events');

  const {navigate, goBack} = useAppNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImage = async (imagePath: string | null | undefined, userId: string): Promise<string | null> => {
    Sentry.addBreadcrumb({
      category: 'upload',
      message: 'Starting image upload',
      level: 'info',
      data: {userId, imagePath: imagePath?.substring(imagePath.length - 50)},
    });
    if (!imagePath) return null;
    if (imagePath.startsWith('https://')) {
      return imagePath;
    }

    const uploadUri = Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;
    const filename = `${userId}_${Date.now()}`;

    const storageRef = storage().ref(`images/${filename}`);
    try {
      await storageRef.putFile(uploadUri);
      const url = await storageRef.getDownloadURL();
      Sentry.addBreadcrumb({
        category: 'upload',
        message: 'Image upload successful',
        level: 'info',
        data: {userId, filename, url},
      });
      return url;
    } catch (e: any) {
      console.error('Error uploading image:', e);
      logErrorToSentry(e, {
        tags: {action: 'uploadImage'},
        extra: {userId, imagePath, filename, uploadUri},
        level: 'error',
      });
      showToast('basic' as UseToastType, `Upload failed: ${e.message || 'Unknown error'}`, 'Upload Error');
      return null;
    }
  };

  const createEvent = async (props: Partial<components['schemas']['EventData']>) => {
    Sentry.addBreadcrumb({
      category: 'event_creation',
      message: 'Starting createEvent process',
      level: 'info',
      data: {eventName: props.name},
    });
    setIsLoading(true);
    let eventUid: string | null = null;
    try {
      const currUser = userMetadata.uid;
      if (!currUser || !userHost) {
        showToast('basic' as UseToastType, 'User data not available. Please log in again.', 'Error');
        logErrorToSentry('User data not available in createEvent', {tags: {action: 'createEventValidation'}});
        setIsLoading(false);
        return;
      }
      if (!props?.photos?.[0]?.image) {
        Alert.alert('Main event picture is required.');
        Sentry.addBreadcrumb({category: 'event_creation', message: 'Missing main photo', level: 'warning'});
        setIsLoading(false);
        return;
      }

      const photoPaths = [props.photos?.[0]?.image, props.photos?.[1]?.image, props.photos?.[2]?.image].filter(p => !!p) as string[];
      Sentry.addBreadcrumb({
        category: 'event_creation',
        message: 'Attempting to upload photos',
        level: 'info',
        data: {photoCount: photoPaths.length},
      });
      if (!userHost) {
        showToast('basic' as UseToastType, 'User data not available. Please log in again.', 'Error');
        logErrorToSentry('User data not available in createEvent', {tags: {action: 'createEventValidation'}});
        setIsLoading(false);
        return;
      }
      const uploadPromises = photoPaths.map(path => uploadImage(path, userHost?.uid ?? ''));
      let uploadedUrls: (string | null)[] = [];
      try {
        uploadedUrls = await Promise.all(uploadPromises);
        Sentry.addBreadcrumb({
          category: 'event_creation',
          message: 'Finished image uploads',
          level: 'info',
          data: {
            requestedCount: photoPaths.length,
            successfulCount: uploadedUrls.filter(u => u).length,
          },
        });
      } catch (uploadError: any) {
        console.error('Error during Promise.all for image uploads:', uploadError);
        logErrorToSentry(uploadError, {
          tags: {action: 'uploadImagesPromiseAll'},
          extra: {photoPaths},
          level: 'error',
        });
        showToast('basic' as UseToastType, 'Failed to upload images. Cannot create event.', 'Error');
        setIsLoading(false);
        goBack();
        return;
      }

      const validUrls = uploadedUrls.filter((url): url is string => url !== null);
      if (uploadedUrls[0] === null) {
        Alert.alert('Error uploading the main event image. Cannot create event.');
        logErrorToSentry('Main image upload failed', {
          tags: {action: 'createEventValidation'},
          extra: {photoPaths, uploadedUrls},
        });
        setIsLoading(false);
        goBack();
        return;
      }

      const eventPhotos = validUrls.map(url => ({
        image: url,
      }));

      eventUid = uuid.v4() as string;
      Sentry.addBreadcrumb({
        category: 'event_creation',
        message: 'Event payload constructed',
        level: 'debug',
        data: {eventUid},
      });

      const eventPayload: components['schemas']['EventData'] = {
        uid: eventUid,
        hostId: currUser,
        hostImage: userHost?.photos?.[0]?.image ?? '',
        hostName: userHost?.name ?? 'Host Name Unavailable',
        photos: eventPhotos,
        createdAt: moment().toISOString(),
        name: props.name,
        eventReviewed: false,
        isCancelled: false,
        statusEvent: false,
        maleFriend: props.maleFriend ?? 0,
        femaleFriend: props.femaleFriend ?? 0,
        date: moment(props.date).format('YYYY-MM-DD'),
        hour: props.hour,
        description: props.description,
        placeName: props.placeName,
        address: props.address,
        location: props.location,
        meetingSpot: props.meetingSpot,
      };

      Sentry.addBreadcrumb({
        category: 'event_creation',
        message: 'Calling createEvent mutation',
        level: 'info',
        data: {eventUid},
      });

      createEventMutation(
        {
          body: eventPayload,
        },
        {
          onSuccess: async _createdEventData => {
            Sentry.addBreadcrumb({
              category: 'event_creation',
              message: 'createEvent mutation successful',
              level: 'info',
              data: {eventUid},
            });
            showToast('withImage', 'Your event has been created! We will notify you when it is approved.', 'Success', {
              image: eventPhotos?.[0]?.image,
            });
            navigate({name: '/bottom-tabs-stack', params: {screen: '/io'}});
          },
          onError: (mutationError: any) => {
            console.error('Error creating event via mutation:', mutationError);
            logErrorToSentry(mutationError, {
              tags: {action: 'createEventMutation'},
              extra: {eventUid, eventName: props.name},
              level: 'error',
            });
            showToast('basic' as UseToastType, 'Failed to create event. Please try again.', 'Error');
            setIsLoading(false);
          },
        },
      );
    } catch (e: any) {
      console.error('General error in createEvent function:', e);
      logErrorToSentry(e, {
        tags: {action: 'createEventCatchAll'},
        extra: {eventUid, eventName: props.name},
        level: 'error',
      });
      setIsLoading(false);
      showToast('basic' as UseToastType, 'An unexpected error occurred. Please try again.', 'Error');
    }
  };

  const updateEvent = async (props: Partial<components['schemas']['EventData']>) => {
    Sentry.addBreadcrumb({
      category: 'event_creation',
      message: 'Starting updateEvent process',
      level: 'info',
      data: {eventName: props.name},
    });
    setIsLoading(true);
    let eventUid: string | null = null;
    try {
      const currUser = userMetadata.uid;
      if (!currUser || !userHost) {
        showToast('basic' as UseToastType, 'User data not available. Please log in again.', 'Error');
        logErrorToSentry('User data not available in createEvent', {tags: {action: 'createEventValidation'}});
        setIsLoading(false);
        return;
      }
      if (!props?.photos?.[0]?.image) {
        Alert.alert('Main event picture is required.');
        Sentry.addBreadcrumb({category: 'event_creation', message: 'Missing main photo', level: 'warning'});
        setIsLoading(false);
        return;
      }

      const photoPaths = [props.photos?.[0]?.image, props.photos?.[1]?.image, props.photos?.[2]?.image].filter(p => !!p) as string[];
      Sentry.addBreadcrumb({
        category: 'event_update',
        message: 'Attempting to upload photos',
        level: 'info',
        data: {photoCount: photoPaths.length},
      });
      if (!userHost) {
        showToast('basic' as UseToastType, 'User data not available. Please log in again.', 'Error');
        logErrorToSentry('User data not available in updateEvent', {tags: {action: 'updateEventValidation'}});
        setIsLoading(false);
        return;
      }
      const uploadPromises = photoPaths.map(path => uploadImage(path, userHost?.uid ?? ''));
      let uploadedUrls: (string | null)[] = [];
      try {
        uploadedUrls = await Promise.all(uploadPromises);
        Sentry.addBreadcrumb({
          category: 'event_update',
          message: 'Finished image uploads',
          level: 'info',
          data: {
            requestedCount: photoPaths.length,
            successfulCount: uploadedUrls.filter(u => u).length,
          },
        });
      } catch (uploadError: any) {
        console.error('Error during Promise.all for image uploads:', uploadError);
        logErrorToSentry(uploadError, {
          tags: {action: 'uploadImagesPromiseAll'},
          extra: {photoPaths},
          level: 'error',
        });
        showToast('basic' as UseToastType, 'Failed to upload images. Cannot update event.', 'Error');
        setIsLoading(false);
        goBack();
        return;
      }

      const validUrls = uploadedUrls.filter((url): url is string => url !== null);
      if (uploadedUrls[0] === null) {
        Alert.alert('Error uploading the main event image. Cannot update event.');
        logErrorToSentry('Main image upload failed', {
          tags: {action: 'updateEventValidation'},
          extra: {photoPaths, uploadedUrls},
        });
        setIsLoading(false);
        goBack();
        return;
      }

      const eventPhotos = validUrls.map(url => ({
        image: url,
      }));

      eventUid = uuid.v4() as string;
      Sentry.addBreadcrumb({
        category: 'event_creation',
        message: 'Event payload constructed',
        level: 'debug',
        data: {eventUid},
      });

      const eventPayload: components['schemas']['EventData'] = {
        uid: eventUid,
        hostId: currUser,
        hostImage: userHost?.photos?.[0]?.image ?? '',
        hostName: userHost?.name ?? 'Host Name Unavailable',
        photos: eventPhotos,
        createdAt: moment().toISOString(),
        name: props.name,
        eventReviewed: false,
        isCancelled: false,
        statusEvent: false,
        maleFriend: props.maleFriend ?? 0,
        femaleFriend: props.femaleFriend ?? 0,
        date: moment(props.date).format('YYYY-MM-DD'),
        hour: props.hour,
        description: props.description,
        placeName: props.placeName,
        address: props.address,
        location: props.location,
        meetingSpot: props.meetingSpot,
      };

      Sentry.addBreadcrumb({
        category: 'event_creation',
        message: 'Calling createEvent mutation',
        level: 'info',
        data: {eventUid},
      });
      updateEventMutation(
        {
          body: eventPayload,
          params: {
            path: {
              eventId: props.uid ?? '',
            },
          },
        },
        {
          onSuccess: async _createdEventData => {
            Sentry.addBreadcrumb({
              category: 'event_creation',
              message: 'createEvent mutation successful',
              level: 'info',
              data: {eventUid},
            });
            showToast('withImage', 'Continue swiping 👋', 'Event Details Updated', {
              image: eventPhotos?.[0]?.image,
            });
            navigate({name: '/bottom-tabs-stack', params: {screen: '/io'}});
          },
          onError: (mutationError: any) => {
            console.error('Error creating event via mutation:', mutationError);
            logErrorToSentry(mutationError, {
              tags: {action: 'createEventMutation'},
              extra: {eventUid, eventName: props.name},
              level: 'error',
            });
            showToast('basic' as UseToastType, 'Failed to create event. Please try again.', 'Error');
            setIsLoading(false);
          },
        },
      );
    } catch (e: any) {
      console.error('General error in updateEvent function:', e);
      logErrorToSentry(e, {
        tags: {action: 'updateEventCatchAll'},
        extra: {eventUid, eventName: props.name},
        level: 'error',
      });
      setIsLoading(false);
      showToast('basic' as UseToastType, 'An unexpected error occurred. Please try again.', 'Error');
    }
  };

  return {createEvent, updateEvent, isLoading};
};

export default useCreateEvent;
