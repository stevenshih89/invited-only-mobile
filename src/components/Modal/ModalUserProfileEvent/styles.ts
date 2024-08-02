import {StyleSheet} from 'react-native';
import {black2Color, blackColor, gray1Color, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      // flex: 1,
    },
    wrapper: {
      backgroundColor: black2Color,
      height: '60%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      paddingHorizontal: screenWidth / 30.5,
    },
    whiteLine: {
      backgroundColor: whiteColor,
      height: 2,
      width: 40,
      marginTop: screenHeight / 50,
      marginBottom: screenHeight / 48,
      borderRadius: 10,
    },
    userPhoto: {
      width: 84,
      height: 84,
      borderRadius: 50,
    },
    greenCircle: {
      borderWidth: 2,
      borderColor: blackColor,
      width: 19,
      height: 19,
      backgroundColor: lightGreenColor,
      borderRadius: 50,
      position: 'absolute',
      bottom: 5,
      right: 0,
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      marginLeft: 10,
    },
    buttonFooter: {
      width: '100%',
      paddingVertical: screenHeight / 38,
      // borderTopColor: gray1Color,
      borderBottomColor: gray1Color,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // marginTop: 34,
    },
    title: {
      marginRight: 5,
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(20, 812),
    },
  });
};

export default useStyles;
