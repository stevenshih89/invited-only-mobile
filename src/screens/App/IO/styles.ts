import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

//import components
import {lightGray5Color, lightGray6Color, lightGrayColor, lightRed1Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi700, Satoshi500} from 'constants/fonts.ts';

const screenHeight: number = Dimensions.get('window').height;
const screenWidth: number = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: lightGray6Color,
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
      backgroundColor: lightGray6Color,
    },
    bioWrapper: {
      backgroundColor: lightGray5Color,
      marginTop: screenHeight / 27,
      borderRadius: 11,
      paddingVertical: screenHeight / 38,
      paddingHorizontal: screenWidth / 17,
    },
    titleSection: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(26, 812),
    },
    textDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(15, 812),
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
      flexDirection: 'row',
      flexWrap: 'wrap',
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
      backgroundColor: lightGrayColor,
      height: 43,
      width: 96,
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
      marginTop: screenHeight / 55,
    },
    textHideNadSendReport: {
      textAlign: 'center',
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(17, 812),
    },
    buttonCloseOrCheck: {
      paddingVertical: screenHeight / 80,
      paddingHorizontal: screenWidth / 35,
      backgroundColor: 'black',
      borderRadius: 50,
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonFlash: {
      width: 61,
      height: 61,
      backgroundColor: 'black',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default useStyles;
