jest.mock('@react-native-firebase/functions', () => ({
  __esModule: true,
  default: {
    httpsCallable: jest.fn(() => {
      return jest.fn(() => Promise.resolve({data: {}}));
    }),
  },
}));
