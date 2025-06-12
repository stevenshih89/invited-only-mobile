import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";
import { useAuthStore } from "src/store/authStore";

interface UseGetHighRankUsersProps {
    isLocked: boolean | "" | undefined;
}

const useGetHighRankUsers = ({ isLocked }: UseGetHighRankUsersProps) => {

    const { userMetadata } = useAuthStore();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/users/highest-rank/{userId}', {
        params: {
            path: {
                userId: userMetadata?.uid
            }
        },
        enabled: isLocked
    });


    return { data, isLoading, error };
};

export default useGetHighRankUsers;