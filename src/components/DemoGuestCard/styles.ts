import { StyleSheet } from "react-native";
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
import { RFValue } from "react-native-responsive-fontsize";

const useStyles = () => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: blackColor,
    },
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1111,
      backgroundColor: black60Color,
    },
    stepHintContainer: {
      zIndex: 1111,
      position: 'absolute',
      width: screenWidth - 16,
    },
    container: {
      paddingHorizontal: screenWidth / 15.5,
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    animatedView: {
      flex: 1,
      overflow: 'hidden',
    },
    cardContainer: {
      ...StyleSheet.absoluteFillObject,
      paddingHorizontal: screenWidth / 15.5,
      height: '90%',
    },
    card: {
      borderRadius: 22,
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 22,
    },
    overlayLabelContainer: {
      position: 'absolute',
      top: 50,
      right: 30,
      borderRadius: 12,
      padding: 13,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      borderWidth: 4,
      borderColor: lightRed1Color,
    },
    overlayLabelContainerInvite: {
      position: 'absolute',
      top: 50,
      left: 30,
      borderRadius: 12,
      padding: 13,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      borderWidth: 4,
      borderColor: whiteColor,
    },
    wrapperCreateEventCard: {
      justifyContent: 'center',
      height: screenHeight - 300,
    },
    textYouNeedToCreate: {
      fontFamily: Satoshi400,
      textAlign: 'center',
      fontSize: RFValue(30, 812),
      color: whiteColor,
    },
    textYouDontHaveAny: {
      fontFamily: Satoshi400,
      textAlign: 'center',
      opacity: 0.8,
      fontSize: RFValue(18, 812),
      color: whiteColor,
      marginTop: screenHeight / 40,
      marginBottom: screenHeight / 25,
    },
    textDontHaveAnEvent: {
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      color: whiteColor,
      textAlign: 'center',
    },
    rowJoinOne: {
      borderBottomWidth: 1,
      borderBottomColor: whiteColor,
    },
    rowText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: screenHeight / 33,
      justifyContent: 'center',
    },
    textJoinOne: {
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      color: whiteColor,
      borderBottomWidth: 1,
      borderBottomColor: whiteColor,
      marginLeft: screenWidth / 80,
    },
    overlayLabelTextInvite: {
      fontFamily: Satoshi700,
      fontSize: RFValue(28, 812),
      color: whiteColor,
    },
    overlayLabelText: {
      fontFamily: Satoshi700,
      fontSize: RFValue(28, 812),
      color: lightRed1Color,
    },
    scrollContent: {
      flexGrow: 1,
    },
    wrapperFakeCard: {
      backgroundColor: blackColor,
    },
    bioWrapper: {
      // marginTop: screenHeight / 27,
      borderRadius: 11,
      paddingVertical: screenHeight / 38,
    },
    titleSection: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(18, 812),
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      marginTop: screenHeight / 55,
    },
    textTagsAboutMe: {
      alignItems: 'center',
      textAlign: 'center',
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      marginTop: screenHeight / 55,
    },
    wrapperTextTags: {
      flex: 1,
      position: 'relative',
      right: 18,
    },
    ml18: {
      marginLeft: screenWidth / 22,
    },
    mt31: {
      marginTop: screenHeight / 27,
    },
    wrapperInterestsTags: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    interestsTags: {
      borderRadius: 50,
      backgroundColor: 'transparent',
      height: 43,
      width: 96,
      borderColor: lightGray6Color,
      borderWidth: 1,
      borderStyle: 'solid',
      marginTop: screenHeight / 50,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textTagsInterests: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(15, 812),
    },
    imageFaceGirl: {
      width: '100%',
      height: 410,
      borderRadius: 22,
    },
    wrapperImageSectionFaceGirl: {
      alignItems: 'center',
    },
    wrapperButtonsFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: screenHeight / 17,
      marginTop: 34,
    },
    textHideNadSendReport: {
      textAlign: 'center',
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(14, 812),
    },
    buttonCloseOrCheck: {
      backgroundColor: 'black',
      borderRadius: 50,
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginHorizontal: 1,
    },
    buttonFlash: {
      width: 61,
      height: 61,
      backgroundColor: 'black',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapperHostProfile: {
      marginTop: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    wrapperNumberPeople: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowNumberPeople: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#2B2B2B',
    },
    greenCircle: {
      borderWidth: 1,
      borderColor: blackColor,
      width: 9,
      height: 9,
      backgroundColor: lightGreenColor,
      borderRadius: 50,
      position: 'absolute',
      bottom: 5,
      right: -3,
    },
    textSimon: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    textSeeProfile: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    textOnline: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(10, 812),
      marginTop: 5,
      opacity: 0.8,
    },
    wrapperPersonIcon: {
      backgroundColor: lightGray6Color,
      width: 30,
      height: 30,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subTitle: {
      marginTop: 14,
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(12, 812),
    },
    textUnderSubTitle: {
      marginTop: 6,
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(14, 812),
    },
    textNumberInvitedPeople: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      paddingVertical: 7,
      paddingHorizontal: 13,
    },
    rowPersonIcon: {
      flexDirection: 'row',
      marginTop: 12,
    },
    fdrAlc: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    textInfo: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginLeft: 6,
    },
    imageBg: {
      height: 178,
      borderRadius: 20,
      marginBottom: 28,
    },
  })
};

export default useStyles;
