import {Switch} from '@rneui/themed';
import {blackColor, grayColor, lightGray5Color, toggleColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {FC} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ModalTurnOffNotifications from './ModalTurnOffNotifications';
import { useNotificationSetting } from 'hooks/useNotificationSetting';

const NotificationSetting: FC = ({navigation, route}: any) => {

  const {
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
  } = useNotificationSetting(route)

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
