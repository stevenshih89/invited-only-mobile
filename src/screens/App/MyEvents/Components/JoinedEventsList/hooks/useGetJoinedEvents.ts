import { useContext } from 'react';
import useUser from 'hooks/user/useUser';
import { BackendApiContext } from 'contexts/BackendApiContex';

const useGetJoinedEvents = () => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { user } = useUser();
  const { data, isLoading, error } = invitedOnlyBackendApi.useQuery(
    'get',
    '/events/invite-events/{guestId}',
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

  return { data, isLoading, error };
};

export default useGetJoinedEvents;
