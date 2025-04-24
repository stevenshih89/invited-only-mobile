import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useAuthStore } from '../store/authStore';
import * as S from './Navigator.style';
import AppStackScreens from 'src/Navigator/AppStackScreens/AppStackScreens';
import AuthStackScreens from 'src/Navigator/AuthStackScreens/AuthStackScreens';

const Navigator = () => {
  const { onBoarding } = useAuthStore();

  useEffect(() => {

    messaging().onMessage(async () => { });
  }, []);


  return <S.NavigatorContainer>
    {onBoarding.isOnboardingCompleted ? <AppStackScreens /> : <AuthStackScreens />}
  </S.NavigatorContainer>;
};

export default Navigator;
