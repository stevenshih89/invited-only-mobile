import { Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import { showToast } from 'helpers/showToast.ts';
import { sendNotification } from 'helpers/fcmHelper';
import { INVITE_MATCH_STATUS, screenHeight } from 'constants/common';
import { updateGuestEventsList } from 'helpers/updateGuestEventsList';
import { Event } from 'src/types/event';
import { joinEvent, requestsScreen } from 'constants/analitycs';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import useUser from 'src/hooks/user/useUser';
import { components } from 'src/api/v1';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

type User = components['schemas']['User'];

export const useItemRequestGuest = ({ list, handleOpenMatch }: any) => {
  const { photos, uid, hour, date, female, male, name, usersList, activeType, placeName } = list;
  const [hostInfo, setHostInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const cardRef = useRef(null);

  const [heightAnim] = useState(new Animated.Value(screenHeight * 0.4));

  const { user } = useUser();

  const getHostInfo = async (uid: string) => {
    try {
      const host = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      setHostInfo(host.data() as User | null);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      logErrorToSentry(e);
    }
  };

  const onInvite = async (userItem: Event.User): Promise<void> => {
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(async () => {
      const eventData = await firestore().collection(apiEventsCollection).doc(list?.id).get();
      const event = eventData.data();
      if (!event) {
        return;
      }

      try {
        const updatedUsersList = event.usersList?.map(invUser => {
          if (invUser.uid === userItem?.uid) {
            return {
              ...invUser,
              status: INVITE_MATCH_STATUS,
            };
          }
          return invUser;
        });

        const matchedData = {
          type: 'match',
          name: event?.hostName,
          imageUri: userItem?.userPhoto,
          uidHost: event?.uid,
          uidGuest: userItem?.uid,
          nameGuest: userItem?.name,
          nameHost: hostInfo?.name,
          eventId: event?.id,
          superInvite: false,
          userHostImageUri: event?.hostImage,
          joinEvents: user?.joinEvents,
          location: user?.location,
          premium: hostInfo?.accountPremium,
          dateHost: hostInfo?.date,
          dateGuest: user?.date,
          onlineGuest: user?.online,
          accountConfirmedHost: hostInfo?.accountConfirmed,
          accountConfirmedGuest: user?.accountConfirmed,
          usersListHost: usersList,
          accountTypeHost: hostInfo?.accountType,
          accountTypeGuest: user?.accountType,
          eventImage: photos[0]?.image,
          guestsInvited: male + female,
        };

        await firestore()
          .collection(apiEventsCollection)
          .doc(list?.id)
          .update({
            usersList: updatedUsersList,
          })
          .then(async () => {
            analytics().logEvent(`${requestsScreen}_${joinEvent}`, {
              eventId: list?.id,
            });

            await updateGuestEventsList(event?.id, user?.uid ?? '');
            handleOpenMatch(matchedData);
            const getDoc = await firestore().collection(apiUserInfoCollection).doc(event.uid).get();
            const docData = getDoc.data();
            if (docData?.notificationSettings?.joinedEvent) {
              if (user) {
                await sendNotification(
                  event.uid,
                  'New join request',
                  `${user.name} wants to join you!`,
                  'invite',
                  'Join Request'.toUpperCase(),
                  user,
                );
              }
            }
          });
        if (user) {
          await updateJoinEvents();
        }
      } catch (e) {
        showToast('inviteMatch', '', "There's been an error");
        logErrorToSentry(e);
      }
    });
  };

  const updateJoinEvents = async () => {
    if (!user?.uid) return;
    try {
      const doc = firestore().collection(apiUserInfoCollection).doc(user.uid);
      const data = (await doc.get()).data();
      if (data?.joinEvents) {
        doc.update({
          joinEvents: data?.joinEvents + 1,
        });
      } else {
        doc.update({
          joinEvents: 1,
        });
      }
    } catch (error) {
      console.log('error joinEvents update', error);
    }
  };

  const onReject = async (userItem: Event.User): Promise<void> => {
    try {
      await firestore()
        .collection(apiEventsCollection)
        .doc(list?.id)
        .update({
          usersList: firestore.FieldValue.arrayRemove(userItem),
          rejectsList: firestore.FieldValue.arrayUnion({ uid: userItem.uid }),
        });
      analytics().logEvent(`${requestsScreen}_reject_${joinEvent}`, {
        eventId: list?.id,
      });
      showToast('inviteMatch', '', 'You reject invitation');
      const getDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings?.myEvents) {
        if (user) {
          await sendNotification(uid, 'Not now.', `${userItem?.name} reject your invitation.`, 'rejected', 'Rejected'.toUpperCase(), user);
        }
      }
    } catch (e) {
      console.error(e);
      showToast('inviteMatch', '', "There's been an error");
      logErrorToSentry(e);
    }
  };

  const handleSwipeCardRight = () => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.swipeCardRight();
    }
  };

  const handleSwipeCardLeft = () => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.swipeCardLeft();
    }
  };

  const handleInvite = ({ userItem, withSwipeAnimation }: { userItem: Event.User; withSwipeAnimation: boolean }) => {
    onInvite(userItem);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
    }
  };

  const handleReject = ({ userItem, withSwipeAnimation }: { userItem: Event.User; withSwipeAnimation: boolean }) => {
    onReject(userItem);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  useEffect(() => {
    getHostInfo(uid);
  }, []);

  function getMonth() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [day, month, year] = date.split('.');
    const monthName = months[parseInt(month) - 1];
    return `${monthName}`;
  }
  return {
    loading,
    heightAnim,
    cardRef,
    handleInvite,
    handleReject,
    hostInfo,
    getMonth,
  };
};
