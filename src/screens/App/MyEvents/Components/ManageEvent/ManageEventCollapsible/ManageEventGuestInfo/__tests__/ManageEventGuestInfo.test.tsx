import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ManageEventGuestInfo } from '../ManageEventGuestInfo';

jest.mock('src/api/backend-api', () => ({
  __esModule: true,
  default: {
    useQuery: jest.fn(),
    useMutation: jest.fn(),
  },
}));

jest.mock('hooks/connections/useHostConnectionActions', () => ({
  __esModule: true,
  default: () => ({
    handleHostConfirmEvent: jest.fn(),
  }),
}));

const invitedOnlyBackendApi = require('contexts/BackendApiContex').default;

describe('ManageEventGuestInfo', () => {
  const baseProps = {
    request: {
      guestId: '1',
      hostId: '2',
      eventId: '3',
    },
    title: 'New Connections',
    handleOpenModalManageUserOnEvent: jest.fn(),
    handleActionDone: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user name', () => {
    invitedOnlyBackendApi.useQuery.mockReturnValue({
      isLoading: false,
      data: { name: 'Kristin', photos: [{ image: 'img' }] },
    });
    const { getByText } = render(<ManageEventGuestInfo {...baseProps} />);
    expect(getByText('Kristin')).toBeTruthy();
  });

  it('shows Approve button if title is New Connections', () => {
    invitedOnlyBackendApi.useQuery.mockReturnValue({
      isLoading: false,
      data: { name: 'Kristin', photos: [{ image: 'img' }] },
    });
    const { getByText } = render(<ManageEventGuestInfo {...baseProps} />);
    expect(getByText('Approve')).toBeTruthy();
  });

  it('shows loading indicator when data is loading', () => {
    invitedOnlyBackendApi.useQuery.mockReturnValue({
      isLoading: true,
      data: null,
    });
    const { getByTestId } = render(<ManageEventGuestInfo {...baseProps} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('calls handleHostConfirmEvent and handleActionDone when Approve button is pressed', () => {
    const handleHostConfirmEvent = jest.fn();
    jest.spyOn(require('hooks/connections/useHostConnectionActions'), 'default').mockImplementationOnce(() => ({
      handleHostConfirmEvent,
    }));

    invitedOnlyBackendApi.useQuery.mockReturnValue({
      isLoading: false,
      data: { name: 'Kristin', photos: [{ image: 'img' }] },
    });

    const { getByText } = render(<ManageEventGuestInfo {...baseProps} />);
    fireEvent.press(getByText('Approve'));

    expect(handleHostConfirmEvent).toHaveBeenCalled();
    expect(baseProps.handleActionDone).toHaveBeenCalled();
  });
});
