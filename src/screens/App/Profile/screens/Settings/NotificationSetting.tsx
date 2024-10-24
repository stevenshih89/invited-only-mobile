import {Switch} from '@rneui/themed';
import {blackColor, grayColor, lightGray5Color, lightGray6Color, toggleColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {FC, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ModalTurnOffNotifications from './ModalTurnOffNotifications';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../../../../store/userStore';

const NotificationSetting: FC = ({navigation, route}: any) => {
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

      await firestore()
        .collection('userInfo')
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
            .collection('userInfo')
            .doc(uid)
            .get()
            .then(res => {
              setUser(res.data());
            });
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

    await firestore()
      .collection('userInfo')
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
          .collection('userInfo')
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
        .collection('userInfo')
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
            .collection('userInfo')
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

  return (
    <>
      <View style={{flex: 1, backgroundColor: blackColor, paddingHorizontal: 20}}>
        <SafeAreaView style={{borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              backgroundColor: lightGray5Color,
              borderRadius: 10,
              marginVertical: 34,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 26,
            }}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>All notifications</Text>
            <Switch
              trackColor={{false: grayColor, true: toggleColor}}
              value={allNotification}
              onValueChange={handleChangeAllNotification}
            />
          </View>
          <View style={{backgroundColor: lightGray5Color, borderRadius: 10, padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>My events</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={myEvents} onValueChange={setMyEvents} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopColor: transparentWhite16Color,
                borderTopWidth: 1,
                paddingTop: 14,
                marginBottom: 14,
              }}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Requests</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={requests} onValueChange={setRequests} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopColor: transparentWhite16Color,
                borderTopWidth: 1,
                paddingTop: 14,
                marginBottom: 14,
              }}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Chat</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={chat} onValueChange={setChat} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopColor: transparentWhite16Color,
                borderTopWidth: 1,
                paddingTop: 14,
                marginBottom: 14,
              }}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Super invite</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={superInvite} onValueChange={setSuperInvite} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopColor: transparentWhite16Color,
                borderTopWidth: 1,
                paddingTop: 14,
                marginBottom: 14,
              }}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>New Connection</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={match} onValueChange={setMatch} />
            </View>
          </View>
        </SafeAreaView>
      </View>
      <ModalTurnOffNotifications
        isVisible={isVisibleTurnOffNotificationsModal}
        onConfirm={handleConfirmTurnOffNotifications}
        onClose={() => setIsVisibleTurnOffNotificationsModal(false)}
      />
    </>
  );
};

export default NotificationSetting;
