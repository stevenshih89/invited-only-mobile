import {StyleSheet} from 'react-native';
import {lightGray2Color, transparent60Color, whiteColor, backgroundColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () =>
  StyleSheet.create({
    container: {
      borderRadius: 30,
      marginBottom: screenHeight / 50,
      marginTop: 26,
      backgroundColor: whiteColor
    },
    imageBackground: {
      height: 185,
      borderRadius: 20,
      margin: 9,
      marginBottom: 0
    },
    linearGradientCard: {
      height: '100%',
      justifyContent: 'space-between',
      paddingVertical: screenHeight / 70,
      paddingHorizontal: screenWidth / 35,
      borderRadius: 14,
    },
    wrapperEventInReviewView: {
      width: '100%',
    },
    eventInReviewView: {
      backgroundColor: transparent60Color,
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textEventInReview: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(22, 812),
    },
    textEstimeTime: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      marginLeft: screenWidth / 65,
    },
    rowEventInReview: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      flexDirection: 'row',
    },
    userItemWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 50,
      borderColor: whiteColor,
    },
    userWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 12,
    },
    imageFakeGirl: {
      width: 30,
      height: 30,
      borderRadius: 50,
    },
    wrapperTextStartInviting: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStatus: {
      position: 'absolute',
    },
    textStartInviting: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(16, 812),
      paddingRight: screenWidth / 55,
      // paddingLeft: screenWidth / 55,
    },
    arrowRightIcon: {
      marginTop: 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wrapperFooterInfo: {
      flexDirection: 'row',
    },
    rowActiveStatus: {
      borderRadius: 10,
      paddingVertical: screenHeight / 185,
      paddingHorizontal: screenWidth / 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textFooter: {
      color: whiteColor,
      fontFamily: Satoshi400,
      marginLeft: 4,
      fontSize: RFValue(13, 812),
    },
    rowCountPeople: {
      backgroundColor: lightGray2Color,
      flexDirection: 'row',
      borderRadius: 10,
      paddingVertical: screenHeight / 120,
      paddingHorizontal: screenWidth / 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 2,
    },
    wrapperFooterButtons: {
      flexDirection: 'row',
    },
    buttonEdit: {
      backgroundColor: whiteColor,
      paddingVertical: screenHeight / 105,
      paddingHorizontal: screenWidth / 45,
      borderRadius: 50,
    },
    buttonMore: {
      backgroundColor: whiteColor,
      paddingVertical: screenHeight / 105,
      paddingHorizontal: screenWidth / 45,
      borderRadius: 50,
    },
    textCityName: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(15, 812),
    },
    textUnderFooter: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(13, 812),
      marginLeft: 6,
    },
    rowTextUnderFooter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    wrapperTextUnderCard: {
      marginTop: screenHeight / 85,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default useStyles;
