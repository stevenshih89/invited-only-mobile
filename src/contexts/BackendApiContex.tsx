import { paths } from '@invited-only/invited-only-api';
import { createContext, ReactNode } from 'react';
import createClient, { OpenapiQueryClient } from 'openapi-react-query';
import { BACKEND_BASE_URL } from '@env';

interface BackendApiProviderProps {
    children: ReactNode;
    backendApi: OpenapiQueryClient<paths>;
}


export const BackendApiContext = createContext<OpenapiQueryClient<paths>>(createClient({ baseUrl: BACKEND_BASE_URL } as any));

const BackendApiProvider = ({ children, backendApi }: BackendApiProviderProps) => {
    console.log(backendApi);
    return (
        <BackendApiContext.Provider value={backendApi}>
            {children}
        </BackendApiContext.Provider>
    );
};

export default BackendApiProvider;
