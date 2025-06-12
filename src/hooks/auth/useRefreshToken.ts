import { useCallback, useContext } from "react";
import { useAuthStore } from "src/store/authStore";
import { BackendApiContext } from "contexts/BackendApiContex";

const useRefreshToken = () => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { mutateAsync, isPending } = invitedOnlyBackendApi.useMutation('post', '/auth/refresh');
    const { userMetadata, refreshToken: refreshTokenFromStore, setAccessToken, setRefreshToken } = useAuthStore();

    const refreshToken = useCallback(async () => {
        try {
            const response = await mutateAsync({
                body: {
                    phone: userMetadata?.phoneNumber,
                    refreshToken: refreshTokenFromStore,
                },
            });

            setAccessToken(response.accessToken);
            setRefreshToken(response.refreshToken);

            return response.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }, [mutateAsync, userMetadata, refreshTokenFromStore]);

    return { refreshToken, isPending };
};

export default useRefreshToken;