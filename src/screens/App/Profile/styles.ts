import {blackColor, lightGray9Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: blackColor,
    },
    contentContainer: {
      paddingBottom: 120,
      paddingTop: 10,
    },
    profileImageContainer: {
      position: 'relative',
      paddingTop: 12,
      alignItems: 'center',
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 10,
      alignItems: 'center',
    },
    overlayBackground: {
      backgroundColor: whiteColor,
      borderRadius: 32,
      paddingHorizontal: 13,
      paddingVertical: 5,
    },
    percentageText: {
      color: blackColor,
      fontSize: RFValue(14, 812),
      fontFamily: Satoshi700,
    },
    profileImage: {
      width: 160,
      height: 160,
      borderRadius: 100,
    },
    nameContainer: {
      // flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    nameText: {
      color: whiteColor,
      fontSize: RFValue(24, 812),
      fontFamily: Satoshi700,
    },
    ageText: {
      color: whiteColor,
      fontSize: RFValue(18, 812),
      fontFamily: Satoshi700,
      marginTop: 5,
    },
    checkStarIcon: {
      marginLeft: 6,
    },
    buttonContainer: {
      alignItems: 'center',
      // marginTop: 8,
    },
    flatListContainer: {
      height: 40,
    },
    flatListItemSeparator: {
      width: 10,
    },
    tabButton: {
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      maxHeight: 34,
    },
    tabButtonText: {
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    tabButtonActive: {
      backgroundColor: whiteColor,
    },
    tabButtonInactive: {
      backgroundColor: lightGray9Color,
    },
    tabButtonTextActive: {
      color: blackColor,
    },
    tabButtonTextInactive: {
      color: whiteColor,
    },
    tabContentContainer: {
      paddingHorizontal: 20,
      marginTop: 10,
    },
    buttonTitle: {
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
    },
    button: {
      height: 36,
      paddingVertical: 6,
      paddingLeft: 14,
      paddingRight: 33,
      borderRadius: 10,
    },
    accountTypeWrapper: {
      marginTop: 12,
      marginLeft: 6,
      borderRadius: 4,
      paddingHorizontal: 12,
      paddingVertical: 2,
      borderWidth: 1,
      borderColor: whiteColor,
    },
    accountTypeWrapperPremium: {
      marginTop: 12,
      marginLeft: 6,
      borderRadius: 5,
      paddingHorizontal: 12,
      paddingVertical: 2,
      backgroundColor: blackColor,
    },
    accountTypeText: {
      color: whiteColor,
      fontSize: RFValue(14, 812),
      fontFamily: Satoshi700,
    },
    accountTypePremium: {
      color: blackColor,
      fontSize: RFValue(14, 812),
      fontFamily: Satoshi400,
      fontWeight: 'bold',
    },
  });

export default useStyles;
