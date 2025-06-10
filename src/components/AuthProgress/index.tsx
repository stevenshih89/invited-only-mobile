import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import Animated, {useSharedValue, useAnimatedProps, withTiming, Easing} from 'react-native-reanimated';
import {grayScale700, lightGray2Color, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const BASE_SCREEN_HEIGHT = 932;
const calculateSize = (baseSize: number) => {
  const ratio = screenHeight / BASE_SCREEN_HEIGHT;
  return Math.round(baseSize * ratio);
};

interface AuthProgressProps {
  startPercentage?: number;
  endPercentage?: number;
  radius?: number;
  borderWidth?: number;
  trackColor?: string;
  textColor?: string;
  animationDuration?: number;
}

const AuthProgress: FC<AuthProgressProps> = ({
  startPercentage = 0,
  endPercentage = 10,
  radius = 22,
  borderWidth = 2,
  trackColor = grayScale700,
  textColor = whiteColor,
  animationDuration = 2000,
}) => {
  const adaptedRadius = calculateSize(radius);
  const adaptedBorderWidth = calculateSize(borderWidth);
  const circleCircumference = 2 * Math.PI * adaptedRadius;

  const animatedPercentage = useSharedValue(startPercentage);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circleCircumference - (animatedPercentage.value / 100) * circleCircumference;
    return {
      strokeDashoffset,
    };
  });

  useEffect(() => {
    animatedPercentage.value = withTiming(endPercentage, {
      duration: animationDuration,
      easing: Easing.out(Easing.inOut(Easing.poly(4))),
    });
  }, [endPercentage]);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: lightGray2Color, borderRadius: calculateSize(40)}}>
      <Svg height={(adaptedRadius + adaptedBorderWidth) * 2} width={(adaptedRadius + adaptedBorderWidth) * 2}>
        <Circle
          stroke={trackColor}
          fill="none"
          cx={adaptedRadius + adaptedBorderWidth}
          cy={adaptedRadius + adaptedBorderWidth}
          r={adaptedRadius}
          strokeWidth={adaptedBorderWidth}
        />

        <Circle
          stroke={whiteColor}
          fill="none"
          cx={adaptedRadius + adaptedBorderWidth}
          cy={adaptedRadius + adaptedBorderWidth}
          r={adaptedRadius}
          strokeWidth={adaptedBorderWidth}
          strokeDasharray={circleCircumference}
          strokeDashoffset={circleCircumference - (startPercentage / 100) * circleCircumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${adaptedRadius + adaptedBorderWidth} ${adaptedRadius + adaptedBorderWidth})`}
        />
        <AnimatedCircle
          stroke={whiteColor}
          fill="none"
          cx={adaptedRadius + adaptedBorderWidth}
          cy={adaptedRadius + adaptedBorderWidth}
          r={adaptedRadius}
          strokeWidth={adaptedBorderWidth}
          strokeDasharray={circleCircumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${adaptedRadius + adaptedBorderWidth} ${adaptedRadius + adaptedBorderWidth})`}
        />
        <SvgText x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize={calculateSize(12)} fill={textColor}>
          {`${endPercentage}%`}
        </SvgText>
      </Svg>
    </View>
  );
};

export default AuthProgress;
