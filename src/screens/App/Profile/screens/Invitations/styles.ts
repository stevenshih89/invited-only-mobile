import {lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      padding: 20,
    },
    title: {
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      color: whiteColor,
    },
    inviteContainer: {
      marginTop: 10,
    },
    label: {
      fontFamily: Satoshi500,
      fontSize: RFValue(14, 812),
      color: whiteColor,
      marginTop: 26,
    },
    inviteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: lightGray2Color,
      padding: 20,
      borderRadius: 10,
    },
    inviteText: {
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      color: whiteColor,
    },
    shareButton: {
      marginTop: 14,
    },
  });

export default useStyles;
