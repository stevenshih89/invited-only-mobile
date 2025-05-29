import {FC, JSX, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Switch} from '@ant-design/react-native';
import DatePicker from 'react-native-date-picker';
import * as S from './EnterBirthday.style';
import {isIos} from 'constants/common';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import {backgroundGradientColors, grayColor, toggleColor, whiteColor} from 'constants/colors';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import CalendarIcon from 'assets/images/icons/calendar-new.svg';
import AuthProgress from 'components/AuthProgress';

import {useAuthStore} from 'src/store/authStore';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

const EnterBirthday: FC = (): JSX.Element => {
  const [showAge, setShowAge] = useState<boolean>(false);
  const {onBoarding, setOnBoarding} = useAuthStore();
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleShowAge = (value: boolean): void => {
    setShowAge(value);
  };

  const getDateString = (date: Date) => {
    if (!date) return '';

    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const year = String(adjustedDate.getFullYear());
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
    <S.GradientBackground colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}}>
      <S.KeyboardAvoidingWrapper behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.InnerWrapper>
            <S.ContentContainer>
              <S.TopContent>
                <S.HeaderContainer>
                  <BackButton onPress={() => navigation.goBack()} />
                  <LogoPrimary2 />
                  <AuthProgress startPercentage={40} endPercentage={50} animationDuration={1000} />
                </S.HeaderContainer>
                <S.TitleContainer>
                  <S.TitleText>Your birthday</S.TitleText>
                  <S.SubtitleText>Add your birthday. You can change it later (optional)</S.SubtitleText>
                </S.TitleContainer>
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
                    maximumDate={new Date()}
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
                  <Switch
                    trackColor={{false: grayColor, true: toggleColor}}
                    thumbTintColor={whiteColor}
                    checked={showAge}
                    onChange={handleShowAge}
                  />
                </S.ShowAgeContainer>
              </S.TopContent>
              <S.BottomContent>
                <Button title="Next" onPress={handleNext} />
                <Button title="Skip" variant="gray" onPress={handleSkip} />
              </S.BottomContent>
            </S.ContentContainer>
          </S.InnerWrapper>
        </TouchableWithoutFeedback>
      </S.KeyboardAvoidingWrapper>
    </S.GradientBackground>
  );
};

export default EnterBirthday;
