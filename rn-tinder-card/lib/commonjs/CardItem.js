"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _utils = require("./utils");
var _OverlayLabel = _interopRequireDefault(require("./components/OverlayLabel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const CardItem = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    cardWidth,
    cardHeight,
    translateXRange,
    translateYRange,
    cardStyle,
    scaleValue,
    onSwipedLeft,
    onSwipedRight,
    onSwipedTop,
    onSwipedBottom,
    disableRightSwipe,
    disableTopSwipe,
    disableLeftSwipe,
    disableBottomSwipe,
    inputRotationRange,
    outputRotationRange,
    inputOverlayLabelRightOpacityRange,
    outputOverlayLabelRightOpacityRange,
    inputOverlayLabelLeftOpacityRange,
    outputOverlayLabelLeftOpacityRange,
    inputOverlayLabelTopOpacityRange,
    outputOverlayLabelTopOpacityRange,
    inputOverlayLabelBottomOpacityRange,
    outputOverlayLabelBottomOpacityRange,
    OverlayLabelRight,
    OverlayLabelLeft,
    OverlayLabelTop,
    OverlayLabelBottom,
    children
  } = _ref;
  const translateX = (0, _reactNativeReanimated.useSharedValue)(0);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(0);
  const scale = (0, _reactNativeReanimated.useSharedValue)(1);
  const gestureHandler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      if (scaleValue !== 1) scale.value = (0, _reactNativeReanimated.withTiming)(Number(scaleValue), {
        easing: _reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.ease)
      });
    },
    onActive: (_ref2, ctx) => {
      let {
        translationX,
        translationY
      } = _ref2;
      translateX.value = translationX + ctx.startX;
      translateY.value = translationY + ctx.startY;
    },
    onEnd: _ref3 => {
      let {
        velocityX,
        velocityY,
        translationX,
        translationY
      } = _ref3;
      const positiveX = Math.abs(translationX);
      const positiveY = Math.abs(translationY);
      const destX = (0, _utils.snapPoint)(translateX.value, velocityX, translateXRange ?? []);
      const destY = (0, _utils.snapPoint)(translateY.value, velocityY, translateYRange ?? []);
      if (!destX && !destY) (0, _utils.resetPosition)(translateX, translateY);else if (positiveY > positiveX && destY && !disableTopSwipe && Math.sign(translationY) === -1) {
        translateY.value = (0, _reactNativeReanimated.withSpring)(-_utils.windowHeight, {
          velocity: velocityY
        });
        onSwipedTop && (0, _reactNativeReanimated.runOnJS)(onSwipedTop)();
      } else if (positiveY > positiveX && destY && !disableBottomSwipe && Math.sign(translationY) === 1) {
        translateY.value = (0, _reactNativeReanimated.withSpring)(_utils.windowHeight, {
          velocity: velocityY
        });
        onSwipedBottom && (0, _reactNativeReanimated.runOnJS)(onSwipedBottom)();
      } else (0, _utils.updatePosition)(destX, translateX, translateY, cardWidth, velocityX, disableRightSwipe, disableLeftSwipe, onSwipedRight, onSwipedLeft);
      if (scaleValue !== 1) scale.value = (0, _reactNativeReanimated.withTiming)(1, {
        easing: _reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.ease)
      });
    }
  });
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const translationX = (0, _reactNativeReanimated.interpolate)(translateX.value, inputRotationRange ?? [], outputRotationRange ?? [], {
      extrapolateRight: _reactNativeReanimated.Extrapolation.CLAMP
    });
    return {
      transform: [{
        translateX: translateX.value
      }, {
        translateY: translateY.value
      }, {
        rotate: `${translationX}deg`
      }, {
        scale: scale.value
      }]
    };
  });
  const swipeRight = (0, _react.useCallback)(() => {
    translateY.value = (0, _reactNativeReanimated.withSpring)(0, _utils.userConfig);
    const destX = (0, _utils.snapPoint)(_utils.windowWidth, 100, translateXRange ?? []);
    (0, _utils.updatePosition)(destX, translateX, translateY, cardWidth, 100, disableRightSwipe, disableLeftSwipe, onSwipedRight, onSwipedLeft);
  }, [translateY, translateX, translateXRange, cardWidth, disableRightSwipe, disableLeftSwipe, onSwipedRight, onSwipedLeft]);
  const swipeLeft = (0, _react.useCallback)(() => {
    translateY.value = (0, _reactNativeReanimated.withSpring)(0, _utils.userConfig);
    const destX = (0, _utils.snapPoint)(-_utils.windowWidth, -100, translateXRange ?? []);
    (0, _utils.updatePosition)(destX, translateX, translateY, cardWidth, -100, disableRightSwipe, disableLeftSwipe, onSwipedRight, onSwipedLeft);
  }, [translateY, translateX, translateXRange, cardWidth, disableRightSwipe, disableLeftSwipe, onSwipedRight, onSwipedLeft]);
  const swipeTop = (0, _react.useCallback)(() => {
    translateY.value = (0, _reactNativeReanimated.withSpring)(-_utils.windowHeight, _utils.userConfig);
    onSwipedTop && (0, _reactNativeReanimated.runOnJS)(onSwipedTop)();
  }, [translateY, onSwipedTop]);
  const swipeBottom = (0, _react.useCallback)(() => {
    translateY.value = (0, _reactNativeReanimated.withSpring)(_utils.windowHeight, _utils.userConfig);
    onSwipedBottom && (0, _reactNativeReanimated.runOnJS)(onSwipedBottom)();
  }, [translateY, onSwipedBottom]);
  const swipeBack = (0, _react.useCallback)(() => {
    translateY.value = (0, _reactNativeReanimated.withSpring)(0, _utils.userConfig);
    translateX.value = (0, _reactNativeReanimated.withSpring)(0, _utils.userConfig);
  }, [translateY, translateX]);

  // Expose the swipeBack method using useImperativeHandle
  (0, _react.useImperativeHandle)(ref, () => ({
    swipeBack: () => swipeBack(),
    swipeRight: () => swipeRight(),
    swipeLeft: () => swipeLeft(),
    swipeTop: () => swipeTop(),
    swipeBottom: () => swipeBottom()
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, {
    onGestureEvent: gestureHandler
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [cardStyle, {
      width: cardWidth,
      height: cardHeight
    }, animatedStyle]
  }, OverlayLabelLeft && /*#__PURE__*/_react.default.createElement(_OverlayLabel.default, {
    inputRange: inputOverlayLabelLeftOpacityRange,
    outputRange: outputOverlayLabelLeftOpacityRange,
    Component: OverlayLabelLeft,
    opacityValue: translateX
  }), OverlayLabelRight && /*#__PURE__*/_react.default.createElement(_OverlayLabel.default, {
    inputRange: inputOverlayLabelRightOpacityRange,
    outputRange: outputOverlayLabelRightOpacityRange,
    Component: OverlayLabelRight,
    opacityValue: translateX
  }), OverlayLabelTop && /*#__PURE__*/_react.default.createElement(_OverlayLabel.default, {
    inputRange: inputOverlayLabelTopOpacityRange,
    outputRange: outputOverlayLabelTopOpacityRange,
    Component: OverlayLabelTop,
    opacityValue: translateY
  }), OverlayLabelBottom && /*#__PURE__*/_react.default.createElement(_OverlayLabel.default, {
    inputRange: inputOverlayLabelBottomOpacityRange,
    outputRange: outputOverlayLabelBottomOpacityRange,
    Component: OverlayLabelBottom,
    opacityValue: translateY
  }), children));
});
var _default = CardItem;
exports.default = _default;
CardItem.defaultProps = {
  //* Card Props
  cardWidth: _utils.windowWidth,
  cardHeight: _utils.windowHeight,
  translateXRange: [-_utils.windowWidth / 2, 0, _utils.windowWidth / 2],
  translateYRange: [-_utils.windowHeight / 2, 0, _utils.windowHeight / 2],
  cardStyle: {},
  scaleValue: 1,
  //* Event callbacks
  onSwipedRight: () => {},
  onSwipedLeft: () => {},
  onSwipedTop: () => {},
  onSwipedBottom: () => {},
  //* Swipe Animation Props
  disableRightSwipe: false,
  disableLeftSwipe: false,
  disableTopSwipe: false,
  disableBottomSwipe: false,
  //* Rotation Animation Props
  inputRotationRange: [-_utils.windowWidth, 0, _utils.windowWidth],
  outputRotationRange: [-10, 0, 10],
  //* Overlay Labels Animation Props
  inputOverlayLabelRightOpacityRange: [0, _utils.windowWidth / 2],
  outputOverlayLabelRightOpacityRange: [0, 1],
  inputOverlayLabelLeftOpacityRange: [0, -_utils.windowWidth / 2],
  outputOverlayLabelLeftOpacityRange: [0, 1],
  inputOverlayLabelTopOpacityRange: [0, -_utils.windowHeight / 2],
  outputOverlayLabelTopOpacityRange: [0, 1],
  inputOverlayLabelBottomOpacityRange: [0, _utils.windowHeight / 2],
  outputOverlayLabelBottomOpacityRange: [0, 1]
};
//# sourceMappingURL=CardItem.js.map