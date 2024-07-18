import {StyleSheet} from 'react-native';
import {backgroundColor, blackColor, lightGray5Color, transparentWhite16Color, whiteColor} from 'constants/colors.ts';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common.ts';

const useStyles = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      paddingTop: screenHeight / 38,
      paddingHorizontal: 20,
      backgroundColor: blackColor,
    },
    containerScroll: {
      flex: 1,
      borderTopColor: transparentWhite16Color,
      borderTopWidth: 1,
      borderStyle: 'solid',
      backgroundColor: blackColor,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: lightGray5Color,
      borderRadius: 10,
      padding: 20,
    },
    notificationImageContainer: {
      marginRight: 14,
    },
    notificationImageBackground: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationTitle: {
      fontFamily: Satoshi700,
      fontSize: RFValue(18, 812),
      color: whiteColor,
    },
    notificationSubtitleWr: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    notificationSubtitleText: {
      fontFamily: Satoshi500,
      fontSize: RFValue(16, 812),
      color: whiteColor,
    },
    notificationSubtitlePressableWr: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 4,
    },
    notificationPressableText: {
      textDecorationLine: 'underline',
      fontFamily: Satoshi500,
      fontSize: RFValue(16, 812),
      color: whiteColor,
    },
    notificationArrowRight: {
      marginLeft: 4,
    },
  });

export default useStyles;
