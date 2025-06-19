/* eslint-disable no-console */
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
  console.log('🚀 initializeApiClient: Starting API client initialization');

  try {
    console.log('📡 initializeApiClient: Fetching Remote Config...');
    const remoteConfigString = remoteConfig().getString('BackendPath');
    console.log('📡 initializeApiClient: Remote Config raw string:', `"${remoteConfigString}"`);
    console.log('📡 initializeApiClient: Remote Config string length:', remoteConfigString?.length);
    console.log('📡 initializeApiClient: Remote Config string type:', typeof remoteConfigString);

    if (!remoteConfigString || remoteConfigString.trim() === '') {
      console.warn('⚠️ initializeApiClient: Remote Config BackendPath is empty, using default');
      console.log('🔧 initializeApiClient: Using default BACKEND_BASE_URL:', BACKEND_BASE_URL);
      return createClient<paths>(createFetchClient<paths>({ baseUrl: BACKEND_BASE_URL }));
    }

    console.log('🔍 initializeApiClient: Attempting to parse Remote Config JSON...');
    const backendUrlObj = JSON.parse(remoteConfigString);
    console.log('✅ initializeApiClient: JSON parsed successfully:', backendUrlObj);
    console.log('🔍 initializeApiClient: Looking for CODE_VERSION:', CODE_VERSION);

    const backendUrl = backendUrlObj[CODE_VERSION];
    console.log('🔍 initializeApiClient: Found backend URL for version:', backendUrl);

    if (!backendUrl) {
      console.warn('⚠️ initializeApiClient: No backend URL from Remote Config, using default');
      console.log('🔧 initializeApiClient: Using default BACKEND_BASE_URL:', BACKEND_BASE_URL);
      return createClient<paths>(createFetchClient<paths>({ baseUrl: BACKEND_BASE_URL }));
    }

    console.log('🔧 initializeApiClient: Using Remote Config backend URL:', backendUrl);
    const fetchClient = createFetchClient<paths>({ baseUrl: backendUrl });
    fetchClient.use(myMiddleware);
    console.log('✅ initializeApiClient: API client created successfully with Remote Config');
    return createClient<paths>(fetchClient);

  } catch (error) {
    console.error('❌ initializeApiClient: Failed to fetch Remote Config:', error);
    console.error('❌ initializeApiClient: Error details:', {
      message: (error as Error).message || 'No message',
      stack: (error as Error).stack || 'No stack',
      type: (error as Error).constructor.name || 'Unknown'
    });
    console.log('🔧 initializeApiClient: Falling back to default BACKEND_BASE_URL:', BACKEND_BASE_URL);
    return createClient<paths>(createFetchClient<paths>({ baseUrl: BACKEND_BASE_URL }));
  }
};

export default initializeApiClient;
