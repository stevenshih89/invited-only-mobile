export const mockFirebaseMessaging = {
  onMessage: jest.fn(),
  setBackgroundMessageHandler: jest.fn(),
  getToken: jest.fn(() => Promise.resolve('mock-token')),
};

jest.mock('@react-native-firebase/messaging', () => mockFirebaseMessaging);
