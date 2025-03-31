import {View} from 'react-native';
import * as S from './GuestInvitationStep.style';
import {useFormikContext} from 'formik';
import {CreateEventFormValues} from '../../CreateEventFlow';

const GuestInvitationStep = () => {
  const {values, setFieldValue} = useFormikContext<CreateEventFormValues>();
  const {female, male} = values;

  const incrementFemale = () => setFieldValue('female', female + 1);
  const decrementFemale = () => female > 0 && setFieldValue('female', female - 1);
  
  const incrementMale = () => setFieldValue('male', male + 1);
  const decrementMale = () => male > 0 && setFieldValue('male', male - 1);

  return (
    <S.WrapperSelectYourDesiredCompany>
      <S.TextSelectYourDesiredCompany>How many Guests would you like to invite?</S.TextSelectYourDesiredCompany>
      <View>
        <View>
          <S.TextPersonGender>Woman</S.TextPersonGender>
          <S.RowButtons>
            <S.ButtonPress onPress={decrementFemale}>
              <S.TextButton>-</S.TextButton>
            </S.ButtonPress>
            <S.WrapperTextCount>
              <S.TextCount>{female}</S.TextCount>
            </S.WrapperTextCount>
            <S.ButtonPress onPress={incrementFemale}>
              <S.TextButton>+</S.TextButton>
            </S.ButtonPress>
          </S.RowButtons>
        </View>

        <S.RowMale>
          <S.TextPersonGender>Male</S.TextPersonGender>
          <S.RowButtons>
            <S.ButtonPress onPress={decrementMale}>
              <S.TextButton>-</S.TextButton>
            </S.ButtonPress>
            <S.WrapperTextCount>
              <S.TextCount>{male}</S.TextCount>
            </S.WrapperTextCount>

            <S.ButtonPress onPress={incrementMale}>
              <S.TextButton>+</S.TextButton>
            </S.ButtonPress>
          </S.RowButtons>
        </S.RowMale>
      </View>
    </S.WrapperSelectYourDesiredCompany>
  );
};
export default GuestInvitationStep;
