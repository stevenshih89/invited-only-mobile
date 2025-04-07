import {isIos, screenHeight} from 'constants/common';
import {RefObject, useState, useEffect, useContext} from 'react';
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
import {chooseAccountTypePath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast.ts';
import firebase from '@react-native-firebase/firestore';
import Loader from 'components/Modal/ModalLoader/Loader';
import LinearGradient from 'react-native-linear-gradient';

import {logErrorToSentry} from 'helpers/logErrorsToSentry';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from 'contexts/AuthContext';
import {useUser} from 'src/store/userStore';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

interface ConfirmPhoneProps {
  navigation: any;
  route: {
    params: {
      mobilePhone: string;
      confirm?: any;
      isLogin?: boolean;
    };
  };
}

const ConfirmPhone = ({route, navigation}: ConfirmPhoneProps) => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const mobilePhone = route?.params?.mobilePhone;
  const isLogin = route?.params?.isLogin || false;
  const [code, setCode] = useState<string>('');
  const [loadingConfirmation, setLoadingConfirmation] = useState<boolean>(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const [confirm, setConfirm] = useState<any>(route?.params?.confirm);
  const [resendTimer, setResendTimer] = useState(0);

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  const setUserData = useUser((i: any) => i?.setUser);
  const {setUser} = useContext(AuthContext);

  const checkUserExists = async (uid: string) => {
    try {
      const userData = await firebase().collection(apiUserInfoCollection).doc(uid).get();

      if (!userData.exists) {
        return false;
      }

      const userDocument = userData.data();
      if (!userDocument?.uid) {
        return false;
      }

      // If this is a login and user exists, set user data
      if (isLogin) {
        await AsyncStorage.setItem('uid', uid);
        setUserData(userDocument);
        setUser([uid]);
      }

      return true;
    } catch (err) {
      logErrorToSentry(err);
      return false;
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
    }
  }

  const handleConfirmPhoneNumber = async () => {
    try {
      setLoadingConfirmation(true);

      await confirm.confirm(code);
      const uid = auth().currentUser?.uid;

      if (isLogin && uid) {
        // For login flow
        const userExists = await checkUserExists(uid);

        if (!userExists) {
          showToast('inviteMatch', 'User account not found', 'Fail');
          await auth().signOut();
          setLoadingConfirmation(false);
          return;
        }

        // User exists and is logged in, navigate to app
        // Use the correct navigation path without the leading slash
        setTimeout(() => {
          navigation.navigate('bottom-tabs-stack');
        }, 1000);
      } else {
        // For signup flow, navigate to account type selection
        setTimeout(() => {
          navigation.navigate(chooseAccountTypePath);
        }, 1000);
      }

      setLoadingConfirmation(false);
    } catch (e: any) {
      showToast('inviteMatch', '', `${e}`);
      setLoadingConfirmation(false);
    }
  };

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
                    testID="back-button"
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
                      {mobilePhone?.slice(-3)}
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
                    testID="verification-code-input"
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
