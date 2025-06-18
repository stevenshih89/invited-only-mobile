import React, { FC, JSX, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { InputContainer } from './EnterName.style';
import { useAuthStore } from 'src/store/authStore';
import { useAppNavigation } from 'hooks/useAppNavigation';
import Input from 'components/Inputs/Input';
import { isName } from 'helpers/regExpValidators';
import { useWriteUnfinishedRegistration } from 'screens/Auth/hooks/useUnfinishedRegistration';

const EnterName: FC = (): JSX.Element => {
  const { onBoarding, setOnBoarding, userMetadata } = useAuthStore();
  const { writeUnfinishedRegistration } = useWriteUnfinishedRegistration();
  const [errorInputName, setErrorInputName] = useState<boolean>(false);
  const [name, setName] = useState<string>(onBoarding.registrationDetails?.name || '');

  const validateName = (value: string): boolean => {

    if (!value || value.length > 14) {
      return false;
    }


    if (!isName(value)) {
      return false;
    }

    // Allow names with 3 or more characters if they're valid
    return value.length >= 3;
  };

  const handleNameChange = (value: string) => {
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    const isValid = validateName(value);

    setErrorInputName(!isValid);
    setName(formattedValue);
  };

  const navigation = useAppNavigation();

  const handleNext = async () => {
    if (!name || !validateName(name)) {
      return;
    }
    setOnBoarding({
      ...onBoarding,
      onboardingStep: '/turn-notifications',
      registrationDetails: { ...onBoarding.registrationDetails, name: name },
    });
    writeUnfinishedRegistration({ ...onBoarding.registrationDetails, name: name, uid: userMetadata.uid, phoneNumber: userMetadata.phoneNumber });
    navigation.navigate('/turn-notifications');
  };

  return (
    <CommonAuthLayout
      title="What's your first name?"
      subtitle={`You won't be able to change this later.\nIt will be shown on your profile.`}
      startPercentage={10}
      endPercentage={20}
      continueButtonTitle="Continue"
      continueButtonDisabled={!validateName(name)}
      onContinuePress={handleNext}
      continueButtonTestID="continue-button"
      skipButtonTestID="skip-button">
      <InputContainer>
        <Input
          testID="name-input"
          containerStyle={{
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
          isError={errorInputName}
          errorText={name.length > 14
            ? "The name must be up to 14 characters long."
            : "The name must contain only letters and be at least 3 characters long."}
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your first name"
        />
      </InputContainer>
    </CommonAuthLayout>
  );
};

export default EnterName;
