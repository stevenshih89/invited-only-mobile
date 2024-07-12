import {KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Home from 'assets/images/icons/home.svg';
import CloseCircle from 'assets/images/icons/close-circle.svg';
import Search from 'assets/images/icons/search.svg';
import {blackColor, grayColor, lightGray2Color, toggleColor, transparentGray90Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import MaskInput from 'react-native-mask-input';
import {isIos} from 'constants/common';
import Button from 'components/Button/Button';

interface ModalHomeAdressProps {
  isVisible: boolean;
  onClose: () => void;
  showHomeAdress: boolean;
  setShowHomeAdress: Dispatch<SetStateAction<boolean>>;
  textHomeAdress: string;
  setTextHomeAdress: Dispatch<SetStateAction<string>>;
  saveUserInfo: any;
}

const ModalHomeAdress: FC<ModalHomeAdressProps> = ({isVisible, onClose, showHomeAdress, setShowHomeAdress, textHomeAdress, setTextHomeAdress, saveUserInfo}) => {

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
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{paddingBottom: 0}}>
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
              backgroundColor: transparentGray90Color,
              height: 84,
              width: 84,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            <Home width={32} height={32} />
          </View>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          What is your hometown?  
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
            <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showHomeAdress} onChange={val => setShowHomeAdress(val)} />
          </View>
          <Text style={{color: whiteColor, marginBottom: 10, fontSize: RFValue(18, 812), fontFamily: Satoshi500}}>Adress</Text>
          <View style={{width: '100%', marginBottom: 34, alignItems: 'center'}}>
          <View style={{position: 'absolute', zIndex: 20, left: 20, top: 22}}>
            <Search width={16} height={16}/>
          </View>
          <TouchableOpacity style={{position: 'absolute', zIndex: 20, right: 20, top: 22}}>
            <CloseCircle width={16} height={16}/>
          </TouchableOpacity>
          <TextInput
          value={textHomeAdress}
          onChangeText={text => setTextHomeAdress(text)}
          style={{
            paddingVertical: 16, 
            paddingLeft: 44,
            paddingRight: 44,
            backgroundColor: lightGray2Color, 
            borderRadius: 10, 
            width: '100%', 
            fontSize: RFValue(18, 812), 
            fontFamily: Satoshi400, 
            color: whiteColor}}
          placeholder='Enter Adress'
          placeholderTextColor={whiteColor}
          />
        </View>
          <Button onPress={saveUserInfo} title="Save" buttonStyle={{marginTop: 20}} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalHomeAdress;
