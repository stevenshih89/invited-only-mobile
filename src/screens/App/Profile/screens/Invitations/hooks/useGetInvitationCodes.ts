import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

const useGetInvitationCodes = () => {
    const { userMetadata } = useAuthStore();
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/auth/get-invitation-codes', {
        params: {
            query: {
                userId: userMetadata?.uid
            }
        }
    })

    return {
        data,
        isLoading,
        error
    }
};

export default useGetInvitationCodes;