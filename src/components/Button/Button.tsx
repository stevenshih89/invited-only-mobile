import {FC, ReactElement} from 'react';
import {ActivityIndicator, Button as ButtonAntd} from '@ant-design/react-native';

//import components
import {ButtonProps} from 'typescript/interfaces';
import {Satoshi500} from 'constants/fonts';
import {screenHeight} from 'constants/common';
import {blackColor, grayColor, whiteColor} from 'constants/colors';
import {TextStyle, ViewStyle} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonContatinerStyle,
  buttonStyle,
  buttonTitleStyle,
  loading = false,
  variant = 'default',
}): ReactElement => {
  const styles = {
    ['default']: {
      container: buttonContatinerStyle,
      defaultRaw: {
        borderRadius: 18,
        backgroundColor: whiteColor,
        height: screenHeight * 0.068,
        maxHeight: 64
      } as ViewStyle,
      defaultRawText: {
        color: blackColor,
        fontFamily: Satoshi500,
        textAlign: 'center',
        fontSize: RFValue(16, 812),
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
    ['transparent']: {
      container: buttonContatinerStyle,
      defaultRaw: {
        borderRadius: 18,
        backgroundColor: 'transparent',
        borderWidth: 0,
        height: screenHeight * 0.068,
        maxHeight: 64
      },
      defaultRawText: {
        color: whiteColor,
        fontFamily: Satoshi500,
        textAlign: 'center',
        fontSize: RFValue(16, 812),
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
    <ButtonAntd style={[buttonStyle]} onPress={onPress} disabled={disabled || loading} styles={styles[variant]}>
      {loading ? <ActivityIndicator color={blackColor} size="small" /> : title}
    </ButtonAntd>
  );
};

export default Button;
