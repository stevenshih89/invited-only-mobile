import Modal from 'react-native-modal';
import Cake from 'assets/images/icons/cake.svg';
import {grayColor, toggleColor, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {isIos} from 'constants/common';
import Button from 'components/Button/Button';
import {useModalBirthday} from 'hooks/useModalBirthday';
import * as S from './ModalBirthday.style';

interface ModalBirthdayProps {
  isVisible: boolean;
  onClose: () => void;
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
  day: string;
  setDay: Dispatch<SetStateAction<string>>;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  showAge: boolean;
  setShowAge: Dispatch<SetStateAction<boolean>>;
  saveUserInfo: any;
}

const ModalBirthday: FC<ModalBirthdayProps> = ({
  isVisible,
  onClose,
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
  showAge,
  setShowAge,
  saveUserInfo,
}) => {
  const {handleMonthChange, handleDayChange, handleYearChange} = useModalBirthday({setMonth, setDay, setYear});

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <S.KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={0}>
        <S.Container>
          <S.HandleBar />
          <S.IconContainer>
            <Cake width={32} height={32} />
          </S.IconContainer>
          <S.TitleText>What is your birthday?</S.TitleText>
          <S.Row>
            <S.OptionText>Show my age</S.OptionText>
            <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showAge} onChange={val => setShowAge(val)} />
          </S.Row>
          <S.InputRow>
            <S.InputContainer>
              <S.LabelText>Month</S.LabelText>
              <S.MaskedInput
                keyboardAppearance="dark"
                value={month}
                keyboardType="number-pad"
                onChangeText={(masked: any) => handleMonthChange(masked)}
                placeholder="MM"
                placeholderTextColor={whiteColor}
                mask={[/\d/, /\d/]}
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.LabelText>Day</S.LabelText>
              <S.MaskedInput
                keyboardAppearance="dark"
                value={day}
                keyboardType="number-pad"
                onChangeText={(masked: any) => handleDayChange(masked)}
                placeholder="DD"
                placeholderTextColor={whiteColor}
                mask={[/\d/, /\d/]}
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.LabelText>Year</S.LabelText>
              <S.MaskedInput
                keyboardAppearance="dark"
                value={year}
                keyboardType="number-pad"
                onChangeText={(masked: any) => handleYearChange(masked)}
                placeholder="YYYY"
                placeholderTextColor={whiteColor}
                mask={[/\d/, /\d/, /\d/, /\d/]}
              />
            </S.InputContainer>
          </S.InputRow>
          <Button
            onPress={() => {
              saveUserInfo('Birthday');
              onClose();
            }}
            title="Save"
            buttonStyle={{marginTop: 20}}
          />
        </S.Container>
      </S.KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalBirthday;
