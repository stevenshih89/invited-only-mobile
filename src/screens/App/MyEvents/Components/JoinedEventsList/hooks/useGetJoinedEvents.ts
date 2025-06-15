import useUser from 'hooks/user/useUser';
import invitedOnlyBackendApi from 'src/api/backend-api';

const useGetJoinedEvents = () => {
  const {user} = useUser();
  const {data, isLoading, error} = invitedOnlyBackendApi!.useQuery(
    'get',
    '/events/joined-events/{guestId}',
    {
      params: {
        path: {
          guestId: user?.uid || '',
        },
      },
    },
    {
      refetchInterval: 5000,
    },
  );

  return {data, isLoading, error};
};

export default useGetJoinedEvents;
