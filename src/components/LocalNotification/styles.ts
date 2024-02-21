import {StyleSheet} from 'react-native';
import {lightGray3Color, whiteColor} from 'constants/colors.ts';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    success: {
      backgroundColor: lightGray3Color,
      borderLeftColor: lightGray3Color,
      alignSelf: 'center',
      marginRight: 0,
      height: 84,
      opacity: 0.94,
    },
    pending: {
      borderLeftColor: lightGray3Color,
      backgroundColor: lightGray3Color,
      alignSelf: 'center',
      marginRight: 0,
      height: 84,
      opacity: 0.94,
    },
    icon: {
      position: 'absolute',
      left: 10,
      top: 10,
    },
    iconPending: {
      position: 'absolute',
      left: 13.5,
      top: 13.5,
    },
    warning: {
      borderLeftColor: lightGray3Color,
      borderWidth: 1,
      borderColor: '#515151',
    },
    customToast: {
      height: 60,
      width: 200,
      alignSelf: 'flex-end',
    },
    text1: {
      color: whiteColor,
      fontFamily: Satoshi700,
      fontSize: RFValue(16, 812),
    },
    wrapperIcon: {
      position: 'relative',
      left: 14.5,
      top: 22,
    },
    text2: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(16, 812),
      marginTop: 5,
    },
  });
};

export default useStyles;
