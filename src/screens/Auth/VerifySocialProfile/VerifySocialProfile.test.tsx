import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import VerifySocialProfile from './VerifySocialProfile';
import {AuthContext} from 'contexts/AuthContext';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';

const mockAuthContext = {
  onBoarding: [{name: 'John Doe', email: 'john@example.com', accountType: 'host', date: '2023-01-01', gender: 'male'}],
  user: null,
  setUser: jest.fn(),
  setOnBoarding: jest.fn(),
};

const renderComponent = () =>
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <VerifySocialProfile />
    </AuthContext.Provider>,
  );

describe('VerifySocialProfile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Provide a link for your social media')).toBeTruthy();
  });

  it('changes social nickname', () => {
    const {getByTestId} = renderComponent();
    const socialList = getByTestId('social-list');
    expect(socialList).toBeTruthy();
    const socialItem = getByTestId('social-item-0');
    fireEvent.press(socialItem);
    const input = getByTestId('social-input-0');
    fireEvent.changeText(input, 'https://instagram.com/johndoe');
    expect(input.props.value).toBe('https://instagram.com/johndoe');
  });

  it('validates social media links', async () => {
    const {getByText, getByTestId} = renderComponent();
    const socialItem = getByTestId('social-item-0');
    fireEvent.press(socialItem);
    const input = getByTestId('social-input-0');
    fireEvent.changeText(input, 'invalid-link');
    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(getByText('Incorrect link')).toBeTruthy();
    });
  });

  it('navigates to pending screen on Continue', async () => {
    const {getByText, getByTestId} = renderComponent();
    const socialItem = getByTestId('social-item-0');
    fireEvent.press(socialItem);
    const input = getByTestId('social-input-0');
    fireEvent.changeText(input, 'https://instagram.com/johndoe');
    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/pending-screen');
    });
  });

  it('navigates to pending screen on Skip', async () => {
    const {getByText} = renderComponent();
    const skipButton = getByText('Skip');
    fireEvent.press(skipButton);

    await waitFor(() => {
      expect(mockedNavigateFunction).toHaveBeenCalledWith('/pending-screen');
    });
  });
});
