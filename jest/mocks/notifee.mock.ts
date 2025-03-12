jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(() => Promise.resolve(true)),
    displayNotification: jest.fn(() => Promise.resolve()),
    cancelNotification: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    onForegroundEvent: jest.fn(() => jest.fn()),
  },
  EventType: {
    ACTION_PRESS: 'ACTION_PRESS',
    FOREGROUND_EVENT: 'FOREGROUND_EVENT',
  },
}));
