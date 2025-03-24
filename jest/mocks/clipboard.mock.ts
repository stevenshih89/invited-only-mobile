jest.mock('@react-native-clipboard/clipboard', () => ({
    setString: jest.fn(),
    getString: jest.fn(),
}));
  