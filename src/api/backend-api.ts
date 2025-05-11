import createFetchClient, { Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
// eslint-disable-next-line import/no-unresolved
import { BACKEND_BASE_64_AUTH, BACKEND_BASE_URL } from '@env';
import { paths } from '@invited-only/invited-only-api';


const myMiddleware: Middleware = {
  onError: (error: any) => {
    if (error.message.includes('Aborted')) {
      return;
    }
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

const fetchClient = createFetchClient<paths>({
  baseUrl: BACKEND_BASE_URL,
});
fetchClient.use(myMiddleware);
const invitedOnlyBackendApi = createClient(fetchClient);

export default invitedOnlyBackendApi;
