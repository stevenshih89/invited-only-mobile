import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {CreateEventFormValues} from '../CreateEventFlow';
import moment from 'moment';

import {showToast, UseToastType} from 'helpers/showToast';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {components} from 'src/api/v1';
import invitedOnlyBackendApi from 'src/api/backend-api';
import RNFS from 'react-native-fs';

const UPDATE_USER_EVENT_LIST_PATH = '/users/{id}/events'; // Example path, verify this!

const useCreateEvent = () => {
  const {data: userHost} = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: auth().currentUser?.uid ?? '',
      },
    },
  });

  const {mutate: createEventMutation} = invitedOnlyBackendApi.useMutation('post', '/events');
  const {mutate: updateUserEventListMutation} = invitedOnlyBackendApi.useMutation('patch', UPDATE_USER_EVENT_LIST_PATH as any); // Use verified path, cast as any temporarily if type is complex

  const {navigate} = useAppNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImage = async (imagePath: string | null | undefined, userId: string): Promise<string | null> => {
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
      return url;
    } catch (e: any) {
      console.log('Error uploading image:', e);
      logErrorToSentry(e);
      showToast('error' as UseToastType, `Upload failed: ${e.message || 'Unknown error'}`, 'Upload Error');
      return null;
    }
  };

  const createEvent = async (props: CreateEventFormValues) => {
    setIsLoading(true);
    try {
      const currUser = auth().currentUser;
      if (!currUser || !userHost) {
        showToast('error' as UseToastType, 'User data not available. Please log in again.', 'Error');
        setIsLoading(false);
        return;
      }
      if (!props?.photos.main) {
        Alert.alert('Main event picture is required.');
        setIsLoading(false);
        return;
      }

      const photoPaths = [props.photos.main, props.photos.photo2, props.photos.photo3].filter(p => !!p) as string[];
      const uploadPromises = photoPaths.map(path => uploadImage(path, userHost.uid));
      let uploadedUrls: (string | null)[] = [];
      try {
        uploadedUrls = await Promise.all(uploadPromises);
      } catch (e: any) {
        console.log('Error uploading image:', e);
      }

      const uid: string = uuid.v4() as string;
      console.log('sending event uid', uid);

      const eventPayload: Omit<components['schemas']['EventData'], 'id'> = {
        uid: uid,
        hostId: currUser.uid,
        hostImage: userHost?.photos?.[0]?.image ?? '',
        hostName: userHost?.name ?? 'Host Name Unavailable',
        photos: uploadedUrls.map(url => ({image: url ?? ''})),
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

      createEventMutation(
        {
          body: eventPayload,
        },
        {
          onSuccess: async createdEventData => {
            updateUserEventListMutation(
              {
                params: {path: {id: currUser.uid}},
                body: {eventId: uid},
              },
              {
                onSuccess: async () => {
                  showToast('success' as UseToastType, 'Event successfully created!', 'Success');
                  showToast('info' as UseToastType, 'Your event is under review (est. 2h)', 'Info');
                  setIsLoading(false);
                  navigate('/bottom-tabs-stack');
                },
                onError: (updateError: any) => {
                  console.error('Error updating user event list:', updateError);
                  logErrorToSentry(updateError);
                  showToast('warning' as UseToastType, 'Event created, but failed to update your event list.', 'Warning');
                  setIsLoading(false);
                  navigate('/bottom-tabs-stack');
                },
              },
            );
          },
          onError: (mutationError: any) => {
            console.error('Error creating event via mutation:', mutationError);
            logErrorToSentry(mutationError);
            showToast('error' as UseToastType, 'Failed to create event. Please try again.', 'Error');
            setIsLoading(false);
          },
        },
      );
    } catch (e: any) {
      console.error('General error in createEvent function:', e);
      setIsLoading(false);
      showToast('error' as UseToastType, 'An unexpected error occurred. Please try again.', 'Error');
      logErrorToSentry(e);
    }
  };

  return {createEvent, isLoading};
};

export default useCreateEvent;
