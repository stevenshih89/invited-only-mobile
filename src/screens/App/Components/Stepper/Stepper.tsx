import React from 'react';
import * as S from './Stepper.style';
import { StepItem } from './StepItem'; // Import the new StepItem component

// Define the structure for each step
export interface Step {
    id: string | number;
    title: string;
    description: string;
}

interface StepperProps {
    steps: Step[];
    currentStepIndex: number;
}

const STEP_ANIMATION_DELAY = 1000;

export const Stepper: React.FC<StepperProps> = ({ steps, currentStepIndex }) => {
    return (
        <S.StepperContainer>
            {steps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isLastStep = index === steps.length - 1;

                return (
                    <StepItem
                        key={step.id}
                        step={step}
                        index={index}
                        isCompleted={isCompleted}
                        isLastStep={isLastStep}
                        animationDelay={2000 + (index * STEP_ANIMATION_DELAY)}
                    />
                );
            })}
        </S.StepperContainer>
    );
};

export default Stepper; 