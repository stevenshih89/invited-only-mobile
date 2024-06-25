import {Dimensions, StyleSheet} from 'react-native';
import {blackColor} from 'constants/colors.ts';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: blackColor,
    },
    wrapperStyle: {
      height: '75%',
    },
    wrapperButtons: {
      flexDirection: 'row',
      paddingTop: 30,
      paddingHorizontal: 24,
    },
    wrapperBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: dimensionsHeight / 30,
    },
    bar: {
      width: 6,
      height: 6,
      marginHorizontal: dimensionsWidth / 150,
      borderRadius: 30,
    },
    buttonSkip: {
      width: '30%',
    },
    buttonNext: {
      width: '70%',
    },
  });
};

export default useStyles;
