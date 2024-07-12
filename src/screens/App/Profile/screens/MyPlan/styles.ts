import {screenWidth, screenHeight} from 'constants/common.ts';
import {StyleSheet} from 'react-native';
import {blackColor, lightGray5Color, lightGray7Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi700, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    textGetASpot: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(34, 812),
      marginTop: screenHeight / 15,
      textAlign: 'center',
    },
    textHostAccess: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      marginTop: screenHeight / 80,
      textAlign: 'center',
      opacity: 0.8,
    },
    linearGradient: {
      borderRadius: 12,

      alignItems: 'center',
      paddingTop: screenHeight / 60,
      paddingBottom: screenHeight / 53,
    },
    buttonUpgrade: {
      marginHorizontal: screenWidth / 9.5,
      borderRadius: 12,
      paddingHorizontal: 70,
      paddingVertical: 8
      // height: 39,
    },
    textButtonTitleStyle: {
      color: blackColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(16, 812),
      textAlign: 'center',
    },
    textHostPremium: {
      color: blackColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(16, 812),
      textAlign: 'center',
    },
    buttonWrapper: {
      width: '100%',
    },
    textGetAccess: {
      color: blackColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(12, 812),
      marginVertical: screenHeight / 93,
      textAlign: 'center',
      marginHorizontal: screenWidth / 10,
    },
    imageBackground: {
      flex: 1,
    },
    container: {
      marginHorizontal: screenWidth / 10.5,
    },
    textYearlySpot: {
      color: blackColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(14, 812),
      marginTop: screenHeight / 81,
      textAlign: 'left',
    },
    listColumnWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: screenHeight / 25,
      marginBottom: screenHeight / 82,
    },
    textWhatYouGet: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(14, 812),
    },
    textPremium: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(14, 812),
    },
    itemInTheList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: lightGray7Color,
      borderBottomWidth: 1,
      paddingVertical: screenHeight / 63,
    },
    textFromTheList: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginRight: screenWidth / 39,
    },
    rowTextAndCheckCircleIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonSkip: {
      marginTop: screenHeight / 25,
      height: 27,
    },
    tooltipWrapper: {
      backgroundColor: lightGray5Color,
    },
    textUnlimitedEventsCreation: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(16, 812),
    },
    textHostAccessIsLimited: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginTop: 3,
    },
    rowTitleTooltip: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wrapperIcon: {
      backgroundColor: lightGray5Color,
      borderRadius: 100,
      padding: 8,
      marginRight: 10
    }
  });
};

export default useStyles;
