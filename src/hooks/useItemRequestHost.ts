import firestore from '@react-native-firebase/firestore';
import {useRef, useState} from 'react';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import {User} from 'src/types/userInfo';
import {useAppNavigation} from 'hooks/useAppNavigation.tsx';
import {commonStackPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from 'src/store/userStore';
import {sendNotification} from 'helpers/fcmHelper';
import {handleCreateChat} from 'helpers/chat';
import {ACCEPTED_STATUS, INVITE_MATCH_STATUS} from 'constants/common';
import {updateGuestEventsList} from 'helpers/updateGuestEventsList';
import {Event} from 'src/types/event';
import {inviteUser, requestsScreen} from 'constants/analitycs';
import {useMyEvents} from 'src/store/myEvents';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {MatchData} from 'screens/App/IO/screens/Match/Match';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

export const useItemRequestHost = ({item, handleOpenMatch, setIsVisibleModalFullEvent, fetchHostRequests}: any) => {
  const navigation = useAppNavigation();
  const [userInfo, setUserInfo] = useState<Partial<User.Info>>({accountType: 'host'});
  const user = useUser((state: any) => state.user);
  const [currentUserName, setCurrentUserName] = useState();
  const {activeEvent} = useMyEvents();
  const cardRef = useRef(null);
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

  const handleInvite = ({userItem, withSwipeAnimation}: {userItem: Event.User; withSwipeAnimation: boolean}) => {
    onInvite(userItem);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
    }
  };

  const handleReject = ({userItem, withSwipeAnimation}: {userItem: Event.User; withSwipeAnimation: boolean}) => {
    onReject(userItem);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  const onInvite = async (userItem: Event.User): Promise<void> => {
    const eventQuery = await firestore().collection(apiEventsCollection).doc(activeEvent?.id).get();
    if (!eventQuery.exists) {
      return;
    }

    const eventData = eventQuery.data();
    const allPeople = eventData?.female + eventData?.male;
    const eventIsFull = eventData?.usersList?.filter((i: Event.User) => i?.status === ACCEPTED_STATUS)?.length === allPeople;

    if (eventIsFull) {
      setIsVisibleModalFullEvent();
      fetchHostRequests();
      showToast('cancel', 'Go to my events', `Event Full: ${allPeople}/${allPeople} guests invited`);
      return;
    }

    const getDoc = await firestore().collection(apiUserInfoCollection).doc(userItem.uid).get();
    const guest = getDoc.data();
    if (!guest) {
      return;
    }
    try {
      const userAccepted = {
        gender: userItem?.gender,
        name: userItem?.name,
        status: INVITE_MATCH_STATUS,
        superInvite: false,
        uid: userItem?.uid,
        userPhoto: userItem?.userPhoto,
      };

      const matchedData = {
        type: 'match',
        name: userItem?.name,
        imageUri: userItem?.userPhoto,
        uidHost: user?.uid,
        uidGuest: userItem?.uid,
        nameGuest: userItem?.name,
        nameHost: currentUserName,
        eventId: activeEvent?.id,
        superInvite: false,
        userHostImageUri: user?.photos[0]?.image,
        joinEvents: guest?.joinEvents,
        location: guest?.location,
        premium: user?.accountPremium,
        dateHost: user?.date,
        dateGuest: guest?.date,
        onlineGuest: guest?.online,
        accountConfirmedHost: guest?.accountConfirmed,
        accountConfirmedGuest: user?.accountConfirmed,
        usersListHost: activeEvent?.usersList,
        accountTypeHost: userInfo?.accountType,
        accountTypeGuest: guest?.accountType,
        eventImage: activeEvent?.photos[0].image,
        guestsInvited: activeEvent?.male + activeEvent?.female,
      };

      await firestore()
        .collection(apiEventsCollection)
        .doc(activeEvent?.id)
        .update({
          requestsList: firestore.FieldValue.arrayRemove(userItem),
          usersList: firestore.FieldValue.arrayUnion(userAccepted),
        })
        .then(async () => {
          analytics().logEvent(`${requestsScreen}_${inviteUser}`, {
            eventId: activeEvent?.id,
          });
          await handleCreateChat(matchedData as MatchData);
          await updateGuestEventsList(activeEvent?.id, guest?.uid);
          handleOpenMatch(matchedData);
          const getDoc = await firestore().collection(apiUserInfoCollection).doc(userItem?.uid).get();
          const docData = getDoc.data();
          if (docData?.notificationSettings.requests) {
            await sendNotification(
              userItem?.uid,
              'New invite request',
              `${user?.name} wants to invite you!`,
              'invite',
              'Invite Request'.toUpperCase(),
              user,
            );
          }
        });
    } catch (e) {
      console.error('error invite', e);
      showToast('inviteMatch', '', "There's been an error");
      logErrorToSentry(e);
    }
  };

  const onReject = async (userItem: Event.User): Promise<void> => {
    try {
      console.warn(userItem, activeEvent?.id);

      await firestore()
        .collection(apiEventsCollection)
        .doc(activeEvent?.id)
        .update({
          requestsList: firestore.FieldValue.arrayRemove(userItem),
          rejectsList: firestore.FieldValue.arrayUnion({uid: userItem?.uid}),
        });
      analytics().logEvent(`${requestsScreen}_reject_${inviteUser}`, {
        eventId: activeEvent?.id,
      });
    } catch (e) {
      console.error(e);
      showToast('inviteMatch', '', "There's been an error");
      logErrorToSentry(e);
    }
  };

  const goToProfileView = () => {
    navigation.navigate(commonStackPath, {
      screen: myProfileViewPath,
      params: {
        uid: item?.uid,
        isShowEditButton: false,
      },
    });
  };
  return {
    cardRef,
    handleInvite,
    handleReject,
    goToProfileView,
  };
};
