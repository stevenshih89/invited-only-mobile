import {StyleSheet} from 'react-native';
import {blackColor, whiteColor} from 'constants/colors.ts';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: blackColor,
      width: '100%',
      alignItems: 'center',
      // justifyContent: 'center'
    },
    firstCircle: {
      // width: 390,
      // height: 390,
      position: 'absolute',
      backgroundColor: '#222222',
      // backgroundColor: 'red',
      // top: screenHeight /2 - 390,
      borderRadius: 500,
      alignItems: 'center',
      justifyContent: 'center',
      // top: screenHeight / 2 - 390
    },
    secondCircle: {
      // width: 370,
      // height: 370,
      // top: screenHeight /2 - 380,
      position: 'absolute',
      backgroundColor: '#454545',
      // backgroundColor: 'green',
      borderRadius: 500,
      alignItems: 'center',
      justifyContent: 'center',
    },
    whiteCircle: {
      // width: 340,
      // height: 340,
      // top: screenHeight /2 - 365,
      backgroundColor: whiteColor,
      borderRadius: 170,
      position: 'absolute',
      // transform: [{
      //     translateY: -85
      // }],
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default useStyles;
