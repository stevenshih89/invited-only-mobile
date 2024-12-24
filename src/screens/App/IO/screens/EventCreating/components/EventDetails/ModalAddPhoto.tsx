import {Switch} from '@ant-design/react-native';
import {blackColor, grayColor, lightGray2Color, toggleColor, transparentGray90Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import PlusIcon from 'assets/images/icons/plus.svg';
import ImageIcon from 'assets/images/icons/image.svg';
import CameraIcon from 'assets/images/icons/camera.svg';
import {Dispatch, FC, SetStateAction} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';

interface ModalAddProps {
  isVisible: boolean;
  onClose: () => void;
  openLibrary: () => void;
  addPlaceholderPhoto: () => void;
  //   showHeight: boolean;
  //   setShowHeight: Dispatch<SetStateAction<boolean>>;
  //   height: string | null;
  //   setHeight: Dispatch<SetStateAction<string | null>>;
  //   heightsList: {id: number; value: number; label: string}[];
}

const ModalAddPhoto: FC<ModalAddProps> = ({isVisible, onClose, openLibrary, addPlaceholderPhoto}) => {
  2;
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}>
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
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          Event photos
        </Text>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20}}>
          <CameraIcon />
          <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, color: whiteColor, marginLeft: 10}}>Use a camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openLibrary}
          style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20}}>
          <ImageIcon />
          <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, color: whiteColor, marginLeft: 10}}>Upload from galery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addPlaceholderPhoto}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 20,
            backgroundColor: lightGray2Color,
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <PlusIcon />
          <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, color: whiteColor, marginLeft: 10}}>Use a placeholder</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalAddPhoto;
