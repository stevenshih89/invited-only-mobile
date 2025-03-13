import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyEmail from './MyEmail';
import {AuthContext} from 'contexts/AuthContext';

describe('MyEmail Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <MyEmail />
      </AuthContext.Provider>,
    );
    expect(getByText('Your email')).toBeTruthy();
  });

  it('allows user to enter an email', () => {
    const {getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <MyEmail />
      </AuthContext.Provider>,
    );
    const emailInput = getByTestId('input-email');

    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });
});
