import {KeyboardAvoidingView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Cake from 'assets/images/icons/cake.svg';
import {blackColor, grayColor, lightGray2Color, toggleColor, transparentGray90Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import MaskInput from 'react-native-mask-input';
import {isIos} from 'constants/common';
import Button from 'components/Button/Button';

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

const ModalBirthday: FC<ModalBirthdayProps> = ({isVisible, onClose, month, setMonth, day, setDay, year, setYear, showAge, setShowAge, saveUserInfo}) => {
  const handleMonthChange = (input: string): void => {
    const numericInput = input.replace(/[^0-9]/g, '');
    const trimmedInput = numericInput.slice(0, 2);
    const monthInt = parseInt(trimmedInput, 10);

    if (trimmedInput.length === 2 && (monthInt < 1 || monthInt > 12)) {
      return;
    }
    setMonth(trimmedInput);
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
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{paddingBottom: 0}}>
        <View
          style={{
            backgroundColor: blackColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom: 40,
            paddingTop: 16,
            paddingHorizontal: 30,
          }}>
          <View style={{backgroundColor: whiteColor, height: 2, borderRadius: 10, width: 40, alignSelf: 'center', marginBottom: 22}} />
          <View
            style={{
              borderRadius: 100,
              backgroundColor: transparentGray90Color,
              height: 84,
              width: 84,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            <Cake width={32} height={32} />
          </View>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          What is your birthday?
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show my age</Text>
            <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showAge} onChange={val => setShowAge(val)} />
          </View>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 6}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(13, 812)}}>Month</Text>
              <MaskInput
                style={{
                  color: whiteColor,
                  borderRadius: 10,
                  backgroundColor: lightGray2Color,
                  height: 51,
                  paddingHorizontal: 20,
                  marginTop: 12,
                }}
                keyboardAppearance="dark"
                value={month}
                keyboardType="number-pad"
                onChangeText={(masked: any) => handleMonthChange(masked)}
                placeholder="MM"
                placeholderTextColor={whiteColor}
                mask={[/\d/, /\d/]}
              />
            </View>
            <View style={{flex: 1, marginHorizontal: 6}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(13, 812)}}>Day</Text>
              <MaskInput
                style={{
                  color: whiteColor,
                  borderRadius: 10,
                  backgroundColor: lightGray2Color,
                  height: 64,
                  paddingHorizontal: 20,
                  marginTop: 12,
                  flex: 1,
                }}
                keyboardAppearance="dark"
                value={day}
                keyboardType="number-pad"
                onChangeText={(masked: any) => handleDayChange(masked)}
                placeholder="DD"
                placeholderTextColor={whiteColor}
                mask={[/\d/, /\d/]}
              />
            </View>
            <View style={{flex: 1, marginLeft: 6}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(13, 812)}}>Year</Text>
              <MaskInput
                style={{
                  color: whiteColor,
                  borderRadius: 10,
                  backgroundColor: lightGray2Color,
                  height: 64,
                  paddingHorizontal: 20,
                  marginTop: 12,
                  flex: 1,
                }}
                keyboardAppearance="dark"
                value={year}
                keyboardType="number-pad"
                onChangeText={(masked: any) => handleYearChange(masked)}
                placeholder="YYYY"
                placeholderTextColor={whiteColor}
                mask={[/\d/, /\d/, /\d/, /\d/]}
              />
            </View>
          </View>
          <Button onPress={saveUserInfo} title="Save" buttonStyle={{marginTop: 20}} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalBirthday;
