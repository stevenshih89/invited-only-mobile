import { Text, TouchableOpacity, View } from 'react-native';
import { Cursor } from 'react-native-confirmation-code-field';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useConfirmPhone } from './hooks/useConfirmPhone';
import * as S from './ConfirmPhone.style';
import { screenHeight } from 'constants/common';
import { Satoshi400, Satoshi700 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';
import useRemoteConfig from 'hooks/useRemoteConfig';

interface ConfirmPhoneProps {
  route: {
    params: {
      mobilePhone: string;
      isLogin?: boolean;
    };
  };
}

const ConfirmPhone = ({ route }: ConfirmPhoneProps) => {
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


  return (
    <CommonAuthLayout
      title="Phone number verification"
      subtitle={`Please enter the verification code sent to your mobile ${mobilePhone?.slice(-4)}`}
      continueButtonTitle="Verify"
      continueButtonDisabled={code.length < CELL_COUNT}
      continueButtonLoading={isLoadingVerifyOtp || isLoadingSendOtp}
      onContinuePress={() => handleConfirmPhoneNumber(code)}
      startPercentage={0}
      endPercentage={10}>
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
          onChangeText={(text: string) => {
            setCode(text);
            if (text.length === CELL_COUNT) {
              handleConfirmPhoneNumber(text);
            }
          }}
          cellCount={CELL_COUNT}
          keyboardAppearance="dark"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }: { index: number; symbol: string; isFocused: boolean }) => {
            if (isFocused) {
              return (
                <S.GradientCell
                  gradientProps={{
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 1 },
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
          <TouchableOpacity activeOpacity={0.7} onPress={signInWithPhoneNumber} hitSlop={{ bottom: 10, right: 20 }}>
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
    </CommonAuthLayout>
  );
};

export default ConfirmPhone;
