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
    wrapperImage: {
      height: 401,
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      // marginLeft: dimensionsWidth / 10,
    },
    textSeeWhoWantsToJoinYoy: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(34, 812),
      marginTop: dimensionsHeight / 44,
      textAlign: 'center',
    },
    textFindOut: {
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
