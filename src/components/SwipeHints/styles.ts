import { StyleSheet } from "react-native";
import { black60Color, whiteColor } from "constants/colors.ts";
import { RFValue } from "react-native-responsive-fontsize";
import { Satoshi400 } from "constants/fonts.ts";
import { screenHeight, screenWidth } from "constants/common.ts";


const useStyles = () => {
  return StyleSheet.create({
    container: {
      zIndex: 1111,
    },
    fixedOverlayContainer: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: screenWidth,
      height: screenHeight,
      zIndex: 1111,
      backgroundColor: black60Color,
    },
    swipeHintsContainer: {
      position: 'relative',
      zIndex: 1231,
      justifyContent: 'flex-end',
      height: '100%',
      gap: 90,
      bottom: 80,
    },
    swipeHintContainer: {
      flexDirection: 'column',
      gap: 12,
    },
    handIconContainer1: {
      position: 'absolute',
      right: 20,
      bottom: 0
    },
    handIconContainer2: {
      position: 'absolute',
      right: 60,
      bottom: -5,
      transform: [{ rotate: '70deg' }],
    },
    handIconContainer3: {
      position: 'absolute',
      right: -10,
      top: 35,
      transform: [{ rotate: '-10deg' }]
    },
    swipeHintInviteContainer: {
      alignItems: 'flex-end',
    },
    swipeHintMoreContainer: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    hintRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    swipeHintTitle: {
      fontSize: RFValue(14, 932),
      lineHeight: 16,
      width: 62,
      textAlign: 'center',
      color: whiteColor,
      fontFamily: Satoshi400,
      fontWeight: '400',
    },
    swipeHintTitleWide: {
      width: 86,
    },
  })
};

export default useStyles;
