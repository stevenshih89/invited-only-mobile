import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import NotificationSetting from '../NotificationSetting';
import {useNotificationSetting} from 'hooks/useNotificationSetting';

// Mock BackHandler
jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(() => ({remove: jest.fn()})),
  removeEventListener: jest.fn(),
}));

describe('NotificationSetting Components', () => {
  const queryClient = new QueryClient();
  let mockUseNotificationSetting: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseNotificationSetting = useNotificationSetting as jest.Mock;
    mockUseNotificationSetting.mockReturnValue({
      allNotification: true,
      handleChangeAllNotification: jest.fn(),
      myEvents: true,
      setMyEvents: jest.fn(),
      requests: true,
      setRequests: jest.fn(),
      chat: true,
      setChat: jest.fn(),
      superInvite: true,
      setSuperInvite: jest.fn(),
      match: true,
      setMatch: jest.fn(),
      isVisibleTurnOffNotificationsModal: false,
      handleConfirmTurnOffNotifications: jest.fn(),
      setIsVisibleTurnOffNotificationsModal: jest.fn(),
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationSetting route={{}} />
      </QueryClientProvider>,
    );

  it('correctly renders All notifications and toggles the switch', () => {
    const mockHandleChangeAllNotification = jest.fn();
    mockUseNotificationSetting.mockReturnValue({
      ...mockUseNotificationSetting(),
      handleChangeAllNotification: mockHandleChangeAllNotification,
    });

    const {getByText, getByTestId} = renderComponent();

    expect(getByText('All notifications')).toBeTruthy();
    const switchElement = getByTestId('all-notifications-switch');
    expect(switchElement).toBeTruthy();

    fireEvent(switchElement, 'valueChange', false);
    expect(mockHandleChangeAllNotification).toHaveBeenCalledWith(false);
  });

  it('correctly toggles My events switch', () => {
    const mockSetMyEvents = jest.fn();
    mockUseNotificationSetting.mockReturnValue({
      ...mockUseNotificationSetting(),
      setMyEvents: mockSetMyEvents,
    });

    const {getByText, getByTestId} = renderComponent();

    expect(getByText('My events')).toBeTruthy();
    const switchElement = getByTestId('my-events-switch');
    expect(switchElement).toBeTruthy();

    fireEvent(switchElement, 'valueChange', false);
    expect(mockSetMyEvents).toHaveBeenCalledWith(false);
  });

  it('correctly toggles Requests switch', () => {
    const mockSetRequests = jest.fn();
    mockUseNotificationSetting.mockReturnValue({
      ...mockUseNotificationSetting(),
      setRequests: mockSetRequests,
    });

    const {getByText, getByTestId} = renderComponent();

    expect(getByText('Requests')).toBeTruthy();
    const switchElement = getByTestId('requests-switch');
    expect(switchElement).toBeTruthy();

    fireEvent(switchElement, 'valueChange', false);
    expect(mockSetRequests).toHaveBeenCalledWith(false);
  });

  it('correctly toggles Chat switch', () => {
    const mockSetChat = jest.fn();
    mockUseNotificationSetting.mockReturnValue({
      ...mockUseNotificationSetting(),
      setChat: mockSetChat,
    });

    const {getByText, getByTestId} = renderComponent();

    expect(getByText('Chat')).toBeTruthy();
    const switchElement = getByTestId('chat-switch');
    expect(switchElement).toBeTruthy();

    fireEvent(switchElement, 'valueChange', false);
    expect(mockSetChat).toHaveBeenCalledWith(false);
  });

  it('correctly toggles Super invite switch', () => {
    const mockSetSuperInvite = jest.fn();
    mockUseNotificationSetting.mockReturnValue({
      ...mockUseNotificationSetting(),
      setSuperInvite: mockSetSuperInvite,
    });

    const {getByText, getByTestId} = renderComponent();

    const switchElement = getByTestId('super-invite-switch');
    expect(switchElement).toBeTruthy();

    fireEvent(switchElement, 'valueChange', false);
    expect(mockSetSuperInvite).toHaveBeenCalledWith(false);
  });

  it('correctly toggles New Connection switch', () => {
    const mockSetMatch = jest.fn();
    mockUseNotificationSetting.mockReturnValue({
      ...mockUseNotificationSetting(),
      setMatch: mockSetMatch,
    });

    const {getByText, getByTestId} = renderComponent();

    expect(getByText('New Connection')).toBeTruthy();
    const switchElement = getByTestId('new-connection-switch');
    expect(switchElement).toBeTruthy();

    fireEvent(switchElement, 'valueChange', false);
    expect(mockSetMatch).toHaveBeenCalledWith(false);
  });
});
