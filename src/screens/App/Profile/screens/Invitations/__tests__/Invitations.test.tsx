import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Invitations from '../Invitations';

const mockHandleCopy = jest.fn();

jest.mock('hooks/useInvitations', () => ({
  useInvitations: () => ({
    handleCopy: mockHandleCopy,
  }),
}));

jest.mock('../hooks/useGetInvitationCodes', () => ({
  __esModule: true,
  default: () => ({
    data: ['ABC123', 'DEF456'],
    isLoading: false,
    error: null,
  }),
}));

jest.mock('src/store/authStore', () => ({
  useAuthStore: () => ({
    userMetadata: {
      uid: 'test-uid',
    },
  }),
}));

jest.mock('@invited-only/invited-only-api', () => ({
  invitedOnlyBackendApi: {
    useQuery: () => ({
      data: ['ABC123', 'DEF456'],
      isLoading: false,
      error: null,
    }),
  },
}));

describe('Invitations Component', () => {
  it('renders correctly with invitation details', () => {
    const {getByText} = render(<Invitations />);
    expect(getByText('You have 2 App invitations codes')).toBeTruthy();
    expect(getByText('AB-C1')).toBeTruthy();
    expect(getByText('DE-F4')).toBeTruthy();
  });

  it('calls handleCopy when an active invite code is pressed', () => {
    const {getByText} = render(<Invitations />);
    const activeInvite = getByText('AB-C1');

    fireEvent.press(activeInvite);

    expect(mockHandleCopy).toHaveBeenCalledWith('ABC123');
  });

  it('shows loading indicator when loading', () => {
    jest.spyOn(require('../hooks/useGetInvitationCodes'), 'default').mockImplementationOnce(() => ({
      data: null,
      isLoading: true,
      error: null,
    }));

    const {getByTestId} = render(<Invitations />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
