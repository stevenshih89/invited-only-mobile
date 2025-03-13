import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Invitations from './Invitations';

const mockHandleCopy = jest.fn();

jest.mock('hooks/useInvitations', () => ({
  useInvitations: () => ({
    handleCopy: mockHandleCopy,
    inviteLink: [
      {inviteCode: 'ABC123', isActive: true},
      {inviteCode: 'DEF456', isActive: false},
    ],
    numberCodes: 2,
  }),
}));

describe('Invitations Component', () => {
  it('renders correctly with invitation details', () => {
    const {getByText} = render(<Invitations />);
    expect(getByText('You have 2 App invitations codes')).toBeTruthy();
    expect(getByText('IO Invitations')).toBeTruthy();
    expect(getByText('ABC123')).toBeTruthy();
    expect(getByText('DEF456')).toBeTruthy();
  });

  it('calls handleCopy when an active invite code is pressed', () => {
    const {getByText} = render(<Invitations />);
    const activeInvite = getByText('ABC123');

    fireEvent.press(activeInvite);

    expect(mockHandleCopy).toHaveBeenCalledWith('ABC123');
  });
});
