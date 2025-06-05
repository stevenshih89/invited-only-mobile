import {View} from 'react-native';
import {useFormikContext} from 'formik';
import {components} from '@invited-only/invited-only-api';
import {FC} from 'react';
import * as S from './GuestInvitationStep.style';

interface GuestInvitationStepProps {
  handleNextStep: () => void;
}

const GuestInvitationStep: FC<GuestInvitationStepProps> = ({handleNextStep}) => {
  const {values, setFieldValue, touched} = useFormikContext<Partial<components['schemas']['EventData']>>();
  const {maleFriend, femaleFriend} = values;

  const incrementFemale = () => setFieldValue('femaleFriend', (femaleFriend ?? 0) + 1);
  const decrementFemale = () => (femaleFriend ?? 0) > 0 && setFieldValue('femaleFriend', (femaleFriend ?? 0) - 1);

  const incrementMale = () => setFieldValue('maleFriend', (maleFriend ?? 0) + 1);
  const decrementMale = () => (maleFriend ?? 0) > 0 && setFieldValue('maleFriend', (maleFriend ?? 0) - 1);

  return (
    <S.Wrapper>
      <S.WrapperSelectYourDesiredCompany>
        <S.TextSelectYourDesiredCompany>How many Guests would you like to invite?</S.TextSelectYourDesiredCompany>
        {touched.maleFriend && touched.femaleFriend && maleFriend === 0 && femaleFriend === 0 && (
          <S.ErrorText>At least one guest is required</S.ErrorText>
        )}
        <View>
          <View>
            <S.TextPersonGender>Woman</S.TextPersonGender>
            <S.RowButtons>
              <S.ButtonPress onPress={decrementFemale}>
                <S.TextButton>-</S.TextButton>
              </S.ButtonPress>
              <S.WrapperTextCount>
                <S.TextCount>{femaleFriend}</S.TextCount>
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
                <S.TextCount>{maleFriend}</S.TextCount>
              </S.WrapperTextCount>

              <S.ButtonPress onPress={incrementMale}>
                <S.TextButton>+</S.TextButton>
              </S.ButtonPress>
            </S.RowButtons>
          </S.RowMale>
        </View>
      </S.WrapperSelectYourDesiredCompany>
      <S.ButtonsContainer>
        <S.ContinueButton onPress={handleNextStep}>
          <S.ContinueButtonText>{'Continue'}</S.ContinueButtonText>
        </S.ContinueButton>
      </S.ButtonsContainer>
    </S.Wrapper>
  );
};
export default GuestInvitationStep;
