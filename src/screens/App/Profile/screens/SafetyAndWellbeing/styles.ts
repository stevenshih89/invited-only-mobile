import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {lightGray5Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

const useStyles = () =>
  StyleSheet.create({
    avatarContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 16,
    },
    avatarText: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
    },
    buttonContainer: {
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      marginTop: 24,
      padding: 20,
      width: '100%',
    },
    buttonContent: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 26,
      width: '100%',
    },
    buttonDescription: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      width: '80%',
    },
    buttonText: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
    },
    container: {
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      padding: 16,
      width: '100%',
    },
    onlineText: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(12, 812),
    },
    title: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
    },
  });

export default useStyles;
