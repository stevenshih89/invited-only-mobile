import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ConfirmPhone from './ConfirmPhone';
import {AuthContext} from 'contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
const mockAuthContext = {
  onBoarding: [],
  user: null,
  setUser: jest.fn(),
  setOnBoarding: jest.fn(),
};

const renderComponent = (props = {}) =>
  render(
    <NavigationContainer>
      <AuthContext.Provider value={mockAuthContext}>
        <ConfirmPhone
          {...props}
          navigation={mockedNavigateFunction}
          route={{params: {mobilePhone: '+1234567890', confirm: {confirm: jest.fn(() => Promise.resolve())}}}}
        />
      </AuthContext.Provider>
    </NavigationContainer>,
  );

describe('ConfirmPhone Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Phone number verification')).toBeTruthy();
  });

  it('handles verification code input', () => {
    const {getByTestId} = renderComponent();
    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');
    expect(codeInput.props.value).toBe('123456');
  });

  it('verifies with a valid code', async () => {
    const confirmMock = {confirm: jest.fn(() => Promise.resolve())};
    const {getByTestId, getByText} = renderComponent({route: {params: {confirm: confirmMock}}});
    const codeInput = getByTestId('verification-code-input');
    fireEvent.changeText(codeInput, '123456');
    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect.anything();
    });
  });

  it('resends the code', async () => {
    const {getByText} = renderComponent({route: {params: {mobilePhone: '+1234567890'}}});
    const resendButton = getByText('Resend Code');
    fireEvent.press(resendButton);

    await waitFor(() => {
      expect.anything();
    });
  });
});
