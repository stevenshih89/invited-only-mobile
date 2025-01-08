import {StyleSheet} from 'react-native';
import {gray3Color, white64Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    hintContainer: {
      width: '100%',
      borderRadius: 6,
      padding: 16,
      backgroundColor: gray3Color,
      marginTop: 10,
      gap: 8,
    },
    start: {
      left: 8,
    },
    end: {
      right: 8,
    },
    top: {
      top: -10,
      borderLeftWidth: 12,
      borderRightWidth: 12,
      borderBottomWidth: 16,
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: gray3Color,
    },
    bottom: {
      bottom: -10,
      borderLeftWidth: 12,
      borderRightWidth: 12,
      borderTopWidth: 16,
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: gray3Color,
    },
    center: {
      left: screenWidth / 2 - 36,
    },
    triangle: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
    nextBtn: {
      width: 121,
      height: 32,
      borderRadius: 6,
      fontSize: 14,
    },
    nextBtnTitle: {
      fontSize: 14,
      lineHeight: 22,
    },
    actionBtnsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      alignItems: 'center',
    },
    navigationBtnsContainer: {
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    },
    backText: {
      fontSize: 14,
      fontFamily: Satoshi500,
      fontWeight: '500',
      lineHeight: 22,
      color: whiteColor,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      fontFamily: Satoshi500,
      fontWeight: '500',
      lineHeight: 20,
      color: whiteColor,
    },
    totalSteps: {
      fontSize: 14,
      fontFamily: Satoshi500,
      fontWeight: '500',
      lineHeight: 18,
      letterSpacing: -0.5,
      color: white64Color,
    },
    description: {
      fontSize: 14,
      fontFamily: Satoshi400,
      fontWeight: '400',
      lineHeight: 18,
      color: white64Color,
    },
  });
};

export default useStyles;
