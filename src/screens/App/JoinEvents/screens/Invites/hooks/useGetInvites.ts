
import { components } from "@invited-only/invited-only-api";
import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

const useGetInvites = ({ events }: { events: components['schemas']['EventData'][] }): { data: components['schemas']['EventData'][], isLoading: boolean } => {
    const { userMetadata } = useAuthStore();
    const { data, isLoading } = invitedOnlyBackendApi.useQuery('get', '/events/invite-events/{guestId}', {
        params: {
            path: {
                guestId: userMetadata?.uid
            }
        }
    }, { enabled: !!userMetadata?.uid && events.length > 0, refetchInterval: 10000 })

    console.log('data', data);
    return {
        data: data ?? [],
        isLoading
    }
};

export default useGetInvites;