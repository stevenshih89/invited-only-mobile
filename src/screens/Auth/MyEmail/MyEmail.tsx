import React, {FC, JSX} from 'react';
import {Keyboard} from 'react-native';

import {
  GradientBackground,
  AvoidingContainer,
  TouchableDismiss,
  SafeArea,
  Wrapper,
  Header,
  TopRow,
  BackButton,
  TitleContainer,
  Title,
  Subtitle,
  InputContainer,
  ContinueButtonContainer,
} from './MyEmail.style';
import {useMyEmail} from './hooks/useMyEmail';
import Input from 'components/Inputs/Input';
import AuthProgress from 'components/AuthProgress';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Button from 'components/Button/Button';

const MyEmail: FC = (): JSX.Element => {
  const {email, isValidEmail, handleEmailChange, handleNext, isPending, navigation} = useMyEmail();

  if (isPending) {
    return <AppLoader />;
  }

  return (
    <GradientBackground>
      <AvoidingContainer>
        <TouchableDismiss onPress={Keyboard.dismiss}>
          <SafeArea>
            <Wrapper>
              <Header>
                <TopRow>
                  <BackButton onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                  </BackButton>
                  <LogoPrimary2 />
                  <AuthProgress startPercentage={80} endPercentage={90} animationDuration={1000} />
                </TopRow>
                <TitleContainer>
                  <Title>Your email</Title>
                  <Subtitle>{"Don't lose access to your account, verify your email"}</Subtitle>
                </TitleContainer>
                <InputContainer>
                  <Input
                    testID="input-email"
                    value={email}
                    onChange={handleEmailChange}
                    isError={!isValidEmail}
                    errorText="Incorrect email"
                    placeholder="Enter your email"
                  />
                </InputContainer>
              </Header>
              <ContinueButtonContainer>
                <Button testID="continue-button" onPress={handleNext} disabled={email.length < 5 || !isValidEmail} title="Continue" />
              </ContinueButtonContainer>
            </Wrapper>
          </SafeArea>
        </TouchableDismiss>
      </AvoidingContainer>
    </GradientBackground>
  );
};

export default MyEmail;
