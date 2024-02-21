import {StyleSheet} from 'react-native';
import {whiteColor} from 'constants/colors.ts';
import {Satoshi500, Satoshi400} from 'constants/fonts.ts';
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
  });
};

export default useStyles;
