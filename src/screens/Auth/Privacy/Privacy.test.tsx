import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Privacy from './Privacy';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';

const mockOnBoarding = [
  {name: 'John Doe'},
  {gender: 'male'},
  {email: 'john.doe@example.com'},
  {accountType: 'guest'},
  {date: '1990-01-01'},
  {photos: [{id: 0, image: 'https://example.com/photo.jpg'}]},
  {facePhoto: 'https://example.com/face.jpg'},
];

const mockRoute = {
  params: {
    screen: 'someScreen',
    accountType: 'guest',
  },
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => mockRoute,
}));

describe('Privacy Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly for guest account type', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            onBoarding: mockOnBoarding,
            setOnBoarding: jest.fn(),
            setUser: jest.fn(),
            user: {},
          }}>
          <Privacy />
        </AuthContext.Provider>
      </NavigationContainer>,
    );
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('Please follow these Guest House Rules')).toBeTruthy();
    expect(getByText('Be Polite')).toBeTruthy();
    expect(getByText('Follow Guidelines')).toBeTruthy();
    expect(getByText('Be Honest')).toBeTruthy();
    expect(getByText('Respect Privacy')).toBeTruthy();
  });

  it('navigates to verifyFirstStepPath on button press', async () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            onBoarding: mockOnBoarding,
            setOnBoarding: jest.fn(),
            setUser: jest.fn(),
            user: {},
          }}>
          <Privacy />
        </AuthContext.Provider>
      </NavigationContainer>,
    );
    const agreeButton = getByTestId('agree-button');

    fireEvent.press(agreeButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/verify-first-step');
    });
  });
});
