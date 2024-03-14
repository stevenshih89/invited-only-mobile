import {Switch} from '@rneui/themed';
import {grayColor, lightGray5Color, lightGray6Color, toggleColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ModalTurnOffNotifications from './ModalTurnOffNotifications';

const NotificationSetting = () => {
  const [allNotification, setAllNotification] = useState(false);
  const [joinedEvent, setJoinedEvent] = useState(false);
  const [myEvents, setMyEvents] = useState(false);
  const [requests, setRequests] = useState(false);
  const [chat, setChat] = useState(false);
  const [superInvite, setSuperInvite] = useState(false);
  const [superJoin, setSuperJoin] = useState(false);
  const [match, setMatch] = useState(false);
  const [isVisibleTurnOffNotificationsModal, setIsVisibleTurnOffNotificationsModal] = useState(false);

  const handleChangeAllNotification = (val: boolean) => {
    if (val) {
      setJoinedEvent(val);
      setAllNotification(val);
      setMyEvents(val);
      setRequests(val);
      setChat(val);
      setSuperInvite(val);
      setSuperJoin(val);
      setMatch(val);
    } else {
      setIsVisibleTurnOffNotificationsModal(true);
    }
  };

  const handleConfirmTurnOffNotifications = () => {
    setAllNotification(false);
    setJoinedEvent(false);
    setMyEvents(false);
    setRequests(false);
    setChat(false);
    setSuperInvite(false);
    setSuperJoin(false);
    setMatch(false);
    setIsVisibleTurnOffNotificationsModal(false);
  };

  useEffect(() => {
    const list = [joinedEvent, myEvents, requests, chat, superInvite, superJoin, match];
    if (list.every(item => item)) {
      setAllNotification(true);
    } else if (list.some(item => !item) || list.every(item => !item)) {
      setAllNotification(false);
    }
  }, [allNotification, joinedEvent, myEvents, requests, chat, superInvite, superJoin, match]);

  return (
    <>
      <View style={{flex: 1, backgroundColor: lightGray6Color, paddingHorizontal: 20}}>
        <SafeAreaView style={{borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <View style={{backgroundColor: lightGray5Color, borderRadius: 10, padding: 20, marginTop: 34}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 26}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>All notifications</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={allNotification} onValueChange={handleChangeAllNotification} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Joined event</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={joinedEvent} onValueChange={setJoinedEvent} />
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
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Super join</Text>
              <Switch trackColor={{false: grayColor, true: toggleColor}} value={superJoin} onValueChange={setSuperJoin} />
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
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Match</Text>
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
