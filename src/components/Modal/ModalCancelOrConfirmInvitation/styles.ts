import {StyleSheet} from 'react-native';
import {RFValue} from "react-native-responsive-fontsize";
import {black2Color, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400} from "constants/fonts.ts";

const useStyles = () => {
  return StyleSheet.create({
    imageBg: {},
    textAreYouSure: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      marginBottom: 40,
      textAlign: 'center',
    },
    whiteLine: {
      backgroundColor: whiteColor,
      borderRadius: 10,
      height: 2,
      marginBottom: screenHeight / 48,
      marginTop: screenHeight / 50,
      width: 40,
    },
    wrapper: {
      alignItems: 'center',
      backgroundColor: black2Color,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: '60%',
      paddingHorizontal: screenWidth / 10.5,
    },
  });
};

export default useStyles;
