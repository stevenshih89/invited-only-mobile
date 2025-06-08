import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor } from 'constants/colors.ts';
import { Satoshi500 } from 'constants/fonts';


const useStyles = () =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: blackColor,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0,
    },
    headerTitleStyle: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(24, 932),
    },
    tabNavigator: {
      backgroundColor: blackColor,
      borderTopLeftRadius: 33,
      borderTopRightRadius: 33,
      borderTopWidth: 0,
      marginBottom: 20,
      marginTop: 10,
      paddingTop: 10,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
  });

export default useStyles;
