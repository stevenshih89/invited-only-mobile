import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";
import { useAuthStore } from "src/store/authStore";

interface UseGetHighRankUsersPaginationProps {
    lastDoc?: string;
}

const useGetHighRankUsersPagination = ({ lastDoc }: UseGetHighRankUsersPaginationProps) => {

    const { userMetadata } = useAuthStore();

    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data, isLoading, error, hasNextPage, fetchNextPage, isFetching, isRefetching, status } = invitedOnlyBackendApi.useInfiniteQuery('get', '/users/highest-rank/{userId}', {
        params: {
            path: {
                userId: userMetadata?.uid
            }
        },

    }, {
        getNextPageParam: (lastPage, _allPages) => {

            if (lastPage && lastPage.users && lastPage.users.length > 0) {
                return lastPage.users[0].uid;
            }
            return undefined;
        },
        initialPageParam: lastDoc || undefined,
        pageParamName: 'lastdoc',
    },);

    return { data: data?.pages[data?.pages.length - 1]?.users || [], isLoading: isLoading || isFetching || isRefetching, error, hasNextPage, fetchNextPage, status };
};

export default useGetHighRankUsersPagination;