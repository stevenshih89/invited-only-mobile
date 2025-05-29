import React, {FC, JSX} from 'react';
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {InputPhoneView} from '../../../components/Inputs/InputPhoneView';
import * as S from './SignIn.styles';
import {useSignIn} from './hooks/useSignIn';
import {isIos} from 'constants/common';
import {backgroundGradientColors} from 'constants/colors';
import Button from 'components/Button/Button';

import Loader from 'components/Modal/ModalLoader/Loader';
import {useAppNavigation} from 'hooks/useAppNavigation';
import AuthProgress from 'components/AuthProgress';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

const SignIn: FC = (): JSX.Element => {
  const {mobilePhone, setMobilePhone, isValidPhone, setIsValidPhone, isDisabledValidation, isSendingOtp, handleSignIn} = useSignIn();
  const navigation = useAppNavigation();
  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.SafeArea>
            <S.Container>
              <S.ContentContainer>
                <S.TopRow>
                  <BackButton onPress={() => navigation.goBack()} />
                  <S.LogoContainer>
                    <S.LogoImage />
                  </S.LogoContainer>
                  <View>
                    <AuthProgress startPercentage={0} endPercentage={10} animationDuration={1000} />
                  </View>
                </S.TopRow>
                <S.HeaderContainer>
                  <S.Title testID="sign-in-title">Your Phone</S.Title>
                  <S.Subtitle>We protect our community by ensuring the authenticity of everyone in IO.</S.Subtitle>
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
                <Button disabled={!isValidPhone || isSendingOtp} loading={isSendingOtp} onPress={handleSignIn} title="Continue" />
              </S.ButtonContainer>
            </S.Container>
          </S.SafeArea>
        </TouchableWithoutFeedback>
        <Loader isVisible={isSendingOtp} textLoader="Signing in..." successfulPay={false} />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignIn;
