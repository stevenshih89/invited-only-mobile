import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import EnterName from '../EnterName';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

describe('EnterName Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <EnterName />
      </AuthContext.Provider>,
    );
    expect(getByText('It will be shown on your profile.')).toBeTruthy();
  });

  it('allows user to enter a name and shows error for invalid input', () => {
    const {getByTestId, getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <EnterName />
      </AuthContext.Provider>,
    );
    const nameInput = getByTestId('name-input');

    fireEvent.changeText(nameInput, 'John');
    expect(nameInput.props.value).toBe('John');

    fireEvent.changeText(nameInput, 'J@hn');
    expect(getByText('The name must be up to 14 characters long and contain no special characters.')).toBeTruthy();
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
        <EnterName />
      </AuthContext.Provider>,
    );
    const nameInput = getByTestId('name-input');
    const nextButton = getByTestId('continue-button');

    fireEvent.changeText(nameInput, 'John');
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith(expect.anything());
    });
  });
});
