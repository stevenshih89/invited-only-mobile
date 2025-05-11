
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { screenHeight, screenWidth } from 'constants/common';


export const Container = styled.View`
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;

`;

export const AnimatedText = styled(Animated.Text)`
  color: white;
  font-size: 86px;
  font-family: Satoshi-Regular;
  text-align: center;
`;
