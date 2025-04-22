import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black2Color, black2Color90, blackColor, lightGreenColor, transparent60Color, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';

const useStyles = () => {
  return StyleSheet.create({
    button: {
      marginBottom: 30,
      marginTop: 20,
      width: '100%',
    },
    cancelEventImage: {
      borderRadius: 50,
      height: 84,
      width: 84,
    },
    container: {
      flex: 1,
    },
    eventImage: {
      borderRadius: 20,
      height: screenHeight * 0.23,
      justifyContent: 'flex-end',
      padding: 20
    },
    fdr: {
      alignItems: 'center', 
      backgroundColor: transparent60Color, 
      borderRadius: 100, 
      flexDirection: 'row', 
      marginLeft: 2,
      paddingHorizontal: 12,
      paddingVertical: 8
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
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginTop: screenHeight / 85,
      width: '100%',
      // justifyContent: 'space-between',
    },
    modalStyles: {
      justifyContent: 'flex-end',
      margin: 0,
      zIndex: 999,
    },
    textAreYouSure: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      marginTop: 20,
      textAlign: 'center',
    },
    textCity: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginLeft: 3,
    },
    textDate: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      marginLeft: 4,
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginTop: screenHeight / 85,
      opacity: 0.8,
      textAlign: 'center',
    },
    textGirlInvitation: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      textAlign: 'center',
    },
    textYouCantGoToThisEvent: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginTop: screenHeight / 85,
      opacity: 0.8,
    },
    title: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(20, 812),
      marginRight: 5,
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
      backgroundColor: black2Color90,
      borderRadius: 30,
      paddingHorizontal: 20
    },
    wrapperCancelEvent: {
      alignItems: 'center',
      backgroundColor: black2Color,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: '65%',
      paddingHorizontal: screenWidth / 10.5,
    },
    wrapperOnTheWay: {
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
