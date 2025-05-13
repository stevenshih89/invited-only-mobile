import { FC, JSX, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Switch } from '@ant-design/react-native';
import * as S from './EnterBirthday.style';
import { isIos } from 'constants/common';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import { backgroundGradientColors, grayColor, toggleColor, whiteColor } from 'constants/colors';
import Button from 'components/Button/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';

import AuthProgress from 'components/AuthProgress';

import { useAuthStore } from 'src/store/authStore';

const EnterBirthday: FC = (): JSX.Element => {
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [showAge, setShowAge] = useState<boolean>(false);
  const { onBoarding, setOnBoarding } = useAuthStore();

  const handleShowAge = (value: boolean): void => {
    setShowAge(value);
  };
  const handleMonthChange = (input: string): void => {
    const numericInput = input.replace(/[^0-9]/g, '');
    const trimmedInput = numericInput.slice(0, 2);
    const monthInt = parseInt(trimmedInput, 10);

    if (trimmedInput.length === 2 && (monthInt < 1 || monthInt > 12)) {
      return;
    }
    setMonth(trimmedInput);
  };

  const checkMonth = () => {
    if (month.length === 1 && Number(month) >= 1 && Number(month) <= 9) {
      setMonth(`0${month}`);
    }
  };

  const checkDay = () => {
    if (day.length === 1 && Number(day) >= 1 && Number(day) <= 9) {
      setDay(`0${day}`);
    }
  };

  const handleDayChange = (input: string): void => {
    const numericInput = input.replace(/[^0-9]/g, '');
    const trimmedInput = numericInput.slice(0, 2);
    const dayInt = parseInt(trimmedInput, 10);

    if (trimmedInput.length === 2 && (dayInt < 1 || dayInt > 31)) {
      return;
    }

    setDay(trimmedInput);
  };

  const handleYearChange = (input: string) => {
    const numericInput = input.replace(/[^0-9]/g, '');
    const trimmedInput = numericInput.slice(0, 4);
    const currentYear = new Date().getFullYear();
    const yearInt = parseInt(trimmedInput, 10);

    if (trimmedInput.length === 4 && (yearInt < 1900 || yearInt > currentYear)) {
      return;
    }

    setYear(trimmedInput);
  };

  const handleNext = () => {
    if (!day || !month || !year) {
      return;
    }

    setOnBoarding({
      ...onBoarding,
      onboardingStep: '/my-interests',
      registrationDetails: {
        ...onBoarding.registrationDetails,
        showAge: showAge,
        birthday: `${month}.${day}.${year}`,
      },
    });
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
    <S.GradientBackground colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
      <S.KeyboardAvoidingWrapper behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.InnerWrapper>
            <S.ContentContainer>
              <S.TopContent>
                <S.HeaderContainer>
                  <S.BackButton
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <ArrowLeft />
                  </S.BackButton>
                  <LogoPrimary2 />
                  <AuthProgress startPercentage={40} endPercentage={50} animationDuration={1000} />
                </S.HeaderContainer>
                <S.TitleContainer>
                  <S.TitleText>Your birthday</S.TitleText>
                  <S.SubtitleText>Add your birthday. You can change it later (optional)</S.SubtitleText>
                </S.TitleContainer>
                <S.DateInputRow>
                  <S.DateInputContainer marginRight={6}>
                    <S.InputLabel>Month</S.InputLabel>
                    <S.StyledMaskInput
                      keyboardAppearance="dark"
                      value={month}
                      keyboardType="number-pad"
                      onBlur={checkMonth}
                      onChangeText={handleMonthChange}
                      placeholder="MM"
                      placeholderTextColor={whiteColor}
                      mask={[/\d/, /\d/]}
                    />
                  </S.DateInputContainer>
                  <S.DateInputContainer marginHorizontal={6}>
                    <S.InputLabel>Day</S.InputLabel>
                    <S.StyledMaskInput
                      keyboardAppearance="dark"
                      value={day}
                      keyboardType="number-pad"
                      onBlur={checkDay}
                      onChangeText={handleDayChange}
                      placeholder="DD"
                      placeholderTextColor={whiteColor}
                      mask={[/\d/, /\d/]}
                    />
                  </S.DateInputContainer>
                  <S.DateInputContainer marginLeft={6}>
                    <S.InputLabel>Year</S.InputLabel>
                    <S.StyledMaskInput
                      keyboardAppearance="dark"
                      value={year}
                      keyboardType="number-pad"
                      onChangeText={handleYearChange}
                      placeholder="YYYY"
                      placeholderTextColor={whiteColor}
                      mask={[/\d/, /\d/, /\d/, /\d/]}
                    />
                  </S.DateInputContainer>
                </S.DateInputRow>
                <S.ShowAgeContainer>
                  <S.ShowAgeText>Show my age on my profile</S.ShowAgeText>
                  <Switch
                    trackColor={{ false: grayColor, true: toggleColor }}
                    thumbTintColor={whiteColor}
                    checked={showAge}
                    onChange={handleShowAge}
                  />
                </S.ShowAgeContainer>
              </S.TopContent>
              <S.BottomContent>
                <Button
                  title="Next"
                  disabled={!day || !month || !year || year.length < 4 || month.length < 2 || day.length < 2}
                  onPress={handleNext}
                />
                <S.SkipButton onPress={handleSkip}>
                  <S.SkipButtonText>Skip</S.SkipButtonText>
                </S.SkipButton>
              </S.BottomContent>
            </S.ContentContainer>
          </S.InnerWrapper>
        </TouchableWithoutFeedback>
      </S.KeyboardAvoidingWrapper>
    </S.GradientBackground>
  );
};

export default EnterBirthday;
