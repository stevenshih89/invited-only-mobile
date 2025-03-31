import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  margin-top: 150px;
  position: relative;
  overflow: hidden;
  height: 150px;
`;

export const AnimatedText = styled(Animated.Text)`
  color: white;
  font-size: 86px;
  font-family: Satoshi-Regular;
`;
