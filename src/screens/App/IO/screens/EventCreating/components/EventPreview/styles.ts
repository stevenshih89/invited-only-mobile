import {StyleSheet} from 'react-native';
import {backgroundColor, lightGray2Color, lightGray5Color, lightGray8Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    scrollContainerContent: {
      paddingBottom: 40,
      flexGrow: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    inputIcon: {
      backgroundColor: lightGray2Color,
      height: 56,
      paddingRight: 8,
      justifyContent: 'center',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    touchableImage: {
      height: '100%',
      width: '100%',
      backgroundColor: lightGray2Color,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    imageNumber: {
      backgroundColor: lightGray8Color,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingVertical: 7,
      // width: 26,
      // height: 22,
      // position: 'absolute',
      // bottom: 18,
      // left: '50%',
      // top: 6,
      // right: 6,
    },
    maskInput: {
      color: whiteColor,
      marginLeft: 5,
      borderTopLeftRadius: 10,
      opacity: 0.35,
      fontSize: RFValue(18, 812),
    },
    eventTypeWr: {
      borderRadius: 8,
      padding: 20,
      backgroundColor: lightGray5Color,
      marginBottom: 24,
    },
    eventTypeTitle: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginBottom: 26,
    },
    eventTypeItem: {
      // borderWidth: 1,
      // borderStyle: 'solid',
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    eventTypeItemText: {
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    eventTypeSeparator: {
      width: 14,
    },
    eventPlaceWr: {
      padding: 20,
      backgroundColor: lightGray5Color,
      borderRadius: 8,
      marginBottom: 24,
    },
    eventPhotosText: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      marginBottom: 26,
    },
    eventPhotoLargeWr: {
      width: '100%',
      height: screenWidth / 2.3,
      marginBottom: 8,
    },
    eventPhotoSmallLeftWr: {
      flex: 1,
      height: screenHeight / 7,
      marginRight: 6,
    },
    eventPhotoSmallRightWr: {
      flex: 1,
      height: screenHeight / 7,
      marginLeft: 6,
    },
    eventPhotoRow: {
      flex: 1,
      flexDirection: 'row',
    },
    eventPhotoNumberText: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(10, 812),
    },
    eventPhotoSmallImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
    },
    eventDetailsWr: {
      borderRadius: 8,
      padding: 20,
      backgroundColor: lightGray5Color,
    },
    eventDetailsTitle: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      marginBottom: 24,
    },
    maskInputLabel: {
      marginBottom: 12,
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
    },
    maskInputWr: {
      padding: 20,
      backgroundColor: lightGray2Color,
      borderRadius: 10,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 26,
    },
    flex: {
      flex: 1,
    },
    inputLabel: {
      fontSize: RFValue(14, 812),
    },
    button: {
      marginTop: 24,
    },
  });

export default useStyles;
