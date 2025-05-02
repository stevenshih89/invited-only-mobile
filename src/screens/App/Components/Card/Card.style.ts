import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi500} from 'constants/fonts';
import {blackColor, lightGreenColor, lightRedColor} from 'constants/colors';

export const Card = styled.View<{index: number; distanceFromTheTop: number}>`
  position: absolute;
  display: flex;

  rotate: ${(props: {distanceFromTheTop: number}) => `rotate(${props.distanceFromTheTop * 0.2}deg)`};
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
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 2;

  overflow: hidden;
`;

export const StyledAnimatedView = styled(Animated.View)`
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: 20px;
  height: 100%;
  width: 100%;
`;
export const StyledNotAnimatedView = styled.View`
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: 20px;
  height: 100%;
  width: 100%;
`;

export const LikeAnimatedOpacity = styled(Animated.View)`
  position: absolute;
  top: 30px;
  left: 5px;
  padding: 20px;
  z-index: 3;
`;

export const NopeAnimatedOpacity = styled(Animated.View)`
  position: absolute;
  top: 30px;
  right: 5px;
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
