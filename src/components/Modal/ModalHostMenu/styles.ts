import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black2Color, blackColor, gray1Color, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {screenHeight} from 'constants/common.ts';
import { Satoshi500} from 'constants/fonts.ts';

const useStyles = () => {
  return StyleSheet.create({
    buttonEvent: {
      alignItems: 'center',
      borderTopColor: gray1Color,
      borderTopWidth: 1,
      flexDirection: 'row',
      paddingVertical: 22,
    },
    greenCircle: {
      backgroundColor: lightGreenColor,
      borderColor: blackColor,
      borderRadius: 50,
      borderWidth: 2,
      bottom: 5,
      height: 11,
      position: 'absolute',
      right: 0,
      width: 11,
    },
    iconButton: {
      marginLeft: 20,
    },
    imageBg: {},
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      marginLeft: 10,
    },
    userPhoto: {
      borderRadius: 50,
      height: 50,
      width: 50,
    },
    whiteLine: {
      backgroundColor: whiteColor,
      borderRadius: 10,
      height: 2,
      marginBottom: screenHeight / 48,
      marginTop: screenHeight / 50,
      width: 40,
    },
    wrapper: {
      alignItems: 'center',
      backgroundColor: black2Color,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginBottom: 30,
      paddingHorizontal: 24,
    },
  });
};

export default useStyles;
