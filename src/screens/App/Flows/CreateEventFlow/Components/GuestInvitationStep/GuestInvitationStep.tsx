import {View} from 'react-native';
import * as S from './GuestInvitationStep.style';
import {useState} from 'react';

const GuestInvitationStep = () => {
  const [female, setFemale] = useState<number>(0);
  const [male, setMale] = useState<number>(0);
  return (
    <S.WrapperSelectYourDesiredCompany>
      <S.TextSelectYourDesiredCompany>How many Guests would you like to invite?</S.TextSelectYourDesiredCompany>
      <View>
        <View>
          <S.TextPersonGender>Woman</S.TextPersonGender>
          <S.RowButtons>
            <S.ButtonPress onPress={() => female !== 0 && setFemale(female - 1)}>
              <S.TextButton>-</S.TextButton>
            </S.ButtonPress>
            <S.WrapperTextCount>
              <S.TextCount>{female}</S.TextCount>
            </S.WrapperTextCount>
            <S.ButtonPress onPress={() => setFemale(female + 1)}>
              <S.TextButton>+</S.TextButton>
            </S.ButtonPress>
          </S.RowButtons>
        </View>

        <S.RowMale>
          <S.TextPersonGender>Male</S.TextPersonGender>
          <S.RowButtons>
            <S.ButtonPress onPress={() => male !== 0 && setMale(male - 1)}>
              <S.TextButton>-</S.TextButton>
            </S.ButtonPress>
            <S.WrapperTextCount>
              <S.TextCount>{male}</S.TextCount>
            </S.WrapperTextCount>

            <S.ButtonPress onPress={() => setMale(male + 1)}>
              <S.TextButton>+</S.TextButton>
            </S.ButtonPress>
          </S.RowButtons>
        </S.RowMale>
      </View>
    </S.WrapperSelectYourDesiredCompany>
  );
};
export default GuestInvitationStep;
