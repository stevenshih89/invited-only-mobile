import {whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import {Satoshi400} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: screenHeight / 3.2,
    },
    titleWr: {
      marginBottom: 14,
    },
    title: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
    },
    pagination: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      height: '102%',
    },
    imageWr: {
      width: screenWidth / 3 - 28,
    },
    image: {
      width: screenWidth / 3 - 42,
      height: screenWidth / 3 - 42,
      borderRadius: 10,
    },
    separator: {
      height: 14,
    },
  });

export default useStyles;
