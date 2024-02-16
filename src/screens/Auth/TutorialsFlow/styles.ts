import {Dimensions, StyleSheet} from 'react-native';
import {blackColor} from 'constants/colors.ts';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: blackColor,
    },
    wrapperStyle: {
      height: '81%',
    },
    wrapperButtons: {
      flexDirection: 'row',
      paddingTop: dimensionsHeight / 20,
      paddingHorizontal: dimensionsHeight / 21.5,
    },
    wrapperBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: dimensionsHeight / 30,
    },
    bar: {
      width: 41,
      height: 3,
      marginHorizontal: dimensionsWidth / 80,
      borderRadius: 30,
    },
    buttonSkip: {
      marginRight: dimensionsWidth / 32,
    },
    buttonNext: {
      width: 225,
    },
  });
};

export default useStyles;
