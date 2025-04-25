import React, { FC } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import { blackColor, whiteColor } from 'constants/colors';
import CloseIcon from 'assets/images/icons/close.svg';
import { screenHeight } from 'constants/common';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { EventData } from 'src/types/event';
import Button from 'components/Button/Button';
import useUser from 'hooks/user/useUser';

interface RejectAccount {
  isVisible?: boolean;
  setIsVisible?: any;
  eventInfo: EventData;
  goToMarkAttendance: () => void;
  handleMarkAttendance: (isPresent: boolean) => void;
}

const ModalEventMarkAttendance: FC<RejectAccount> = ({ isVisible, setIsVisible, eventInfo, goToMarkAttendance, handleMarkAttendance }) => {
  const { user } = useUser();

  const isHost = user?.accountType === 'host';
  const handleClose = () => {
    setIsVisible(false);
  };

  const email = 'support@invitedonly.app';

  const handleOpenEmail = () => {
    Clipboard.setString(email);
    Linking.openURL(`mailto:${email}`);
  };

  const handleConfirm = () => {
    isHost ? goToMarkAttendance() : handleMarkAttendance(true);
  };

  const handleReject = () => {
    isHost ? handleClose() : handleMarkAttendance(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropOpacity={0.95}
      backdropColor={blackColor}
      animationInTiming={1}
      animationOutTiming={1}
      onBackdropPress={handleClose}
      style={{
        margin: 0,
        zIndex: 999,
      }}>
      <View
        style={{
          backgroundColor: '#111111',
          borderRadius: 16,
          padding: 16,
          marginHorizontal: 16,
        }}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={handleClose}>
            <CloseIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 16, position: 'relative' }}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.00)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16, zIndex: 1 }}
          />
          <FastImage source={{ uri: eventInfo?.photos[0]?.image }} style={{ width: '100%', height: 200, borderRadius: 16 }} />
          <View style={{ position: 'absolute', bottom: 10, left: 10, right: 0, zIndex: 10 }}>
            <Text style={{ color: whiteColor, fontSize: RFValue(16, 932), fontFamily: Satoshi500 }}>
              {eventInfo?.name || eventInfo?.placeName}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ color: whiteColor, fontSize: RFValue(32, 932), fontFamily: Satoshi500 }}>Event Wrap-Up!</Text>
          <Text style={{ color: whiteColor, fontSize: RFValue(16, 932), fontFamily: Satoshi400, marginTop: 16 }}>
            {isHost
              ? 'Your event has ended. Please fill in the list by marking who attended the event and who was unable to join.'
              : "The event has ended. Please confirm your attendance or let us know if you couldn't join."}
          </Text>
          {!isHost && (
            <Text
              style={{
                color: whiteColor,
                fontSize: RFValue(16, 932),
                fontFamily: Satoshi400,
              }}>
              For assistance, contact{' '}
              <Text
                style={{ color: whiteColor, fontSize: RFValue(16, 932), fontFamily: Satoshi400, textDecorationLine: 'underline' }}
                onPress={handleOpenEmail}>
                support@invitedonly.app.
              </Text>
            </Text>
          )}
        </View>
        <View style={{ marginTop: screenHeight / 24 }}>
          <Button title={isHost ? 'Mark Attendance' : 'Confirm Attendance'} onPress={handleConfirm} />
          <Button title={isHost ? 'Fill Later' : 'Mark as Absent'} variant="transparent" onPress={handleReject} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEventMarkAttendance;
