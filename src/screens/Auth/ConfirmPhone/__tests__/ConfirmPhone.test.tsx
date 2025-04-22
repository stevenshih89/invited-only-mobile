import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { jest } from '@jest/globals';

import mockedApi from '../../../../../jest/mocks/backendApi.mock';

// Now import the component and other contexts
import ConfirmPhone from '../ConfirmPhone';
import FirebaseCollectionsProvider from 'contexts/FirebaseCollectionNamesContext';

// Mock the actual API client module FIRST
jest.mock('src/api/backend-api', () => mockedApi);

// Define the generic type here for use in override
type MockMutationOptions<TData = unknown, TVariables = unknown, TContext = unknown> = {
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
};

const mockedGoBackFn = jest.fn();
const mockedNavigateFn = jest.fn();
jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  removeEventListener: jest.fn(),
}));

// Mock firebase firestore
jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() =>
          Promise.resolve({
            exists: true,
            data: () => ({
              uid: 'test-uid',
              name: 'Test User',
            }),
          }),
        ),
      })),
    })),
  });
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock userStore
jest.mock('src/store/userStore', () => ({
  useUser: () => jest.fn(),
}));

// Create QueryClient for tests
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, gcTime: Infinity },
  },
});

const RenderComponent = (props = { route: { params: {} } }) => {
  const routeParams = {
    mobilePhone: '+1234567890',
    isLogin: false, // Default to signup flow for tests unless specified
    ...props.route?.params,
  };
  return render(
    <QueryClientProvider client={queryClient}>
      <FirebaseCollectionsProvider
        firebaseCollectionNames={{
          adminChats: '',
          userInfo: 'testUserInfo',
          admins: '',
          appSettings: '',
          events: '',
          messages: '',
          report: '',
          unfinishedRegistrationUsers: '',
        }}>
        <ConfirmPhone
          {...props}
          navigation={{
            navigate: mockedNavigateFn,
            goBack: mockedGoBackFn,
            reset: jest.fn(),
            setParams: jest.fn(),
            dispatch: jest.fn(),
            setOptions: jest.fn(),
            isFocused: jest.fn(() => true),
            addListener: jest.fn(() => jest.fn()),
            removeListener: jest.fn(),
          }}
          route={{
            params: routeParams,
          }}
        />
      </FirebaseCollectionsProvider>
    </QueryClientProvider>
  );
};

describe.skip('ConfirmPhone Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedApi.useMutation.mockReturnValue(mockMutationResult());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = RenderComponent();
    expect(getByText('Phone number verification')).toBeTruthy();
    expect(getByText(/Please enter the verification code/)).toBeTruthy();
  });

  it('handles verification code input', () => {
    const { getByTestId } = RenderComponent();
    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');
    expect(codeInput.props.value).toBe('123456');
  });

  it('calls verifyOtp mutation when code is valid', async () => {
    const { getByTestId, getByText } = RenderComponent();

    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(mockedApi.useMutation().mutate).toHaveBeenCalledWith(
        { body: { phone: '+1234567890', code: '123456' } },
        expect.any(Object)
      );
    });
  });

  it('does NOT navigate immediately after successful login verification (state set in onSuccess)', async () => {
    const mockSuccessData = { accessToken: 'abc', refreshToken: 'def' };
    // Define mock with explicit type for options, use 'any' for unused/unknown types
    const mockMutateFn = jest.fn((_variables: any, options?: MockMutationOptions<typeof mockSuccessData>) => {
      options?.onSuccess?.(mockSuccessData, _variables, undefined as any); // Cast context to any
    });
    mockedApi.useMutation.mockReturnValueOnce({
      ...mockMutationResult(),
      mutate: mockMutateFn,
    });

    const { getByTestId, getByText } = RenderComponent({
      route: {
        params: {
          isLogin: true,
        },
      },
    });

    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(mockMutateFn).toHaveBeenCalled(); // Check the specific mock fn
    });

    expect(mockedNavigateFn).not.toHaveBeenCalled();
  });

  it('navigates to chooseAccountTypePath after successful signup verification', async () => {
    jest.useFakeTimers();

    const { getByTestId, getByText } = RenderComponent({
      route: {
        params: {
          isLogin: false,
        },
      },
    });

    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(mockedNavigateFn).toHaveBeenCalledWith(expect.stringContaining('choose-account-type'));
    });

    jest.useRealTimers();
  });

  it('shows resend timer after requesting code resend', async () => {
    const { getByText } = RenderComponent();

    const resendButton = getByText('Resend Code');
    fireEvent.press(resendButton);

    await waitFor(() => {
      expect(getByText(/Resend in/)).toBeTruthy();
    });
  });

  it('goes back when back button is pressed', () => {
    const { getByTestId } = RenderComponent();

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockedGoBackFn).toHaveBeenCalled();
  });
});

const mockMutationResult = <TData = unknown, TVariables = unknown, TContext = unknown>() => ({
  mutate: jest.fn((_variables: TVariables, options?: any) => options?.onSuccess?.({} as TData, {} as TVariables, {} as TContext)),
  mutateAsync: jest.fn(() => Promise.resolve({})),
  isPending: false,
  isSuccess: false,
  isError: false,
  error: null,
  data: undefined,
  reset: jest.fn(),
});
