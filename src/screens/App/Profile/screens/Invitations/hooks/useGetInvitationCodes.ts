import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';
import { useAuthStore } from "src/store/authStore";

const useGetInvitationCodes = () => {
    const { userMetadata } = useAuthStore();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
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