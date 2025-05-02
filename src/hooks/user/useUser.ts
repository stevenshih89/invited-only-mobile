
import { components } from "@invited-only/invited-only-api";
import { useAuthStore } from "src/store/authStore";
import invitedOnlyBackendApi from "src/api/backend-api";

interface UseUserResponse {
    user: components['schemas']['User'] | undefined;
    isLoading: boolean;
    error: Error | null;
}

const useUser = (): UseUserResponse => {
    const { userMetadata } = useAuthStore();
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
        params: {
            path: {
                id: userMetadata?.uid,
            },
        },
    });

    return {
        user: data,
        isLoading,
        error,
    }
};

export default useUser;
