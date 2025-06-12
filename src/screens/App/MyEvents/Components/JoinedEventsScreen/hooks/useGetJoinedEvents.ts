import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';
import useUser from "hooks/user/useUser";

const useGetJoinedEvents = () => {
    const { user } = useUser();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/events/joined-events/{guestId}', {
        params: {
            path: {
                guestId: user?.uid || '',
            },
        },
    },
        {
            refetchInterval: 5000
        }

    );

    return { data, isLoading, error };
};

export default useGetJoinedEvents;