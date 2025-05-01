import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {useConfirmPhone} from './hooks/useConfirmPhone';
import {isIos, screenHeight} from 'constants/common';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {backgroundGradientColors, gray1Color, lightGray2Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import Button from 'components/Button/Button';
import Loader from 'components/Modal/ModalLoader/Loader';

interface ConfirmPhoneProps {
  navigation: any;
  route: {
    params: {
      mobilePhone: string;
      isLogin?: boolean;
    };
  };
}

const ConfirmPhone = ({route, navigation}: ConfirmPhoneProps) => {
  const {
    mobilePhone,
    code,
    setCode,
    ref,
    props,
    getCellOnLayoutHandler,
    signInWithPhoneNumber,
    handleConfirmPhoneNumber,
    resendTimer,
    isLoadingVerifyOtp,
    isLoadingSendOtp,
    CELL_COUNT,
  } = useConfirmPhone(route);
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
                    Didn&apos;t receive the code?{' '}
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
