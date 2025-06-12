import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";

interface UseGetEventRequestsProps {
    eventId: string;
}

const useGetEventRequests = ({ eventId }: UseGetEventRequestsProps) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/{eventId}', {
        params: {
            path: {
                eventId
            }
        }
    })

    const requests = data?.filter((request) => request.guestSwipe === 'right' && request.hostSwipe !== 'right');
    return {
        requests,
        isLoading,
        error
    }
};

export default useGetEventRequests;