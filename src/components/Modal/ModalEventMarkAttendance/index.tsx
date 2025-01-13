import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, whiteColor} from 'constants/colors';
import CloseIcon from 'assets/images/icons/close.svg';
import FastImage from 'react-native-fast-image';
import {screenHeight} from 'constants/common';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {EventData} from 'src/types/event';
import Button from 'components/Button/Button';

interface RejectAccount {
  isVisible?: boolean;
  setIsVisible?: any;
  eventInfo: EventData;
}

const ModalEventMarkAttendance: FC<RejectAccount> = ({isVisible, setIsVisible, eventInfo}) => {
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropOpacity={0.95}
      backdropColor={blackColor}
      animationInTiming={1}
      animationOutTiming={1}
      onBackdropPress={() => setIsVisible(false)}
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
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <CloseIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 16, position: 'relative'}}>
          <FastImage source={{uri: eventInfo?.photos[0]?.image}} style={{width: '100%', height: 200, borderRadius: 16}} />
          <View style={{position: 'absolute', bottom: 10, left: 10, right: 0, zIndex: 10}}>
            <Text style={{color: whiteColor, fontSize: RFValue(16, 932), fontFamily: Satoshi500}}>
              {eventInfo?.name || eventInfo?.placeName}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 24}}>
          <Text style={{color: whiteColor, fontSize: RFValue(32, 932), fontFamily: Satoshi500}}>Event Warn-Up!</Text>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 932), fontFamily: Satoshi400, marginTop: 16}}>
            Your event has ended. Please fill in the list by marking who attended the event and who was unable to join.
          </Text>
        </View>
        <View style={{marginTop: screenHeight / 24}}>
          <Button title="Mark Attendance" onPress={() => {}} />
          <Button title="Fill Later" variant="transparent" onPress={() => {}} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEventMarkAttendance;
