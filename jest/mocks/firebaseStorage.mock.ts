export const mockFirebaseStorage = {
  ref: jest.fn(() => ({
    putFile: jest.fn(() => Promise.resolve()),
    getDownloadURL: jest.fn(() => Promise.resolve('mock-url')),
  })),
};

jest.mock('@react-native-firebase/storage', () => mockFirebaseStorage);
