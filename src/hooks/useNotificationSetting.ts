import {useEffect, useState} from 'react';

import {UserMutations} from '../apiv2/mutations/userMutations.ts';

export const useNotificationSetting = (route: any) => {
  const notificationSettings = route?.params?.params?.notificationSettings;

  const [allNotification, setAllNotification] = useState(false);
  const [joinedEvent, setJoinedEvent] = useState(notificationSettings?.joinedEvent);
  const [myEvents, setMyEvents] = useState(notificationSettings?.myEvents);
  const [requests, setRequests] = useState(notificationSettings?.requests);
  const [chat, setChat] = useState(notificationSettings?.chat);
  const [superInvite, setSuperInvite] = useState(notificationSettings?.superInvite);
  const [superJoin, setSuperJoin] = useState(notificationSettings?.superJoin);
  const [match, setMatch] = useState(notificationSettings?.match);
  const [isVisibleTurnOffNotificationsModal, setIsVisibleTurnOffNotificationsModal] = useState(false);
  const {mutate: updateNotificationsSettingsMutation} = UserMutations.useUserUpdateNotificationsSettings();

  const handleChangeAllNotification = async (val: boolean) => {
    if (val) {
      setJoinedEvent(val);
      setAllNotification(val);
      setMyEvents(val);
      setRequests(val);
      setChat(val);
      setSuperInvite(val);
      setSuperJoin(val);
      setMatch(val);

      updateNotificationsSettingsMutation(true);
    } else {
      setIsVisibleTurnOffNotificationsModal(true);
    }
  };

  const handleConfirmTurnOffNotifications = async () => {
    setAllNotification(false);
    setJoinedEvent(false);
    setMyEvents(false);
    setRequests(false);
    setChat(false);
    setSuperInvite(false);
    setSuperJoin(false);
    setMatch(false);
    setIsVisibleTurnOffNotificationsModal(false);

    updateNotificationsSettingsMutation(false);
  };

  const handleChangeStatus = async () => {
    updateNotificationsSettingsMutation({
      chat: chat,
      joinedEvent: joinedEvent,
      match: match,
      myEvents: myEvents,
      requests: requests,
      superInvite: superInvite,
      superJoin: superJoin,
    });
  };

  useEffect(() => {
    const list = [joinedEvent, myEvents, requests, chat, superInvite, superJoin, match];
    if (list.every(item => item)) {
      setAllNotification(true);
      handleChangeStatus();
    } else if (list.some(item => !item) || list.every(item => !item)) {
      setAllNotification(false);
      handleChangeStatus();
    }
  }, [allNotification, joinedEvent, myEvents, requests, chat, superInvite, superJoin, match]);

  return {
    allNotification,
    handleChangeAllNotification,
    myEvents,
    setMyEvents,
    requests,
    setRequests,
    chat,
    setChat,
    superInvite,
    setSuperInvite,
    match,
    setMatch,
    isVisibleTurnOffNotificationsModal,
    handleConfirmTurnOffNotifications,
    setIsVisibleTurnOffNotificationsModal,
  };
};
