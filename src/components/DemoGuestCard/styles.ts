import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  black60Color,
  blackColor,
  lightGray6Color,
  lightGreenColor,
  lightRed1Color,
  whiteColor
} from "constants/colors.ts";
import { screenHeight, screenWidth } from "constants/common.ts";
import { Satoshi400, Satoshi500, Satoshi700 } from "constants/fonts.ts";

const useStyles = () => {
  return StyleSheet.create({
    animatedView: {
      flex: 1,
      overflow: 'hidden',
    },
    bioWrapper: {
      borderRadius: 11,
      paddingVertical: screenHeight / 38,
    },
    buttonCloseOrCheck: {
      alignItems: 'center',
      backgroundColor: 'black',
      borderRadius: 50,
      height: 48,
      justifyContent: 'center',
      marginHorizontal: 1,
      position: 'relative',
      width: 48,
    },
    buttonFlash: {
      alignItems: 'center',
      backgroundColor: 'black',
      borderRadius: 50,
      height: 61,
      justifyContent: 'center',
      width: 61,
    },
    card: {
      borderRadius: 22,
      height: '100%',
    },
    cardContainer: {
      ...StyleSheet.absoluteFillObject,
      height: '90%',
      paddingHorizontal: screenWidth / 15.5,
    },
    container: {
      flex: 1,
      paddingHorizontal: screenWidth / 15.5,
    },
    fdrAlc: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20,
    },
    greenCircle: {
      backgroundColor: lightGreenColor,
      borderColor: blackColor,
      borderRadius: 50,
      borderWidth: 1,
      bottom: 5,
      height: 9,
      position: 'absolute',
      right: -3,
      width: 9,
    },
    image: {
      borderRadius: 22,
      height: '100%',
      width: '100%',
    },
    imageBg: {
      borderRadius: 20,
      height: 178,
      marginBottom: 28,
    },
    imageFaceGirl: {
      borderRadius: 22,
      height: 410,
      width: '100%',
    },
    interestsTags: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderColor: lightGray6Color,
      borderRadius: 50,
      borderStyle: 'solid',
      borderWidth: 1,
      height: 43,
      justifyContent: 'center',
      marginTop: screenHeight / 50,
      textAlign: 'center',
      width: 96,
    },
    ml18: {
      marginLeft: screenWidth / 22,
    },
    mt31: {
      marginTop: screenHeight / 27,
    },
    overlayContainer: {
      backgroundColor: black60Color,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
      zIndex: 1111,
    },
    overlayLabelContainer: {
      alignItems: 'flex-end',
      borderColor: lightRed1Color,
      borderRadius: 12,
      borderWidth: 4,
      justifyContent: 'flex-end',
      padding: 13,
      position: 'absolute',
      right: 30,
      top: 50,
    },
    overlayLabelContainerInvite: {
      alignItems: 'flex-end',
      borderColor: whiteColor,
      borderRadius: 12,
      borderWidth: 4,
      justifyContent: 'flex-end',
      left: 30,
      padding: 13,
      position: 'absolute',
      top: 50,
    },
    overlayLabelText: {
      color: lightRed1Color,
      fontFamily: Satoshi700,
      fontSize: RFValue(28, 812),
    },
    overlayLabelTextInvite: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(28, 812),
    },
    rowJoinOne: {
      borderBottomColor: whiteColor,
      borderBottomWidth: 1,
    },
    rowNumberPeople: {
      borderColor: '#2B2B2B',
      borderRadius: 10,
      borderWidth: 1,
    },
    rowPersonIcon: {
      flexDirection: 'row',
      marginTop: 12,
    },
    rowText: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: screenHeight / 33,
    },
    safeAreaView: {
      backgroundColor: blackColor,
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    scrollView: {
      flex: 1,
    },
    stepHintContainer: {
      position: 'absolute',
      width: screenWidth - 16,
      zIndex: 1111,
    },
    subTitle: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(12, 812),
      marginTop: 14,
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      marginTop: screenHeight / 55,
    },
    textDontHaveAnEvent: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      textAlign: 'center',
    },
    textHideNadSendReport: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(14, 812),
      textAlign: 'center',
    },
    textInfo: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginLeft: 6,
    },
    textJoinOne: {
      borderBottomColor: whiteColor,
      borderBottomWidth: 1,
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      marginLeft: screenWidth / 80,
    },
    textNumberInvitedPeople: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      paddingHorizontal: 13,
      paddingVertical: 7,
    },
    textOnline: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(10, 812),
      marginTop: 5,
      opacity: 0.8,
    },
    textSeeProfile: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    textSimon: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    textTagsAboutMe: {
      alignItems: 'center',
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      marginTop: screenHeight / 55,
      textAlign: 'center',
    },
    textTagsInterests: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(15, 812),
    },
    textUnderSubTitle: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(14, 812),
      marginTop: 6,
    },
    textYouDontHaveAny: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginBottom: screenHeight / 25,
      marginTop: screenHeight / 40,
      opacity: 0.8,
      textAlign: 'center',
    },
    textYouNeedToCreate: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(30, 812),
      textAlign: 'center',
    },
    titleSection: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(18, 812),
    },
    wrapperButtonsFooter: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: screenHeight / 17,
      marginTop: 34,
    },
    wrapperCreateEventCard: {
      height: screenHeight - 300,
      justifyContent: 'center',
    },
    wrapperFakeCard: {
      backgroundColor: blackColor,
    },
    wrapperHostProfile: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 14,
    },
    wrapperImageSectionFaceGirl: {
      alignItems: 'center',
    },
    wrapperInterestsTags: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    wrapperNumberPeople: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wrapperPersonIcon: {
      alignItems: 'center',
      backgroundColor: lightGray6Color,
      borderRadius: 10,
      height: 30,
      justifyContent: 'center',
      width: 30,
    },
    wrapperTextTags: {
      flex: 1,
      position: 'relative',
      right: 18,
    },
  })
};

export default useStyles;
