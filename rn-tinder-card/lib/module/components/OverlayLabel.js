import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
const OverlayLabel = _ref => {
  let {
    inputRange,
    outputRange,
    Component,
    opacityValue
  } = _ref;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacityValue.value, inputRange ?? [], outputRange ?? [], Extrapolation.CLAMP),
      zIndex: 2
    };
  });
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [StyleSheet.absoluteFillObject, animatedStyle],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(Component, null));
};
export default OverlayLabel;
//# sourceMappingURL=OverlayLabel.js.map