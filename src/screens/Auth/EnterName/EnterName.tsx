import React, {FC, JSX, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import {InputContainer} from './EnterName.style';
import {useAuthStore} from 'src/store/authStore';
import {useAppNavigation} from 'hooks/useAppNavigation';
import Input from 'components/Inputs/Input';
import {isName} from 'helpers/regExpValidators';

const EnterName: FC = (): JSX.Element => {
  const {onBoarding, setOnBoarding} = useAuthStore();

  const [errorInputName, setErrorInputName] = useState<boolean>(false);
  const [name, setName] = useState<string>(onBoarding.registrationDetails?.name || '');

  const handleNameChange = (value: string) => {
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);

    if ((!isName(value) && name.length > 2) || value.length > 14) {
      setErrorInputName(true);
    } else {
      setErrorInputName(false);
    }
    setName(formattedValue);
  };

  const navigation = useAppNavigation();

  const handleNext = async () => {
    if (!name) {
      return;
    }
    setOnBoarding({
      ...onBoarding,
      onboardingStep: '/turn-notifications',
      registrationDetails: {...onBoarding.registrationDetails, name: name},
    });
    navigation.navigate('/turn-notifications');
  };

  return (
    <CommonAuthLayout
      title="What's your first name?"
      subtitle={`You won't be able to change this later.\nIt will be shown on your profile.`}
      startPercentage={10}
      endPercentage={20}
      continueButtonTitle="Continue"
      continueButtonDisabled={name.length < 3 || errorInputName}
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
          errorText="The name must be up to 14 characters long and contain no special characters."
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your first name"
        />
      </InputContainer>
    </CommonAuthLayout>
  );
};

export default EnterName;
