import invitedOnlyBackendApi from "src/api/backend-api";

const useGetGuestDetails = (guestId: string) => {
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
        params: {
            path: {
                id: guestId,
            },
        },
    });

    return { data, isLoading, error };
};

export default useGetGuestDetails;