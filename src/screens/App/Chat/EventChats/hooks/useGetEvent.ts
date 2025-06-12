import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";

const useGetEvent = (eventId: string) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/events/{eventId}', {
        params: {
            path: { eventId }
        }
    });

    return { data, isLoading, error };
}

export default useGetEvent;