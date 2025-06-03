import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {jest} from '@jest/globals';
import mockedApi from '../../../../../jest/mocks/backendApi.mock';
import SignUp from '../SignUp';
import {AuthContext} from 'contexts/AuthContext';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

// Mock the actual API client module - placed after imports
jest.mock('src/api/backend-api', () => mockedApi);

// Create a new query client instance for tests
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
    mutations: {
      // retry: false,
    },
  },
});

const mockAuthContext = {
  onBoarding: [],
  user: null,
  setUser: jest.fn(),
  setOnBoarding: jest.fn(),
};

const renderComponent = (props = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <FirebaseCollectionsContext.Provider
        value={{
          userInfo: 'test',
          adminChats: 'adminChats',
          admins: 'admins',
          appSettings: 'appSettings',
          messages: 'messages',
          report: 'report',
          unfinishedRegistrationUsers: 'unfinishedRegistrationUsers',
          events: 'events',
        }}>
        <AuthContext.Provider value={mockAuthContext}>
          <SignUp {...props} />
        </AuthContext.Provider>
      </FirebaseCollectionsContext.Provider>
    </QueryClientProvider>,
  );

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Your phone')).toBeTruthy();
  });

  it('handles phone number input', () => {
    const {getByPlaceholderText} = renderComponent();
    const phoneInput = getByPlaceholderText('Enter your phone number');
    fireEvent.changeText(phoneInput, '+1234567890');
    expect(phoneInput.props.value).toBe('+1234567890');
  });
});
