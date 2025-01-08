import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useStyles from './styles.ts';
import Button from 'components/Button/Button.tsx';

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
  const styles = useStyles();

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
    <View style={[styles.hintContainer]}>
      <View
        style={[
          styles.triangle,
          directionHorizontal === 'start' && styles.start,
          directionHorizontal === 'center' && styles.center,
          directionHorizontal === 'end' && styles.end,
          directionVertical === 'top' && styles.top,
          directionVertical === 'bottom' && styles.bottom,
        ]}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.totalSteps}>{`${currentStep} of ${totalSteps}`}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.actionBtnsContainer}>
        <TouchableOpacity onPress={onSkipAction}>
          <Text style={styles.backText}>{currentStep === 1 ? 'Back' : 'Skip'}</Text>
        </TouchableOpacity>
        <View style={styles.navigationBtnsContainer}>
          {currentStep !== 1 && (
            <TouchableOpacity onPress={handlePreviousStep}>
              <Text style={styles.backText}>Previous</Text>
            </TouchableOpacity>
          )}
          <Button
            disabled={isNextBtnDisabled}
            title={'Next'}
            onPress={handleNextStep}
            buttonStyle={styles.nextBtn}
            buttonTitleStyle={styles.nextBtnTitle}
          />
        </View>
      </View>
    </View>
  );
};

export default HintCard;
