import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Input from './Input';
import {View, KeyboardType} from 'react-native';

const mockProps = {
  errorText: 'Error message',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  onPressFocus: jest.fn(),
  containerStyle: {},
  inputStyle: {},
  containerInnerStyle: {},
  labelStyle: {},
  isError: false,
  placeholder: 'Enter text',
  value: '',
  label: 'Label',
  keyboardType: 'default' as KeyboardType,
  InputIcon: null,
  required: false,
  editable: true,
};

const MockIcon = () => <View testID="input-icon" />;

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with given props', () => {
    const {getByPlaceholderText, getByText} = render(<Input {...mockProps} />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
    expect(getByText('Label')).toBeTruthy();
  });

  it('handles text change correctly', () => {
    const {getByPlaceholderText} = render(<Input {...mockProps} />);
    const input = getByPlaceholderText('Enter text');

    fireEvent.changeText(input, 'New text');

    expect(mockProps.onChange).toHaveBeenCalledWith('New text');
  });

  it('displays error message when isError is true', () => {
    const {getByText} = render(<Input {...mockProps} isError={true} />);
    expect(getByText('Error message')).toBeTruthy();
  });

  it('renders InputIcon when provided', () => {
    const {getByTestId} = render(<Input {...mockProps} InputIcon={MockIcon} />);
    expect(getByTestId('input-icon')).toBeTruthy();
  });
});
