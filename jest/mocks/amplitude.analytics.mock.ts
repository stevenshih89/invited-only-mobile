jest.mock('@amplitude/analytics-react-native', () => ({
  track: jest.fn(),
  init: jest.fn(),
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
  clearUserProperties: jest.fn(),
  logEvent: jest.fn(),
  logRevenue: jest.fn(),
  logRevenueV2: jest.fn(),
  logRevenueV3: jest.fn(),
}));
