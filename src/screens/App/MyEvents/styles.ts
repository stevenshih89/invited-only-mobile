import {StyleSheet} from 'react-native';
import {blackColor, lightGray2Color, lightGray5Color, lightRedColor, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: blackColor,
      flex: 1,
      paddingHorizontal: screenWidth / 19,
    },
    wrapperHeaderButtonMyEvents: {
      marginTop: screenHeight / 43,
      marginBottom: screenHeight / 30,
      alignItems: 'center',
      flexDirection: 'row',
    },
    eventButton: {
      alignItems: 'center',
      marginRight: screenWidth / 27,
    },
    textMyEvents: {
      color: blackColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(16, 812),
    },
    textEventsJoining: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    buttonEventsJoining: {
      backgroundColor: lightGray2Color,
      paddingVertical: screenHeight / 130,
      paddingHorizontal: screenWidth / 32,
      borderRadius: 8,
      marginLeft: screenWidth / 65,
      flexDirection: 'row',
    },
    buttonMyEvents: {
      backgroundColor: whiteColor,
      paddingVertical: screenWidth / 60,
      paddingHorizontal: screenHeight / 70,
      borderRadius: 8,
    },
    rowTextCountEvents: {
      borderRadius: 35,
      backgroundColor: lightRedColor,
      marginLeft: 4,
    },
    addEventButton: {
      alignItems: 'center',
    },
    textCountEvents: {
      color: whiteColor,
      paddingVertical: 2,
      paddingHorizontal: 5,
    },
    addEventView: {
      padding: 10,
      borderWidth: 1,
      borderColor: lightGray5Color,
      borderRadius: 50,
      marginLeft: screenWidth / 25,
    },
  });

export default useStyles;
