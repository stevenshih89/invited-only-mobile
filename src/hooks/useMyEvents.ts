import {cancelAnimation, Easing, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useCreateEvent} from './useCreateEvent';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {Event, EventData} from 'src/types/event';
import {sendNotification} from 'helpers/fcmHelper';
import {commonStackPath, IOPath, markAttendancePath} from 'constants/pathLocations';
import {ACCEPTED_STATUS, APPROVED_STATUS, CANCEL_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS} from 'constants/common.ts';
import {useAdminActions} from 'src/store/adminActions';
import {useUser} from 'src/store/userStore';
import {showToast} from 'helpers/showToast.ts';
import {useMyEvents} from 'src/store/myEvents';

const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
const MY_EVENTS = 'my_events';

export const useMyEventsScreen = (navigation: any) => {
  const [isVisibleCancelAttendingModal, setIsVisibleCancelAttendingModal] = useState<boolean>(false);
  const [isVisibleAcceptInvitationModal, setIsVisibleAcceptInvitationModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(MY_EVENTS);
  const [visibleModalEventRemindes, setVisibleModalEventRemindes] = useState(false);
  const [isVisibleMarkAttendance, setIsVisibleMarkAttendance] = useState(false);
  const [eventDataMarkAttendance, setEventDataMarkAttendance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const countMyEvent = useRef(0);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);
  const changeAccountTypeModalVisible = useAdminActions((i: any) => i?.changeAccountTypeModalVisible);
  const setChangeAccountModalVisible = useAdminActions((i: any) => i?.setChangeAccountModalVisible);

  const goToCreateEvent = useCreateEvent();

  const [activeModalEvent, setActiveModalEvent] = useState<any>({
    id: 0,
    image: '',
    textCityName: '',
    date: '',
    numberOfGirlsInvited: 0,
    host: {
      name: '',
      image: '',
    },
  });
  const [activeUserInfo, setActiveUserInfo] = useState<any>({});

  const [myEventsData, setMyEventsData] = useState<EventData[]>([]);
  const [eventsJoiningData, setEventsJoiningData] = useState<EventData[]>([]);
  const [hoursUntilEvent, setHoursUntilEvent] = useState<number>();
  const [currentEvent, setCurrentEvent] = useState();
  const {user: userInfo, setUser: setUserInfo} = useUser();
  const setEventsImJoining = useMyEvents((i: any) => i?.setEventsImJoining);
  const isHost = userInfo?.accountType === 'host';

  const [hostInfo, setHostInfo] = useState<any>({});

  const rotationLoader = useSharedValue(0);

  useEffect(() => {
    if (loadingEvents) {
      rotationLoader.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
    }

    return () => {
      cancelAnimation(rotationLoader);
    };
  }, [rotationLoader, loadingEvents]);

  const calculateHoursUntilEvent = (eventDate, eventTime) => {
    const now = new Date();

    const [day, month, year] = eventDate.split('.');
    const [hours, minutes] = eventTime.split(':');

    const eventDateTime = new Date(year, month - 1, day, hours, minutes);

    const diffInMilliseconds = eventDateTime - now;

    if (diffInMilliseconds < 0) {
      return 0;
    }

    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    return Math.floor(diffInHours);
  };

  interface usersListI {
    status: string;
  }

  const getUsersListAccepted = (usersList: usersListI[]) => {
    const filter = usersList?.filter(item => item.status === ACCEPTED_STATUS);
    return filter;
  };

  const sendNotificationAcceptedUser = async (item, hourToEvent: number) => {
    const usersAccepted = getUsersListAccepted(item.usersList);
    // DEVNOTE: userInfo
    for (const user of usersAccepted) {
      try {
        await sendNotification(
          user.uid,
          'Event starting',
          `${item.name} event starting in ${hourToEvent}h!`,
          'Event Reminders',
          'Event',
          user,
        );
        changeStatusReminders(item);
      } catch (error) {
        console.error('error sendNotificationAcceptedUser', error);
      }
    }
  };

  const changeStatusReminders = async item => {
    try {
      await firestore().collection('Events').doc(item.id).update({
        isReminders: true,
      });
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  const checkTimeEvent = item => {
    if (item) {
      const res = calculateHoursUntilEvent(item.date, item.hour);
      if (res > 0 && res < 25) {
        setHoursUntilEvent(res);
        setCurrentEvent(item);
        setVisibleModalEventRemindes(true);
      }
      if (res > 0 && res < 25 && isHost && !item.isReminders) {
        sendNotificationAcceptedUser(item, res);
      }
    }
  };

  useEffect(() => {
    if (myEventsData && myEventsData.length > countMyEvent.current && isHost) {
      checkTimeEvent(myEventsData[countMyEvent.current]);
    }
  }, [myEventsData, countMyEvent.current]);

  useEffect(() => {
    if (eventsJoiningData && eventsJoiningData.length > countMyEvent.current && !isHost) {
      checkTimeEvent(eventsJoiningData[countMyEvent.current]);
    }
  }, [eventsJoiningData, countMyEvent.current]);

  const updateGuestAttending = async (updatedUser: any) => {
    try {
      const eventDoc = await firestore().collection('Events').doc(currentEvent.id).get();
      const data = eventDoc.data();
      if (!data) {
        return;
      }
      const filteredGuests = data.usersList.filter((item: any) => item.uid !== userInfo.uid);
      await firestore()
        .collection('Events')
        .doc(currentEvent.id)
        .update({
          usersList: [...filteredGuests, updatedUser],
        });
    } catch (error) {
      logErrorToSentry(error);
      console.error('error updating guest:', error);
    }
  };

  const getGuestAttending = () => {
    if (!currentEvent?.usersList) {
      return;
    }
    let hourToEvent: number;
    if (hoursUntilEvent > 12 && hoursUntilEvent <= 24) {
      hourToEvent = 24;
    } else if (hoursUntilEvent > 2 && hoursUntilEvent <= 12) {
      hourToEvent = 12;
    } else if (hoursUntilEvent > 0 && hoursUntilEvent <= 2) {
      hourToEvent = 2;
    } else {
      return;
    }
    const currentUserGuest = currentEvent.usersList.find((item: any) => item.uid === userInfo.uid);
    if (!currentUserGuest) {
      return;
    }
    const updatedUserGuest = {
      ...currentUserGuest,
      attending: currentUserGuest.attending ? Array.from(new Set([...currentUserGuest.attending, hourToEvent])) : [hourToEvent],
    };
    updateGuestAttending(updatedUserGuest);
  };

  const incrementCount = async () => {
    getGuestAttending();
    countMyEvent.current += 1;
  };

  useFocusEffect(
    useCallback(() => {
      try {
        analytics().logScreenView({
          screen_name: 'my_events_screen',
        });
      } catch (e) {
        console.error(e);
      }
    }, []),
  );

  const fetchHostInfo = async (hostUid: string) => {
    try {
      const hostDoc = await firestore().collection(apiUserInfoCollection).doc(hostUid).get();
      if (hostDoc.exists) {
        setHostInfo(hostDoc.data());
      }
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  useEffect(() => {
    if (activeModalEvent?.host?.hostUid) {
      fetchHostInfo(activeModalEvent.host.hostUid);
    }
  }, [activeModalEvent]);

  const goToMarkAttendance = (eventId: string) => {
    navigation.navigate(commonStackPath, {screen: markAttendancePath, params: {eventId}} as never);
    setIsVisibleMarkAttendance(false);
  };

  const handleMarkAttendance = async (isPresentMarkedByGuest: boolean) => {
    try {
      const eventQuerySnapshot = await firestore().collection(apiEventsCollection).doc(eventDataMarkAttendance?.id).get();
      const eventDataList = eventQuerySnapshot.data();
      const updatedUsersList = eventDataList?.usersList?.map((userItem: Event.User) => {
        if (userItem.uid === userInfo?.uid) {
          return {...userItem, isPresentMarkedByGuest};
        }
        return userItem;
      });
      await firestore().collection(apiEventsCollection).doc(eventDataMarkAttendance?.id).update({
        usersList: updatedUsersList,
      });
      setIsVisibleMarkAttendance(false);
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  const handleCheckEventMarkAttendanceGuest = () => {
    if (eventsJoiningData.length && !isHost) {
      for (const event of eventsJoiningData) {
        const eventDate = moment(`${event.date} ${event.hour}`, 'DD.MM.YYYY HH:mm').add(12, 'hours');
        const currentDate = moment();
        const currentUserFromList = event?.usersList?.find(userItem => userItem.uid === userInfo?.uid);
        if (
          !event.isCancelled &&
          currentUserFromList &&
          (currentUserFromList?.status === ACCEPTED_STATUS ||
            currentUserFromList?.status === INVITE_MATCH_STATUS ||
            currentUserFromList?.status === APPROVED_STATUS) &&
          !('isPresentMarkedByGuest' in currentUserFromList) &&
          currentDate.isAfter(eventDate)
        ) {
          setIsVisibleMarkAttendance(true);
          setEventDataMarkAttendance(event);
        }
      }
    }
  };

  useEffect(() => {
    handleCheckEventMarkAttendanceGuest();
  }, [eventsJoiningData.length]);

  const handleCheckEventMarkAttendanceHost = () => {
    if (myEventsData.length && isHost) {
      for (const event of myEventsData) {
        const eventDate = moment(`${event.date} ${event.hour}`, 'DD.MM.YYYY HH:mm').add(12, 'hours');
        const currentDate = moment();
        const usersInvited = event?.usersList?.filter(
          // DEVNOTE: userInfo
          user => user.status === INVITE_MATCH_STATUS || user.status === ACCEPTED_STATUS || user.status === APPROVED_STATUS,
        );
        if (!event.isCancelled && currentDate.isAfter(eventDate) && !event?.isMarkedAttendance && usersInvited.length) {
          setIsVisibleMarkAttendance(true);
          setEventDataMarkAttendance(event);
          break;
        }
      }
    }
  };

  useEffect(() => {
    handleCheckEventMarkAttendanceHost();
  }, [myEventsData.length]);

  const goToIOStack = () => {
    navigation.navigate(IOPath);
  };

  const handleAcceptInvitation = async () => {
    let list = activeModalEvent?.list;
    const eventQuerySnapshot = await firestore().collection(apiEventsCollection).doc(list?.id).get();
    const eventDataList = eventQuerySnapshot.data();
    if (!eventDataList?.usersList.length) {
      return;
    }

    try {
      const updatedUsersList = eventDataList?.usersList?.map(userItem => {
        if (userItem.uid === userInfo?.uid) {
          return {
            // @ts-ignore
            ...userItem,
            status: ACCEPTED_STATUS,
          };
        }
        return userItem;
      });
      await firestore().collection(apiEventsCollection).doc(list?.id).update({
        usersList: updatedUsersList,
      });
      showToast('inviteMatch', `See you at ${eventDataList?.date}`, 'You joined to this event!', {
        ownerPhoto: eventDataList?.hostImage,
        status: 'Joined'.toUpperCase(),
      });
      const getDoc = await firestore().collection(apiUserInfoCollection).doc(eventDataList?.uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings.myEvents) {
        await sendNotification(
          eventDataList?.uid,
          `${userInfo?.name} accepted your invitation`,
          'Invitation Accepted!',
          'Accepted',
          'Accepted'.toUpperCase(),
          userInfo,
        );
      }
      setIsVisibleAcceptInvitationModal(false);
    } catch (e) {
      logErrorToSentry(e);
      // console.log(e);
    }
  };

  const handleRejectInvitation = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = userInfo?.uid;
      changeStatus(list?.usersList, uid, NOT_ACCEPTED_STATUS);
      await firestore().collection(apiEventsCollection).doc(list?.id).update({
        usersList: list?.usersList,
      });
      analytics().logEvent('event_rejected_invitation', {
        eventId: list?.id,
      });
      setIsVisibleAcceptInvitationModal(false);
      const getDoc = await firestore().collection(apiUserInfoCollection).doc(list?.uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings?.myEvents) {
        await sendNotification(
          list?.uid,
          `${userInfo?.name} rejected your invitation`,
          'Not now.',
          'Rejected',
          'Rejected'.toUpperCase(),
          userInfo,
        );
      }
      showToast('inviteMatch', `You rejected ${list?.placeName} event`, 'Not now', {
        ownerPhoto: list?.hostImage,
        status: 'REJECTED'.toUpperCase(),
      });
    } catch (e) {
      showToast('inviteMatch', 'Failed to decline the invitation. Please try again later.', 'Error');
      logErrorToSentry(e);
      // console.log(e);
    }
  };

  const changeStatus = (usersList: any, uid: string, status: string): void => {
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].uid === uid) {
        usersList[i].status = status;
        break;
      }
    }
  };

  const handleCancelAttending = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = userInfo?.uid;

      changeStatus(list?.usersList, uid, NOT_ACCEPTED_STATUS);

      await firestore().collection(apiEventsCollection).doc(list?.id).update({
        usersList: list?.usersList,
      });
      analytics().logEvent('event_cancelled_attending', {
        eventId: list?.id,
      });
      setIsVisibleCancelAttendingModal(false);
      const getDoc = await firestore().collection(apiUserInfoCollection).doc(list?.uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings.myEvents) {
        await sendNotification(
          list?.uid,
          `${userInfo?.name} rejected your invitation`,
          'Not now.',
          'Rejected',
          'Rejected'.toUpperCase(),
          userInfo,
        );
      }
      showToast('inviteMatch', `You rejected ${list?.placeName} event`, 'Not now', {
        ownerPhoto: list?.hostImage,
        status: 'REJECTED'.toUpperCase(),
      });
    } catch (e) {
      showToast('inviteMatch', 'Failed to cancel the invitation. Please try again later.', 'Error');
      logErrorToSentry(e);
      // console.log(e);
    }
  };

  const handleGetEventsIJoining = async events => {
    try {
      if (!events) {
        setEventsJoiningData([]);
        setEventsImJoining([]);
        return;
      }
      const uid = userInfo?.uid;
      const data = events?.docs?.map(i => i?.data());

      const filterData = data?.filter(obj => {
        // DEVNOTE: userInfo
        return obj?.usersList?.some(user => {
          return (
            user?.uid === uid &&
            (user?.status === INVITE_MATCH_STATUS || user?.status === ACCEPTED_STATUS || user?.status === APPROVED_STATUS)
          );
        });
      });
      setEventsJoiningData(filterData);
      setEventsImJoining(filterData);
      setLoadingEvents(false);
    } catch (e) {
      // console.log('error events im joining', e);
      // showToast('cancel', 'Error!');
    }
  };

  const changeStatusGuestUsersList = async (
    status: string,
    id: string,
    uidHost: string,
    placeName: string,
    date: string,
    hostPhoto: string,
    item: any,
  ) => {
    console.log('changeStatusGuestUsersList');

    const eventQuerySnapshot = await firestore().collection(apiEventsCollection).doc(id).get();
    const eventDataList = eventQuerySnapshot.data();
    if (!eventDataList?.usersList.length) {
      return;
    }

    try {
      const updatedUsersList = eventDataList?.usersList?.map(userItem => {
        if (userItem.uid === userInfo?.uid) {
          return {
            ...userItem,
            status,
          };
        }
        return userItem;
      });
      await firestore().collection(apiEventsCollection).doc(id).update({
        usersList: updatedUsersList,
      });
      switch (status) {
        case ACCEPTED_STATUS:
          showToast('inviteMatch', `See you at ${date}`, 'You accept to this event!', {
            ownerPhoto: hostPhoto,
            status: 'Accept'.toUpperCase(),
          });
          await sendNotification(
            uidHost,
            `${userInfo?.name} accepted your invitation`,
            'Invitation Accepted!',
            'Accepted',
            'Accepted'.toUpperCase(),
            userInfo,
            JSON.stringify({path: 'guestsList', data: item}),
          );
          break;
        case NOT_ACCEPTED_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
          await sendNotification(
            uidHost,
            `${userInfo?.name} rejected your invitation`,
            'Not now.',
            'Rejected',
            'Rejected'.toUpperCase(),
            userInfo,
          );
          break;
        case CANCEL_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
          await sendNotification(
            uidHost,
            `${userInfo?.name} rejected your invitation`,
            'Not now.',
            'Rejected',
            'Rejected'.toUpperCase(),
            userInfo,
          );
        default:
          break;
      }
    } catch (e) {
      logErrorToSentry(e);
      console.log('error update status guest', e);
    }
  };

  return {
    userInfo,
    changeStatusGuestUsersList,
    loadingEvents,
    acceptModalVisible,
    rejectModalVisible,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    isHost,
    activeTab,
    MY_EVENTS,
    setActiveTab,
    goToCreateEvent,
    myEventsData,
    eventsJoiningData,
    goToIOStack,
    handleCancelAttending,
    isVisibleCancelAttendingModal,
    setIsVisibleCancelAttendingModal,
    activeModalEvent,
    activeUserInfo,
    hostInfo,
    handleRejectInvitation,
    handleAcceptInvitation,
    isVisibleAcceptInvitationModal,
    loading,
    hoursUntilEvent,
    currentEvent,
    visibleModalEventRemindes,
    setVisibleModalEventRemindes,
    countMyEvent,
    isVisibleMarkAttendance,
    eventDataMarkAttendance,
    setIsVisibleMarkAttendance,
    goToMarkAttendance,
    handleMarkAttendance,
    incrementCount,
  };
};
