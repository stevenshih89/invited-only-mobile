import {StyleSheet} from 'react-native';
import {lightGray6Color, whiteColor} from 'constants/colors.ts';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common';

const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: lightGray6Color,
      paddingHorizontal: screenWidth / 15.5,
    },
    wrapperHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    eventView: {
      padding: 14,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 50,
    },
    eventButton: {
      alignItems: 'center',
      marginRight: screenWidth / 27,
    },
    wrapperHeaderButton: {
      marginVertical: screenHeight / 50,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(13, 812),
      marginTop: screenHeight / 190,
    },
    badgeStyle: {
      position: 'absolute',
      bottom: -4,
      right: 0,
      backgroundColor: 'red',
    },
    badgeText: {
      color: whiteColor,
      fontFamily: Satoshi700,
    },
  });

export default useStyles;
