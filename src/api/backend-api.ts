import createFetchClient, { Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import remoteConfig from '@react-native-firebase/remote-config';
import { paths } from '@invited-only/invited-only-api';
import { BACKEND_BASE_64_AUTH, BACKEND_BASE_URL, CODE_VERSION } from '@env';

const myMiddleware: Middleware = {
  onError: (error: any) => {
    if (error.message.includes('Aborted')) return;
    // eslint-disable-next-line no-console
    console.error('error while fetching', error);
  },
  async onRequest({ request }) {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);
    request.headers.set('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);
    return request;
  },
};

export const initializeApiClient = async () => {
  try {
    const backendUrlObj = JSON.parse(remoteConfig().getString('BackendPath'));
    const backendUrl = backendUrlObj[CODE_VERSION];
    if (!backendUrl) {
      console.warn('No backend URL from Remote Config, using default');
      return createClient<paths>(createFetchClient<paths>({ baseUrl: BACKEND_BASE_URL }));
    }

    const fetchClient = createFetchClient<paths>({ baseUrl: backendUrl });
    fetchClient.use(myMiddleware);
    return createClient<paths>(fetchClient);
  } catch (error) {
    console.error('Failed to fetch Remote Config:', error);
    return createClient<paths>(createFetchClient<paths>({ baseUrl: BACKEND_BASE_URL }));
  }
};

export default initializeApiClient;
