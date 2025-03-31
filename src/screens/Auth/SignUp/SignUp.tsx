import {isIos} from 'constants/common';
import React, {FC, useState, useContext} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {backgroundGradientColors} from 'constants/colors';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {confirmPhonePath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast.ts';
import firestore from '@react-native-firebase/firestore';
import {InputPhoneView} from '../../../components/Inputs/InputPhoneView';
import LinearGradient from 'react-native-linear-gradient';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import * as S from './SignUp.styles';

const SignUp: FC = (): JSX.Element => {
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isDisabledValidation, setIsDisabledValidation] = useState<boolean>(true);

  const navigation = useAppNavigation();
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  async function signUpWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      setLoading(true);

      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');
      console.log(`looking in ${apiUserInfoCollection} for the phone number`);

      // Sign up flow - check if phone number already exists
      const userNumber = await firestore().collection(apiUserInfoCollection).where('phoneNumber', '==', mobilePhone).get();
      if (!userNumber.empty) {
        setLoading(false);
        showToast('inviteMatch', 'This Phone Number is already exist', 'Fail');
        return;
      }

      const confirmation = await auth().signInWithPhoneNumber(phone);
      navigation.navigate(confirmPhonePath, {
        confirm: confirmation,
        mobilePhone: phone,
        isLogin: false,
      });
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
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
                  <S.Title>Your phone</S.Title>
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
                <Button disabled={!isValidPhone && !loading} loading={loading} onPress={handleSignUp} title="Continue" />
              </S.ButtonContainer>
            </S.Container>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUp;
