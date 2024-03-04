import {lightGray5Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      padding: 20,
      width: '100%',
    },
    title: {
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      color: whiteColor,
    },
    avatarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 26,
    },
    avatarText: {
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      color: whiteColor,
    },
    onlineText: {
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
      color: whiteColor,
    },
    buttonContainer: {
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      padding: 20,
      marginTop: 24,
      width: '100%',
    },
    buttonText: {
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      color: whiteColor,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 24,
      width: '100%',
    },
    buttonDescription: {
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      color: whiteColor,
    },
  });

export default useStyles;
