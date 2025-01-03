import {StyleSheet} from 'react-native';
import { Satoshi400, Satoshi500 } from "constants/fonts.ts";
import { RFValue } from "react-native-responsive-fontsize";

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'black',
      height: '100%',
      flexDirection: 'column',
    },
    imgContainer: {
      position: 'relative',
    },
    iconContainer: {
      position: 'absolute',
      right: 24,
      top: 64,
      width: 40,
      height: 40,
    },
    contentContainer: {
      flex: 1,
      position: 'absolute',
      bottom: 16,
      justifyContent: 'space-between',
    },
    textContainer: {
      flexDirection: 'column',
      gap: 12,
      marginBottom: 56,
      marginHorizontal: 24,
    },
    btnsContainer: {
      flexDirection: 'column',
      gap: 16,
    },
    skipText: {
      fontFamily: Satoshi500,
      fontWeight: '500',
      fontSize: RFValue(16, 932),
      lineHeight: 22.4,
      textDecorationLine: 'underline',
      color: 'white',
      textAlign: 'center',
    },
    title: {
      fontFamily: Satoshi500,
      fontWeight: '500',
      fontSize: RFValue(40, 932),
      lineHeight: 48,
      letterSpacing: -0.76,
      color: 'white',
    },
    description: {
      maxWidth: 356,
      fontFamily: Satoshi400,
      fontWeight: '400',
      fontSize: RFValue(18, 932),
      lineHeight: 27.18,
      color: 'white',
      letterSpacing: -0.342,
    },
  });
};

export default useStyles;
