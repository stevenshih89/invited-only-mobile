export const mockFirebaseFunctions = {
  httpsCallable: jest.fn(() => jest.fn(() => Promise.resolve({data: {}}))),
};

jest.mock('@react-native-firebase/functions', () => mockFirebaseFunctions);
