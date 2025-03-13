import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ModalLogout from './LogoutModal';
import {mockedUseLogout} from 'jest/mocks/useLogout.mock';

describe('ModalLogout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const {getByText} = render(<ModalLogout isVisible={true} onClose={jest.fn()} />);
    expect(getByText('Are you sure you want to log out?')).toBeTruthy();
    expect(getByText('John Doe, 30')).toBeTruthy();
    expect(getByText('host')).toBeTruthy();
  });

  it('calls handleLogout on logout button press', () => {
    const {getByText} = render(<ModalLogout isVisible={true} onClose={jest.fn()} />);
    const logoutButton = getByText('Yes, log out');

    fireEvent.press(logoutButton);
    expect(mockedUseLogout.handleLogout).toHaveBeenCalled();
  });

  it('calls onClose on cancel button press', () => {
    const mockOnClose = jest.fn();
    const {getByText} = render(<ModalLogout isVisible={true} onClose={mockOnClose} />);
    const cancelButton = getByText('Cancel');

    fireEvent.press(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
