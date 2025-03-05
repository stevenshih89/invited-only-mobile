import {KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Location from 'assets/images/icons/location.svg';
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
import {showToast} from 'helpers/showToast';
import * as S from './ModalLocation.style';

interface ModalLocationProps {
  isVisible: boolean;
  onClose: () => void;
  showLocation: boolean;
  setShowLocation: Dispatch<SetStateAction<boolean>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  saveUserInfo: any;
}

const ModalLocation: FC<ModalLocationProps> = ({
  isVisible,
  onClose,
  showLocation,
  setShowLocation,
  location,
  setLocation,
  saveUserInfo,
}) => {
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
      <S.KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={0}>
        <S.Container>
          <S.HandleBar />
          <S.IconContainer>
            <Location width={32} height={32} />
          </S.IconContainer>
          <S.TitleText>What is your location?</S.TitleText>
          <S.Row>
            <S.OptionText>Show in my profile</S.OptionText>
            <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showLocation} onChange={val => setShowLocation(val)} />
          </S.Row>
          <S.LabelText>Adress</S.LabelText>
          <S.InputWrapper>
            <S.SearchIconContainer>
              <Search width={16} height={16} />
            </S.SearchIconContainer>
            <S.CloseIconContainer>
              <CloseCircle width={16} height={16} />
            </S.CloseIconContainer>
            <S.TextInput
              value={location}
              onChangeText={text => setLocation(text)}
              placeholder="Enter Adress"
              placeholderTextColor={whiteColor}
            />
          </S.InputWrapper>
          <Button
            onPress={() => {
              saveUserInfo('Location');
              onClose();
            }}
            title="Save"
            buttonStyle={{marginTop: 20}}
          />
        </S.Container>
      </S.KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalLocation;
