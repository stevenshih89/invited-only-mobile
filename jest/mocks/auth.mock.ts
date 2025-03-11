jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    currentUser: {uid: '12345', email: 'test@example.com'},
  });
});
