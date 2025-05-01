import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ChooseAccountType from '../ChooseAccountType';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

describe('ChooseAccountType Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with title and options', () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <ChooseAccountType />
      </AuthContext.Provider>,
    );
    expect(getByText('Are you Host or Guest?')).toBeTruthy();
    expect(getByText('Select your account type')).toBeTruthy();
    expect(getByText('Host')).toBeTruthy();
    expect(getByText('Guest')).toBeTruthy();
  });

  it('navigates to enterNamePath on Continue button press', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <ChooseAccountType />
      </AuthContext.Provider>,
    );
    const continueButton = getByText('Continue');

    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/enter-name');
    });
  });

  it('navigates to addBuisnessPath on business link press', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <ChooseAccountType />
      </AuthContext.Provider>,
    );
    const businessLink = getByText('Click here to join');

    fireEvent.press(businessLink);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/add-biusness');
    });
  });
});
