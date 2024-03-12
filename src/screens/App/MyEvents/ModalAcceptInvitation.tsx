import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, whiteColor} from 'constants/colors';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import ProfileTwoUser from 'assets/images/icons/profile-2user.svg';
import {FC} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Image} from 'react-native';
import {screenHeight} from 'constants/common';

const ModalAcceptInvitation: FC<{
  isVisible: boolean;
  onClose: () => void;
  handleAcceptInvitation: () => void;
  handleRejectInvitation: () => void;
  eventInfo: {host: any; id: number; image: string; textCityName: string; numberOfGirlsInvited: number; date: string};
}> = ({isVisible, onClose, eventInfo, handleAcceptInvitation, handleRejectInvitation}) => {
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
        <Image style={{width: '100%', height: screenHeight / 5, borderRadius: 12}} source={{uri: eventInfo.image}} />
        <View
          style={{
            flexWrap: 'wrap',
            marginTop: screenHeight / 85,
            marginBottom: screenHeight / 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(15, 812)}}>{eventInfo.textCityName}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ProfileTwoUser />
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(13, 812), marginLeft: 6}}>
              {eventInfo.numberOfGirlsInvited} x Girl invitation
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CalendarBlank />
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(13, 812), marginLeft: 6}}>{eventInfo.date}</Text>
          </View>
        </View>
        <Text
          style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 812), marginBottom: screenHeight / 18, textAlign: 'center'}}
          onPress={() => handleAcceptInvitation()}>
          {`${eventInfo?.host.name} has approved your invitation! Confirm?`}
        </Text>
        <Button title="Yes, confirm invitation" onPress={handleAcceptInvitation} />
        <Button title="No, reject invitation" variant="transparent" onPress={handleRejectInvitation} />
      </View>
    </Modal>
  );
};

export default ModalAcceptInvitation;
