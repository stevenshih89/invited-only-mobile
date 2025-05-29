import React, { FC, useState, useContext, JSX } from 'react';
import { Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { InputPhoneView } from '../../../components/Inputs/InputPhoneView';
import * as S from './SignUp.styles';
import { isIos } from 'constants/common';
import { backgroundGradientColors } from 'constants/colors';
import Button from 'components/Button/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { showToast } from 'helpers/showToast.ts';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import invitedOnlyBackendApi from 'src/api/backend-api';

const SignUp: FC = (): JSX.Element => {
  const [mobilePhone, setMobilePhone] = useState<string>('');

  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isDisabledValidation, setIsDisabledValidation] = useState<boolean>(true);
  const { mutate: sendPhoneNumber, isPending: isLoading } = invitedOnlyBackendApi.useMutation('post', '/auth/send-otp');
  const navigation = useAppNavigation();
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);

  async function signUpWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');

      const userNumber = await firestore().collection(apiUserInfoCollection).where('phoneNumber', '==', mobilePhone).get();
      if (!userNumber.empty) {
        showToast('inviteMatch', 'This phone number is already in use', 'Fail');
        return;
      }
      await sendPhoneNumber({
        body: {
          phone: phone,
        },
      });
      navigation.navigate('/confirm-phone', {
        mobilePhone: phone,
        isLogin: false,
      });

    } catch (e: any) {
      logErrorToSentry(e);
      showToast('inviteMatch', `${e?.message.split(']')[1] || 'Error processing request'}`);
    }
  }

  const handleSignUp = () => {
    setIsDisabledValidation(false);
    if (isValidPhone) {
      signUpWithPhoneNumber();
    }
  };

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
                  <S.Title>Your phone</S.Title>
                  <S.Subtitle>We protect our community by ensuring the authenticity of everyone in IO.</S.Subtitle>
                </S.HeaderContainer>
                <S.InputContainer>
                  <InputPhoneView
                    placeholder="Enter your phone number"
                    testID="phone-input"
                    value={mobilePhone}
                    setIsValid={setIsValidPhone}
                    validationDisabled={isDisabledValidation}
                    onChangeFormattedText={val => setMobilePhone(val)}
                  />
                </S.InputContainer>
              </S.ContentContainer>
              <S.ButtonContainer>
                <Button disabled={!isValidPhone && isLoading} loading={isLoading} onPress={handleSignUp} title="Continue" />
              </S.ButtonContainer>
            </S.Container>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUp;
