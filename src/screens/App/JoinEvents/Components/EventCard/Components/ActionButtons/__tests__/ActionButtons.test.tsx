import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ActionButtons from '../ActionButtons';

jest.mock('src/assets/images/icons/close.svg', () => 'RejectIcon');
jest.mock('src/assets/images/icons/lightning-fill.svg', () => 'SuperInviteIcon');
jest.mock('src/assets/images/icons/coupon-fill.svg', () => 'InviteIcon');

describe('ActionButtons', () => {
  const mockOnReject = jest.fn();
  const mockOnSuperInvite = jest.fn();
  const mockOnInvite = jest.fn();

  const Component = () => <ActionButtons onReject={mockOnReject} onSuperInvite={mockOnSuperInvite} onInvite={mockOnInvite} />;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all action buttons', () => {
    const {getByTestId} = render(<Component />);

    expect(getByTestId('reject-button')).toBeTruthy();
    expect(getByTestId('super-invite-button')).toBeTruthy();
    expect(getByTestId('invite-button')).toBeTruthy();
  });

  it('calls onReject when reject button is pressed', () => {
    const {getByTestId} = render(<Component />);

    fireEvent.press(getByTestId('reject-button'));
    expect(mockOnReject).toHaveBeenCalledTimes(1);
  });

  it('calls onSuperInvite when super invite button is pressed', () => {
    const {getByTestId} = render(<Component />);

    fireEvent.press(getByTestId('super-invite-button'));
    expect(mockOnSuperInvite).toHaveBeenCalledTimes(1);
  });

  it('calls onInvite when invite button is pressed', () => {
    const {getByTestId} = render(<Component />);

    fireEvent.press(getByTestId('invite-button'));
    expect(mockOnInvite).toHaveBeenCalledTimes(1);
  });
});
