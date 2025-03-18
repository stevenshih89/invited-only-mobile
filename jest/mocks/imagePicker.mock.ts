jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn((options, callback) => {
    callback({
      didCancel: false,
      errorCode: null,
      errorMessage: null,
      assets: [
        {
          uri: 'mock-uri',
          type: 'image/jpeg',
          fileName: 'mock-image.jpg',
        },
      ],
    });
  }),
}));
