import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import EnterBirthday from 'screens/Auth/EnterBirthday/EnterBirthday';
import { AuthContext } from 'contexts/AuthContext';
import { mockedNavigateFunction } from 'jest/mocks/appNavigation.mock';

describe.skip('EnterBirthday Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <EnterBirthday />
      </AuthContext.Provider>,
    );
    expect(getByText('Your birthday')).toBeTruthy();
    expect(getByText('Add your birthday. You can change it later (optional)')).toBeTruthy();
  });

  it('allows user to enter date and toggle age visibility', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <EnterBirthday />
      </AuthContext.Provider>,
    );
    const monthInput = getByPlaceholderText('MM');
    const dayInput = getByPlaceholderText('DD');
    const yearInput = getByPlaceholderText('YYYY');
    const toggleSwitch = getByText('Show my age on my profile');

    // Wrap input changes in act
    act(() => {
      fireEvent.changeText(monthInput, '12');
      fireEvent.changeText(dayInput, '25');
      fireEvent.changeText(yearInput, '1990');
    });

    // Wrap the press event in act
    act(() => {
      fireEvent.press(toggleSwitch);
    });

    // Assert input values
    expect(monthInput.props.value).toBe('12');
    expect(dayInput.props.value).toBe('25');
    expect(yearInput.props.value).toBe('1990');
  });

  it('handles next button press correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <EnterBirthday />
      </AuthContext.Provider>,
    );
    const nextButton = getByText('Continue');
    const monthInput = getByPlaceholderText('MM');
    const dayInput = getByPlaceholderText('DD');
    const yearInput = getByPlaceholderText('YYYY');
    await act(async () => {
      fireEvent.changeText(monthInput, '12');
      fireEvent.changeText(dayInput, '25');
      fireEvent.changeText(yearInput, '1990');
    });
    await act(async () => {
      fireEvent.press(nextButton);
    });

    // Then wait for the asynchronous navigation call
    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledTimes(1);
    });
  });

  it('handles skip button press correctly', async () => {
    const { getByText } = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <EnterBirthday />
      </AuthContext.Provider>,
    );
    const skipButton = getByText('Skip');

    await act(async () => {
      fireEvent.press(skipButton);
    });

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/gender');
    });
  });
});
