import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddBiusness from './AddBuisness';
import {AuthContext} from 'contexts/AuthContext';
import {mockedGoBackFunction} from 'jest/mocks/appNavigation.mock';

describe('AddBiusness Component', () => {
  it('renders correctly with title and email information', () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <AddBiusness />
      </AuthContext.Provider>,
    );
    expect(getByText("Join as a Business and get more client's.")).toBeTruthy();
    expect(getByText('Please provide us with all your business information, and we will get back to you.')).toBeTruthy();
    expect(getByText('Please send an email to:')).toBeTruthy();
    expect(getByText('Buisness@invitedonly.app')).toBeTruthy();
  });

  it('navigates back on Go back button press', () => {
    const {getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <AddBiusness />
      </AuthContext.Provider>,
    );
    const goBackButton = getByTestId('go-back-button');
    fireEvent.press(goBackButton);

    expect(mockedGoBackFunction).toHaveBeenCalled();
  });
});
