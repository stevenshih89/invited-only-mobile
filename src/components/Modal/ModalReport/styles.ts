import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black2Color, blackColor, transparentWhite16Color, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400} from 'constants/fonts.ts';

const useStyles = () => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      borderBottomColor: transparentWhite16Color,
      borderBottomWidth: 1,
      borderRadius: 10,
      flexDirection: 'row',
      paddingVertical: 18,
      width: '100%',
    },
    firstButton: {
      alignItems: 'center',
      backgroundColor: whiteColor,
      borderRadius: 10,
      flexDirection: 'row',
      paddingVertical: 18,
      width: '100%',
    },
    icon: {
      marginLeft: 20,
    },
    textFirstInReportButton: {
      color: blackColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(17, 812),
      marginLeft: 10,
    },
    textInReportButton: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(17, 812),
      marginLeft: 10,
    },
    textReport: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      marginBottom: 34,
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
      height: '75%',
      paddingHorizontal: screenWidth / 10.5,
    },
  });
};

export default useStyles;
