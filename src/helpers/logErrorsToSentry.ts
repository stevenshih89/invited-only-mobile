import {SENTRY_DNS, APP_ENV} from '@env';
import * as Sentry from '@sentry/react-native';
import auth from '@react-native-firebase/auth';

Sentry.init({
  dsn: SENTRY_DNS,
  environment: APP_ENV || 'unknown',
});

interface SentryContext {
  tags?: {[key: string]: string | number | boolean};
  extra?: {[key: string]: any};
  level?: Sentry.SeverityLevel;
}

/**
 * Logs an error to Sentry with additional context.
 *
 * @param error The error object or message to log.
 * @param context Optional tags, extra data, and severity level.
 */
export const logErrorToSentry = (error: unknown, context?: SentryContext) => {
  try {
    Sentry.withScope(scope => {
      const user = auth().currentUser;
      if (user) {
        scope.setUser({id: user.uid, email: user.email || undefined});
      }

      if (context?.tags) {
        Object.entries(context.tags).forEach(([key, value]) => {
          scope.setTag(key, value);
        });
      }
      scope.setTag('source', 'app-catch');

      if (context?.extra) {
        Object.entries(context.extra).forEach(([key, value]) => {
          scope.setExtra(key, value);
        });
      }

      if (context?.level) {
        scope.setLevel(context.level);
      }

      Sentry.captureException(error);

      if (__DEV__) {
        console.warn('[Sentry Log]', {
          error: error,
          tags: context?.tags,
          extra: context?.extra,
        });
      }
    });
  } catch (sentryError) {
    console.error('Failed to send error to Sentry:', sentryError);
    console.error('Original error:', error);
  }
};
