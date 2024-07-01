import Animated from 'react-native-reanimated';
declare const windowWidth: number, windowHeight: number;
declare const userConfig: {
    damping: number;
    stiffness: number;
    mass: number;
    overshootClamping: boolean;
    restDisplacementThreshold: number;
    restSpeedThreshold: number;
};
declare function resetPosition(x: Animated.SharedValue<number>, y: Animated.SharedValue<number>): void;
declare function updatePosition(destX: number, translateX: Animated.SharedValue<number>, translateY: Animated.SharedValue<number>, cardWidth?: number, velocityX?: number, disableRightSwipe?: boolean, disableLeftSwipe?: boolean, onSwipedRight?: () => void, onSwipedLeft?: () => void): void;
declare const snapPoint: (value: number, velocity: number, points: ReadonlyArray<number>) => number;
export { resetPosition, updatePosition, snapPoint, userConfig, windowWidth, windowHeight, };
//# sourceMappingURL=index.d.ts.map