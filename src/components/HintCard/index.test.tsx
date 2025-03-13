import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HintCard from './index';

const mockProps = {
  currentStep: 1,
  totalSteps: 3,
  title: 'Step 1',
  description: 'This is the first step.',
  onStepChange: jest.fn(),
  onFinishSteps: jest.fn(),
  onSkipAction: jest.fn(),
  onPreviousAction: jest.fn(),
  onNextAction: jest.fn(),
  isNextBtnDisabled: false,
};

describe('HintCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    const {getByText} = render(<HintCard {...mockProps} />);
    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('This is the first step.')).toBeTruthy();
    expect(getByText('1 of 3')).toBeTruthy();
  });

  it('calls onNextAction and onStepChange when next button is pressed', () => {
    const {getByText} = render(<HintCard {...mockProps} />);
    const nextButton = getByText('Next');

    fireEvent.press(nextButton);

    expect(mockProps.onNextAction).toHaveBeenCalled();
    expect(mockProps.onStepChange).toHaveBeenCalledWith(2);
  });

  it('calls onPreviousAction when previous button is pressed', () => {
    const {getByText} = render(<HintCard {...mockProps} currentStep={2} />);
    const previousButton = getByText('Previous');

    fireEvent.press(previousButton);

    expect(mockProps.onPreviousAction).toHaveBeenCalled();
    expect(mockProps.onStepChange).toHaveBeenCalledWith(1);
  });

  it('calls onSkipAction when skip button is pressed', () => {
    const {getByText} = render(<HintCard {...mockProps} currentStep={2} />);
    const skipButton = getByText('Skip');

    fireEvent.press(skipButton);

    expect(mockProps.onSkipAction).toHaveBeenCalled();
  });

  it('calls onFinishSteps when next button is pressed on last step', () => {
    const {getByText} = render(<HintCard {...mockProps} currentStep={3} />);
    const nextButton = getByText('Next');

    fireEvent.press(nextButton);

    expect(mockProps.onFinishSteps).toHaveBeenCalled();
  });
});
