import {StyleSheet} from 'react-native';
import {
  blackColor,
  lightGray11Color,
  lightGray12Color,
  lightGray5Color,
  lightGray6Color,
  lightGreenColor,
  whiteColor
} from 'constants/colors.ts';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: lightGray6Color,
      paddingHorizontal: screenWidth / 19,
    },
    fdrAlc: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: lightGray11Color,
      borderBottomWidth: 1,
      paddingBottom: screenHeight / 42,
    },
    userPhoto: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    greenCircle: {
      borderWidth: 1,
      borderColor: blackColor,
      width: 11,
      height: 11,
      backgroundColor: lightGreenColor,
      borderRadius: 50,
      position: 'absolute',
      bottom: 5,
      left: 39,
    },
    wrapperTitleOnline: {
      alignItems: 'flex-start',
      marginLeft: screenWidth / 30,
    },
    textNameUser: {
      color: whiteColor,
      marginRight: 5,
      fontFamily: Satoshi400,
      fontSize: RFValue(20, 812),
    },
    textNameUserMessage: {
      color: whiteColor,
      marginLeft: screenWidth / 38,
      marginBottom: screenHeight / 71,
      fontFamily: Satoshi700,
      fontSize: RFValue(18, 812),
    },
    textInvitationApproved: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
    },
    wrapperInvitationApproved: {
      backgroundColor: lightGray5Color,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 24,
      borderRadius: 10,
      paddingHorizontal: 17,
      paddingVertical: 15,
      marginBottom: 7,
    },
    buttonTitleStyle: {
      color: blackColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(14, 812),
    },
    isSenderTrue: {
      backgroundColor: lightGray12Color,
      borderTopLeftRadius: 0,
    },
    isSenderFalse: {
      borderTopRightRadius: 0,
    },
    textOnline: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      opacity: 0.7,
      marginTop: 5,
    },
    messageContainer: {
      flexDirection: 'row',
      paddingTop: screenHeight / 42,
      alignItems: 'flex-end',
    },
    senderContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    receiverContainer: {
      justifyContent: 'flex-end',
    },
    messageContent: {
      maxWidth: '100%',
      marginLeft: screenWidth / 32,
      borderRadius: 15,
      padding: 12,
      backgroundColor: lightGray5Color,
    },
    senderText: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    receiverText: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    timeText: {
      marginTop: 5,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      color: whiteColor,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    footer: {
      height: 90,
      backgroundColor: blackColor,
      flexDirection: 'row',
      paddingHorizontal: screenWidth / 16,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputContainer: {
      width: 283,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
    },
    textInput: {
      color: blackColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      height: '100%',
      borderRadius: 12,
      paddingHorizontal: screenWidth / 23,
    },
    keyboardAvoid: {
      flex: 1,
      backgroundColor: blackColor,
    },
  });
};

export default useStyles;
