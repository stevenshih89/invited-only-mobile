import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {CreateEventFormValues} from '../CreateEventFlow';
import moment from 'moment';
import {useUser} from 'src/store/userStore';
import {eventTypes} from 'src/mocks/eventTypes';
import {EventData} from 'src/types/event';
import {showToast} from 'helpers/showToast';
import {EventMutations} from 'src/apiv2/mutations/eventMutations';
import {UserMutations} from 'src/apiv2/mutations/userMutations';
import {UserQueries} from 'src/apiv2/queries/userQueries';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

const useCreateEvent = () => {
  const {user: userHost} = useUser();
  const {mutate: createEventMutation} = EventMutations.useCreateEvent();
  const {mutate: updateUserEventListMutation} = UserMutations.useUpdateUserEventList();
  const {refetch: fcmTokensFromUsersRefetch} = UserQueries.useFcmTokensFromUsers(false);
  const {navigate} = useAppNavigation();
  const [isLoading, setIsLoading] = useState<boolean>();

  const uploadImage = async (imagePath: string, userId: string | null) => {
    if (imagePath) {
      if (imagePath.includes('https://')) {
        return imagePath;
      } else {
        const uploadUri = Platform.OS === 'ios' ? imagePath : `file://${imagePath}`;
        const filename = `${userId}_${new Date().getTime()}`;
        const storageRef = storage().ref(`images/${filename}`);
        try {
          await storageRef.putFile(uploadUri);
          const url = await storageRef.getDownloadURL();
          return url;
        } catch (e) {
          console.error('Error uploading image:', e);
          return null;
        }
      }
    }
  };

  const createEvent = async (props: CreateEventFormValues) => {
    try {
      setIsLoading(true);
      const uid: string = uuid.v4() as string;
      const currUser = auth().currentUser;
      if (!currUser) {
        return;
      }
      if (!props?.photos.main) {
        Alert.alert('Please add the main picture');
      }

      let imagesUri: any[] = [];

      const event: EventData = {
        activeType: eventTypes[0].id,
        ...props,
        id: uid,
        uid: currUser?.uid,
        hostImage: userHost?.photos.map(photo => photo.image ?? '') || [],
        hostName: userHost?.name,
        photos: imagesUri,
        createdAt: moment().format('YYYY-MM-DD'),
        rejectsByGuestsList: [],
        hostFcmToken: '',
        rejectsList: [],
        requestsList: [],
        usersList: [],
        name: props.eventName,
        eventReviewed: false,
        isCancelled: false,
        statusEvent: false,
        maleFriend: props.male,
        femaleFriend: props.female,
      };

      showToast('inviteMatch', 'Go to my events >', 'Event successfully created ');
      showToast('inviteMatch', 'Your event in review.', 'Estimate time review 2h');

      [props.photos.main, props.photos.photo2, props.photos.photo3].forEach(async photo => {
        if (photo) {
          const img = await uploadImage(photo, userHost.uid);
          imagesUri.push(img);
        }
      });

      createEventMutation(
        {
          uid,
          event,
        },
        {
          onSuccess: async () => {
            updateUserEventListMutation(uid, {
              onSuccess: async () => {
                const tokensData = await fcmTokensFromUsersRefetch();
                const tokens = tokensData.data ?? [];

                for (const token of tokens) {
                  console.log('need to call notification ', token);
                }

                setIsLoading(false);

                navigate('/io');
              },
            });
          },
        },
      );
    } catch (e) {
      setIsLoading(false);
      showToast('inviteMatch', 'Something went wrong while creating the event. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
    return {isLoading, createEvent};
  };

  return {createEvent, isLoading};
};
export default useCreateEvent;
