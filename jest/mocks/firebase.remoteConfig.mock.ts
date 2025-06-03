jest.mock('@react-native-firebase/remote-config', () => ({
  __esModule: true,
  default: {
    fetch: jest.fn(),
    activate: jest.fn(),
  },
}));
