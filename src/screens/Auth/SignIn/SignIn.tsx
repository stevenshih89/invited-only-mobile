import React, { FC, useState, useContext, JSX } from 'react';
import { Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { InputPhoneView } from '../../../components/Inputs/InputPhoneView';
import * as S from './SignIn.styles';
import { isIos } from 'constants/common';
import { backgroundGradientColors } from 'constants/colors';
import Button from 'components/Button/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { showToast } from 'helpers/showToast.ts';

import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import Loader from 'components/Modal/ModalLoader/Loader';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';

const SignIn: FC = (): JSX.Element => {

  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isDisabledValidation, setIsDisabledValidation] = useState<boolean>(true);

  const navigation = useAppNavigation();
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const { mutate: sendOtp, isPending: isSendingOtp } = invitedOnlyBackendApi.useMutation('post', '/auth/send-otp');
  const { setUserMetadata } = useAuthStore();

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');

      try {
        const user = await firestore().collection(apiUserInfoCollection).where('phoneNumber', '==', mobilePhone).get();
        if (user.empty) {
          showToast('inviteMatch', 'No account found with this phone number', 'Fail');
          return;
        }

        setUserMetadata({
          uid: user.docs[0].id,
          phoneNumber: mobilePhone,
        });

        await sendOtp({ body: { phone: mobilePhone } });

        navigation.navigate('/confirm-phone', {
          mobilePhone: phone,
          isLogin: true,
        });

      } catch (error: any) {
        logErrorToSentry(error);
        showToast('inviteMatch', `${error?.message.split(']')[1] || 'Error signing in'}`);
      }
    } catch (e: any) {
      logErrorToSentry(e);
      showToast('inviteMatch', `${e?.message.split(']')[1] || 'Error processing request'}`);
    }
  }

  const handleSignIn = () => {
    setIsDisabledValidation(false);
    console.log(isValidPhone);

    if (isValidPhone) {
      signInWithPhoneNumber();
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
                  <S.Title>Sign In</S.Title>
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
