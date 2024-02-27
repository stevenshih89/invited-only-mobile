import {StyleSheet} from 'react-native';
import {
  blackColor,
  lightGray11Color,
  lightGray6Color, lightGrayColor,
  lightGreenColor,
  lightRedColor,
  whiteColor
} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi500, Satoshi400, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: lightGray6Color,
      flex: 1,
      paddingHorizontal: screenWidth / 19,
    },
    wrapperItem: {
      flexDirection: 'row',
    },
    item: {
      paddingVertical: screenHeight / 42,
      borderTopWidth: 1,
      borderTopColor: lightGray11Color,
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
      borderRadius: 4,
      borderWidth: 1,
      borderColor: whiteColor,
    },
    textStatusPending: {
      color: whiteColor,
      marginLeft: screenWidth / 38,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: lightGrayColor,
    },
    textStatusInvitationAccepted: {
      color: whiteColor,
      marginLeft: screenWidth / 38,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: lightGreenColor,
    },
    textStatusInvite: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(13, 812),
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
    badgeStyleEvent: {
      borderColor: lightRedColor,
      borderWidth: 1,
      backgroundColor: lightRedColor,
    },
    badgeText: {
      color: whiteColor,
      fontFamily: Satoshi700,
    },
  });
};

export default useStyles;
