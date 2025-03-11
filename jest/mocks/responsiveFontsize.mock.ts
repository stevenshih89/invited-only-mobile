jest.mock('react-native-responsive-fontsize', () => ({
  __esModule: true,
  RFValue: jest.fn((size = 932) => size),
}));
