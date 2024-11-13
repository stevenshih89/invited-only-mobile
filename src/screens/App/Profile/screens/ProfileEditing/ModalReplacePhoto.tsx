import {ImageBackground, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, deleteColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import TrashBlack from 'assets/images/icons/trash-black.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import type {Dispatch, FC, SetStateAction} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useUser} from '../../../../../store/userStore';
import {calculateAge} from 'helpers/calculateAge.ts';
import firestore from '@react-native-firebase/firestore';

const ModalReplacePhoto: FC<{
  isVisible: boolean;
  onClose: () => void;
  replaceImage: () => void;
//   setIsVisibleConfirmPhoneModal?: Dispatch<SetStateAction<boolean>>;
//   sendVerificationCode: () => Promise<void>;
}> = ({isVisible, onClose, replaceImage}) => {

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
        <Text style={{
            fontSize: RFValue(24, 812),
            fontFamily: Satoshi500,
            color: whiteColor, 
            marginBottom: 20,
            textAlign: 'center'
        }}>Are you sure you want to replace the image?</Text>       
        <Button title="Yes, replace" onPress={replaceImage} />
        <Button title="Cancel" variant="transparent" onPress={onClose} /> 
      </View>
    </Modal>
  );
};

export default ModalReplacePhoto;
