import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import SummaryInfo from '../SummaryInfo';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

jest.mock('src/api/backend-api', () => ({
  __esModule: true,
  default: {
    useQuery: jest.fn().mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    }),
    useMutation: jest.fn().mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: null,
    }),
  },
}));

jest.mock('src/store/authStore', () => ({
  useAuthStore: jest.fn().mockReturnValue({
    onBoarding: {
      registrationDetails: {name: 'John', accountType: 'guest', photos: [{id: 0, image: 'https://example.com/photo.jpg'}]},
    },
  }),
}));

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
            onBoarding: {
              registrationDetails: [{name: 'John'}, {accountType: 'guest'}, {photos: [{id: 0, image: 'https://example.com/photo.jpg'}]}],
            },
            setOnBoarding: jest.fn(),
            setUser: jest.fn(),
            user: {},
          }}>
          <SummaryInfo />
        </AuthContext.Provider>
      </NavigationContainer>,
    );
    expect(getByText('John')).toBeTruthy();
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
