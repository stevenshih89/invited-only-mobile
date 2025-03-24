jest.mock('@react-native-firebase/analytics', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    logEvent: jest.fn(() => Promise.resolve()),
    setUserId: jest.fn(() => Promise.resolve()),
    setUserProperty: jest.fn(() => Promise.resolve()),
    logScreenView: jest.fn(() => Promise.resolve()),
  })),
}));
