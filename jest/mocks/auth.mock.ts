jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    currentUser: {uid: '12345', email: 'test@example.com', phoneNumber: '+380671234567'},
    signInWithPhoneNumber: jest.fn(() => Promise.resolve({})),
    onAuthStateChanged: jest.fn(() => Promise.resolve({})),
  });
});

export const mockedAuth = {
  currentUser: {uid: '12345', email: 'test@example.com', phoneNumber: '+380671234567'},
  signInWithPhoneNumber: jest.fn(() => Promise.resolve({})),
  onAuthStateChanged: jest.fn(() => Promise.resolve({})),
};
