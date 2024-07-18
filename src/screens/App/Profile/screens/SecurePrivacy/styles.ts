import {StyleSheet} from 'react-native';
import {blackColor, lightGray13Color, lightGray6Color, transparentWhite16Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: blackColor,
      flex: 1,
      paddingHorizontal: 20,
      borderTopColor: transparentWhite16Color,
      borderTopWidth: 1,
      borderStyle: 'solid',
    },
    wrapper: {
      backgroundColor: lightGray13Color,
      marginTop: 34,
      borderRadius: 10,
      padding: 20,
    },
    textSecurity: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginTop: 26,
    },
  });

export default useStyles;
