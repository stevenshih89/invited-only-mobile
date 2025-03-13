import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {InputPhoneView} from './InputPhoneView';

const mockProps = {
  value: '',
  onChangeFormattedText: jest.fn(),
  setIsValid: jest.fn(),
  onPressFocus: jest.fn(),
  onFocus: jest.fn(),
  placeholder: 'Phone Number',
  validationDisabled: false,
};

describe('InputPhoneView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with given props', () => {
    const {getByPlaceholderText} = render(<InputPhoneView {...mockProps} />);
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
  });

  it('handles text change and validates phone number', () => {
    const {getByPlaceholderText} = render(<InputPhoneView {...mockProps} />);
    const input = getByPlaceholderText('Phone Number');

    fireEvent.changeText(input, '+1234567890');

    expect(mockProps.onChangeFormattedText).toHaveBeenCalledWith('+1234567890');
    expect(mockProps.setIsValid).toHaveBeenCalledWith(false);
  });

  it('displays error message for invalid phone number', () => {
    const {getByText, getByPlaceholderText} = render(<InputPhoneView {...mockProps} />);
    const input = getByPlaceholderText('Phone Number');

    fireEvent.changeText(input, '123');

    expect(getByText('Incorrect phone number')).toBeTruthy();
  });

  it('calls onPressFocus when input is pressed', () => {
    const {getByPlaceholderText} = render(<InputPhoneView {...mockProps} />);
    const input = getByPlaceholderText('Phone Number');

    fireEvent.press(input);

    expect(mockProps.onPressFocus).toHaveBeenCalled();
  });
});
