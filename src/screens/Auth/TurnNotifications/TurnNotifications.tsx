import React, { useState } from 'react';
import { useWriteUnfinishedRegistration } from '../hooks/useUnfinishedRegistration';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import * as S from './TurnNotifications.style';
import { blackColor, whiteColor } from 'constants/colors';

import { useAppNavigation } from 'hooks/useAppNavigation';
import { useAuthStore } from 'src/store/authStore';
import useMessaging from 'hooks/useMessaging';

const TurnNotifications = () => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const { onBoarding, setOnBoarding, userMetadata } = useAuthStore();
  const navigation = useAppNavigation();
  const { setupNotifications } = useMessaging();
  const { writeUnfinishedRegistration } = useWriteUnfinishedRegistration();

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
    writeUnfinishedRegistration({ ...onBoarding.registrationDetails, notificationSettings: { connection: notifications, chat: notifications, superInvite: notifications, superJoin: notifications, joinedEvent: notifications, requests: notifications, myEvents: notifications }, uid: userMetadata.uid, phoneNumber: userMetadata.phoneNumber });
    navigation.navigate('/add-photos');
  };

  const handleNotificationsChange = (value: boolean): void => {
    setNotifications(value);
  };

  return (
    <CommonAuthLayout
      title="Confirm access"
      subtitle={`You’ll need to enable notifications in order to use Invited Only.`}
      startPercentage={20}
      endPercentage={30}
      continueButtonTitle="Continue"
      onContinuePress={handleNext}
      continueButtonTestID="continue-button"
      skipButtonTitle="Skip"
      onSkipPress={handleNext}
      skipButtonTestID="skip-button"
      withKeyboard={false}>
      <S.ToggleRow>
        <S.ToggleLabel>Notifications</S.ToggleLabel>
        <S.StyledSwitch
          testID="requests-switch"
          trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
          thumbColor={notifications ? blackColor : whiteColor}
          value={notifications}
          onValueChange={handleNotificationsChange}
        />
      </S.ToggleRow>
    </CommonAuthLayout>
  );
};

export default TurnNotifications;
