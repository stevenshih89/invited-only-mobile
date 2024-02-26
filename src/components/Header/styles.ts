import {StyleSheet} from 'react-native';
import {
  blackColor,
  lightGray2Color,
  lightGray5Color,
  lightGray6Color,
  lightRedColor,
  whiteColor
} from 'constants/colors.ts';
import {Satoshi500, Satoshi700, Satoshi400} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common';


const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: lightGray6Color,
      paddingHorizontal: screenWidth / 15.5,
    },
    wrapperHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    eventView: {
      padding: 14,
      borderWidth: 1,
      borderColor: lightGray5Color,
      borderRadius: 50,
    },
    eventButton: {
      alignItems: 'center',
      marginRight: screenWidth / 27,
    },
    addEventButton: {
      alignItems: 'center',
    },
    addEventView: {
      padding: 10,
      borderWidth: 1,
      borderColor: lightGray5Color,
      borderRadius: 50,
      marginLeft: screenWidth / 25,
    },
    wrapperHeaderButton: {
      marginVertical: screenHeight / 50,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    wrapperHeaderButtonMyEvents: {
      marginTop: screenHeight / 43,
      marginBottom: screenHeight / 30,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonMyEvents: {
      backgroundColor: whiteColor,
      paddingVertical: screenWidth / 60,
      paddingHorizontal: screenHeight / 70,
      borderRadius: 8,
    },
    textMyEvents: {
      color: blackColor,
      fontFamily: Satoshi500,
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
    textEventsJoining: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    rowTextCountEvents: {
      borderRadius: 35,
      backgroundColor: lightRedColor,
      marginLeft: 4,
    },
    textCountEvents: {
      color: whiteColor,
      paddingVertical: 2,
      paddingHorizontal: 5,
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(13, 812),
      marginTop: screenHeight / 190,
    },
    badgeStyle: {
      position: 'absolute',
      borderColor: lightRedColor,
      bottom: -4,
      right: 0,
      backgroundColor: lightRedColor,
    },
    badgeText: {
      color: whiteColor,
      fontFamily: Satoshi700,
    },
  });

export default useStyles;
