import {useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface UseCardGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled: boolean;
  index: number;
  isTopCard: boolean;
}

export const useCardGesture = ({onSwipeLeft, onSwipeRight, enabled, index, isTopCard}: UseCardGestureProps) => {
  const translateX = useSharedValue(index === 0 ? 0 : (index % 2 === 0 ? -1 : 1) * (index * 5));
  const translateY = useSharedValue(index === 0 ? 0 : -6 * index);
  const rotation = useSharedValue(index === 0 ? 0 : (index % 2 === 0 ? -1 : 1) * (index * 0.8));
  const scale = useSharedValue(1);

  const [wasTopCard, setWasTopCard] = useState(isTopCard);

  useEffect(() => {
    if (isTopCard && !wasTopCard) {
      resetPosition();
    }

    setWasTopCard(isTopCard);
  }, [isTopCard, translateX, translateY, rotation, wasTopCard, index]);

  const resetPosition = () => {
    translateX.value = withSpring(0, {damping: 20});
    translateY.value = withSpring(0, {damping: 20});
    rotation.value = withSpring(0, {damping: 20});
  };

  const swipeLeft = () => {
    if (!enabled) return;

    translateX.value = withTiming(-SCREEN_WIDTH * 1.5, {duration: 300}, () => {
      runOnJS(onSwipeLeft)();
    });
    rotation.value = withTiming(-15, {duration: 300});
  };

  const swipeRight = () => {
    if (!enabled) return;
    translateX.value = withTiming(SCREEN_WIDTH * 1.5, {duration: 300}, () => {
      runOnJS(onSwipeRight)();
    });
    rotation.value = withTiming(15, {duration: 300});
  };

  const animateReject = swipeLeft;
  const animateInvite = swipeRight;

  // Super invite with a small scale effect before swiping right
  const animateSuperInvite = () => {
    if (!enabled) return;

    scale.value = withTiming(1.1, {duration: 150}, () => {
      scale.value = withTiming(1, {duration: 150});
      runOnJS(swipeRight)();
    });
  };

  const gestureHandler = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate(event => {
      if (!enabled) return;
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotation.value = (event.translationX / SCREEN_WIDTH) * 15; // 15 degrees max
    })
    .onEnd(event => {
      if (!enabled) return;

      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, {duration: 300}, () => {
          runOnJS(onSwipeRight)();
        });
        rotation.value = withTiming(15, {duration: 300});
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, {duration: 300}, () => {
          runOnJS(onSwipeLeft)();
        });
        rotation.value = withTiming(-15, {duration: 300});
      } else {
        // Reset position with spring for bounce effect
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}, {translateY: translateY.value}, {rotate: `${rotation.value}deg`}, {scale: scale.value}],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => {
    const opacity = translateX.value > 0 ? Math.min(1, translateX.value / (SWIPE_THRESHOLD * 0.8)) : 0;
    return {opacity};
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    const opacity = translateX.value < 0 ? Math.min(1, -translateX.value / (SWIPE_THRESHOLD * 0.8)) : 0;
    return {opacity};
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
