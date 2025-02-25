import { useEffect, useState } from "react";
import Config from "react-native-config";
import { useUser } from "src/store/userStore";
import firestore from '@react-native-firebase/firestore';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

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

  const user = useUser((i: any) => i?.user);
  const setUser = useUser((i: any) => i?.setUser);
  const uid = user?.uid;

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

      try {
        await firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .update({
          notificationSettings: {
            chat: true,
            joinedEvent: true,
            match: true,
            myEvents: true,
            requests: true,
            superInvite: true,
            superJoin: true,
          },
        })
        .then(async () => {
          await firestore()
            .collection(apiUserInfoCollection)
            .doc(uid)
            .get()
            .then(res => {
              setUser(res.data());
            });
        });
      } catch (error) {
        logErrorToSentry(error);
      }
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

    await firestore()
      .collection(apiUserInfoCollection)
      .doc(uid)
      .update({
        notificationSettings: {
          chat: false,
          joinedEvent: false,
          match: false,
          myEvents: false,
          requests: false,
          superInvite: false,
          superJoin: false,
        },
      })
      .then(async () => {
        await firestore()
          .collection(apiUserInfoCollection)
          .doc(uid)
          .get()
          .then(res => {
            setUser(res.data());
          });
      });
  };

  const handleChangeStatus = async () => {
    try {
      await firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .update({
          notificationSettings: {
            chat: chat,
            joinedEvent: joinedEvent,
            match: match,
            myEvents: myEvents,
            requests: requests,
            superInvite: superInvite,
            superJoin: superJoin,
          },
        })
        .then(async () => {
          await firestore()
            .collection(apiUserInfoCollection)
            .doc(uid)
            .get()
            .then(res => {
              setUser(res.data());
            });
        });
    } catch (e) {
      // console.log(e);
    }
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
    setIsVisibleTurnOffNotificationsModal
  }
}