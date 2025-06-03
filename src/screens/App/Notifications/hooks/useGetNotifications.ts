import invitedOnlyBackendApi from 'src/api/backend-api';
import {useAuthStore} from 'src/store/authStore';

const useGetNotifications = () => {
  const {userMetadata} = useAuthStore();
  const {mutate: markAllAsRead} = invitedOnlyBackendApi!.useMutation('post', '/notifications/markAllAsRead');

  const markAllAsReadHandler = () => {
    markAllAsRead({
      body: {
        userId: userMetadata?.uid,
      },
    });
  };

  const {data, isLoading, isError, refetch} = invitedOnlyBackendApi!.useQuery(
    'get',
    '/notifications/user/{userId}',
    {
      params: {
        path: {
          userId: userMetadata?.uid,
        },
      },
    },
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  );

  const count = data?.filter(notification => notification.type !== 'chat').length;
  const unreadCount = data?.filter(
    notification =>
      notification.readAt === null || notification.readAt === undefined || (notification.readAt === '' && notification.type !== 'chat'),
  ).length;

  const MyEventNotificationCount = data?.filter(notification => notification.hostId === userMetadata?.uid).length || 0;
  const JoinedEventNotificationCount = data?.filter(notification => notification.guestId === userMetadata?.uid).length || 0;

  return {
    data,
    isLoading,
    isError,
    isUnread: unreadCount,
    MyEventNotificationCount,
    JoinedEventNotificationCount,
    refetch,
    count,
    markAllAsReadHandler,
  };
};

export default useGetNotifications;
