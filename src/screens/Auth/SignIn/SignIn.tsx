import React, {FC, JSX} from 'react';
import {InputPhoneView} from '../../../components/Inputs/InputPhoneView';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import * as S from './SignIn.styles';
import {useSignIn} from './hooks/useSignIn';

import Loader from 'components/Modal/ModalLoader/Loader';

const SignIn: FC = (): JSX.Element => {
  const {mobilePhone, setMobilePhone, isValidPhone, setIsValidPhone, isDisabledValidation, isSendingOtp, handleSignIn} = useSignIn();

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
      <S.InputContainer>
        <InputPhoneView
          testID="phone-input"
          value={mobilePhone}
          setIsValid={setIsValidPhone}
          validationDisabled={isDisabledValidation}
          onChangeFormattedText={val => setMobilePhone(val)}
        />
      </S.InputContainer>
      <Loader isVisible={isSendingOtp} textLoader="Signing in..." successfulPay={false} />
    </CommonAuthLayout>
  );
};

export default SignIn;
