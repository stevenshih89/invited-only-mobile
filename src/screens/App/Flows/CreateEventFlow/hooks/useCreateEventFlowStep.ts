import {useState} from 'react';

const useCreateEventFlowStep = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const nextStep = () => {
    setCurrentStep(prev => {
      if (prev < 3) return prev + 1;
      return prev;
    });
  };
  const backStep = () => {
    setCurrentStep(prev => {
      if (prev > 1) return prev - 1;
      return prev;
    });
  };
  return {
    currentStep,
    nextStep,
    backStep,
  };
};
export default useCreateEventFlowStep;
