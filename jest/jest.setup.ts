require('react-native-reanimated').setUpTests({fps: 60});
jest.useFakeTimers();

// Import our individual mock files.
require('./mocks/deviceInfo.mock');
require('./mocks/appSettingsQueries.mock');
require('./mocks/firestore.mock');
require('./mocks/auth.mock');
require('./mocks/config.mock');
require('./mocks/responsiveFontsize.mock');
require('./mocks/analytics.mock');
require('./mocks/sentry.mock');
require('./mocks/appNavigation.mock');
