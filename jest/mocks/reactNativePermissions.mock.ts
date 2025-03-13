export const mockReactNativePermissions = {
  PERMISSIONS: {
    IOS: {
      CAMERA: 'camera',
      LOCATION_WHEN_IN_USE: 'locationWhenInUse',
    },
    ANDROID: {
      CAMERA: 'camera',
      LOCATION: 'location',
    },
  },
  request: jest.fn(() => Promise.resolve('granted')),
  check: jest.fn(() => Promise.resolve('granted')),
};

jest.mock('react-native-permissions', () => mockReactNativePermissions);
