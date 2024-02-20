import {Dimensions, StyleSheet} from 'react-native';
import {lightGray6Color, whiteColor} from 'constants/colors.ts';
import {Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: lightGray6Color,
      paddingHorizontal: screenWidth / 15.5,
    },
    wrapperHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    eventView: {
      paddingVertical: screenWidth / 26,
      paddingHorizontal: screenHeight / 55,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 50,
    },
    eventButton: {
      alignItems: 'center',
      marginRight: screenWidth / 27,
    },
    wrapperHeaderButton: {
      marginVertical: screenHeight / 50,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    textButton: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(13, 812),
      marginTop: screenHeight / 190,
    },
  });
};

export default useStyles;
