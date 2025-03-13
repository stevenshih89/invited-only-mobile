import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import TurnNotifications from './TurnNotifications';
import {getFcmToken} from 'helpers/fcmHelper';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

jest.mock('helpers/fcmHelper');
const mockGetFcmToken = jest.fn(getFcmToken);

mockGetFcmToken.mockResolvedValue('mock-token');

const mockOnBoarding = [{name: 'John Doe'}, {accountType: 'guest'}];

describe('TurnNotifications Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with initial state', () => {
    const {getByText, getByRole} = render(
      <AuthContext.Provider
        value={{
          onBoarding: mockOnBoarding,
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <TurnNotifications />
      </AuthContext.Provider>,
    );
    expect(getByText('Confirm access')).toBeTruthy();
    expect(getByText('To use Invited Only, please enable your notifications.')).toBeTruthy();
    expect(getByRole('switch')).toBeTruthy();
  });

  it('navigates to addPhotosPath on continue button press', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: mockOnBoarding,
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <TurnNotifications />
      </AuthContext.Provider>,
    );
    const continueButton = getByText('Continue');

    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/add-photos');
    });
  });

  it('navigates to addPhotosPath on skip button press', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: mockOnBoarding,
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <TurnNotifications />
      </AuthContext.Provider>,
    );
    const skipButton = getByText('Skip');

    fireEvent.press(skipButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/add-photos');
    });
  });
});
