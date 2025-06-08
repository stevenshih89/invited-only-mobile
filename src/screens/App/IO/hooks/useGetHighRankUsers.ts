
import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

interface UseGetHighRankUsersProps {
    isLocked: boolean | "" | undefined;
}

const useGetHighRankUsers = ({ isLocked }: UseGetHighRankUsersProps) => {

    const { userMetadata } = useAuthStore();

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