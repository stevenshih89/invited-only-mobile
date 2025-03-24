jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        onSnapshot: jest.fn(() => () => {}),
        get: jest.fn(() => Promise.resolve({exists: false})),
      })),
      where: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({exists: false})),
      })),
      onSnapshot: jest.fn(() => () => Promise.resolve()),
    })),
  });
});
