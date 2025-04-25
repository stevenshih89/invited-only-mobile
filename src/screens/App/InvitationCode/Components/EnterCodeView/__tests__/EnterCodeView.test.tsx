import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TextInput} from 'react-native';
import EnterCodeView from '../EnterCodeView';

describe('EnterCodeView', () => {
  const mockRef = {
    current: null as unknown as TextInput,
  };

  const defaultProps = {
    ref: mockRef,
    props: {},
    code: '',
    setCode: jest.fn(),
    getCellOnLayoutHandler: jest.fn(),
    isIncorrectCode: false,
    cellCount: 6,
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<EnterCodeView {...defaultProps} />);

    expect(getByText('Access Limited')).toBeTruthy();
    expect(getByText('Enter your invitation code')).toBeTruthy();
    expect(getByTestId('verification-code-input')).toBeTruthy();
    expect(getByText('Get Access')).toBeTruthy();
  });

  it('handles code input', () => {
    const setCode = jest.fn();
    const {getByTestId} = render(<EnterCodeView {...defaultProps} setCode={setCode} />);

    const input = getByTestId('verification-code-input');
    fireEvent.changeText(input, '123456');

    expect(setCode).toHaveBeenCalledWith('123456');
  });

  it('shows error message when code is incorrect', () => {
    const {getByText} = render(<EnterCodeView {...defaultProps} isIncorrectCode={true} />);

    expect(getByText('Incorrect invitation code')).toBeTruthy();
  });

  it('handles submit button press', () => {
    const handleSubmit = jest.fn();
    const {getByText} = render(<EnterCodeView {...defaultProps} handleSubmit={handleSubmit} />);

    const submitButton = getByText('Get Access');
    fireEvent.press(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders correct number of cells', () => {
    const {getAllByText} = render(<EnterCodeView {...defaultProps} />);

    const emptyCells = getAllByText('_');
    expect(emptyCells).toHaveLength(defaultProps.cellCount);
  });

  it('matches snapshot', () => {
    const {toJSON} = render(<EnterCodeView {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with filled code', () => {
    const {queryByText} = render(<EnterCodeView {...defaultProps} code="1" />);
    expect(queryByText('1')).toBeTruthy();
  });
});
