import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
  inputRange?: number[];
  outputRange?: number[];
  Component: () => JSX.Element;
  opacityValue: Animated.SharedValue<number>;
}>;

const OverlayLabel = ({
  inputRange,
  outputRange,
  Component,
  opacityValue,
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isValidArray = (arr: any) => {
      return arr.every((item: any) => item !== null && item !== undefined && !Number.isNaN(item));
    };
    const validInputRange = isValidArray(inputRange) ? inputRange : [0, 1];
    const validOutputRange = isValidArray(outputRange) ? outputRange : [1, 0];
    return {
      opacity: interpolate(
        opacityValue.value,
        validOutputRange as readonly number[],
        validInputRange as readonly number[],
        Extrapolation.CLAMP
      ),
      zIndex: 2,
    };
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, animatedStyle]}
      pointerEvents="none"
    >
      <Component />
    </Animated.View>
  );
};

export default OverlayLabel;