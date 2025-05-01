import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Switch } from '@ant-design/react-native';
import * as S from './TurnNotifications.style';
import { grayColor, toggleColor } from 'constants/colors';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Button from 'components/Button/Button';
import AuthProgress from 'components/AuthProgress';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useAuthStore } from 'src/store/authStore';
import { addPhotosPath } from 'constants/pathLocations';
import useMessaging from 'hooks/useMessaging';

const TurnNotifications = () => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const { onBoarding, setOnBoarding } = useAuthStore();
  const navigation = useAppNavigation();
  const { setupNotifications } = useMessaging();

  const handleNext = async () => {
    setOnBoarding({
      ...onBoarding,
      onboardingStep: '/add-photos',
      registrationDetails: {
        ...onBoarding.registrationDetails,
        notificationSettings: {
          ...onBoarding.registrationDetails?.notificationSettings,
          match: notifications,
        },
      },
    });
    if (notifications) {

      await setupNotifications();
    }
    navigation.navigate('/add-photos');
  };

  const handleNotificationsChange = (value: boolean): void => {
    setNotifications(value);
  };

  return (
    <S.AvoidingContainer>
      <S.TouchableDismiss onPress={Keyboard.dismiss}>
        <S.SafeArea>
          <S.Wrapper>
            <S.Row>
              <S.BackButton onPress={() => navigation.goBack()}>
                <ArrowLeft />
              </S.BackButton>
              <LogoPrimary2 />
              <AuthProgress startPercentage={20} endPercentage={30} animationDuration={1000} />
            </S.Row>
            <S.TitleWrapper>
              <S.Title>Confirm access</S.Title>
              <S.Subtitle>To use Invited Only, please enable your notifications.</S.Subtitle>
            </S.TitleWrapper>
            <S.ToggleRow>
              <S.ToggleLabel>Notifications</S.ToggleLabel>
              <Switch trackColor={{ false: grayColor, true: toggleColor }} checked={notifications} onChange={handleNotificationsChange} />
            </S.ToggleRow>
            <S.ButtonContainer>
              <Button onPress={handleNext} title="Continue" />
              <S.SkipButton onPress={() => navigation.navigate(addPhotosPath as never)}>
                <S.SkipText>Skip</S.SkipText>
              </S.SkipButton>
            </S.ButtonContainer>
          </S.Wrapper>
        </S.SafeArea>
      </S.TouchableDismiss>
    </S.AvoidingContainer>
  );
};

export default TurnNotifications;
