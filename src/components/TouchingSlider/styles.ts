import {StyleSheet} from 'react-native';
import {transparentGray60Color, whiteColor} from 'constants/colors.ts';
import {Satoshi500, Satoshi400, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: 22,
      height: screenHeight * 0.661,
    },
    imageStyle: {
      height: '100%',
      borderRadius: 22,
    },
    wrapperBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: screenHeight / 30,
    },
    bar: {
      width: screenWidth * 0.25,
      height: 3,
      marginHorizontal: screenWidth / 130,
      borderRadius: 30,
    },
    button: {
      width: '50%',
    },
    wrapperButtons: {
      flexDirection: 'row',
      height: '70%',
      position: 'absolute',
      zIndex: 999,
    },
    wrapperBio: {
      paddingLeft: screenWidth / 20,
    },
    linearGradientFooter: {
      height: 201,
      position: 'absolute',
      width: '100%',
      bottom: 0,
      left: 0,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },
    linearGradientHeader: {
      height: 125,
      borderTopRightRadius: 22,
      borderTopLeftRadius: 22,
    },
    rowBioInfo: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
    textName: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(37, 812),
    },
    textYears: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(26, 812),
      marginLeft: 12,
    },
    wrapperFooterCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '95%',
    },
    infoTags: {
      flexDirection: 'row',
      backgroundColor: 'rgba(37, 37, 37, 0.60)',
      paddingVertical: screenHeight / 85,
      paddingHorizontal: screenWidth / 24,
      borderRadius: 50,
      alignItems: 'center',
    },
    textInfoTags: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      marginLeft: screenWidth / 43,
    },
    buttonFlash: {
      backgroundColor: 'black',
      borderRadius: 50,
      width: 61,
      height: 61,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.8,
    },
    lockedWrapper: {
      position: 'absolute',
      top: 120,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    lockIconWr: {
      alignSelf: 'center',
      borderRadius: 60,
      backgroundColor: transparentGray60Color,
      width: 62,
      height: 62,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lockDescWr: {
      marginTop: 8,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 30,
      backgroundColor: transparentGray60Color,
      alignSelf: 'center',
    },
    lockedTitle: {
      color: whiteColor,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: Satoshi700,
      fontSize: RFValue(20, 812),
    },
    lockedSubtitle: {
      color: whiteColor,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    lockedHaveCodeWr: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lockedHaveCodeTitle: {
      color: whiteColor,
      textAlign: 'center',
      fontFamily: Satoshi500,
      fontSize: RFValue(12, 812),
    },
    lockedHaveCodePressableText: {
      textDecorationLine: 'underline',
      marginLeft: 4,
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(12, 812),
    },
  });
};

export default useStyles;
