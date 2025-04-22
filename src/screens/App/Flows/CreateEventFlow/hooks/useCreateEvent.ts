import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import * as Sentry from '@sentry/react-native';

import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import moment from 'moment';
import { CreateEventFormValues } from '../CreateEventFlow';

import { showToast, UseToastType } from 'helpers/showToast';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { components } from 'src/api/v1';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';


const useCreateEvent = () => {
  const { userMetadata } = useAuthStore.getState();
  const { data: userHost } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: userMetadata.uid ?? '',
      },
    },
  });

  const { mutate: createEventMutation } = invitedOnlyBackendApi.useMutation('post', '/events');

  const { navigate, goBack } = useAppNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImage = async (imagePath: string | null | undefined, userId: string): Promise<string | null> => {
    Sentry.addBreadcrumb({
      category: 'upload',
      message: 'Starting image upload',
      level: 'info',
      data: { userId, imagePath: imagePath?.substring(imagePath.length - 50) },
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
        data: { userId, filename, url },
      });
      return url;
    } catch (e: any) {
      console.error('Error uploading image:', e);
      logErrorToSentry(e, {
        tags: { action: 'uploadImage' },
        extra: { userId, imagePath, filename, uploadUri },
        level: 'error',
      });
      showToast('error' as UseToastType, `Upload failed: ${e.message || 'Unknown error'}`, 'Upload Error');
      return null;
    }
  };

  const createEvent = async (props: CreateEventFormValues) => {
    Sentry.addBreadcrumb({
      category: 'event_creation',
      message: 'Starting createEvent process',
      level: 'info',
      data: { eventName: props.eventName },
    });
    setIsLoading(true);
    let eventUid: string | null = null;
    try {
      const currUser = userMetadata.uid;
      if (!currUser || !userHost) {
        showToast('error' as UseToastType, 'User data not available. Please log in again.', 'Error');
        logErrorToSentry('User data not available in createEvent', { tags: { action: 'createEventValidation' } });
        setIsLoading(false);
        return;
      }
      if (!props?.photos.main) {
        Alert.alert('Main event picture is required.');
        Sentry.addBreadcrumb({ category: 'event_creation', message: 'Missing main photo', level: 'warning' });
        setIsLoading(false);
        return;
      }

      const photoPaths = [props.photos.main, props.photos.photo2, props.photos.photo3].filter(p => !!p) as string[];
      Sentry.addBreadcrumb({
        category: 'event_creation',
        message: 'Attempting to upload photos',
        level: 'info',
        data: { photoCount: photoPaths.length },
      });
      if (!userHost) {
        showToast('error' as UseToastType, 'User data not available. Please log in again.', 'Error');
        logErrorToSentry('User data not available in createEvent', { tags: { action: 'createEventValidation' } });
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
          tags: { action: 'uploadImagesPromiseAll' },
          extra: { photoPaths },
          level: 'error',
        });
        showToast('error' as UseToastType, 'Failed to upload images. Cannot create event.', 'Error');
        setIsLoading(false);
        goBack();
        return;
      }

      const validUrls = uploadedUrls.filter((url): url is string => url !== null);
      if (uploadedUrls[0] === null) {
        Alert.alert('Error uploading the main event image. Cannot create event.');
        logErrorToSentry('Main image upload failed', {
          tags: { action: 'createEventValidation' },
          extra: { photoPaths, uploadedUrls },
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
        data: { eventUid },
      });

      const eventPayload: components['schemas']['EventData'] = {
        uid: eventUid,
        hostId: currUser,
        hostImage: userHost?.photos?.[0]?.image ?? '',
        hostName: userHost?.name ?? 'Host Name Unavailable',
        photos: eventPhotos,
        createdAt: moment().toISOString(),
        rejectsByGuestsList: [],
        requestsList: [],
        usersList: [],
        name: props.eventName,
        eventReviewed: false,
        isCancelled: false,
        statusEvent: false,
        maleFriend: props.male,
        femaleFriend: props.female,
        date: moment(props.date).format('YYYY-MM-DD'),
        hour: props.hour,
      };

      Sentry.addBreadcrumb({
        category: 'event_creation',
        message: 'Calling createEvent mutation',
        level: 'info',
        data: { eventUid },
      });
      createEventMutation(
        {
          body: eventPayload,
        },
        {
          onSuccess: async (_createdEventData) => {
            Sentry.addBreadcrumb({
              category: 'event_creation',
              message: 'createEvent mutation successful',
              level: 'info',
              data: { eventUid },
            });
            showToast('success', 'Your event has been created! We will notify you when it is approved.', 'Success');
            navigate('/bottom-tabs-stack');
          },
          onError: (mutationError: any) => {
            console.error('Error creating event via mutation:', mutationError);
            logErrorToSentry(mutationError, {
              tags: { action: 'createEventMutation' },
              extra: { eventUid, eventName: props.eventName },
              level: 'error',
            });
            showToast('error' as UseToastType, 'Failed to create event. Please try again.', 'Error');
            setIsLoading(false);
          },
        },
      );
    } catch (e: any) {
      console.error('General error in createEvent function:', e);
      logErrorToSentry(e, {
        tags: { action: 'createEventCatchAll' },
        extra: { eventUid, eventName: props.eventName },
        level: 'error',
      });
      setIsLoading(false);
      showToast('error' as UseToastType, 'An unexpected error occurred. Please try again.', 'Error');
    }
  };

  return { createEvent, isLoading };
};

export default useCreateEvent;
