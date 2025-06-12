import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';
import { useAuthStore } from "src/store/authStore";

const useGetSubscription = () => {
    const { userMetadata } = useAuthStore();
    const invitedOnlyBackendApi = useContext(BackendApiContext);

    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/subscription/get/{userId}', {
        params: {
            path: {
                userId: userMetadata?.uid,
            },
        },
    }, { refetchInterval: 5000 });

    return { data, isLoading, error };
};

export default useGetSubscription;