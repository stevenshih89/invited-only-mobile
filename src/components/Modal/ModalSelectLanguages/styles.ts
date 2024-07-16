import {StyleSheet} from 'react-native';
import {black2Color, blackColor, transparentWhite16Color, whiteColor} from "constants/colors.ts";
import {screenHeight, screenWidth} from "constants/common.ts";
import {Satoshi400} from "constants/fonts.ts";
import {RFValue} from "react-native-responsive-fontsize";

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    whiteLine: {
      backgroundColor: whiteColor,
      height: 2,
      width: 40,
      marginTop: screenHeight / 50,
      marginBottom: screenHeight / 48,
      borderRadius: 10,
    },
    wrapper: {
      backgroundColor: black2Color,
      height: '90%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 10.5,
    },
    textReport: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      textAlign: 'center',
      marginBottom: 10,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 18,
      borderRadius: 10,
      borderBottomWidth: 1,
      borderBottomColor: transparentWhite16Color,
    },
    icon: {
      marginLeft: 20,
    },
    firstButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: whiteColor,
      width: '100%',
      paddingVertical: 18,
      borderRadius: 10,
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
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
};

export default useStyles;
