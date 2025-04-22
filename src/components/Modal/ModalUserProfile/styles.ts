import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black2Color, blackColor, gray1Color, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';

const useStyles = () => {
  return StyleSheet.create({
    buttonFooter: {
      alignItems: 'center',
      borderBottomColor: gray1Color,
      borderBottomWidth: 1,
      borderTopColor: gray1Color,
      borderTopWidth: 1,
      flexDirection: 'row',
      marginTop: 34,
      paddingVertical: screenHeight / 38,
      width: '100%',
    },
    container: {
      // flex: 1,
    },
    greenCircle: {
      backgroundColor: lightGreenColor,
      borderColor: blackColor,
      borderRadius: 50,
      borderWidth: 2,
      bottom: 5,
      height: 19,
      position: 'absolute',
      right: 0,
      width: 19,
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginLeft: 10,
    },
    title: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(20, 812),
      marginRight: 5,
    },
    userPhoto: {
      borderRadius: 50,
      height: 84,
      width: 84,
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
      height: '35%',
      paddingHorizontal: screenWidth / 10.5,
    },
  });
};

export default useStyles;
