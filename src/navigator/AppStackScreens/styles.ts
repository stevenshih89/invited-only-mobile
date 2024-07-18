import {StyleSheet} from 'react-native';
import {backgroundColor, blackColor, whiteColor} from 'constants/colors.ts';
import {Satoshi400} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

//import components

const useStyles = () => {
  return StyleSheet.create({
    headerStyle: {
      backgroundColor: blackColor,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
    headerTitleStyle: {
      fontFamily: Satoshi400,
      fontSize: RFValue(24, 812),
      color: whiteColor,
    },
  });
};

export default useStyles;
