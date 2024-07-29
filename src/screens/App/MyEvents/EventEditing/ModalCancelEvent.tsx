import {ImageBackground, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import TrashRed from 'assets/images/icons/trash-red.svg';
import {FC} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import auth from '@react-native-firebase/auth'

const ModalCancelEvent: FC<{isVisible: boolean; onClose: () => void; image: any; id?: string | undefined}> = ({
  id,
  isVisible,
  onClose,
  image,
}) => {
  const navigation = useAppNavigation();
  const handleCancelEvent = async () => {
    const uidUser = auth().currentUser?.uid    
    try {
      await firestore().collection('Events').doc(id).delete();
      const userInfo = await firestore().collection('userInfo').doc(uidUser).get()
      const eventList = userInfo?.data()?.eventsList
      const filterEvents = eventList.filter((item: string) => item != id)
      await firestore().collection('userInfo').doc(uidUser).update({
        eventList: filterEvents
      });
      
      showToast('success', '', 'Event successfully deleted!');
      onClose();
      navigation?.goBack();
    } catch (e) {
      showToast('cancel', '', 'Error!');
      console.log('error handleCancelEvent', e);
    }
  };

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
        <ImageBackground
          source={{uri: image}}
          style={{width: 84, height: 84, alignSelf: 'center', marginBottom: 10}}
          imageStyle={{borderRadius: 160}}
          resizeMode="cover">
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: transparentWhite16Color,
              borderRadius: 160,
              zIndex: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TrashRed width={22} height={22} />
          </View>
        </ImageBackground>
        <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 812), marginBottom: 30, textAlign: 'center'}}>
          Cancel event?
        </Text>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), marginBottom: 40, textAlign: 'center'}}>
          Are you sure you want to cancel?
        </Text>
        <Button title="Yes, cancel event" onPress={() => handleCancelEvent()} />
        <Button title="Cancel" variant="transparent" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ModalCancelEvent;
