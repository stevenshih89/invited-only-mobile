import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';
import useUser from "hooks/user/useUser";

const useRequestedEvents = () => {
    const { user } = useUser();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/events/requested-events/{guestId}', {
        params: {
            path: {
                guestId: user?.uid || '',
            },
        },
    }, {
        refetchInterval: 5000
    }
    );

    return { data, isLoading, error };
};

export default useRequestedEvents;