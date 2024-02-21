import {StyleSheet} from 'react-native';
import {black1Color} from 'constants/colors.ts';

//import components

const useStyles = () => {
  return StyleSheet.create({
    tabNavigator: {
      backgroundColor: black1Color,
      borderTopWidth: 0,
      position: 'absolute',
      borderTopLeftRadius: 33,
      borderTopRightRadius: 33,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
  });
};

export default useStyles;
