jest.mock('react-native-purchases', () => ({
    configure: jest.fn(),
    purchasePackage: jest.fn(),
    restorePurchases: jest.fn(),
    getOfferings: jest.fn(() => Promise.resolve({})),
    getCustomerInfo: jest.fn(() => Promise.resolve({})),
    setAttributes: jest.fn(),
}));
  