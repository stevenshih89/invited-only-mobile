import createFetchClient, {Middleware} from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type {paths} from './v1';
import {BACKEND_BASE_64_AUTH, BACKEND_BASE_URL} from '@env';

const myMiddleware: Middleware = {
  onError: error => {
    console.log('error', error);
  },
  async onRequest({request}) {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);
    request.headers.set('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);
    console.log('request', request);
    return request;
  },
};

const fetchClient = createFetchClient<paths>({
  baseUrl: BACKEND_BASE_URL,
});
fetchClient.use(myMiddleware);
const invitedOnlyBackendApi = createClient(fetchClient);

export default invitedOnlyBackendApi;
