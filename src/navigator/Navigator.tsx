import { useAuthStore } from '../store/authStore';
import * as S from './Navigator.style';
import AppStackScreens from 'src/navigator/AppStackScreens/AppStackScreens';
import AuthStackScreens from 'src/navigator/AuthStackScreens/AuthStackScreens';

const Navigator = () => {
  const { onBoarding, userMetadata } = useAuthStore();
  console.log('onBoarding -- onboarding', onBoarding);
  console.log('onBoarding -- user', userMetadata);

  return <S.NavigatorContainer>
    {onBoarding.isOnboardingCompleted ? <AppStackScreens /> : <AuthStackScreens />}
  </S.NavigatorContainer>;


};

export default Navigator;
