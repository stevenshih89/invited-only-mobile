import React, { JSX, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import * as S from './Onboard.style';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import WelcomeBcgCards from 'assets/images/auth/welcom-screen-cards.png';
import BgDottedLineLeft from 'assets/images/auth/background-dotted-line-left.png';
import BgDottedLineRight from 'assets/images/auth/background-dotted-right.png';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { eulaPath } from 'constants/pathLocations';
import Button from 'components/Button/Button';
import { openLink } from 'helpers/links';

const Onboard = (): JSX.Element => {
  const navigation = useAppNavigation();

  useEffect(() => {
    const setOnboardingState = async () => {
      try {
        await AsyncStorage.setItem('onBoarding', 'true');
      } catch (e) {
        console.error('Error setting onBoarding state:', e);
      }
    };

    setOnboardingState();
  }, []);

  return (
    <S.RootGradient>
      <S.SafeArea>
        <S.Overlay>
          <S.BackgroundDottedLineLeft source={BgDottedLineLeft} />
          <S.BackgroundDottedLineRight source={BgDottedLineRight} />
          <S.OnBoardingTopViewContainer>
            <S.OnBoardingTextTitle>HOST OR JOIN VIP TABLES AND EXCLUSIVE EVENTS</S.OnBoardingTextTitle>
            <S.BgCardImage source={WelcomeBcgCards} />
          </S.OnBoardingTopViewContainer>
        </S.Overlay>
        <S.LogoContainer>
          <LogoPrimary />
        </S.LogoContainer>
        <S.BottomContainer>
          <S.ButtonWrapper>
            <Button onPress={() => navigation.navigate('/eula')} title="Get Access" />
            <S.GetAccessContainer>
              <S.AccountQuestionText>Have an account? </S.AccountQuestionText>
              <TouchableOpacity onPress={() => navigation.navigate('/sign-in' as never)}>
                <S.SignInText>Sign In</S.SignInText>
              </TouchableOpacity>
            </S.GetAccessContainer>
          </S.ButtonWrapper>
          <S.TermsContainer>
            <S.AcceptPolicyTop>By signing up or logging, I accept the IO</S.AcceptPolicyTop>
            <S.TermsInner>
              <S.AcceptPolicyMid onPress={() => openLink('https://www.invitedonly.app/terms-of-service-eula')}>
                Terms of Service / EULA
              </S.AcceptPolicyMid>
              <S.AcceptPolicyTop> and </S.AcceptPolicyTop>
              <S.AcceptPolicyBottom onPress={() => openLink('https://www.invitedonly.app/privacy-policy')}>
                Privacy Policy
              </S.AcceptPolicyBottom>
            </S.TermsInner>
          </S.TermsContainer>
        </S.BottomContainer>
      </S.SafeArea>
    </S.RootGradient>
  );
};

export default Onboard;
