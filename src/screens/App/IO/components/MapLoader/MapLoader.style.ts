import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { screenHeight, screenWidth } from 'constants/common';
import { whiteColor } from 'constants/colors';

export const Container = styled.View`
  height: ${screenHeight * 0.4};
  justify-content: center;
  align-items: center;
  position: relative;

`;

export const DubaiMapImage = styled(FastImage)`
    border-radius: 100px;
    width: ${screenWidth * 0.4};
    height: ${screenWidth * 0.4};
`;

export const RingContainer = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
`;

export const Ring = styled(Animated.View)`
  position: absolute;

  width: ${screenWidth * 0.4};
  height: ${screenWidth * 0.4};
  border-radius: 100px;
  border: 3px solid ${whiteColor};
  background-color: transparent;
  opacity: 0.6;
`;

