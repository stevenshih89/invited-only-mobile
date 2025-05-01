const mockSetBackgroundMessageHandler = jest.fn();
const mockSetupNotifications = jest.fn();

const useMessagingMock = () => ({
    setupNotifications: mockSetupNotifications,
    setBackgroundMessageHandler: mockSetBackgroundMessageHandler,
});

jest.mock('hooks/useMessaging', () => useMessagingMock);

export default useMessagingMock; 