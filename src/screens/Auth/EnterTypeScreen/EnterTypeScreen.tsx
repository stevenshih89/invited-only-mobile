import * as S from './EnterTypeScreen.style';
import EnterTypeWordsAnimation from './EnterTypeWordsAnimation';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import EnterTypeScreenBg from 'assets/images/auth/enter-type-screen-bg.png';
import { useAuthStore } from 'src/store/authStore';

import { useAppNavigation } from 'hooks/useAppNavigation';

const EnterTypeScreen = () => {
  const navigation = useAppNavigation();
  const { onBoarding, setOnBoarding } = useAuthStore();
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
              navigation.navigate('/onboarding-demo-path');
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
              navigation.navigate('/onboarding-demo-path');
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
