import {StyleSheet} from 'react-native';
import {
  blackColor,
  grayScale700,
  lightGray11Color,
  lightGray15Color,
  lightGray6Color,
  lightGrayColor,
  lightGreenColor,
  lightRedColor,
  whiteColor,
} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi500, Satoshi400, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: blackColor,
      flex: 1,
      paddingHorizontal: screenWidth / 19,
      paddingBottom: 60,
    },
    wrapperItem: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    textYouNeedToJoin: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(30, 812),
      textAlign: 'center',
      paddingHorizontal: 80,
    },
    textYouDontHaveAny: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      opacity: 0.8,
      marginTop: 19,
      textAlign: 'center',
    },
    item: {
      borderTopWidth: 1,
      borderTopColor: grayScale700,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textName: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
    },
    rowTextNameAndStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    wrapperItemElements: {
      marginLeft: screenWidth / 25,
    },
    textStatusInviteMatch: {
      color: whiteColor,
      marginLeft: screenWidth / 38,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: whiteColor,
    },
    textStatusPending: {
      color: whiteColor,
      marginLeft: screenWidth / 38,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: lightGray15Color,
    },
    textStatusInvitationAccepted: {
      color: blackColor,
      marginLeft: screenWidth / 38,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 40,
      backgroundColor: whiteColor,
    },
    textStatusInvite: {
      // color: whiteColor,
      fontFamily: Satoshi400,
      fontWeight: 'bold',

      paddingHorizontal: 8,
      paddingVertical: 0,
      fontSize: RFValue(12, 812),
    },
    textMessage: {
      marginTop: screenHeight / 80,
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      opacity: 0.8,
    },
    wrapperThreeDotsAndBadge: {
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    story: {
      borderWidth: 1,
      borderColor: lightGreenColor,
    },
    imageUser: {
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
      position: 'relative',
      bottom: 15,
      left: 39,
    },
    greenCircleChat: {
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
    textNameChat: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      opacity: 0.7,
      marginTop: 5,
    },
    badgeStyleEvent: {
      borderColor: lightRedColor,
      borderWidth: 1,
      backgroundColor: lightRedColor,
    },
    badgeText: {
      color: whiteColor,
      fontFamily: Satoshi700,
    },
    title: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      marginRight: 4,
    },
    textStatus: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(13, 812),
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    textDescriptionUnderTitle: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      marginLeft: 6,
    },
    itemEventsJoining: {
      backgroundColor: lightGray11Color,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingTop: 14,
      marginBottom: 20,
    },
    wrapperItemEventsJoining: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    fdrAiC: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: lightGray11Color,
    },
    newMessage: {
      height: 24,
      width: 24,
      backgroundColor: grayScale700,
      borderRadius: 40,
      justifyContent: 'center',
    },
    wrapperTextMessage: {
      // marginTop: screenHeight / 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    textCountNewMessages: {
      color: whiteColor,
      textAlign: 'center',
      fontSize: RFValue(12, 812),
      fontFamily: Satoshi700,
    },
  });
};

export default useStyles;
