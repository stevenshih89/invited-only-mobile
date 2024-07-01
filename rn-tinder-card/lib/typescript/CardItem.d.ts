import React from 'react';
import { CardItemHandle } from 'rn-tinder-card-bn-digital';
declare const CardItem: React.ForwardRefExoticComponent<{
    cardWidth?: number | undefined;
    cardHeight?: number | undefined;
    translateXRange?: number[] | undefined;
    translateYRange?: number[] | undefined;
    inputRotationRange?: number[] | undefined;
    outputRotationRange?: number[] | undefined;
    inputOverlayLabelRightOpacityRange?: number[] | undefined;
    outputOverlayLabelRightOpacityRange?: number[] | undefined;
    inputOverlayLabelLeftOpacityRange?: number[] | undefined;
    outputOverlayLabelLeftOpacityRange?: number[] | undefined;
    inputOverlayLabelTopOpacityRange?: number[] | undefined;
    outputOverlayLabelTopOpacityRange?: number[] | undefined;
    inputOverlayLabelBottomOpacityRange?: number[] | undefined;
    outputOverlayLabelBottomOpacityRange?: number[] | undefined;
    disableRightSwipe?: boolean | undefined;
    disableLeftSwipe?: boolean | undefined;
    disableTopSwipe?: boolean | undefined;
    disableBottomSwipe?: boolean | undefined;
    cardStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    onSwipedRight?: (() => void) | undefined;
    onSwipedLeft?: (() => void) | undefined;
    onSwipedTop?: (() => void) | undefined;
    onSwipedBottom?: (() => void) | undefined;
    scaleValue?: number | undefined;
    OverlayLabelRight?: (() => JSX.Element) | undefined;
    OverlayLabelLeft?: (() => JSX.Element) | undefined;
    OverlayLabelTop?: (() => JSX.Element) | undefined;
    OverlayLabelBottom?: (() => JSX.Element) | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<CardItemHandle>>;
export default CardItem;
//# sourceMappingURL=CardItem.d.ts.map