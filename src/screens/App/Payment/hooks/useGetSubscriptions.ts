import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

const useGetSubscriptions = () => {
    const { userMetadata } = useAuthStore();
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/subscription/get/{userId}', {
        params: {
            path: {
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

export default useGetSubscriptions;
