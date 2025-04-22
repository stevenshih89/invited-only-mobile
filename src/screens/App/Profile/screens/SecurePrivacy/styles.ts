import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightGray13Color, transparentWhite16Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';

const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: blackColor,
      borderStyle: 'solid',
      borderTopColor: transparentWhite16Color,
      borderTopWidth: 1,
      flex: 1,
      paddingHorizontal: 20,
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginTop: 26,
    },
    textSecurity: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
    },
    wrapper: {
      backgroundColor: lightGray13Color,
      borderRadius: 10,
      marginTop: 34,
      padding: 20,
    },
  });

export default useStyles;
