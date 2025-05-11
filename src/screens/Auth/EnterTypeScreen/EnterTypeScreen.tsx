import * as S from './EnterTypeScreen.style';
import EnterTypeWordsAnimation from './EnterTypeWordsAnimation';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import EnterTypeScreenBg from 'assets/images/auth/enter-type-screen-bg.png';
import { selectIsAuthenticated, selectIsDemoVideoWatched, useAuthStore } from 'src/store/authStore';

import { useAppNavigation } from 'hooks/useAppNavigation';

const EnterTypeScreen = () => {
  const isDemoVideoWatched = useAuthStore(selectIsDemoVideoWatched);
  const navigation = useAppNavigation();
  const { onBoarding, setOnBoarding } = useAuthStore();

  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return (
    <DefaultBackground>
      <S.MainContainer>
        <S.BackgroundImage source={EnterTypeScreenBg}>
          <EnterTypeWordsAnimation />
        </S.BackgroundImage>
        <S.ButtonsContainer>
          <S.EnterButton
            testID="sign-up-btn"
            activeOpacity={0.7}
            hitSlop={{ top: 26, bottom: 20 }}
            onPress={() => {
              setOnBoarding({
                ...onBoarding,
                onboardingStep: '/onboarding-demo-path',
                registrationDetails: {
                  ...onBoarding.registrationDetails,
                  gender: 'man',
                },
              });
              if (!isDemoVideoWatched) {
                navigation.navigate('/onboarding-demo-path', { isHost: true });
              } else {
                if (isAuthenticated) {
                  navigation.navigate('/enter-name');
                } else {
                  navigation.navigate('/sign-up', { isLogin: false });
                }
              }
            }}>
            <S.ButtonText>ENTER AS A MAN</S.ButtonText>
          </S.EnterButton>
          <S.EnterButton
            onPress={() => {
              setOnBoarding({
                ...onBoarding,
                onboardingStep: '/onboarding-demo-path',
                registrationDetails: {
                  ...onBoarding.registrationDetails,
                  gender: 'woman',
                },
              });
              if (!isDemoVideoWatched) {
                navigation.navigate('/onboarding-demo-path', { isHost: false });
              } else {
                if (isAuthenticated) {
                  navigation.navigate('/enter-name');
                } else {
                  navigation.navigate('/sign-up', { isLogin: false });
                }
              }
            }}
            testID="sign-in-btn"
            activeOpacity={0.7}
            hitSlop={{ top: 26, bottom: 20 }}>
            <S.ButtonText>ENTER AS A WOMAN</S.ButtonText>
          </S.EnterButton>
        </S.ButtonsContainer>
      </S.MainContainer>
    </DefaultBackground>
  );
};

export default EnterTypeScreen;
