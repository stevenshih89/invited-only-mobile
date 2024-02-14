import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

//import components
import {Satoshi400} from 'constants/fonts.ts';
import {lightGray5Color, whiteColor} from 'constants/colors.ts';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    imageBackground: {
      flex: 1,
    },
    logoSecondaryWrapper: {
      alignItems: 'center',
      paddingHorizontal: dimensionsHeight / 38,
      opacity: 0.4,
    },
    safeAreaView: {
      flex: 1,
      paddingBottom: 0,
    },
    container: {
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      paddingVertical: dimensionsHeight / 30,
      paddingHorizontal: dimensionsWidth / 22,
      marginHorizontal: dimensionsWidth / 20,
      alignItems: 'center',
    },
    logoPrimary: {
      marginBottom: dimensionsHeight / 34,
    },
    iconVerifyFilled: {
      position: 'relative',
      left: 65,
      bottom: 42,
    },
    textInReview: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(34, 812),
      marginBottom: dimensionsHeight / 44.5,
      textAlign: 'center',
    },
    iconVerifyFilledAccepted: {
      position: 'relative',
      left: 65,
      bottom: 42,
    },
    textYourAccount: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginBottom: dimensionsHeight / 28,
      textAlign: 'center',
      opacity: 0.8,
    },
    buttonContinue: {
      width: '100%',
    },
  });
};

export default useStyles;
