import {Dimensions} from 'react-native';

const getDimensions = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

  return {
    screenHeight,
    screenWidth,
    windowHeight,
    windowWidth,
  };
};

export default getDimensions;
