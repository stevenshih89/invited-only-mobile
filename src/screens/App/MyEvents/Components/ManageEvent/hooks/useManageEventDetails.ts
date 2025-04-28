import invitedOnlyBackendApi from "src/api/backend-api";


interface UseManageEventDetailsProps {
    eventId: string;
}

export const useManageEventDetails = ({ eventId }: UseManageEventDetailsProps) => {

    const { data: eventRequests, isLoading } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/{eventId}', {
        params: {
            path: {
                eventId: eventId,
            },
        },
    });

    return {
        eventRequests,
        isLoading,
    }
}