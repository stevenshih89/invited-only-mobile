import { useEffect } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';

// Animation Constants
const TARGET_ROTATION = 4;
const ANIMATION_DURATION = 800;
const TARGET_TRANSLATE_X = 40;
const CARD_ANIMATION_START_DELAY = 100;
const STEPPER_ANIMATION_START_DELAY = CARD_ANIMATION_START_DELAY + ANIMATION_DURATION;
const SEND_MESSAGE_BUTTON_START_DELAY = STEPPER_ANIMATION_START_DELAY + ANIMATION_DURATION + 5000;
interface UseNewConnectionAnimationsProps {
    visible: boolean;
}

export const useNewConnectionAnimations = ({ visible }: UseNewConnectionAnimationsProps) => {
    // Shared values for card animation
    const card1Rotation = useSharedValue(0);
    const card2Rotation = useSharedValue(0);
    const card1TranslateX = useSharedValue(0);
    const card2TranslateX = useSharedValue(0);
    const stepperOpacity = useSharedValue(0);
    const buttonOpacity = useSharedValue(0);


    useEffect(() => {
        if (visible) {
            // Use withDelay directly on the animations
            card1Rotation.value = withDelay(CARD_ANIMATION_START_DELAY,
                withTiming(-TARGET_ROTATION, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.out(Easing.quad),
                })
            );
            card2Rotation.value = withDelay(CARD_ANIMATION_START_DELAY,
                withTiming(TARGET_ROTATION, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.out(Easing.quad),
                })
            );
            card1TranslateX.value = withDelay(CARD_ANIMATION_START_DELAY,
                withTiming(-TARGET_TRANSLATE_X, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.out(Easing.quad),
                })
            );
            card2TranslateX.value = withDelay(CARD_ANIMATION_START_DELAY,
                withTiming(TARGET_TRANSLATE_X, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.out(Easing.quad),
                })
            );
        } else {
            // Reset card animations immediately when not visible
            card1Rotation.value = 0;
            card2Rotation.value = 0;
            card1TranslateX.value = 0;
            card2TranslateX.value = 0;
        }
    }, [visible, card1Rotation, card2Rotation, card1TranslateX, card2TranslateX]);

    // Effect for Stepper animation - depends on card animation finishing
    useEffect(() => {
        if (visible) {
            stepperOpacity.value = withDelay(STEPPER_ANIMATION_START_DELAY, // Delay starts after card animation
                withTiming(1, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.out(Easing.ease)
                })
            );
        } else {
            stepperOpacity.value = 0; // Reset opacity immediately
        }
    }, [visible, stepperOpacity]);

    useEffect(() => {
        if (visible) {
            buttonOpacity.value = withDelay(SEND_MESSAGE_BUTTON_START_DELAY,
                withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) })
            );
        }
    }, [visible, buttonOpacity]);

    // Animated styles for cards
    const card1AnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${card1Rotation.value}deg` },
                { translateX: card1TranslateX.value }
            ],
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        };
    });

    const card2AnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${card2Rotation.value}deg` },
                { translateX: card2TranslateX.value }
            ],
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        };
    });


    const stepperAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: stepperOpacity.value,
            width: '100%',
        };
    });

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: buttonOpacity.value,
        };
    });

    return {
        card1AnimatedStyle,
        card2AnimatedStyle,
        stepperAnimatedStyle,
        buttonAnimatedStyle,
    };
}; 