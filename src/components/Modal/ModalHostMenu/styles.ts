import {StyleSheet} from 'react-native';
import {black2Color, blackColor, gray1Color, lightGray11Color, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    whiteLine: {
      backgroundColor: whiteColor,
      height: 2,
      width: 40,
      marginTop: screenHeight / 50,
      marginBottom: screenHeight / 48,
      borderRadius: 10,
    },
    imageBg: {},
    wrapper: {
      backgroundColor: black2Color,
      height: '85%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 10.5,
    },
    userPhoto: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    greenCircle: {
      borderWidth: 2,
      borderColor: blackColor,
      width: 11,
      height: 11,
      backgroundColor: lightGreenColor,
      borderRadius: 50,
      position: 'absolute',
      bottom: 5,
      right: 0,
    },
    buttonEvent: {
      paddingVertical: 22,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: gray1Color,
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: 20,
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginLeft: 10,
    },
  });
};

export default useStyles;
