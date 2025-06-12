import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";
import { useAuthStore } from "src/store/authStore";

const useEventsDetails = () => {
    const { userMetadata: user } = useAuthStore();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data: events, isLoading } = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
        params: {
            path: {
                hostId: user?.uid || '',
            },
        },
    }, {
        refetchInterval: 5000,
        refetchOnMount: true
    });


    return { events, isLoading };
};
export default useEventsDetails;