import {StyleSheet} from 'react-native';
import {errorColor, lightGray2Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      width: '100%',
      height: 56,
      borderRadius: 10,
      borderWidth: 0,
      backgroundColor: lightGray2Color,
      flexDirection: 'row',
      paddingRight: 8,
      paddingBottom: 8,
      justifyContent: 'space-between',
    },
    titleText: {
      marginBottom: 12,
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
    },
    wrapperInputIcon: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 8,
      width: 20,
    },
    input: {
      minWidth: 200,
      paddingLeft: 12,
      paddingTop: 8,
      paddingBottom: 0,
      fontSize: RFValue(18, 812),
    },
    errorText: {
      fontSize: RFValue(14, 812),
      fontFamily: Satoshi500,
      color: errorColor,
    },
    wrapperErrorText: {
      marginTop: 2,
      marginBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

export default useStyles;
