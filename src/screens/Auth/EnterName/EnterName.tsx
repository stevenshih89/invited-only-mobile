import React, { FC, JSX, useState } from 'react';
import { Keyboard } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  GradientBackground,
  AvoidingContainer,
  TouchableDismiss,
  SafeArea,
  Wrapper,
  Header,
  TopRow,

  TitleContainer,
  Title,
  Subtitle,
  InputContainer,
  ContinueButtonContainer,
} from './EnterName.style';
import { useAuthStore } from 'src/store/authStore';
import { useAppNavigation } from 'hooks/useAppNavigation';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import AuthProgress from 'components/AuthProgress';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import { isName } from 'helpers/regExpValidators';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

const EnterName: FC = (): JSX.Element => {
  const { onBoarding, setOnBoarding } = useAuthStore();

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
      registrationDetails: { ...onBoarding.registrationDetails, name: name },
    });
    navigation.navigate('/turn-notifications');
  };

  return (
    <GradientBackground>
      <AvoidingContainer>
        <TouchableDismiss onPress={Keyboard.dismiss}>
          <SafeArea>
            <Wrapper>
              <Header>
                <TopRow>
                  <BackButton onPress={() => navigation.goBack()} />
                  <LogoPrimary2 />
                  <AuthProgress startPercentage={10} endPercentage={20} animationDuration={1000} />
                </TopRow>
                <TitleContainer>
                  <Title>{"What's your first name?"}</Title>
                  <Subtitle>{"You won't be able to change this later."}</Subtitle>
                  <Subtitle>It will be shown on your profile.</Subtitle>
                </TitleContainer>
                <InputContainer>
                  <Input
                    isError={errorInputName}
                    errorText="The name must be up to 14 characters long and contain no special characters."
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your first name"
                  />
                </InputContainer>
              </Header>
              <ContinueButtonContainer>
                <Button
                  testID="continue-button"
                  id="continue-button"
                  buttonStyle={{ height: RFValue(64, 932) }}
                  disabled={name.length < 3 || errorInputName}
                  onPress={handleNext}
                  title="Continue"
                />
              </ContinueButtonContainer>
            </Wrapper>
          </SafeArea>
        </TouchableDismiss>
      </AvoidingContainer>
    </GradientBackground>
  );
};

export default EnterName;
