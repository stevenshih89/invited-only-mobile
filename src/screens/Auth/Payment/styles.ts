import {Dimensions, StyleSheet} from 'react-native';
import {blackColor, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi700, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    textGetASpot: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(34, 812),
      marginTop: dimensionsHeight / 15,
      textAlign: 'center',
    },
    textHostAccess: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      marginTop: dimensionsHeight / 80,
      textAlign: 'center',
      opacity: 0.8,
    },
    linearGradient: {
      borderRadius: 12,
      marginTop: dimensionsHeight / 25,
      alignItems: 'center',
      paddingTop: dimensionsHeight / 60,
      paddingBottom: dimensionsHeight / 53,
    },
    buttonUpgrade: {
      marginHorizontal: dimensionsWidth / 9.5,
      borderRadius: 10,
      height: 39,
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
      marginVertical: dimensionsHeight / 93,
      textAlign: 'center',
      marginHorizontal: dimensionsWidth / 10,
    },
    imageBackground: {
      flex: 1,
    },
    container: {
      marginHorizontal: dimensionsWidth / 10.5,
    },
    textYearlySpot: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(14, 812),
      marginTop: dimensionsHeight / 25,
      textAlign: 'left',
    },
    listColumnWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: dimensionsHeight / 25,
      marginBottom: dimensionsHeight / 82,
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
      borderBottomColor: '#353535',
      borderBottomWidth: 1,
      paddingVertical: 13.5,
    },
    textFromTheList: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginRight: dimensionsWidth / 39,
    },
    rowTextAndCheckCircleIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonSkip: {
      marginTop: 34,
      height: 27,
    },
    tooltipWrapper: {
      backgroundColor: '#1B1B1B',
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
  });
};

export default useStyles;
