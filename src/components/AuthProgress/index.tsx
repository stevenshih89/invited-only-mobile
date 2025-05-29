import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import { grayScale700, lightGray2Color, whiteColor } from 'constants/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AuthProgress = ({
  startPercentage = 0,
  endPercentage = 10,
  radius = 20,
  borderWidth = 2,
  trackColor = grayScale700,
  textColor = whiteColor,
  animationDuration = 2000,
}) => {
  const circleCircumference = 2 * Math.PI * radius;

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
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: lightGray2Color, borderRadius: 40 }}>
      <Svg height={(radius + borderWidth) * 2} width={(radius + borderWidth) * 2}>
        <Circle stroke={trackColor} fill="none" cx={radius + borderWidth} cy={radius + borderWidth} r={radius} strokeWidth={borderWidth} />

        <Circle
          stroke={whiteColor}
          fill="none"
          cx={radius + borderWidth}
          cy={radius + borderWidth}
          r={radius}
          strokeWidth={borderWidth}
          strokeDasharray={circleCircumference}
          strokeDashoffset={circleCircumference - (startPercentage / 100) * circleCircumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + borderWidth} ${radius + borderWidth})`}
        />
        <AnimatedCircle
          stroke={whiteColor}
          fill="none"
          cx={radius + borderWidth}
          cy={radius + borderWidth}
          r={radius}
          strokeWidth={borderWidth}
          strokeDasharray={circleCircumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + borderWidth} ${radius + borderWidth})`}
        />
        <SvgText x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="12" fill={textColor}>
          {`${endPercentage}%`}
        </SvgText>
      </Svg>
    </View>
  );
};

export default AuthProgress;
