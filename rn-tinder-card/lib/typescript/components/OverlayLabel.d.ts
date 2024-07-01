import { PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';
type Props = PropsWithChildren<{
    inputRange?: number[];
    outputRange?: number[];
    Component: () => JSX.Element;
    opacityValue: Animated.SharedValue<number>;
}>;
declare const OverlayLabel: ({ inputRange, outputRange, Component, opacityValue, }: Props) => JSX.Element;
export default OverlayLabel;
//# sourceMappingURL=OverlayLabel.d.ts.map