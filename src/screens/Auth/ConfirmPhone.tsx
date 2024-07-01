import {isIos, screenHeight} from 'constants/common';
import {FC, RefObject, useState, useEffect} from 'react';
import {
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
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {black1Color, gray1Color, lightGray2Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {chooseAccountTypePath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast.ts';
import firebase from '@react-native-firebase/firestore';

const ConfirmPhone: FC = ({navigation, route}: any): JSX.Element => {
  const mobilePhone = route?.params?.mobilePhone;
  const [code, setCode] = useState<string>('');
  const [isUserExist, setIsUserExist] = useState<boolean>(false);
  const [nextRoute, setNextRoute] = useState<string>(chooseAccountTypePath);
  const [loadingConfirmation, setLoadingConfirmation] = useState<boolean>(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const [confirm, setConfirm] = useState<any>(route?.params?.confirm);

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  const onAuthStateChanged = async (user: any) => {
    if (user) {
      const userData = await firebase().collection('userInfo').doc(user.uid).get();

      if (userData.exists) {
        setIsUserExist(true);
        console.warn('user: ', user);
      } else {
        setNextRoute(chooseAccountTypePath);
      }
      console.warn('user123: ', user);
    } else {
      setNextRoute(chooseAccountTypePath);
    }
  };

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
    } catch (e: any) {
      showToast('cancel', `${e?.message.split(']')[1]}`);
      console.warn(e);
    }
  }

  const handleConfirmPhoneNumber = async () => {
    try {
      setLoadingConfirmation(true);
      console.warn(isUserExist);
      await confirm.confirm(code);

      // if (isUserExist) {
      //   setOnBoarding(true);
      //   setAuthState(true);
      // } else {
      navigation.navigate(nextRoute);
      // }
      setLoadingConfirmation(false);
    } catch (e: any) {
      console.log(e);
      showToast('cancel', '', `${e}`);
      setLoadingConfirmation(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={15}
      style={{flex: 1, backgroundColor: black1Color}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{alignItems: 'center', paddingHorizontal: 24}}>
              <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
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
                <LogoPrimary2 />
                <View />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(34, 812),
                    marginBottom: 18,
                  }}>
                  Phone number verification
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(18, 812),
                  }}>
                  Please enter verification code sent to your mobile{' '}
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi700,
                      fontSize: RFValue(18, 812),
                    }}>
                    {mobilePhone.slice(-3)}
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
                  flexDirection: 'row',
                  marginTop: screenHeight / 60,
                }}>
                <Text
                  style={{
                    color: gray1Color,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(13, 812),
                  }}>
                  Didn't receive the code?{' '}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={signInWithPhoneNumber} hitSlop={{bottom: 10, right: 20}}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi700,
                      fontSize: RFValue(13, 812),
                    }}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingHorizontal: 38, marginBottom: 4}}>
              <Button title="Verify" disabled={code.length < 6} loading={loadingConfirmation} onPress={() => handleConfirmPhoneNumber()} />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
