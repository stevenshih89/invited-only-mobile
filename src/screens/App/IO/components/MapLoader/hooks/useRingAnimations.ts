import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing, withDelay } from 'react-native-reanimated';

interface RingAnimationConfig {
    ring1MaxScale?: number;
    ring2MaxScale?: number;
    ring1MaxOpacity?: number;
    ring2MaxOpacity?: number;
    duration?: number;
    delay?: number;
}

export const useRingAnimations = (config: RingAnimationConfig = {}) => {
    const {
        ring1MaxScale = 2,
        ring2MaxScale = 2,
        ring1MaxOpacity = 0,
        ring2MaxOpacity = 0,
        duration = 2000,
        delay = 667
    } = config;

    const ring1Scale = useSharedValue(1);
    const ring1Opacity = useSharedValue(0.8);
    const ring2Scale = useSharedValue(1);
    const ring2Opacity = useSharedValue(0.6);

    useEffect(() => {
        const startAnimation = () => {
            // Ring 1 animation - starts immediately and repeats continuously
            ring1Scale.value = withRepeat(
                withTiming(ring1MaxScale, {
                    duration,
                    easing: Easing.out(Easing.ease),
                }),
                -1,
                false
            );
            ring1Opacity.value = withRepeat(
                withTiming(ring1MaxOpacity, {
                    duration,
                    easing: Easing.out(Easing.ease),
                }),
                -1,
                false
            );

            // Ring 2 animation - starts with delay but then repeats continuously
            // The delay only affects the initial start, not the repetition cycle
            ring2Scale.value = withDelay(
                delay,
                withRepeat(
                    withTiming(ring2MaxScale, {
                        duration,
                        easing: Easing.out(Easing.ease),
                    }),
                    -1,
                    false
                )
            );
            ring2Opacity.value = withDelay(
                delay,
                withRepeat(
                    withTiming(ring2MaxOpacity, {
                        duration,
                        easing: Easing.out(Easing.ease),
                    }),
                    -1,
                    false
                )
            );
        };

        startAnimation();
    }, [ring1MaxScale, ring2MaxScale, ring1MaxOpacity, ring2MaxOpacity, duration, delay]);

    const ring1AnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: ring1Scale.value }],
        opacity: ring1Opacity.value,
    }));

    const ring2AnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: ring2Scale.value }],
        opacity: ring2Opacity.value,
    }));

    return {
        ring1AnimatedStyle,
        ring2AnimatedStyle,
    };
}; 