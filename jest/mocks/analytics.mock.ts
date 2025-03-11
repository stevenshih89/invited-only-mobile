jest.mock('@react-native-firebase/analytics', () => ({
  __esModule: true,
  default: {
    logEvent: jest.fn(() => Promise.resolve()),
    setUserId: jest.fn(() => Promise.resolve()),
    setUserProperty: jest.fn(() => Promise.resolve()),
    // Add additional methods as needed
  },
}));
