import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';

const useGetGuestDetails = (guestId: string) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
        params: {
            path: {
                id: guestId,
            },
        },
    });

    return { data, isLoading, error };
};

export default useGetGuestDetails;