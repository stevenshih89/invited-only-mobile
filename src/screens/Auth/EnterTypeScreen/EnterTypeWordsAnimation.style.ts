import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common';

export const Container = styled.View`
  width: ${screenWidth}px;

  position: absolute;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  bottom: ${screenHeight * 0.1}px;
`;

export const AnimatedText = styled(Animated.Text)`
  color: white;
  font-size: ${RFValue(48, 932)}px;
  font-family: Satoshi-Regular;
  text-align: center;
`;
