import { RefObject, useState, useContext } from 'react';
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
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { RFValue } from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { isIos, screenHeight } from 'constants/common';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';
import { backgroundGradientColors, gray1Color, lightGray2Color, transparentWhite30Color, whiteColor } from 'constants/colors';
import Button from 'components/Button/Button';
import { chooseAccountTypePath } from 'constants/pathLocations';
import { showToast } from 'helpers/showToast.ts';
import Loader from 'components/Modal/ModalLoader/Loader';


import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';
import { components } from 'src/api/v1';

interface ConfirmPhoneProps {
  navigation: any;
  route: {
    params: {
      mobilePhone: string;
      isLogin?: boolean;
    };
  };
}

const ConfirmPhone = ({ route, navigation }: ConfirmPhoneProps) => {
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const mobilePhone = route?.params?.mobilePhone;
  const isLogin = route?.params?.isLogin || false;
  const [code, setCode] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const [resendTimer, setResendTimer] = useState(0);

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });

  console.log('resendTimer', resendTimer);

  const { setOnBoarding, setAccessToken, setRefreshToken, setUserMetadata } = useAuthStore();
  console.log('setOnBoarding', setOnBoarding);
  const { mutate: verifyOtp, isPending: isLoadingVerifyOtp } = invitedOnlyBackendApi.useMutation('post', '/auth/verify-otp');
  const { mutate: sendOtp, isPending: isLoadingSendOtp } = invitedOnlyBackendApi.useMutation('post', '/auth/send-otp');


  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      setResendTimer(59);
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');
      await sendOtp({ body: { phone } });

    } catch (e: any) {
      showToast('inviteMatch', `${e?.message.split(']')[1]}`);
    }
  }

  const handleConfirmPhoneNumber = async () => {
    try {


      if (isLogin) {
        const userQuerySnapshot = await firestore()
          .collection(apiUserInfoCollection)
          .where('phoneNumber', '==', mobilePhone)
          .limit(1) // Limit to 1 result for efficiency
          .get();

        // Correctly check if the query snapshot is empty
        if (userQuerySnapshot.empty) {
          showToast('inviteMatch', 'No account found with this phone number', 'Fail');
          return;
        }

        const userData = userQuerySnapshot.docs[0].data() as components['schemas']['User'];

        verifyOtp({ body: { phone: mobilePhone, code } }, {
          onSuccess: (data) => {
            setOnBoarding({
              isOnboardingCompleted: true,
              userType: userData.accountType as 'host' | 'guest', // Use userData
              onboardingStep: '/onboarding-demo-path',
            });

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);


            if (userData.uid && userData.phoneNumber) {
              setUserMetadata({
                uid: userData.uid,
                phoneNumber: userData.phoneNumber,
              });
            } else {
              console.error("User data from Firestore missing uid or phoneNumber:", userData);
              // Handle this error appropriately - perhaps show a different toast?
              showToast('inviteMatch', 'Failed to retrieve user details.', 'Error');
            }
          },
          onError: (error) => {
            console.error("Verify OTP Error:", error);
            // Handle verifyOtp specific errors (e.g., incorrect code)
            showToast('inviteMatch', 'Verification failed. Please check the code.', 'Error');
          }
        });
      } else {
        // For signup flow, navigate to account type selection
        setTimeout(() => {
          navigation.navigate(chooseAccountTypePath);
        }, 1000);
      }

    } catch (e: any) {
      console.error("handleConfirmPhoneNumber Error:", e);
      showToast('inviteMatch', '', `An unexpected error occurred.`);
    }
  };

  return (
    <LinearGradient colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
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
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                    renderCell={({ index, symbol, isFocused }) => (
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
                    Didn&apos;t receive the code?{' '}
                  </Text>
                  {!resendTimer ? (
                    <TouchableOpacity activeOpacity={0.7} onPress={signInWithPhoneNumber} hitSlop={{ bottom: 10, right: 20 }}>
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
              <View style={{ paddingHorizontal: 38, marginBottom: 4 }}>
                <Button
                  title="Verify"
                  disabled={code.length < 6}
                  loading={isLoadingVerifyOtp || isLoadingSendOtp}
                  onPress={() => handleConfirmPhoneNumber()}
                />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
        <Loader isVisible={isLoadingVerifyOtp} textLoader="Please wait..." successfulPay={false} />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cell: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(16, 932),
    lineHeight: 38,
    marginBottom: 'auto',
    marginTop: 'auto',
    marginVertical: 'auto',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
    borderRadius: 20,
  },
});

export default ConfirmPhone;
