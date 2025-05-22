import invitedOnlyBackendApi from "src/api/backend-api";

interface UseGetHighRankUsersProps {
    isLocked: boolean | "" | undefined;
}

const useGetHighRankUsers = ({ isLocked }: UseGetHighRankUsersProps) => {

    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/users/highest-rank', {
        enabled: isLocked
    });


    return { data, isLoading, error };
};

export default useGetHighRankUsers;