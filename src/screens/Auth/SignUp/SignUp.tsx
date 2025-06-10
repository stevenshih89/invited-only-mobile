import React, {FC, useState, useContext, JSX} from 'react';

import firestore from '@react-native-firebase/firestore';
import {InputPhoneView} from '../../../components/Inputs/InputPhoneView';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import * as S from './SignUp.styles';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {showToast} from 'helpers/showToast.ts';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import invitedOnlyBackendApi from 'src/api/backend-api';

const SignUp: FC = (): JSX.Element => {
  const [mobilePhone, setMobilePhone] = useState<string>('');

  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isDisabledValidation, setIsDisabledValidation] = useState<boolean>(true);
  const {mutate: sendPhoneNumber, isPending: isLoading} = invitedOnlyBackendApi.useMutation('post', '/auth/send-otp');
  const navigation = useAppNavigation();
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

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
    <CommonAuthLayout
      title="Your phone"
      subtitle="We protect our community by ensuring the authenticity of everyone in IO."
      startPercentage={0}
      endPercentage={10}
      continueButtonTitle="Continue"
      continueButtonDisabled={!isValidPhone && isLoading}
      onContinuePress={handleSignUp}
      continueButtonTestID="continue-button">
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
    </CommonAuthLayout>
  );
};

export default SignUp;
