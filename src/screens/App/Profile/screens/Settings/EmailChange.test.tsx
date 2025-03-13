import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import EmailChange from './EmailChange';
import {mockedUseEmailChange} from 'jest/mocks/useEmailChange.mock';

describe('EmailChange Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<EmailChange />);
    expect(getByPlaceholderText('Enter your new email')).toBeTruthy();
  });

  it('updates email state on input change', () => {
    const {getByPlaceholderText} = render(<EmailChange />);
    const emailInput = getByPlaceholderText('Enter your new email');

    fireEvent.changeText(emailInput, 'newemail@example.com');
    expect(mockedUseEmailChange.setEmail).toHaveBeenCalledWith('newemail@example.com');
  });

  it('calls handleChangeEmail on button press', () => {
    const {getByText} = render(<EmailChange />);
    const changeButton = getByText('Change');

    fireEvent.press(changeButton);
    expect(mockedUseEmailChange.handleChangeEmail).toHaveBeenCalled();
  });
});
