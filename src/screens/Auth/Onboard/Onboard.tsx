import React, {JSX, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as S from './Onboard.style';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import WelcomeBcgCards from 'assets/images/auth/welcome-screen-cards.png';
import {useAppNavigation} from 'hooks/useAppNavigation';
import Button from 'components/Button/Button';
import {openLink} from 'helpers/links';
import {screenHeight} from 'constants/common';

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
          <S.OnBoardingTopViewContainer>
            <S.OnBoardingTextTitle>HOST OR JOIN VIP TABLES AND EXCLUSIVE EVENTS</S.OnBoardingTextTitle>
            <View
              style={{
                width: '100%',
                height: screenHeight / 2,
              }}>
              <S.BgCardImage testID="bg-card-image" source={WelcomeBcgCards} resizeMode="contain" />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.9)']}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: screenHeight / 4,
                  zIndex: 1,
                }}
              />
            </View>
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
            <S.TermsText>
              By signing up or logging in, I accept the IO{' '}
              <S.TermsLink onPress={() => openLink('https://www.invitedonly.app/terms-of-service-eula')}>
                Terms of Service / EULA
              </S.TermsLink>{' '}
              and <S.TermsLink onPress={() => openLink('https://www.invitedonly.app/privacy-policy')}>Privacy Policy</S.TermsLink>
            </S.TermsText>
          </S.TermsContainer>
        </S.BottomContainer>
      </S.SafeArea>
    </S.RootGradient>
  );
};

export default Onboard;
