import {isIos, screenHeight} from 'constants/common';
import {FC, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {grayColor, lightGray2Color, toggleColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {genderPath} from 'constants/pathLocations';
import {Switch} from '@ant-design/react-native';
import MaskInput from 'react-native-mask-input';

const EnterBirthday: FC = (): JSX.Element => {
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [showAge, setShowAge] = useState<boolean>(false);

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

  const navigation = useAppNavigation();

  return (
    <ImageBackground source={HalfBackground} resizeMode="cover" style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 38,
              }}>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                    style={{
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: transparentWhite30Color,
                    }}>
                    <ArrowLeft />
                  </TouchableOpacity>
                  <LogoSecondary />
                  <View style={{height: 40, justifyContent: 'center'}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>4/9</Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: screenHeight / 26,
                    marginTop: screenHeight / 80,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                      textAlign: 'center',
                    }}>
                    My birthday
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    Add your birthday. You can change these later
                  </Text>
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
                <View
                  style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: screenHeight / 26}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>Show my age on my profile</Text>
                  <Switch trackColor={{false: grayColor, true: toggleColor}} thumbTintColor={whiteColor} checked={showAge} onChange={handleShowAge} />
                </View>
              </View>
              <View style={{marginBottom: 4}}>
                <Button onPress={() => navigation.navigate(genderPath as never)} title="Next" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default EnterBirthday;
