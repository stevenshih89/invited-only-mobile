import {StyleSheet} from 'react-native';
import {black2Color, blackColor, gray1Color, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: black2Color,
      height: '55%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 20,
    },
    wrapperBlockAndReport: {
      backgroundColor: black2Color,
      height: '75%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 30,
    },
    wrapperModal: {
      backgroundColor: black2Color,
      height: '55%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 10.5,
    },
    whiteLine: {
      backgroundColor: whiteColor,
      height: 2,
      width: 40,
      marginTop: screenHeight / 50,
      marginBottom: screenHeight / 48,
      borderRadius: 10,
    },
    textBlockAndReport: {
      marginTop: screenHeight / 38,
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
    },
    transparentButton: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: gray1Color,
      alignItems: 'flex-start',
    },
    userPhoto: {
      width: 84,
      height: 84,
      borderRadius: 50,
    },
    greenCircle: {
      borderWidth: 2,
      borderColor: blackColor,
      width: 19,
      height: 19,
      backgroundColor: lightGreenColor,
      borderRadius: 50,
      position: 'absolute',
      bottom: 5,
      right: 0,
    },
    title: {
      marginRight: 5,
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(20, 812),
    },
    textPending: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(13, 812),
    },
    textAreYouSure: {
      color: whiteColor,
      fontFamily: Satoshi400,
      textAlign: 'center',
      fontSize: RFValue(24, 812),
      marginTop: screenHeight / 28,
    },
    buttonFooter: {
      width: '100%',
      paddingVertical: screenHeight / 38,
      borderTopColor: gray1Color,
      borderTopWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginLeft: 10,
    },
  });
};

export default useStyles;
