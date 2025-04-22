import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

//import components
import {Satoshi400} from 'constants/fonts.ts';
import {lightGray5Color, whiteColor} from 'constants/colors.ts';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    buttonContinue: {
      width: '100%',
    },
    container: {
      alignItems: 'center',
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      marginHorizontal: dimensionsWidth / 20,
      paddingHorizontal: dimensionsWidth / 22,
      paddingVertical: dimensionsHeight / 30,
    },
    iconVerifyFilled: {
      bottom: 42,
      left: 65,
      position: 'relative',
    },
    imageBackground: {
      flex: 1,
    },
    logoPrimary: {
      marginBottom: dimensionsHeight / 34,
    },
    logoSecondaryWrapper: {
      alignItems: 'center',
      opacity: 0.4,
      paddingHorizontal: dimensionsHeight / 38,
    },
    safeAreaView: {
      flex: 1,
      paddingBottom: 0,
    },
    textInReview: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(34, 812),
      marginBottom: dimensionsHeight / 44.5,
      textAlign: 'center',
    },
    textYourAccount: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginBottom: dimensionsHeight / 28,
      opacity: 0.8,
      textAlign: 'center',
    },
    wrapperContainerVerified: {
      flex: 1,
      justifyContent: 'center',
    },
    wrapperIconVerifyFilledAccepted: {
      backgroundColor: whiteColor,
      borderRadius: 7,
      bottom: 42,
      left: 65,
      padding: 8.8,
      position: 'relative',
    },
  });
};

export default useStyles;
