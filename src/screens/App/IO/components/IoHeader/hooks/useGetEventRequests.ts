import invitedOnlyBackendApi from "src/api/backend-api";

interface UseGetEventRequestsProps {
    eventId: string;
}

const useGetEventRequests = ({ eventId }: UseGetEventRequestsProps) => {
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/{eventId}', {
        params: {
            path: {
                eventId
            }
        }
    })

    data?.filter((request) => request.guestSwipe === 'right').forEach((request) => {
        console.log('guest: ', request.guestId);
        console.log('host: ', request.hostId);
        console.log('guestSwipe', request.guestSwipe);
        console.log('hostSwipe', request.hostSwipe);
        console.log('____________');
    })

    const requests = data?.filter((request) => request.guestSwipe === 'right' && request.hostSwipe !== 'right');


    return {
        requests,
        isLoading,
        error
    }
};

export default useGetEventRequests;