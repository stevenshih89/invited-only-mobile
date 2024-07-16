import {StyleSheet} from 'react-native';
import {black2Color, blackColor, lightGreenColor, transparent60Color, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      backgroundColor: black2Color,
      // height: '60%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 10.5,
    },
    wrapperCancelEvent: {
      backgroundColor: black2Color,
      height: '65%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 10.5,
    },
    wrapperOnTheWay: {
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
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginTop: screenHeight / 85,
      width: '100%',
      // justifyContent: 'space-between',
    },
    cancelEventImage: {
      width: 84,
      height: 84,
      borderRadius: 50,
    },
    textYouCantGoToThisEvent: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginTop: screenHeight / 85,
      opacity: 0.8,
    },
    textCity: {
      marginLeft: 3,
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
    },
    title: {
      marginRight: 5,
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(20, 812),
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
    textDate: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      marginLeft: 4,
    },
    textGirlInvitation: {
      color: whiteColor,
      fontFamily: Satoshi400,
      textAlign: 'center',
      fontSize: RFValue(12, 812),
    },
    textAreYouSure: {
      color: whiteColor,
      fontFamily: Satoshi400,
      textAlign: 'center',
      fontSize: RFValue(24, 812),
      marginTop: 20,
    },
    button: {
      width: '100%',
      marginTop: 20,
      marginBottom: 6,
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      textAlign: 'center',
      opacity: 0.8,
      fontSize: RFValue(18, 812),
      marginTop: screenHeight / 85,
    },
    eventImage: {
      marginTop: 5,
      width: screenWidth - 32,
      height: 220,
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent: 'space-between',
      padding: 16
    },
    fdr: {
      backgroundColor: transparent60Color, 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingHorizontal: 12, 
      paddingVertical: 8,
      borderRadius: 100,
      marginLeft: 2
    },
    modalStyles: {
      margin: 0,
      justifyContent: 'flex-end',
      zIndex: 999,
    },
  });
};

export default useStyles;
