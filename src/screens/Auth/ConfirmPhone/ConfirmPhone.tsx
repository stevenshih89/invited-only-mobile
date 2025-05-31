import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Cursor} from 'react-native-confirmation-code-field';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {useConfirmPhone} from './hooks/useConfirmPhone';
import * as S from './ConfirmPhone.style';
import {isIos, screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {backgroundGradientColors, whiteColor} from 'constants/colors';
import Button from 'components/Button/Button';
import Loader from 'components/Modal/ModalLoader/Loader';
import {useAppNavigation} from 'hooks/useAppNavigation';
import HeaderBackButton from 'navigator/Components/HeaderBackButton/HeaderBackButton';
import LogoPrimary from 'assets/images/auth/logo-primary-2.svg';
import AuthProgress from 'components/AuthProgress';

interface ConfirmPhoneProps {
  route: {
    params: {
      mobilePhone: string;
      isLogin?: boolean;
    };
  };
}

const ConfirmPhone = ({route}: ConfirmPhoneProps) => {
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
  const focusedColorsList = ['rgba(26, 26, 26, 0.3)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0)'];

  const navigation = useAppNavigation();
  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 0}} end={{x: 0, y: 1}} style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={{alignItems: 'center', paddingHorizontal: 24, flex: 1}}>
                <View
                  style={{
                    paddingTop: 16,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
                    <HeaderBackButton containerStyle={{marginLeft: 0}} />
                  </TouchableOpacity>
                  <View style={{alignItems: 'center'}}>
                    <LogoPrimary />
                  </View>
                  <View>
                    <AuthProgress startPercentage={0} endPercentage={10} animationDuration={1000} />
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginBottom: screenHeight / 40,
                    marginTop: screenHeight / 30,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(32, 932),
                      marginBottom: 16,
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
                    Please enter the verification code sent to your mobile {mobilePhone?.slice(-4)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <S.StyledCodeField
                    testID="verification-code-input"
                    ref={ref}
                    {...props}
                    value={code}
                    onChangeText={setCode}
                    cellCount={CELL_COUNT}
                    keyboardAppearance="dark"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}: {index: number; symbol: string; isFocused: boolean}) => {
                      if (isFocused) {
                        return (
                          <S.GradientCell
                            gradientProps={{
                              start: {x: 0, y: 0},
                              end: {x: 1, y: 1},
                              colors: focusedColorsList,
                            }}
                            key={index}>
                            <S.CellText onLayout={getCellOnLayoutHandler(index)}>{symbol || (isFocused ? <Cursor /> : '_')}</S.CellText>
                          </S.GradientCell>
                        );
                      }
                      return (
                        <S.DefaultCell key={index}>
                          <S.CellText onLayout={getCellOnLayoutHandler(index)}>{symbol || (isFocused ? <Cursor /> : '_')}</S.CellText>
                        </S.DefaultCell>
                      );
                    }}
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
                      color: 'rgba(130, 130, 130, 1)',
                      fontFamily: Satoshi400,
                      fontSize: RFValue(14, 932),
                    }}>
                    Didn&apos;t receive the code?{' '}
                  </Text>
                  {!resendTimer ? (
                    <TouchableOpacity activeOpacity={0.7} onPress={signInWithPhoneNumber} hitSlop={{bottom: 10, right: 20}}>
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi700,
                          fontSize: RFValue(14, 932),
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

export default ConfirmPhone;
