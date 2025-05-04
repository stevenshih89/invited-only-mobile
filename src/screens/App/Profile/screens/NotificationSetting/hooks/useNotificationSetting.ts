import { useEffect, useState } from 'react';


import useMessaging from '../../../../../../hooks/useMessaging.ts';
import invitedOnlyBackendApi from 'src/api/backend-api.ts';
import { useAuthStore } from 'src/store/authStore';
import useUser from 'hooks/user/useUser.ts';

export const useNotificationSetting = () => {
  const { user } = useUser();

  const intialAllNotification: boolean = Object.values(user?.notificationSettings || {}).every(value => value === true);


  const [allNotification, setAllNotification] = useState(intialAllNotification);
  const [joinedEvent, setJoinedEvent] = useState(user?.notificationSettings?.joinedEvent);
  const [myEvents, setMyEvents] = useState(user?.notificationSettings?.myEvents);
  const [requests, setRequests] = useState(user?.notificationSettings?.requests);
  const [chat, setChat] = useState(user?.notificationSettings?.chat);
  const [superInvite, setSuperInvite] = useState(user?.notificationSettings?.superInvite);
  const [superJoin, setSuperJoin] = useState(user?.notificationSettings?.superJoin);
  const [match, setMatch] = useState(user?.notificationSettings?.connection);
  const [isVisibleTurnOffNotificationsModal, setIsVisibleTurnOffNotificationsModal] = useState(false);
  const { mutate: updateNotificationsSettingsMutation } = invitedOnlyBackendApi.useMutation('post', '/notifications/configuration');
  const { setupNotifications } = useMessaging();


  const handleChangeAllNotification = async (val: boolean) => {
    if (val) {
      setupNotifications();
      setJoinedEvent(val);
      setAllNotification(val);
      setMyEvents(val);
      setRequests(val);
      setChat(val);
      setSuperInvite(val);
      setSuperJoin(val);
      setMatch(val);
      updateNotificationsSettingsMutation({
        body: {
          userId: useAuthStore.getState().userMetadata.uid,
          notificationSettings: {
            chat: val,
            connection: val,
            joinedEvent: val,
            myEvents: val,
            requests: val,
            superInvite: val,
            superJoin: val,
          },
        },
      });
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

    updateNotificationsSettingsMutation({
      body: {
        userId: useAuthStore.getState().userMetadata.uid,
        notificationSettings: {
          chat: false,
          connection: false,
          joinedEvent: false,
          myEvents: false,
          requests: false,
          superInvite: false,
          superJoin: false,
        },
      },
    });
  };

  const handleChangeStatus = async () => {
    updateNotificationsSettingsMutation({
      body: {
        userId: useAuthStore.getState().userMetadata.uid,
        notificationSettings: {
          chat: chat,
          connection: match,
          joinedEvent: joinedEvent,
          myEvents: myEvents,
          requests: requests,
          superInvite: superInvite,
          superJoin: superJoin,
        },
      },
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
