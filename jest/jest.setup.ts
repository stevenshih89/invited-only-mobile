require('./mocks/reanimated.mock');
require('./mocks/gestureHandler');
require('./mocks/dimensions.mock');
jest.useFakeTimers();

// Import our individual mock files.
import './mocks/tindercard.mock';
import './mocks/asyncStorage.mock';
import './mocks/firebaseMessage.mock';
import './mocks/notifee.mock';
import './mocks/permissions.mock.ts';
import './mocks/firebase.functions.mock.ts';
import './mocks/firebase.app.mock.ts';
import './mocks/deviceInfo.mock';
import './mocks/appSettingsQueries.mock';
require('./mocks/firestore.mock');
require('./mocks/auth.mock');
require('./mocks/config.mock');
require('./mocks/responsiveFontsize.mock');
require('./mocks/analytics.mock');
require('./mocks/sentry.mock');
import './mocks/appNavigation.mock';
// require('./mocks/platform.mock');
require('./mocks/useIO.mock');
