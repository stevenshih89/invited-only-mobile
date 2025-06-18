import React, { FC, JSX } from 'react';

import { RFValue } from 'react-native-responsive-fontsize';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { InputContainer } from './MyEmail.style';
import { useMyEmail } from './hooks/useMyEmail';
import Input from 'components/Inputs/Input';

const MyEmail: FC = (): JSX.Element => {
  const { email, isValidEmail, handleEmailChange, handleNext } = useMyEmail();

  return (
    <CommonAuthLayout
      title="Your email"
      subtitle={`Don't lose access to your account, add your email.`}
      startPercentage={80}
      endPercentage={90}
      continueButtonTitle="Continue"
      continueButtonDisabled={email.length < 5 || !isValidEmail}
      onContinuePress={handleNext}
      continueButtonTestID="continue-button">
      <InputContainer>
        <Input
          testID="input-email"
          containerStyle={{
            borderColor: 'rgba(239, 85, 85, 1)',
            borderWidth: !isValidEmail ? 1 : 0,
            borderRadius: 100,
            height: 56,
          }}
          inputStyle={{
            fontSize: RFValue(16, 932),
          }}
          containerInnerStyle={{
            height: '100%',
            paddingLeft: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }}
          isError={!isValidEmail}
          errorText="Incorrect email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      </InputContainer>
    </CommonAuthLayout>
  );
};

export default React.memo(MyEmail);
