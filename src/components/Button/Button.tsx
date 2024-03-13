import {FC, ReactElement} from 'react';
import {ActivityIndicator, Button as ButtonAntd} from '@ant-design/react-native';

//import components
import {ButtonProps} from 'typescript/interfaces';
import {Satoshi500} from 'constants/fonts';
import {screenHeight} from 'constants/common';
import {blackColor, whiteColor} from 'constants/colors';

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
        borderRadius: 8,
        backgroundColor: whiteColor,
        maxHeight: 56,
        height: screenHeight / 15,
      },
      defaultRawText: {
        color: blackColor,
        fontFamily: Satoshi500,
        textAlign: 'center',
        fontSize: 18,
        ...buttonTitleStyle,
      },
      defaultHighlight: {
        backgroundColor: whiteColor,
      },
      defaultHighlightText: {
        color: blackColor,
      },
    },
    ['transparent']: {
      container: buttonContatinerStyle,
      defaultRaw: {
        borderRadius: 8,
        backgroundColor: 'transparent',
        borderWidth: 0,
        maxHeight: 56,
        height: screenHeight / 15,
      },
      defaultRawText: {
        color: whiteColor,
        fontFamily: Satoshi500,
        textAlign: 'center',
        fontSize: 18,
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
