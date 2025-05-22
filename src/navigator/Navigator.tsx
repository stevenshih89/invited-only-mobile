import { useAuthStore } from '../store/authStore';
import * as S from './Navigator.style';
import AppStackScreens from 'src/navigator/AppStackScreens/AppStackScreens';
import AuthStackScreens from 'src/navigator/AuthStackScreens/AuthStackScreens';

const Navigator = () => {
  const { onBoarding } = useAuthStore();

  return <S.NavigatorContainer>
    {onBoarding.isOnboardingCompleted ? <AppStackScreens /> : <AuthStackScreens />}
  </S.NavigatorContainer>;


};

export default Navigator;
