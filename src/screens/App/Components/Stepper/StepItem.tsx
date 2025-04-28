import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { Step } from './Stepper'; // Import Step interface from Stepper
import * as S from './Stepper.style';
import CheckIcon from 'src/assets/images/icons/check.svg' // Use the updated path

interface StepItemProps {
    step: Step;
    index: number;
    isCompleted: boolean;
    isLastStep: boolean;
    animationDelay: number;
}

const ANIMATION_DURATION = 500; // Duration for fade-in

export const StepItem: React.FC<StepItemProps> = ({ step, index, isCompleted, isLastStep, animationDelay }) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withDelay(
            animationDelay,
            withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) })
        );
    }, [opacity, animationDelay]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <S.StepItemContainer key={step.id}>
                <S.ConnectingLine isCompleted={isCompleted} isLastStep={isLastStep} />
                <S.StepContentContainer>
                    <S.StepCircle isCompleted={isCompleted}>
                        {isCompleted ? (
                            <CheckIcon width={18} height={18} />
                        ) : (
                            <S.StepNumberText isCompleted={isCompleted}>
                                {index + 1}
                            </S.StepNumberText>
                        )}
                    </S.StepCircle>
                    <S.StepTextContainer>
                        <S.StepTitleText>{step.title}</S.StepTitleText>
                        <S.StepDescriptionText>{step.description}</S.StepDescriptionText>
                    </S.StepTextContainer>
                </S.StepContentContainer>
            </S.StepItemContainer>
        </Animated.View>
    );
}; 