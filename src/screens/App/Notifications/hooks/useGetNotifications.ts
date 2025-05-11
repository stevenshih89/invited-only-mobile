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
    const unreadCount = data?.filter((notification) => notification.readAt === 'unread' && notification.type !== 'chat').length;
    const MyEventNotificationCount = data?.filter((notification) => notification.hostId === userMetadata?.uid).length || 0;
    const JoinedEventNotificationCount = data?.filter((notification) => notification.guestId === userMetadata?.uid).length || 0;

    return { data, isLoading, isError, isUnread: unreadCount, MyEventNotificationCount, JoinedEventNotificationCount, refetch };
};

export default useGetNotifications;
