jest.mock('react-native-gesture-handler', () => ({
    gestureHandlerRootHOC: jest.fn((component) => component),
    GestureHandlerRootView: jest.fn(),
}));
  