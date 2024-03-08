import {StyleSheet} from 'react-native';
import {black2Color, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400} from "constants/fonts.ts";
import {RFValue} from "react-native-responsive-fontsize";

const useStyles = () => {
  return StyleSheet.create({
    whiteLine: {
      backgroundColor: whiteColor,
      height: 2,
      width: 40,
      marginTop: screenHeight / 50,
      marginBottom: screenHeight / 48,
      borderRadius: 10,
    },
    imageBg: {},
    wrapper: {
      backgroundColor: black2Color,
      height: '60%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 10.5,
    },
    textAreYouSure: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      textAlign: 'center',
      marginBottom: 40,
    },
  });
};

export default useStyles;
