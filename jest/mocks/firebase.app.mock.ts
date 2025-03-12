jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: {
    initializeApp: jest.fn(() => ({name: 'default', options: {}})),
    // This method can be used to retrieve the default app instance.
    app: jest.fn(() => ({name: 'default', options: {}})),
    // Array of initialized apps (empty or with a dummy app)
    apps: [{name: 'default', options: {}}],
  },
}));
