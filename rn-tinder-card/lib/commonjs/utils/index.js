"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPosition = resetPosition;
exports.snapPoint = void 0;
exports.updatePosition = updatePosition;
exports.windowWidth = exports.windowHeight = exports.userConfig = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
const {
  width: windowWidth,
  height: windowHeight
} = _reactNative.Dimensions.get('screen');
exports.windowHeight = windowHeight;
exports.windowWidth = windowWidth;
const userConfig = {
  damping: 15,
  stiffness: 120,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001
};
exports.userConfig = userConfig;
function resetPosition(x, y) {
  'worklet';

  x.value = (0, _reactNativeReanimated.withSpring)(0, userConfig);
  y.value = (0, _reactNativeReanimated.withSpring)(0, userConfig);
}
function updatePosition(destX, translateX, translateY, cardWidth, velocityX, disableRightSwipe, disableLeftSwipe, onSwipedRight, onSwipedLeft) {
  'worklet';

  // If 'cardWidth' is undefined, windowWidth will be used.
  const targetWidth = cardWidth ?? windowWidth;
  if (Math.sign(destX) === 1 && !disableRightSwipe) {
    translateX.value = (0, _reactNativeReanimated.withSpring)(Number(windowWidth + targetWidth + 50), {
      velocity: velocityX
    });
    onSwipedRight && (0, _reactNativeReanimated.runOnJS)(onSwipedRight)();
  } else if (Math.sign(destX) === -1 && !disableLeftSwipe) {
    translateX.value = (0, _reactNativeReanimated.withSpring)(-windowWidth - targetWidth - 50, {
      velocity: velocityX
    });
    onSwipedLeft && (0, _reactNativeReanimated.runOnJS)(onSwipedLeft)();
  } else resetPosition(translateX, translateY);
}
const snapPoint = (value, velocity, points) => {
  'worklet';

  const point = value + 0.2 * velocity;
  const deltas = points.map(p => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return Number(points.filter(p => Math.abs(point - p) === minDelta)[0]);
};
exports.snapPoint = snapPoint;
//# sourceMappingURL=index.js.map