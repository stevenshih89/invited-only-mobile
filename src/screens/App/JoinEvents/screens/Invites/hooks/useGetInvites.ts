
import { components } from "@invited-only/invited-only-api";
import { useQueryClient } from "@tanstack/react-query";
import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

const useGetInvites = (): { data: components['schemas']['EventData'][], isLoading: boolean, updateInvitesData: (eventId: string) => void } => {
    const queryClient = useQueryClient();
    const { userMetadata } = useAuthStore();
    const { data, isLoading } = invitedOnlyBackendApi.useQuery('get', '/events/invite-events/{guestId}', {
        params: {
            path: {
                guestId: userMetadata?.uid
            }
        },


    }, {
        refetchInterval: 5000,
    })


    const updateInvitesData = (eventId: string) => {
        queryClient.setQueryData(['get', '/events/invite-events/{guestId}', { params: { path: { guestId: userMetadata?.uid } } }], (oldData: components['schemas']['EventData'][]) => {
            return oldData.filter(event => event.uid !== eventId);
        });
    }

    return {
        data: data ?? [],
        isLoading: isLoading && !!data,
        updateInvitesData
    }
};

export default useGetInvites;