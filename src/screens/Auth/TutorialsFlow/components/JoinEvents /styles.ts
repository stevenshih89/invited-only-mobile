import {Dimensions, StyleSheet} from 'react-native';
import {whiteColor} from 'constants/colors.ts';
import {Satoshi400} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    imageWrapper: {
      alignItems: 'flex-start',
      marginLeft: dimensionsWidth / 30,
      height: 401,
    },
    image: {
      width: '100%',
      height: 364,
    },
    textJoinEvents: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(34, 812),
      marginTop: dimensionsHeight / 44,
    },
    textExploreAndJoinEvents: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      textAlign: 'center',
      marginTop: dimensionsHeight / 44,
    },
    textWrapper: {
      alignItems: 'center',
      paddingHorizontal: dimensionsHeight / 18,
    },
  });
};

export default useStyles;
