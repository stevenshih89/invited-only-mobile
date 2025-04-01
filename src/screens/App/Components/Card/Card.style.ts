import {lightGreenColor, lightRedColor, white0Color} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import FastImage from 'react-native-fast-image';

import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Card = styled(Animated.View)<{index: number}>`
  position: absolute;
  display: flex;
  width: ${({index}: {index: number}) => `${100 - index * 5}%`};
  height: ${({index}: {index: number}) => `${100 - index * 5}%`};
  z-index: ${({index}: {index: number}) => 10 - index};
  opacity: ${({index}: {index: number}) => (index > 4 ? 0.9 - (index - 4) * 0.15 : 1)};
  background-color: transparent;
`;
export const CardImage = styled(FastImage)`
  border-radius: 20px;
`;

export const CardOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  outline: 1px solid transparent;
  border-radius: 20px;
  z-index: 1;
`;

export const CardGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  z-index: 2;
`;

export const LikeAnimatedOpacity = styled(Animated.View)`
  position: absolute;
  top: 10px;
  left: 0;
  padding: 20px;
  z-index: 3;
`;

export const NopeAnimatedOpacity = styled(Animated.View)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 20px;
  z-index: 3;
`;

export const LabelTextLike = styled.Text`
  font-family: ${Satoshi500};
  color: ${lightGreenColor};
  font-size: ${RFValue(40, 932)}px;
`;

export const LabelTextNope = styled.Text`
  font-family: ${Satoshi500};
  color: ${lightRedColor};
  font-size: ${RFValue(40, 932)}px;
`;
