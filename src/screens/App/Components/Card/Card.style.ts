import {blackColor, lightGreenColor, lightRedColor, white0Color} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import FastImage from 'react-native-fast-image';

import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Card = styled.View<{index: number; distanceFromTheTop: number}>`
  position: absolute;
  display: flex;
  width: ${({distanceFromTheTop}: {distanceFromTheTop: number}) => `${105 - distanceFromTheTop * 5}%`};
  height: ${({distanceFromTheTop}: {distanceFromTheTop: number}) => `${100 - distanceFromTheTop * 5}%`};
  height: 100%;
  z-index: ${({index}: {index: number}) => index};
  border-radius: 20px;
  shadow-color: #000;
  box-shadow: 10px 5px 5px ${blackColor};
  shadow-offset: 5px 4px;
  shadow-opacity: 0.9;
  shadow-radius: 15px;
  /* Android Elevation: higher index => bigger shadow */
  elevation: ${({distanceFromTheTop}: {distanceFromTheTop: number}) => distanceFromTheTop * 2};
`;

export const CardOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
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
  border-radius: 20px;
`;

export const StyledAnimatedView = styled(Animated.View)`
  display: flex;
  justify-content: flex-end;
`;
export const StyledNotAnimatedView = styled.View`
  display: flex;
  justify-content: flex-end;
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
