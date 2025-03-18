import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ConnectSocialMedia from './ConnectSocialMedia';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

const mockAuthContext = {
  onBoarding: [],
  setOnBoarding: jest.fn(),
  user: null,
  setUser: jest.fn(),
};

const renderComponent = () =>
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <ConnectSocialMedia />
    </AuthContext.Provider>,
  );

describe('ConnectSocialMedia Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Connect your Instagram')).toBeTruthy();
  });

  it('toggles Instagram connection', () => {
    const {getByText} = renderComponent();
    const connectButton = getByText('Connect Instagram');
    fireEvent.press(connectButton);
    expect(getByText('Connected')).toBeTruthy();
    fireEvent.press(connectButton);
    expect(getByText('Connect Instagram')).toBeTruthy();
  });

  it('navigates to privacy path on Skip', () => {
    const {getByText} = renderComponent();
    const skipButton = getByText('Skip');
    fireEvent.press(skipButton);
    expect(mockedNavigateFunction).toHaveBeenCalledWith('/privacy');
  });

  it('navigates to privacy path on Next', () => {
    const {getByText} = renderComponent();
    const nextButton = getByText('Next');
    fireEvent.press(nextButton);
    expect(mockedNavigateFunction).toHaveBeenCalledWith('/privacy');
  });
});
