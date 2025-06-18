import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;
const VERTICAL_THRESHOLD = 10;
const HORIZONTAL_THRESHOLD = 1;

interface UseCardGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled: boolean;
  index: number;
  isTopCard: boolean;
  topIndex: number;
  raiseShuffle?: boolean
}

export const useCardGesture = ({ onSwipeLeft, onSwipeRight, topIndex, enabled, index, isTopCard, raiseShuffle }: UseCardGestureProps) => {
  const distanceFromTop = topIndex - index;
  const sign = distanceFromTop % 2 === 0 ? 1 : -1;
  const offsetX = distanceFromTop * 2;
  const offsetY = distanceFromTop;
  const offsetRotation = distanceFromTop * 0.2;

  const initialTranslateX = isTopCard ? 0 : sign * offsetX;
  const initialTranslateY = isTopCard ? 0 : -offsetY - (raiseShuffle ? 30 : 2);
  const initialRotationValue = isTopCard ? 0 : sign * offsetRotation;

  const translateX = useSharedValue(initialTranslateX);
  const translateY = useSharedValue(initialTranslateY);
  const rotation = useSharedValue(initialRotationValue);
  const scale = useSharedValue(1);
  const [wasTopCard, setWasTopCard] = useState(isTopCard);

  useEffect(() => {
    if (isTopCard && !wasTopCard) {
      resetPosition();
    }

    setWasTopCard(isTopCard);
  }, [isTopCard, translateX, translateY, rotation, wasTopCard, index]);

  const resetPosition = () => {
    translateX.value = withSpring(0, { damping: 20 });
    translateY.value = withSpring(0, { damping: 20 });
    rotation.value = withSpring(0, { damping: 20 });
  };

  const swipeLeft = () => {
    if (!enabled) return;

    translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
      runOnJS(onSwipeLeft)();
    });
    rotation.value = withTiming(-15, { duration: 300 });
  };

  const swipeRight = () => {
    if (!enabled) return;
    translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
      runOnJS(onSwipeRight)();
    });
    rotation.value = withTiming(15, { duration: 300 });
  };

  const animateReject = swipeLeft;
  const animateInvite = swipeRight;

  const animateSuperInvite = () => {
    if (!enabled) return;

    scale.value = withTiming(1.1, { duration: 150 }, () => {
      scale.value = withTiming(1, { duration: 150 });
      runOnJS(swipeRight)();
    });
  };

  const gestureHandler = Gesture.Pan()
    .activeOffsetX([-HORIZONTAL_THRESHOLD, HORIZONTAL_THRESHOLD])
    .failOffsetY([-VERTICAL_THRESHOLD, VERTICAL_THRESHOLD])
    .onBegin(() => {
      'worklet;'
    })
    .onUpdate(event => {
      'worklet;'
      if (!enabled) return;
      translateX.value = event.translationX;
      rotation.value = (event.translationX / SCREEN_WIDTH) * 15;
    })
    .onEnd(event => {
      'worklet;'
      if (!enabled) return;
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
          runOnJS(onSwipeRight)();
        });
        rotation.value = withTiming(15, { duration: 300 });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
          runOnJS(onSwipeLeft)();
        });
        rotation.value = withTiming(-15, { duration: 300 });
      } else {
        // Reset if swipe wasn't decisive enough
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet;'
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => {
    'worklet;'
    const opacity = translateX.value > 0 ? Math.min(1, translateX.value / (SWIPE_THRESHOLD * 0.8)) : 0;
    return { opacity };
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    'worklet;'
    const opacity = translateX.value < 0 ? Math.min(1, -translateX.value / (SWIPE_THRESHOLD * 0.8)) : 0;
    return { opacity };
  });

  return {
    gestureHandler,
    animatedStyle,
    likeOpacityStyle,
    nopeOpacityStyle,
    swipeLeft,
    swipeRight,
    resetPosition,
    animateReject,
    animateInvite,
    animateSuperInvite,
  };
};
