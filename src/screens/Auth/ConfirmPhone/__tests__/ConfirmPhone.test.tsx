import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ConfirmPhone from '../ConfirmPhone';
import {AuthContext} from 'contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import 'jest/mocks/appNavigation.mock';

const mockedGoBackFn = jest.fn();
const mockedNavigateFn = jest.fn();
jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(() => ({remove: jest.fn()})),
  removeEventListener: jest.fn(),
}));

// Mock firebase auth
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signInWithPhoneNumber: jest.fn(() =>
      Promise.resolve({
        confirm: jest.fn(() => Promise.resolve()),
      }),
    ),
    signOut: jest.fn(() => Promise.resolve()),
    currentUser: {
      uid: 'test-uid',
    },
  });
});

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

// We'll use a proper mock for FirebaseCollectionsContext

// Mock userStore
jest.mock('src/store/userStore', () => ({
  useUser: () => jest.fn(),
}));

const mockAuthContext = {
  onBoarding: [],
  user: mockUserInfo,
  setUser: jest.fn(),
  setOnBoarding: jest.fn(),
};

import {mockUserInfo} from 'jest/mocks/userInfoMock';
import FirebaseCollectionsProvider from 'contexts/FirebaseCollectionNamesContext';

const RenderComponent = (props = {}) => {
  return render(
    <NavigationContainer>
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
        <AuthContext.Provider value={mockAuthContext}>
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
              params: {
                mobilePhone: '+1234567890',
                confirm: {
                  confirm: jest.fn(() => Promise.resolve()),
                },
                ...props.route?.params,
              },
            }}
          />
        </AuthContext.Provider>
      </FirebaseCollectionsProvider>
    </NavigationContainer>,
  );
};

describe('ConfirmPhone Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = RenderComponent();
    expect(getByText('Phone number verification')).toBeTruthy();
    expect(getByText(/Please enter the verification code/)).toBeTruthy();
  });

  it('handles verification code input', () => {
    const {getByTestId} = RenderComponent();
    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');
    expect(codeInput.props.value).toBe('123456');
  });

  it('verifies with a valid code', async () => {
    const confirmMock = {confirm: jest.fn(() => Promise.resolve())};
    const navigation = {
      ...mockedNavigateFunction,
      navigate: jest.fn(),
    };

    const {getByTestId, getByText} = RenderComponent({
      navigation,
      route: {
        params: {
          confirm: confirmMock,
        },
      },
    });

    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(confirmMock.confirm).toHaveBeenCalled();
    });
  });

  it('navigates to bottom-tabs-stack after successful login verification', async () => {
    const confirmMock = {confirm: jest.fn(() => Promise.resolve())};

    const {getByTestId, getByText} = RenderComponent({
      route: {
        params: {
          confirm: confirmMock,
          isLogin: true,
        },
      },
    });

    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(mockedNavigateFn).toHaveBeenCalledWith('/choose-account-type');
    });
  });

  it('navigates to chooseAccountTypePath after successful signup verification', async () => {
    const confirmMock = {confirm: jest.fn(() => Promise.resolve())};
    const {getByTestId, getByText} = RenderComponent({
      route: {
        params: {
          confirm: confirmMock,
          isLogin: false,
        },
      },
    });

    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(mockedNavigateFn).toHaveBeenCalledWith('bottom-tabs-stack');
    });
  });

  it('shows resend timer after requesting code resend', async () => {
    const {getByText} = RenderComponent();

    const resendButton = getByText('Resend Code');
    fireEvent.press(resendButton);

    await waitFor(() => {
      expect(getByText(/Resend in/)).toBeTruthy();
    });
  });

  it('goes back when back button is pressed', () => {
    const {getByTestId} = RenderComponent();

    // Find the back button by its container
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockedGoBackFn).toHaveBeenCalled();
  });
});
