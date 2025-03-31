import React, {FC, useState, useContext} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';
import {isIos} from 'constants/common';
import {backgroundGradientColors} from 'constants/colors';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';

import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast.ts';
import firestore from '@react-native-firebase/firestore';
import {InputPhoneView} from '../../../components/Inputs/InputPhoneView';
import LinearGradient from 'react-native-linear-gradient';

import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import Loader from 'components/Modal/ModalLoader/Loader';
import * as S from './SignIn.styles';

const SignIn: FC = (): JSX.Element => {
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isDisabledValidation, setIsDisabledValidation] = useState<boolean>(true);

  const navigation = useAppNavigation();
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      setLoading(true);

      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');

      // Check if user exists first
      try {
        const userNumber = await firestore().collection(apiUserInfoCollection).where('phoneNumber', '==', mobilePhone).get();
        if (userNumber.empty) {
          setLoading(false);
          showToast('inviteMatch', 'No account found with this phone number', 'Fail');
          return;
        }

        const confirmation = await auth().signInWithPhoneNumber(phone);
        navigation.navigate('/confirm-phone', {
          confirm: confirmation,
          mobilePhone: phone,
          isLogin: true,
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        logErrorToSentry(error);
        showToast('inviteMatch', `${error?.message.split(']')[1] || 'Error signing in'}`);
      }
    } catch (e: any) {
      setLoading(false);
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
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
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
                <Button disabled={!isValidPhone || loading} loading={loading} onPress={handleSignIn} title="Sign In" />
              </S.ButtonContainer>
            </S.Container>
          </SafeAreaView>
        </TouchableWithoutFeedback>
        <Loader isVisible={loading} textLoader="Signing in..." successfulPay={false} />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignIn;
