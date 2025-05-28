
import { components } from "@invited-only/invited-only-api";
import { useAuthStore } from "src/store/authStore";
import invitedOnlyBackendApi from "src/api/backend-api";

interface UseUserResponse {
    user: components['schemas']['User'] | undefined;
    isLoading: boolean;
    error: Error | null;
}

const useUser = (): UseUserResponse => {
    const { userMetadata, logout, onBoarding } = useAuthStore();

    const { data, isLoading, error, status } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
        params: {
            path: {
                id: userMetadata?.uid,
            },
        }
    }, {
        refetchInterval: 1000 * 10,
    });

    const resError = error as { error: { statusCode: number } } | null;

    if (status === 'error' && onBoarding.isOnboardingCompleted && userMetadata.uid) {
        if (resError?.error.statusCode === 404) {
            logout();
        }
    }

    return {
        user: data,
        isLoading,
        error,
    }
};

export default useUser;
