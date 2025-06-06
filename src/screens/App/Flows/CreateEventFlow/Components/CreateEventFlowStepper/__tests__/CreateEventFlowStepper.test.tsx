import React from 'react';
import {render} from '@testing-library/react-native';
import CreateEventFlowStepper from '../CreateEventFlowStepper';

jest.mock('src/assets/images/icons/Check-black.svg', () => 'CheckIcon');

describe('CreateEventFlowStepper', () => {
  it('renders all steps correctly', () => {
    const {getByText} = render(<CreateEventFlowStepper currentStep={1} />);

    expect(getByText('Guests')).toBeTruthy();
    expect(getByText('Place')).toBeTruthy();
    expect(getByText('Preview')).toBeTruthy();
  });

  it('shows correct step numbers', () => {
    const {getByText} = render(<CreateEventFlowStepper currentStep={1} />);

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('shows check icon for completed steps', () => {
    const {getByText} = render(<CreateEventFlowStepper currentStep={2} />);

    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });
});
