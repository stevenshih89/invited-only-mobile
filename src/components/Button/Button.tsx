import {FC, ReactElement} from 'react';
import {ActivityIndicator, Button as ButtonAntd} from '@ant-design/react-native';

//import components
import {TextStyle, ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ButtonProps} from 'typescript/interfaces';
import {Satoshi500} from 'constants/fonts';
import {screenHeight} from 'constants/common';
import {blackColor, grayColor, whiteColor} from 'constants/colors';

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonContatinerStyle,
  buttonStyle,
  buttonTitleStyle,
  loading = false,
  variant = 'default',
  id,
  testID,
}): ReactElement => {
  const styles = {
    ['default']: {
      container: buttonContatinerStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: whiteColor,
        height: screenHeight / 18,
        maxHeight: 64,
      } as ViewStyle,
      defaultRawText: {
        color: '#010101',
        fontFamily: Satoshi500,
        textAlign: 'center',
        fontSize: RFValue(14, 932),
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: grayColor,
        borderColor: 'transparent',
      },
      defaultHighlight: {
        backgroundColor: 'rgba(255, 255,255, 0.8)',
      },
      defaultHighlightText: {
        color: blackColor,
      } as TextStyle,
    },
    ['gray']: {
      container: buttonContatinerStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: 'rgba(32, 32, 32, 1)',
        height: screenHeight / 18,
        maxHeight: 64,
        borderColor: 'rgba(32, 32, 32, 1)',
        borderWidth: 1,
      } as ViewStyle,
      defaultRawText: {
        color: whiteColor,
        fontFamily: Satoshi500,
        textAlign: 'center',
        fontSize: RFValue(14, 932),
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: grayColor,
        borderColor: 'transparent',
      },
      defaultHighlight: {
        backgroundColor: 'rgba(255, 255,255, 0.1)',
      },
      defaultHighlightText: {
        color: blackColor,
      } as TextStyle,
    },
    ['transparent']: {
      container: buttonContatinerStyle,
      defaultRaw: {
        borderRadius: 18,
        backgroundColor: 'transparent',
        borderWidth: 0,
        height: screenHeight / 14,
        maxHeight: 64,
      },
      defaultRawText: {
        color: whiteColor,
        fontFamily: Satoshi500,
        textAlign: 'center',
        fontSize: RFValue(20, 932),
        ...buttonTitleStyle,
      },
      defaultHighlight: {
        backgroundColor: 'transparent',
      },
      defaultHighlightText: {
        color: whiteColor,
      },
    },
  };

  return (
    // @ts-ignore
    <ButtonAntd testID={testID} id={id} style={buttonStyle} onPress={onPress} disabled={disabled || loading} styles={styles[variant]}>
      {loading ? <ActivityIndicator color={blackColor} size="small" /> : title}
    </ButtonAntd>
  );
};

export default Button;
