jest.mock('react-native-permissions', () => ({
  __esModule: true,
  PERMISSIONS: {
    IOS: {
      CAMERA: 'ios.permission.CAMERA',
      MICROPHONE: 'ios.permission.MICROPHONE',
      // add additional iOS permissions as needed
    },
    ANDROID: {
      CAMERA: 'android.permission.CAMERA',
      MICROPHONE: 'android.permission.RECORD_AUDIO',
      // add additional Android permissions as needed
    },
  },
  request: jest.fn(() => Promise.resolve('authorized')),
}));
