import { FC, JSX, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import * as S from './EnterBirthday.style';
import { blackColor, whiteColor } from 'constants/colors';
import { useAppNavigation } from 'hooks/useAppNavigation';
import CalendarIcon from 'assets/images/icons/calendar-new.svg';

import { useAuthStore } from 'src/store/authStore';
import { useWriteUnfinishedRegistration } from 'screens/Auth/hooks/useUnfinishedRegistration';

const EnterBirthday: FC = (): JSX.Element => {
  const [showAge, setShowAge] = useState<boolean>(false);
  const { onBoarding, setOnBoarding, userMetadata } = useAuthStore();
  const { writeUnfinishedRegistration } = useWriteUnfinishedRegistration();
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleShowAge = (value: boolean): void => {
    setShowAge(value);
  };

  const getDateString = (date: Date) => {
    if (!date) return '';

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${month}/${day}/${year}`;
  };

  const handleNext = () => {
    if (!date) return;

    const formattedDate = getDateString(date);
    const [month, day, year] = formattedDate.split('/');

    setOnBoarding({
      ...onBoarding,
      onboardingStep: '/my-interests',
      registrationDetails: {
        ...onBoarding.registrationDetails,
        showAge: showAge,
        birthday: `${month}.${day}.${year}`,
      },
    });
    writeUnfinishedRegistration({ ...onBoarding.registrationDetails, showAge: showAge, birthday: `${month}.${day}.${year}`, uid: userMetadata.uid, phoneNumber: userMetadata.phoneNumber });
    navigation.navigate('/my-interests');
  };

  const handleSkip = () => {
    setOnBoarding({
      ...onBoarding,
      onboardingStep: '/my-interests',
      registrationDetails: {
        ...onBoarding.registrationDetails,
        showAge: false,
        birthday: '',
      },
    });
    navigation.navigate('/my-interests');
  };

  const navigation = useAppNavigation();

  return (
    <CommonAuthLayout
      title="Your birthday"
      subtitle="Add your birthday. You can change it later (optional)"
      startPercentage={40}
      endPercentage={50}
      continueButtonTitle="Next"
      continueButtonDisabled={!date}
      onContinuePress={handleNext}
      skipButtonTitle="Skip"
      onSkipPress={handleSkip}>
      <S.HalfFieldContainer>
        <S.Input onPress={() => setShowDatePicker(true)}>
          <CalendarIcon />
          <S.StyledTextInput
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#767676"
            value={date ? getDateString(date || new Date()) : ''}
            editable={false}
            pointerEvents="none"
          />
        </S.Input>
        <DatePicker
          open={showDatePicker}
          onCancel={() => {
            setShowDatePicker(false);
          }}
          modal
          theme="dark"
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date(new Date().getFullYear() - 18, 0, 1)}
          date={date || new Date()}
          mode="date"
          onConfirm={date => {
            setDate(date);
            setShowDatePicker(false);
          }}
        />
      </S.HalfFieldContainer>
      <S.ShowAgeContainer>
        <S.ShowAgeText>Show my age on my profile</S.ShowAgeText>
        <S.StyledSwitch
          testID="requests-switch"
          trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
          thumbColor={showAge ? blackColor : whiteColor}
          value={showAge}
          onValueChange={handleShowAge}
        />
      </S.ShowAgeContainer>
    </CommonAuthLayout>
  );
};

export default EnterBirthday;
