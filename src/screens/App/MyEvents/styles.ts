import {StyleSheet} from 'react-native';
import {lightGray6Color} from 'constants/colors.ts';
import {screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: lightGray6Color,
      flex: 1,
      paddingHorizontal: screenWidth / 19,
    },
  });
};

export default useStyles;
