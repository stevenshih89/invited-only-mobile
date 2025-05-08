import { useCallback } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

interface UseSwipeToDeleteProps {
    onDelete: (id: string) => void;
    itemId: string;
}

const useSwipeToDelete = ({ onDelete, itemId }: UseSwipeToDeleteProps) => {
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);
    const deleteThreshold = -70;
    const isDeleting = useSharedValue(false);
    const MAX_SWIPE = -90;

    const handleDelete = useCallback(() => {
        if (onDelete && itemId) {

            isDeleting.value = true;
            translateX.value = withTiming(MAX_SWIPE);
            setTimeout(() => {
                runOnJS(onDelete)(itemId);
                opacity.value = withTiming(0, { duration: 300 });
            }, 300);
        }
    }, [onDelete, itemId, isDeleting, opacity, translateX]);

    const panGesture = Gesture.Pan()
        .activeOffsetX(-10)
        .onUpdate((e) => {
            if (!isDeleting.value && e.translationX < 0) {
                translateX.value = Math.max(MAX_SWIPE, e.translationX);
            }
        })
        .onEnd((e) => {
            if (translateX.value < deleteThreshold) {
                runOnJS(handleDelete)();
            } else {
                translateX.value = withTiming(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            opacity: opacity.value,
            height: isDeleting.value ? withTiming(0, { duration: 500 }) : 'auto',
        };
    });

    return {
        panGesture,
        animatedStyle,
    };
};

export default useSwipeToDelete; 