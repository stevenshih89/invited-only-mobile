import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import * as S from './TurnNotifications.style';
import {blackColor, whiteColor} from 'constants/colors';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';

import Button from 'components/Button/Button';
import AuthProgress from 'components/AuthProgress';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {useAuthStore} from 'src/store/authStore';
import useMessaging from 'hooks/useMessaging';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

const TurnNotifications = () => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const {onBoarding, setOnBoarding} = useAuthStore();
  const navigation = useAppNavigation();
  const {setupNotifications} = useMessaging();

  const handleNext = async () => {
    setOnBoarding({
      ...onBoarding,
      onboardingStep: '/add-photos',
      registrationDetails: {
        ...onBoarding.registrationDetails,
        notificationSettings: {
          ...onBoarding.registrationDetails?.notificationSettings,
          connection: notifications,
          chat: notifications,
          superInvite: notifications,
          superJoin: notifications,
          joinedEvent: notifications,
          requests: notifications,
          myEvents: notifications,
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
              <BackButton onPress={() => navigation.goBack()} />
              <LogoPrimary2 />
              <AuthProgress startPercentage={20} endPercentage={30} animationDuration={1000} />
            </S.Row>
            <S.TitleWrapper>
              <S.Title>Confirm access</S.Title>
              <S.Subtitle>{`You’ll need to enable notifications in order to use Invited Only.`}</S.Subtitle>
            </S.TitleWrapper>
            <S.ToggleRow>
              <S.ToggleLabel>Notifications</S.ToggleLabel>
              <S.StyledSwitch
                testID="requests-switch"
                trackColor={{false: 'rgba(29, 29, 29, 1)', true: whiteColor}}
                thumbColor={notifications ? blackColor : whiteColor}
                value={notifications}
                onValueChange={handleNotificationsChange}
              />
            </S.ToggleRow>
            <S.ButtonContainer>
              <Button onPress={handleNext} title="Continue" />
              <Button onPress={handleNext} title="Skip" variant="gray" />
            </S.ButtonContainer>
          </S.Wrapper>
        </S.SafeArea>
      </S.TouchableDismiss>
    </S.AvoidingContainer>
  );
};

export default TurnNotifications;
