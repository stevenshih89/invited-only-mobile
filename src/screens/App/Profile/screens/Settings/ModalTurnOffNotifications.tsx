import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, transparentGray60Color, whiteColor} from 'constants/colors';
import NotificationOff from 'assets/images/icons/notification-off.svg';
import type {FC} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

const ModalTurnOffNotifications: FC<{isVisible: boolean; onConfirm: () => void; onClose: () => void}> = ({isVisible, onConfirm, onClose}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View
        style={{
          backgroundColor: blackColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 40,
          paddingTop: 16,
          paddingHorizontal: 30,
        }}>
        <View style={{backgroundColor: whiteColor, height: 2, borderRadius: 10, width: 40, alignSelf: 'center', marginBottom: 22}} />
        <View
          style={{
            borderRadius: 100,
            width: 84,
            height: 84,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: transparentGray60Color,
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <NotificationOff width={30} height={30} />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 812), marginBottom: 10, textAlign: 'center'}}>
          Are you sure you want turn off all notifications
        </Text>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), marginBottom: 40, textAlign: 'center'}}>
          You will not receive any notifications
        </Text>
        <Button title="Yes, turn off" onPress={onConfirm} />
        <Button title="Cancel" variant="transparent" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ModalTurnOffNotifications;
