import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Button from 'components/Button/Button.tsx';
import * as S from './index.style';

interface IHintCardProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  onStepChange?: (step: number) => void;
  onFinishSteps?: () => void;
  onSkipAction?: () => void;
  onPreviousAction?: () => void;
  onNextAction?: () => void;
  isNextBtnDisabled?: boolean;
  directionVertical?: 'top' | 'bottom';
  directionHorizontal?: 'start' | 'center' | 'end';
}

const HintCard = (props: IHintCardProps) => {
  const {
    currentStep,
    onNextAction,
    onPreviousAction,
    totalSteps,
    title,
    description,
    onSkipAction,
    onFinishSteps,
    isNextBtnDisabled,
    onStepChange,
    directionVertical = 'top',
    directionHorizontal = 'start',
  } = props;
  const [hintStep, setHintStep] = useState(currentStep);

  const handleNextStep = () => {
    if (hintStep === totalSteps) {
      onFinishSteps?.();
    } else {
      onNextAction?.();
      setHintStep(prev => {
        onStepChange?.(prev + 1);
        return prev + 1;
      });
    }
  };

  const handlePreviousStep = () => {
    onPreviousAction?.();
    setHintStep(prev => {
      onStepChange?.(prev - 1);
      return prev - 1;
    });
  };

  return (
    <S.HintContainer>
      <S.Triangle directionHorizontal={directionHorizontal} directionVertical={directionVertical} />
      <S.HeaderContainer>
        <S.Title>{title}</S.Title>
        <S.TotalSteps>{`${currentStep} of ${totalSteps}`}</S.TotalSteps>
      </S.HeaderContainer>
      <S.Description>{description}</S.Description>
      <S.ActionBtnsContainer>
        <TouchableOpacity onPress={onSkipAction}>
          <S.BackText>{currentStep === 1 ? 'Back' : 'Skip'}</S.BackText>
        </TouchableOpacity>
        <S.NavigationBtnsContainer>
          {currentStep !== 1 && (
            <TouchableOpacity onPress={handlePreviousStep}>
              <S.BackText>Previous</S.BackText>
            </TouchableOpacity>
          )}
          <Button
            disabled={isNextBtnDisabled}
            title={'Next'}
            onPress={handleNextStep}
            buttonStyle={S.nextBtn}
            buttonTitleStyle={S.nextBtnTitle}
          />
        </S.NavigationBtnsContainer>
      </S.ActionBtnsContainer>
    </S.HintContainer>
  );
};

export default HintCard;
