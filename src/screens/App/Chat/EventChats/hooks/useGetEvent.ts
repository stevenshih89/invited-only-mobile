import invitedOnlyBackendApi from "src/api/backend-api";

const useGetEvent = (eventId: string) => {
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/events/{eventId}', {
        params: {
            path: { eventId }
        }
    });

    return { data, isLoading, error };
}

export default useGetEvent;