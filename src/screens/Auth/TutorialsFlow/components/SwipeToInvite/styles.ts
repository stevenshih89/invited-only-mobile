import {Dimensions, StyleSheet} from 'react-native';
import {whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';

const dimensionsHeight = Dimensions.get('window').height;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperImage: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: screenHeight / 1.9,
    },
    textSwipeToInvite: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(30, 812),
      marginTop: dimensionsHeight / 44,
      textAlign: 'center',
    },
    textSwipeRightToInvite: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(14, 812),
      textAlign: 'center',
      marginTop: 8,
    },
    textWrapper: {
      alignItems: 'center',
      paddingHorizontal: dimensionsHeight / 18,
    },
  });
};

export default useStyles;
