import {useCallback} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS, Easing} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface UseCardGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled: boolean;
}

export const useCardGesture = ({onSwipeLeft, onSwipeRight, enabled}: UseCardGestureProps) => {
  // Animation values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const likeOpacity = useSharedValue(0);
  const nopeOpacity = useSharedValue(0);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}, {translateY: translateY.value}, {rotate: `${rotation.value}deg`}],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: likeOpacity.value,
    };
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: nopeOpacity.value,
    };
  });

  // Gesture handler
  const gestureHandler = Gesture.Pan()
    .enabled(enabled)
    .onStart(() => {
      // Reset opacity values when gesture starts
      likeOpacity.value = 0;
      nopeOpacity.value = 0;
    })
    .onUpdate(e => {
      // Update position based on gesture
      translateX.value = e.translationX;
      translateY.value = e.translationY;

      // Calculate rotation based on horizontal movement
      rotation.value = (e.translationX / SCREEN_WIDTH) * 15; // 15 degrees max rotation

      // Update like/nope opacity based on horizontal movement
      if (e.translationX > 0) {
        likeOpacity.value = Math.min(e.translationX / SWIPE_THRESHOLD, 1);
        nopeOpacity.value = 0;
      } else if (e.translationX < 0) {
        nopeOpacity.value = Math.min(-e.translationX / SWIPE_THRESHOLD, 1);
        likeOpacity.value = 0;
      }
    })
    .onEnd(e => {
      // Determine if swipe threshold was exceeded
      if (e.translationX > SWIPE_THRESHOLD) {
        // Swipe right - animate off screen to the right
        translateX.value = withTiming(
          SCREEN_WIDTH * 1.5,
          {
            duration: 400,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          () => {
            runOnJS(onSwipeRight)();
          },
        );
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        // Swipe left - animate off screen to the left
        translateX.value = withTiming(
          -SCREEN_WIDTH * 1.5,
          {
            duration: 400,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          () => {
            runOnJS(onSwipeLeft)();
          },
        );
      } else {
        // Return to center if swipe threshold not met
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
        likeOpacity.value = withTiming(0);
        nopeOpacity.value = withTiming(0);
      }
    });

  // Functions to programmatically trigger swipe animations
  const animateReject = useCallback(() => {
    if (!enabled) return;

    nopeOpacity.value = withTiming(1, {duration: 200});
    translateX.value = withTiming(
      -SCREEN_WIDTH * 1.5,
      {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      },
      () => {
        runOnJS(onSwipeLeft)();
      },
    );
    rotation.value = withTiming(-15, {duration: 400});
  }, [enabled, translateX, rotation, nopeOpacity, onSwipeLeft]);

  const animateInvite = useCallback(() => {
    if (!enabled) return;

    likeOpacity.value = withTiming(1, {duration: 200});
    translateX.value = withTiming(
      SCREEN_WIDTH * 1.5,
      {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      },
      () => {
        runOnJS(onSwipeRight)();
      },
    );
    rotation.value = withTiming(15, {duration: 400});
  }, [enabled, translateX, rotation, likeOpacity, onSwipeRight]);

  const animateSuperInvite = useCallback(() => {
    if (!enabled) return;

    likeOpacity.value = withTiming(1, {duration: 200});
    translateY.value = withTiming(
      -SCREEN_WIDTH * 1.5,
      {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      },
      () => {
        runOnJS(onSwipeRight)();
      },
    );
  }, [enabled, translateY, likeOpacity, onSwipeRight]);

  return {
    gestureHandler,
    animatedStyle,
    likeOpacityStyle,
    nopeOpacityStyle,
    animateReject,
    animateInvite,
    animateSuperInvite,
  };
};
