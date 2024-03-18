import {isIos, screenHeight} from 'constants/common';
import {FC, RefObject, useState, useEffect} from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HalfBackground from 'assets/images/auth/half-background.png';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {lightGray2Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {turnNotificationsPath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast.ts';

const ConfirmPhone: FC = ({navigation, route}: any): JSX.Element => {
  console.log('route?.params', route?.params);
  const confirm = route?.params?.confirm;
  const mobilePhone = route?.params?.mobilePhone;
  const [code, setCode] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  function onAuthStateChanged(user: any) {
    if (user) {
      console.log('user123: ', user);
    }
  }

  const handleConfirmPhoneNumber = async () => {
    try {
      console.log(code);
      await confirm.confirm(code);
      navigation.navigate(turnNotificationsPath);
    } catch (e: any) {
      console.log(e);
      showToast('cancel', ``, `${e}`);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <ImageBackground
      source={HalfBackground}
      style={{
        flex: 1,
      }}
      resizeMode="cover">
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={{alignItems: 'center', paddingHorizontal: 38}}>
                <LogoSecondary />
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: screenHeight / 30,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                      textAlign: 'center',
                    }}>
                    Confirm phone number
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    Please enter verification code sent to your mobile{' '}
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi700,
                        fontSize: RFValue(18, 812),
                      }}>
                      {mobilePhone}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <CodeField
                    ref={ref}
                    {...props}
                    value={code}
                    onChangeText={setCode}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    keyboardAppearance="dark"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                      <View
                        key={index}
                        style={{
                          borderRadius: 10,
                          backgroundColor: lightGray2Color,
                          flex: 1,
                          height: screenHeight / 18,
                          marginHorizontal: 8,
                        }}>
                        <Text style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                          {symbol || (isFocused ? <Cursor /> : '_')}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-start',
                    marginTop: screenHeight / 60,
                  }}>
                  <TouchableOpacity activeOpacity={0.7} hitSlop={{bottom: 10, right: 20}}>
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi700,
                        fontSize: RFValue(13, 812),
                      }}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{paddingHorizontal: 38, marginBottom: 4}}>
                <Button variant="transparent" title="Change phone number" onPress={() => navigation.goBack()} />
                <Button title="Next" onPress={() => handleConfirmPhoneNumber()} />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    lineHeight: 38,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginVertical: 'auto',
    fontSize: RFValue(16, 812),
    textAlign: 'center',
    color: whiteColor,
    fontFamily: Satoshi400,
  },
  focusCell: {
    borderRadius: 20,
    borderColor: '#000',
  },
});

export default ConfirmPhone;
