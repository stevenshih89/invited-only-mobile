import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

const useGetNotifications = () => {
    const { userMetadata } = useAuthStore();

    const { data, isLoading, isError, refetch } = invitedOnlyBackendApi.useQuery('get', '/notifications/user/{userId}', {
        params: {
            path: {
                userId: userMetadata?.uid
            }
        },
    }, {
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
    const isUnread = data?.filter((notification) => notification.readAt === 'unread').length;

    return { data, isLoading, isError, isUnread, refetch };
};

export default useGetNotifications;
