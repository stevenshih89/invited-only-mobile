import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import MyInterests from './MyInterests';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

describe('MyInterests Component', () => {
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
        <MyInterests />
      </AuthContext.Provider>,
    );
    expect(getByText('Choose interests')).toBeTruthy();
    expect(getByText('Choose up to 3 event types you love to help us find the right events for you.')).toBeTruthy();
  });

  it('allows user to select interests', () => {
    const {getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <MyInterests />
      </AuthContext.Provider>,
    );
    const vipTablesButton = getByTestId('interest-0');
    const concertsButton = getByTestId('interest-1');
    const exclusiveButton = getByTestId('interest-2');

    fireEvent.press(vipTablesButton);
    expect(vipTablesButton.parent?.props.style.borderColor).toBe('rgba(255, 255, 255, 1)');

    fireEvent.press(concertsButton);
    expect(concertsButton.parent?.props.style.borderColor).toBe('rgba(255, 255, 255, 1)');

    fireEvent.press(exclusiveButton);
    expect(exclusiveButton.parent?.props.style.borderColor).toBe('rgba(255, 255, 255, 1)');
  });

  it('handles next button press correctly', async () => {
    const {getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <MyInterests />
      </AuthContext.Provider>,
    );
    const nextButton = getByTestId('continue-button');

    const vipTablesButton = getByTestId('interest-0');
    const concertsButton = getByTestId('interest-1');
    const exclusiveButton = getByTestId('interest-2');

    fireEvent.press(vipTablesButton);
    fireEvent.press(concertsButton);
    fireEvent.press(exclusiveButton);

    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith(expect.anything());
    });
  });

  it('handles skip button press correctly', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <MyInterests />
      </AuthContext.Provider>,
    );
    const skipButton = getByText('Skip');

    fireEvent.press(skipButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith(expect.anything());
    });
  });

  it('disables the continue button when fewer than 3 interests are selected', () => {
    const {getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <MyInterests />
      </AuthContext.Provider>,
    );
    const nextButton = getByTestId('continue-button');

    expect(nextButton.props.accessibilityState.disabled).toBe(true);

    const vipTablesButton = getByTestId('interest-0');
    fireEvent.press(vipTablesButton);
    expect(nextButton.props.accessibilityState.disabled).toBe(true);

    const concertsButton = getByTestId('interest-1');
    fireEvent.press(concertsButton);
    expect(nextButton.props.accessibilityState.disabled).toBe(true);

    const exclusiveButton = getByTestId('interest-2');
    fireEvent.press(exclusiveButton);
    expect(nextButton.props.accessibilityState.disabled).toBe(false);
  });

  it('limits the selection to 3 interests', () => {
    const {getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <MyInterests />
      </AuthContext.Provider>,
    );

    const vipTablesButton = getByTestId('interest-0');
    const concertsButton = getByTestId('interest-1');
    const exclusiveButton = getByTestId('interest-2');
    const yachtPartyButton = getByTestId('interest-3');

    fireEvent.press(vipTablesButton);
    expect(vipTablesButton.parent?.props.style.borderColor).toBe('rgba(255, 255, 255, 1)');
    fireEvent.press(concertsButton);
    expect(concertsButton.parent?.props.style.borderColor).toBe('rgba(255, 255, 255, 1)');
    fireEvent.press(exclusiveButton);
    expect(exclusiveButton.parent?.props.style.borderColor).toBe('rgba(255, 255, 255, 1)');
    fireEvent.press(yachtPartyButton);
    expect(yachtPartyButton.parent?.props.style.borderColor).toBe('rgba(0, 0, 0, 1)');
  });
});
