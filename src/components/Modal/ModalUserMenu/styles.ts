import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black2Color, blackColor, gray1Color, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    buttonFooter: {
      alignItems: 'center',
      borderTopColor: gray1Color,
      borderTopWidth: 1,
      flexDirection: 'row',
      paddingVertical: screenHeight / 38,
      width: '100%',
    },
    greenCircle: {
      backgroundColor: lightGreenColor,
      borderColor: blackColor,
      borderRadius: 50,
      borderWidth: 2,
      bottom: 5,
      height: 19,
      position: 'absolute',
      right: 0,
      width: 19,
    },
    textAreYouSure: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      marginTop: screenHeight / 28,
      textAlign: 'center',
    },
    textBlockAndReport: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      marginTop: screenHeight / 38,
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginLeft: 10,
    },
    textPending: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(13, 812),
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    title: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(20, 812),
      marginRight: 5,
    },
    transparentButton: {
      alignItems: 'flex-start',
      borderBottomColor: gray1Color,
      borderBottomWidth: 1,
      width: '100%',
    },
    userPhoto: {
      borderRadius: 50,
      height: 84,
      width: 84,
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
      paddingHorizontal: screenWidth / 20,
    },
    wrapperBlockAndReport: {
      alignItems: 'center',
      backgroundColor: black2Color,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: '75%',
      paddingHorizontal: screenWidth / 30,
    },
    wrapperModal: {
      alignItems: 'center',
      backgroundColor: black2Color,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: '55%',
      paddingHorizontal: screenWidth / 10.5,
    },
  });
};

export default useStyles;
