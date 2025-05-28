import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import SummaryInfo from '../SummaryInfo';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

describe('SummaryInfo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with user details', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            onBoarding: [{name: 'John Doe'}, {accountType: 'guest'}, {photos: [{id: 0, image: 'https://example.com/photo.jpg'}]}],
            setOnBoarding: jest.fn(),
            setUser: jest.fn(),
            user: {},
          }}>
          <SummaryInfo />
        </AuthContext.Provider>
      </NavigationContainer>,
    );
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('navigates to /invitation-code on Continue button press', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <SummaryInfo />
      </AuthContext.Provider>,
    );
    const continueButton = getByText('Continue');

    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith(expect.anything());
    });
  });
});
