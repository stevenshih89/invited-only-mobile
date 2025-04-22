import Modal from 'react-native-modal';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import * as S from './ModalHomeAdress.style';
import Home from 'assets/images/icons/home.svg';
import CloseCircle from 'assets/images/icons/close-circle.svg';
import Search from 'assets/images/icons/search.svg';
import { grayColor, toggleColor, whiteColor} from 'constants/colors';
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

const ModalHomeAdress: FC<ModalHomeAdressProps> = ({
  isVisible,
  onClose,
  showHomeAdress,
  setShowHomeAdress,
  textHomeAdress,
  setTextHomeAdress,
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
            <Home width={32} height={32} />
          </S.IconContainer>
          <S.TitleText>What is your hometown?</S.TitleText>
          <S.Row>
            <S.OptionText>Show in my profile</S.OptionText>
            <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showHomeAdress} onChange={val => setShowHomeAdress(val)} />
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
              value={textHomeAdress}
              onChangeText={text => setTextHomeAdress(text)}
              placeholder="Enter Adress"
              placeholderTextColor={whiteColor}
            />
          </S.InputWrapper>
          <Button
            onPress={() => {
              saveUserInfo('Address');
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

export default ModalHomeAdress;
