import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, darkRedColor, transparent60Color, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';

const useStyles = () =>
  StyleSheet.create({
    accountTypePremium: {
      color: blackColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(10, 812),
    },
    accountTypeWrapperPremium: {
      backgroundColor: blackColor,
      borderRadius: 4,
      marginLeft: 6,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    ageText: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(10, 812),
      marginLeft: 4,
    },
    buttonContainer: {
      borderRadius: 10,
      paddingVertical: 4,
    },
    container: {
      backgroundColor: blackColor,
      flex: 1,
    },
    distanceContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    distanceText: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(10, 812),
      marginLeft: 4,
    },
    imageBackground: {
      borderRadius: 20,
      flex: 1,
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    itemContainer: {
      borderRadius: 12,
      flex: 1,
      paddingHorizontal: 7,
      width: '100%',
    },
    itemContentContainer: {
      flex: 1,
    },
    itemSeparator: {
      height: 14,
    },
    linearGradient: {
      flex: 1,
      padding: 17,
    },
    listContentContainer: {
      flexGrow: 1,
      paddingBottom: screenHeight / 7,
      paddingHorizontal: 13,
    },
    locationContainer: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: transparent60Color,
      borderRadius: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    locationRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    locationText: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(10, 812),
      marginLeft: 4,
    },
    nameContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 3,
    },
    nameText: {
      color: whiteColor,
      flexShrink: 1,
      fontFamily: Satoshi700,
    },
    superLikeContainer: {
      alignItems: 'center',
      backgroundColor: darkRedColor,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    superLikeIcon: {
      marginLeft: 'auto',
    },
    superLikeRow: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    superLikeText: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(10, 812),
      marginLeft: 4,
      marginRight: 'auto',
    },
  });

export default useStyles;
