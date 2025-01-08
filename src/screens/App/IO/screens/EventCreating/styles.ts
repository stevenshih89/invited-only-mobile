import {StyleSheet} from 'react-native';
import { black60Color, blackColor, gray3Color, lightGray9Color, transparentWhite16Color } from "constants/colors.ts";
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi500} from 'constants/fonts.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: blackColor,
      paddingHorizontal: 20,
      flex: 1,
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: screenWidth,
      height: screenHeight,
      zIndex: 11,
      backgroundColor: black60Color,
    },
    wrapperTabSelections: {
      borderTopColor: transparentWhite16Color,
      borderTopWidth: 1,
      borderStyle: 'solid',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 24,
    },
    step1HintContainer: {
      position: 'absolute',
      width: '100%',
      top: 60,
      left: 0,
    },
    buttonInvitedOnly: {
      marginRight: 14,
      backgroundColor: lightGray9Color,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    buttonEventDetails: {
      backgroundColor: lightGray9Color,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    textInvitedOnly: {
      fontSize: RFValue(16, 812),
      fontFamily: Satoshi500,
    },
    textEventDetails: {
      fontSize: RFValue(16, 812),
      fontFamily: Satoshi500,
    },
  });
};

export default useStyles;
