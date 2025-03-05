import {KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Job from 'assets/images/icons/job.svg';
import {blackColor, grayColor, grayScale600, lightGray2Color, toggleColor, transparentGray90Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {isIos, screenHeight} from 'constants/common';
import Button from 'components/Button/Button';
import * as S from './ModalWork.style';

interface ModalWorkProps {
  isVisible: boolean;
  onClose: () => void;
  showWork: boolean;
  setShowWork: Dispatch<SetStateAction<boolean>>;
  saveUserInfo: any;
  textNameWork: string;
  setTextNameWork: Dispatch<SetStateAction<string>>;
  textDescription: string;
  setTextDescription: Dispatch<SetStateAction<string>>;
}

const ModalWork: FC<ModalWorkProps> = ({
  isVisible,
  onClose,
  saveUserInfo,
  showWork,
  setShowWork,
  textNameWork,
  setTextNameWork,
  textDescription,
  setTextDescription,
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
            <Job width={32} height={32} />
          </S.IconContainer>
          <S.TitleText>What do you do for living?</S.TitleText>
          <S.Row>
            <S.OptionText>Show in my profile</S.OptionText>
            <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showWork} onChange={val => setShowWork(val)} />
          </S.Row>
          <S.InputContainer>
            <S.LabelText>Title</S.LabelText>
            <S.TextInput
              value={textNameWork}
              onChangeText={text => setTextNameWork(text)}
              placeholder="Enter your title"
              placeholderTextColor={grayScale600}
            />
          </S.InputContainer>
          <S.InputContainer>
            <S.LabelText>Company or industry</S.LabelText>
            <S.TextInput
              value={textDescription}
              onChangeText={text => setTextDescription(text)}
              placeholder="Enter company (or just industry)"
              placeholderTextColor={grayScale600}
            />
          </S.InputContainer>
          <Button
            onPress={() => {
              saveUserInfo('Work');
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

export default ModalWork;
