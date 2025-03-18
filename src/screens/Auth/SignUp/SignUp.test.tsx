import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignUp from './SignUp';
import {AuthContext} from 'contexts/AuthContext';

const mockAuthContext = {
  onBoarding: [],
  user: null,
  setUser: jest.fn(),
  setOnBoarding: jest.fn(),
};

const renderComponent = (props = {}) =>
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <SignUp {...props} />
    </AuthContext.Provider>,
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
    const phoneInput = getByPlaceholderText('Phone Number');
    fireEvent.changeText(phoneInput, '+1234567890');
    expect(phoneInput.props.value).toBe('+1234567890');
  });
});
