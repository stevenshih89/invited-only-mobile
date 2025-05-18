import React, { FC, JSX } from 'react';
import { Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { InputPhoneView } from '../../../components/Inputs/InputPhoneView';
import * as S from './SignIn.styles';
import { useSignIn } from './hooks/useSignIn';
import { isIos } from 'constants/common';
import { backgroundGradientColors } from 'constants/colors';
import Button from 'components/Button/Button';

import Loader from 'components/Modal/ModalLoader/Loader';

const SignIn: FC = (): JSX.Element => {
  const { mobilePhone, setMobilePhone, isValidPhone, setIsValidPhone, isDisabledValidation, isSendingOtp, handleSignIn } = useSignIn();

  return (
    <LinearGradient colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{ flex: 1, paddingBottom: 0 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
            <S.Container>
              <S.ContentContainer>
                <S.LogoContainer>
                  <S.LogoImage />
                </S.LogoContainer>
                <S.HeaderContainer>
                  <S.Title testID="sign-in-title">Sign In</S.Title>
                  <S.Subtitle>Enter your phone number to sign in to your account.</S.Subtitle>
                </S.HeaderContainer>
                <S.InputContainer>
                  <InputPhoneView
                    testID="phone-input"
                    value={mobilePhone}
                    setIsValid={setIsValidPhone}
                    validationDisabled={isDisabledValidation}
                    onChangeFormattedText={val => setMobilePhone(val)}
                  />
                </S.InputContainer>
              </S.ContentContainer>
              <S.ButtonContainer>
                <Button disabled={!isValidPhone || isSendingOtp} loading={isSendingOtp} onPress={handleSignIn} title="Sign In" />
              </S.ButtonContainer>
            </S.Container>
          </SafeAreaView>
        </TouchableWithoutFeedback>
        <Loader isVisible={isSendingOtp} textLoader="Signing in..." successfulPay={false} />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignIn;
