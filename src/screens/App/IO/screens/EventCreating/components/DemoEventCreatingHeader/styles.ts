import {StyleSheet} from 'react-native';
import {black60Color, blackColor, whiteColor} from 'constants/colors.ts';
import {Satoshi400} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    headerStyle: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: blackColor,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
    headerTitleStyle: {
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      color: whiteColor,
    },
    iconContainer: {
      position: 'absolute',
      left: 12,
      bottom: 6,
    },
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1111,
      backgroundColor: black60Color,
    },
  });
};

export default useStyles;
