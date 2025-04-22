import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightGray2Color, lightGray5Color, lightRedColor, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts';

const useStyles = () =>
  StyleSheet.create({
    addEventButton: {
      alignItems: 'center',
    },
    addEventView: {
      borderColor: lightGray5Color,
      borderRadius: 50,
      borderWidth: 1,
      marginLeft: screenWidth / 25,
      padding: 10,
    },
    buttonEventsJoining: {
      backgroundColor: lightGray2Color,
      borderRadius: 8,
      flexDirection: 'row',
      marginLeft: screenWidth / 65,
      paddingHorizontal: screenWidth / 32,
      paddingVertical: screenHeight / 130,
    },
    buttonMyEvents: {
      backgroundColor: whiteColor,
      borderRadius: 8,
      paddingHorizontal: screenHeight / 70,
      paddingVertical: screenWidth / 60,
    },
    container: {
      backgroundColor: blackColor,
      flex: 1,
      paddingHorizontal: screenWidth / 15.5,
    },
    eventButton: {
      alignItems: 'center',
      marginRight: screenWidth / 27,
    },
    rowTextCountEvents: {
      backgroundColor: lightRedColor,
      borderRadius: 35,
      marginLeft: 4,
    },
    textCountEvents: {
      color: whiteColor,
      paddingHorizontal: 5,
      paddingVertical: 2,
    },
    textEventsJoining: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    textMyEvents: {
      color: blackColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(16, 812),
    },
    wrapperHeaderButtonMyEvents: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: screenHeight / 30,
      marginTop: screenHeight / 43,
    },
  });

export default useStyles;
