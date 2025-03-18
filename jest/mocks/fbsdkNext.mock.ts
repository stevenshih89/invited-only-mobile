jest.mock('react-native-fbsdk-next', () => ({
  AppEventsLogger: {
    logEvent: jest.fn(),
  },
}));
