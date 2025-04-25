import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModalLockedAccount from '../ModalLockedAccount';
import { invitationCodePath } from 'constants/pathLocations';

// Mock useAppNavigation
jest.mock('hooks/useAppNavigation', () => ({
  useAppNavigation: jest.fn(),
}));

// Define a variable to hold the mock function for useUser
let mockUseUser: jest.Mock;

// Mock useUser
jest.mock('hooks/user/useUser', () => ({
  __esModule: true, // Needed for default exports
  default: (...args: any[]) => mockUseUser(...args), // Call the mock function
}));

describe('ModalLockedAccount', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    // Reset and setup mocks for each test
    jest.clearAllMocks(); // Clear previous mocks
    jest.spyOn(require('hooks/useAppNavigation'), 'useAppNavigation').mockReturnValue(mockNavigation);
    // Initialize and set the default return value for the useUser mock
    mockUseUser = jest.fn().mockReturnValue({ user: null });
  });

  it('renders correctly when user is not reviewed', () => {
    const { getByText } = render(<ModalLockedAccount />);

    expect(getByText('Locked')).toBeTruthy();
    expect(getByText('Profile is Under Review')).toBeTruthy();
    expect(getByText("You'll be able to invite soon")).toBeTruthy();
    expect(getByText('I have an invitation code')).toBeTruthy();
  });

  it('handles invitation code button press', () => {
    const { getByText } = render(<ModalLockedAccount />);

    const inviteButton = getByText('I have an invitation code');
    fireEvent.press(inviteButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(invitationCodePath);
  });

  it('does not render when user is reviewed', () => {
    // Set a specific return value for this test
    mockUseUser.mockReturnValue({
      user: {
        uid: '123',
        accountReviewed: true,
      },
    });

    const { queryByText } = render(<ModalLockedAccount />);
    expect(queryByText('Profile is Under Review')).toBeNull();
  });

  it('renders when user exists but not reviewed', () => {
    // Set a specific return value for this test
    mockUseUser.mockReturnValue({
      user: {
        uid: '123',
        accountReviewed: false,
      },
    });

    const { getByText } = render(<ModalLockedAccount />);
    expect(getByText('Profile is Under Review')).toBeTruthy();
  });

  it('matches snapshot when rendered', () => {
    // Use the default mock value from beforeEach
    const { toJSON } = render(<ModalLockedAccount />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot when not rendered', () => {
    // Set a specific return value for this test
    mockUseUser.mockReturnValue({
      user: {
        uid: '123',
        accountReviewed: true,
      },
    });

    const { toJSON } = render(<ModalLockedAccount />);
    expect(toJSON()).toMatchSnapshot();
  });
});
