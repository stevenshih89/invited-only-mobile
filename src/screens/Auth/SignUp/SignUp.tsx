import React, { FC, useState, useContext, JSX, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';
import { InputPhoneView } from '../../../components/Inputs/InputPhoneView';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import * as S from './SignUp.styles';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { showToast } from 'helpers/showToast.ts';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import invitedOnlyBackendApi from 'src/api/backend-api';
import CountryCodePicker from 'src/sharedComponents/CountryCodePicker/CountryCodePicker';
import { Country } from 'src/sharedComponents/CountryCodePicker/types';



const SignUp: FC = (): JSX.Element => {
  const [selectedCountry, setSelectedCountry] = useState<Country>({ name: 'United Arab Emirates', code: 'AE', dialCode: '+971' });
  const [mobilePhone, setMobilePhone] = useState<string>('');

  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isDisabledValidation, setIsDisabledValidation] = useState<boolean>(true);
  const { mutate: sendPhoneNumber, isPending: isLoading } = invitedOnlyBackendApi?.useMutation('post', '/auth/send-otp') || {};
  const navigation = useAppNavigation();
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);

  useEffect(() => {
    // Remove any non-digit characters for validation
    const cleanPhone = mobilePhone.replace(/\D/g, '');

    // Basic validation: at least 7 digits for a valid phone number
    // You can adjust this based on your requirements
    const isValid = cleanPhone.length >= 7 && cleanPhone.length <= 15;
    setIsValidPhone(isValid);
  }, [mobilePhone]);

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
      continueButtonDisabled={!isValidPhone || isLoading}
      onContinuePress={handleSignUp}
      continueButtonTestID="continue-button">
      <S.Container>
        <CountryCodePicker
          onSelect={(country) => {
            setSelectedCountry(country);
          }}
          selectedCountry={selectedCountry}
          disabled={isLoading}
        />
        <S.InputContainer>
          <S.Input
            keyboardType="numeric"
            placeholder="Enter your phone number"
            placeholderTextColor="rgba(118, 118, 118, 1)"
            value={mobilePhone}
            onChangeText={setMobilePhone}
            maxLength={15}
          />
        </S.InputContainer>
      </S.Container>
    </CommonAuthLayout>
  );
};

export default SignUp;
