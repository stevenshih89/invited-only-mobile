import firestore from '@react-native-firebase/firestore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry.ts';
import {useMutation} from '@tanstack/react-query';
import {EventMutationsKeys} from '../keys/eventMutationsKeys.ts';
import analytics from '@react-native-firebase/analytics';
import {showToast} from 'helpers/showToast.ts';
import {EventData} from '../../types/event.ts';
import {MatchData} from 'screens/App/IO/screens/Match/Match.tsx';
import {INVITE_MATCH_STATUS} from 'constants/common.ts';
import {inviteUser, IOscreen, joinEvent} from 'constants/analitycs';
import {sendNotification} from 'helpers/fcmHelper.ts';

import {useContext} from 'react';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext.tsx';

const useUpdateEvent = (eventId: string) => {
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);
  const updateEventFn = async (variables: {eventData: any; onSuccess: (data: any) => Promise<void>}) => {
    try {
      const {eventData, onSuccess} = variables;

      await firestore().collection(apiEventsCollection).doc(eventId).update(eventData);
      analytics().logEvent('event_saved_changes', {
        eventId: eventId,
      });
      const getDoc = await firestore().collection(apiEventsCollection).doc(eventId).get();
      const data = getDoc.data();

      await onSuccess(data);
      showToast('inviteMatch', 'Continue invite👋', 'Event updated');
    } catch (e) {
      showToast('inviteMatch', 'Something went wrong while updating the event. Please try again later.', 'Error');
      logErrorToSentry(e);
      console.log('error update event', e);
    }
  };

  return useMutation({
    mutationKey: EventMutationsKeys.updateEvent(eventId),
    mutationFn: updateEventFn,
  });
};

const useCreateEvent = () => {
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);
  const createEventFn = async (variables: {uid: string; event: EventData}) => {
    const {uid, event} = variables;

    try {
      await firestore().collection(apiEventsCollection).doc(uid).set(event);
      return true;
    } catch (error) {
      showToast('inviteMatch', 'An issue occurred while creating the event. Please try again later.', 'Error');
      logErrorToSentry(error);
    }
  };

  return useMutation({
    mutationKey: EventMutationsKeys.createEvent(),
    mutationFn: createEventFn,
  });
};

const useUpdateWeeklySuperInvites = () => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateWeeklySuperInvites = async ({uid}: {uid: string}) => {
    await firestore().collection(apiUserInfoCollection).doc(uid).update({
      lastUpdateSuperInvite: Date.now(),
      weeklySuperInvites: 5,
    });
  };

  return useMutation({
    mutationKey: ['weeklySuperInvites'],
    mutationFn: updateWeeklySuperInvites,
  });
};

export const useRejectEvent = () => {
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);
  const rejectEvent = async ({
    activeEventId,
    rejectUid,
    isEventOwner,
  }: {
    activeEventId: string;
    rejectUid: string;
    isEventOwner: boolean;
  }) => {
    try {
      const data = isEventOwner
        ? {rejectsList: firestore.FieldValue.arrayUnion({uid: rejectUid})}
        : {rejectsByGuestsList: firestore.FieldValue.arrayUnion({uid: rejectUid})};

      await firestore().collection(apiEventsCollection).doc(activeEventId).update(data);
    } catch (error) {
      logErrorToSentry(error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['rejectEvent'],
    mutationFn: rejectEvent,
  });
};

const useFetchEventInfo = () => {
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);
  const fetchEventInfo = async (eventId: string) => {
    const userDoc = await firestore().collection(apiEventsCollection).doc(eventId).get();
    if (!userDoc.exists) throw new Error('Event not found');
    return userDoc.data();
  };

  return useMutation({
    mutationFn: fetchEventInfo,
  });
};

const useInviteUser = () => {
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);
  const userInvite = async ({
    matchedGuest,
    userInvited,
    event,
    userInfo,
    guestData,
    activeEventId,
    superInvite,
    forUserUid,
    isDemo,
  }: {
    matchedGuest: any;
    userInvited: any;
    event: any;
    userInfo: any;
    guestData: any;
    activeEventId: any;
    superInvite: any;
    forUserUid: any;
    isDemo: any;
  }) => {
    let data = {};
    let matchedGuestData: MatchData | null = null;
    if (matchedGuest) {
      data = {
        requestsList: firestore.FieldValue.arrayRemove(matchedGuest),
        usersList: firestore.FieldValue.arrayUnion({
          ...userInvited,
          status: INVITE_MATCH_STATUS,
        }),
      };
      matchedGuestData = {
        type: 'match',
        nameHost: event?.hostName,
        nameGuest: matchedGuest?.name,
        imageUri: matchedGuest?.userPhoto,
        uidHost: userInfo?.uid,
        uidGuest: matchedGuest?.uid,
        eventId: activeEventId,
        superInvite: superInvite ? superInvite : false,
        userHostImageUri: userInfo?.photos[0]?.image,
        joinEvents: guestData.joinEvents,
        location: guestData.location,
        premium: userInfo?.accountPremium,
        dateHost: userInfo?.date,
        dateGuest: guestData.date,
        onlineGuest: guestData.online,
        accountConfirmedHost: guestData.accountConfirmed,
        accountConfirmedGuest: userInfo?.accountConfirmed,
        usersListHost: event.usersList,
        accountTypeHost: userInfo?.accountType,
        accountTypeGuest: guestData.accountType,
        eventImage: event.photos[0].image,
        guestsInvited: event.male + event.female,
      };
    } else {
      data = {
        usersList: firestore.FieldValue.arrayUnion(userInvited),
      };
    }
    await firestore()
      .collection(apiEventsCollection)
      .doc(activeEventId)
      .update(data)
      .then(async () => {
        analytics().logEvent(`${IOscreen}_${inviteUser}`, {
          hostUid: userInfo?.uid,
          guestUid: forUserUid,
        });
        if ((guestData.notificationSettings?.match || guestData.notificationSettings?.superInvite) && !isDemo) {
          await sendNotification(
            forUserUid,
            'New invite request',
            `${userInfo.name} ${superInvite ? 'Super' : 'wants to'} invite you!`,
            'invite',
            'Invite Request'.toUpperCase(),
            userInfo,
            JSON.stringify({path: 'requests'}),
          );
        }
      });

    return {matchedGuestData};
  };
  return useMutation({
    mutationKey: ['inviteUser'],
    mutationFn: userInvite,
  });
};

const useRequestUser = () => {
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);
  const userRequest = async ({activeEventId, data, event, userInfo, guestData, isDemo}: any) => {
    try {
      await firestore()
        .collection(apiEventsCollection)
        .doc(activeEventId)
        .update(data)
        .then(async () => {
          analytics().logEvent(`${IOscreen}_${joinEvent}`, {
            hostUid: event?.uid,
            guestUid: userInfo?.uid,
          });
          if ((guestData.notificationSettings?.match || guestData.notificationSettings?.superJoin) && !isDemo) {
            await sendNotification(
              event.uid,
              'New join request',
              `${userInfo.name} wants to join you!`,
              'invite',
              'Join Request'.toUpperCase(),
              userInfo,
              JSON.stringify({path: 'requests'}),
            );
          }
        });
    } catch (error) {}
  };
  return useMutation({
    mutationKey: ['userRequestEvent'],
    mutationFn: userRequest,
  });
};

export const EventMutations = {
  useUpdateEvent,
  useCreateEvent,
  useUpdateWeeklySuperInvites,
  useRejectEvent,
  useFetchEventInfo,
  useInviteUser,
  useRequestUser,
};
