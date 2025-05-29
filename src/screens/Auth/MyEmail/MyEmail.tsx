import React, {FC, JSX} from 'react';
import {Keyboard} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
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
} from './MyEmail.style';
import {useMyEmail} from './hooks/useMyEmail';
import Input from 'components/Inputs/Input';
import AuthProgress from 'components/AuthProgress';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Button from 'components/Button/Button';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

const MyEmail: FC = (): JSX.Element => {
  const {email, isValidEmail, handleEmailChange, handleNext, navigation} = useMyEmail();

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
                  <AuthProgress startPercentage={80} endPercentage={90} animationDuration={1000} />
                </TopRow>
                <TitleContainer>
                  <Title>Your email</Title>
                  <Subtitle>{"Don't lose access to your account, add your email."}</Subtitle>
                </TitleContainer>
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
