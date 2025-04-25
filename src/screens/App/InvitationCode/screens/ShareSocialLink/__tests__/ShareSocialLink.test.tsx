import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ShareSocialLink from '../ShareSocialLink';

// Mock the navigation hook
jest.mock('hooks/useAppNavigation', () => ({
  useAppNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock the update user hook
jest.mock('hooks/user/useUpdateUser', () => ({
  __esModule: true, // Handle default export if necessary, though it seems named here
  default: jest.fn(() => ({ // Assuming default export based on usage pattern, adjust if named
    update: jest.fn().mockResolvedValue({}), // Mock update function
    isPending: false, // Mock loading state
  })),
}));

describe('ShareSocialLink', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<ShareSocialLink />);

    expect(getByText('Want to join?')).toBeTruthy();
    expect(getByText("This app is invite-only. Drop a link to one of your social profiles, and we'll check it out.")).toBeTruthy();
    expect(getByText('How to get your profile link?')).toBeTruthy();
  });

  it('handles profile link input', () => {
    const { getByTestId } = render(
      <ShareSocialLink />);

    const input = getByTestId('profile-link-input');
    fireEvent.changeText(input, 'https://instagram.com/test');

    expect(input.props.value).toBe('https://instagram.com/test');
  });
});
