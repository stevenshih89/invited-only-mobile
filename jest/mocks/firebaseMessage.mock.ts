// jest.mock('@react-native-firebase/messaging', () => ({
//   __esModule: true,
//   default: {
//     // Simulate getting a token by returning a resolved promise with a dummy token.
//     getToken: jest.fn(() => Promise.resolve('mock-token')),
//     // Simulate onMessage by returning a function that acts as an unsubscribe function.
//     onMessage: jest.fn(() => jest.fn()),
//     // Simulate onNotificationOpenedApp similarly.
//     onNotificationOpenedApp: jest.fn(() => jest.fn()),
//     // Add additional methods if your code calls them:
//     // For example:
//     // setBackgroundMessageHandler: jest.fn(() => Promise.resolve()),
//   },
// }));
