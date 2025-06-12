import React, { FC, JSX, useEffect } from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import * as S from './SignIn.styles';
import { useSignIn } from './hooks/useSignIn';
import Loader from 'components/Modal/ModalLoader/Loader';
import CountryCodePicker from 'src/sharedComponents/CountryCodePicker/CountryCodePicker';


const SignIn: FC = (): JSX.Element => {

  const { mobilePhone, setMobilePhone, isValidPhone, setIsValidPhone, isSendingOtp, handleSignIn, selectedCountry, setSelectedCountry } = useSignIn();

  useEffect(() => {
    // Remove any non-digit characters for validation
    const cleanPhone = mobilePhone.replace(/\D/g, '');

    // Basic validation: at least 7 digits for a valid phone number
    const isValid = cleanPhone.length >= 7 && cleanPhone.length <= 15;
    setIsValidPhone(isValid);
  }, [mobilePhone, setIsValidPhone]);

  return (
    <CommonAuthLayout
      title="Your Phone"
      subtitle="We protect our community by ensuring the authenticity of everyone in IO."
      startPercentage={0}
      endPercentage={10}
      continueButtonTitle="Continue"
      continueButtonDisabled={!isValidPhone || isSendingOtp}
      onContinuePress={handleSignIn}
      continueButtonTestID="continue-button">
      <S.Container>
        <CountryCodePicker
          onSelect={(country) => {
            setSelectedCountry(country);
          }}
          selectedCountry={selectedCountry}
          disabled={isSendingOtp}
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
      <Loader isVisible={isSendingOtp || false} textLoader="Signing in..." successfulPay={false} />
    </CommonAuthLayout>
  );
};

export default SignIn;
