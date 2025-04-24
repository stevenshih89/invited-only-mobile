import React, { FC } from 'react';
import * as S from './MyGeneral.style';
import CalendarIcon from 'assets/images/icons/calendar-new.svg';
import LockIcon from 'assets/images/icons/lock-02.svg';
import { blackColor, whiteColor } from 'constants/colors';

interface MyGeneralProps {
  gender: string | null;
  date: string;
  showAge: boolean;
  setDate: (value: string) => void;
  setShowAge: (value: boolean) => void;
  name: string;
}

const MyGeneral: FC<MyGeneralProps> = ({ gender, date, showAge, setShowAge, setDate, name }) => {
  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Title>General</S.Title>

      <S.InputContainer>
        <S.InputLabel>First name</S.InputLabel>
        <S.LockedInputContainer>
          <S.LockedInputText>{name}</S.LockedInputText>
          <LockIcon />
        </S.LockedInputContainer>
      </S.InputContainer>
      <S.InputContainer>
        <S.InputLabel>Gender</S.InputLabel>
        <S.LockedInputContainer>
          <S.LockedInputText>{gender}</S.LockedInputText>
          <LockIcon />
        </S.LockedInputContainer>
      </S.InputContainer>
      <S.InputContainer>
        <S.InputLabel>
          Date of birthday<S.RequiredMark>*</S.RequiredMark>
        </S.InputLabel>
        <S.DateInputContainer>
          <CalendarIcon />
          <S.StyledMaskInput
            value={date}
            onChangeText={(value: string) => setDate(value)}
            mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
            keyboardType="numeric"
            placeholder="MM/DD/YYYY"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
          />
        </S.DateInputContainer>
      </S.InputContainer>
      <S.ShowAgeContainer>
        <S.ShowAgeText>Show my age on my profile</S.ShowAgeText>
        <S.StyledSwitch
          trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
          thumbColor={showAge ? blackColor : whiteColor}
          value={showAge}
          onValueChange={setShowAge}
        />
      </S.ShowAgeContainer>
    </S.StyledRadialGradient>
  );
};

export default MyGeneral;
