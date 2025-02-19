import {isIos, screenHeight} from 'constants/common';
import {FC, RefObject, useState, useEffect, useCallback} from 'react';
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
import {backgroundGradientColors, gray1Color, lightGray2Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {bottomTabsStackPath, chooseAccountTypePath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast.ts';
import firebase from '@react-native-firebase/firestore';
import Loader from 'components/Modal/ModalLoader/Loader';
import LinearGradient from 'react-native-linear-gradient';
import Config from 'react-native-config';
import {useFocusEffect} from '@react-navigation/native';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const ConfirmPhone: FC = ({navigation, route}: any): JSX.Element => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const mobilePhone = route?.params?.mobilePhone;
  const [code, setCode] = useState<string>('');
  const [nextRoute, setNextRoute] = useState<string>(chooseAccountTypePath);
  const [loadingConfirmation, setLoadingConfirmation] = useState<boolean>(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const [confirm, setConfirm] = useState<any>(route?.params?.confirm);
  const [resendTimer, setResendTimer] = useState(0);

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  const onAuthStateChanged = async (user: any) => {
      console.warn(user);
    try{
    if (!user?.uid) {
      setNextRoute(chooseAccountTypePath);
      return;
    }
   
    const userData = await firebase().collection(apiUserInfoCollection).doc(user.uid).get();

    if (!userData.exists) {
      setNextRoute(chooseAccountTypePath);
      return;
    }

    const userDocument = userData.data();

    if (!userDocument?.uid) {
      setNextRoute(chooseAccountTypePath);
      return;
    }
          setNextRoute(bottomTabsStackPath);
    } catch(err){
      logErrorToSentry(err)
    }


  };

  useEffect(() => {
    let timer: any;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      setResendTimer(59);
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
    } catch (e: any) {
      showToast('inviteMatch', `${e?.message.split(']')[1]}`);
      // console.warn(e);
    }
  }

  const handleConfirmPhoneNumber = async () => {
    try {
      setLoadingConfirmation(true);
      // console.warn(isUserExist);
      await confirm.confirm(code);
      setTimeout(() => {
        navigation.navigate(nextRoute);
      }, 1000);
      // navigation.navigate(bottomTabsStackPath, {
      //   screen: IOPath,
      // });
      setLoadingConfirmation(false);
    } catch (e: any) {
      // console.log(e);
      showToast('inviteMatch', '', `${e}`);
      setLoadingConfirmation(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return () => {
        console.warn('unmount mobile');
        subscriber();
      };
    }, []),
  );

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={{alignItems: 'center', paddingHorizontal: 24}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: screenHeight / 29,
                  }}>
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
                    marginTop: screenHeight / 12,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(48, 932),
                      marginBottom: 18,
                    }}>
                    Phone number verification
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 932),
                      opacity: 0.8,
                    }}>
                    Please enter the verification code sent to your mobile{' '}
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi700,
                        fontSize: RFValue(18, 932),
                        opacity: 0.8,
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
                      fontSize: RFValue(13, 932),
                    }}>
                    Didn't receive the code?{' '}
                  </Text>
                  {!resendTimer ? (
                    <TouchableOpacity activeOpacity={0.7} onPress={signInWithPhoneNumber} hitSlop={{bottom: 10, right: 20}}>
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi700,
                          fontSize: RFValue(13, 932),
                          textDecorationLine: 'underline',
                        }}>
                        Resend Code
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi700,
                        fontSize: RFValue(13, 932),
                      }}>
                      Resend in {resendTimer}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{paddingHorizontal: 38, marginBottom: 4}}>
                <Button
                  title="Verify"
                  disabled={code.length < 6}
                  loading={loadingConfirmation}
                  onPress={() => handleConfirmPhoneNumber()}
                />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
        <Loader isVisible={loadingConfirmation} textLoader="Please wait..." successfulPay={false} />
      </KeyboardAvoidingView>
    </LinearGradient>
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
    fontSize: RFValue(16, 932),
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
