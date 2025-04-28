
import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";
import { components } from "src/api/v1";

export const useGetEventRequests = () => {
    const { userMetadata } = useAuthStore();
    const { data: rawData, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/host/{hostId}', {
        params: {
            path: {
                hostId: userMetadata.uid || '',
            },

        },


    }, {
        refetchInterval: 1000,
    });

    const data = rawData as components['schemas']['ConnectionRequest'][] | undefined;


    const pendingSwipeRequests: components['schemas']['ConnectionRequest'][] = [];
    console.log('data after query (potentially updated by listener):', data);
    if (data && data.length > 0 && !isLoading) {
        data?.forEach((item) => {
            if (item.status !== 'rejected' && item.guestSwipe === 'right' && item.guestConfirm && item.status !== 'confirmation-complete') {
                pendingSwipeRequests.push(item);
            }
        });
    }


    return { pendingSwipeRequests: pendingSwipeRequests || [], isLoading, error };
};
