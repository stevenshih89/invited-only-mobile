import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Gender from './Gender';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

describe('Gender Component', () => {
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
          onBoarding: [{accountType: 'guest'}],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <Gender />
      </AuthContext.Provider>,
    );
    expect(getByText('Select your')).toBeTruthy();
    expect(getByText('gender')).toBeTruthy();
  });

  it('allows user to select a gender', () => {
    const {getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [{accountType: 'guest'}],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <Gender />
      </AuthContext.Provider>,
    );

    const manButton = getByTestId('man-button');
    const womanButton = getByTestId('woman-button');
    const nonbinaryButton = getByTestId('nonbinary-button');

    fireEvent.press(manButton);
    expect(manButton.parent?.props.style.backgroundColor).toBe('rgba(255, 255, 255, 0.16)');

    fireEvent.press(womanButton);
    expect(womanButton.parent?.props.style.backgroundColor).toBe('rgba(255, 255, 255, 0.16)');

    fireEvent.press(nonbinaryButton);
    expect(nonbinaryButton.parent?.props.style.backgroundColor).toBe('rgba(255, 255, 255, 0.16)');
  });

  it('handles next button press correctly', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [{accountType: 'guest'}],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <Gender />
      </AuthContext.Provider>,
    );
    const nextButton = getByText('Continue');

    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith(expect.anything());
    });
  });
});
