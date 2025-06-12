import { components } from "@invited-only/invited-only-api";
import { useContext } from "react";
import { useAuthStore } from "src/store/authStore";
import { BackendApiContext } from "contexts/BackendApiContex";

interface UseUserResponse {
    user: components['schemas']['User'] | undefined;
    isLoading: boolean;
    error: Error | null;
}

const useUser = (): UseUserResponse => {
    const backendApi = useContext(BackendApiContext);
    const { userMetadata, logout, onBoarding } = useAuthStore();

    if (!backendApi) {
        return { user: undefined, isLoading: false, error: null };
    }

    const { data, isLoading, error, status } = backendApi.useQuery('get', '/users/{id}', {
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
