import * as Sentry from "@sentry/react-native";

Sentry.init({ dsn: "key" });

export const logErrorToSentry = (error: unknown) => {
  try {
    Sentry.captureException(error);
  } catch (error) {
    console.error('error to sentry', error);
  }
};
