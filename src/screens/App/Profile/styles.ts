import {blackColor, lightGray6Color, lightGray9Color, whiteColor} from 'constants/colors';
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
      backgroundColor: lightGray6Color,
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
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    percentageText: {
      color: blackColor,
      fontSize: RFValue(10, 812),
      fontFamily: Satoshi700,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 6,
    },
    nameText: {
      color: whiteColor,
      fontSize: RFValue(16, 812),
      fontFamily: Satoshi700,
    },
    checkStarIcon: {
      marginLeft: 4,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 8,
    },
    flatListContainer: {
      height: 40,
      marginTop: 34,
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
      maxHeight: 30,
    },
    tabButtonText: {
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
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
      height: 30,
    },
  });

export default useStyles;
