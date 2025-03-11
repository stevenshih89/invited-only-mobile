jest.mock('@sentry/react-native', () => ({
  __esModule: true,
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  withScope: jest.fn(fn => fn({})),
  // If you use additional methods (e.g., setUser, configureScope, etc.), add them here.
}));
