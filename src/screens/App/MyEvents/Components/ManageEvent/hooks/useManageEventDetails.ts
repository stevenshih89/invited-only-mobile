import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';

interface UseManageEventDetailsProps {
    eventId: string;
}

export const useManageEventDetails = ({ eventId }: UseManageEventDetailsProps) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);

    const { data: eventRequests, isLoading } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/{eventId}', {
        params: {
            path: {
                eventId: eventId,
            },
        },
    }, {
        refetchInterval: 5000,
    });

    return {
        eventRequests,
        isLoading,
    }
}