import { useContext } from 'react';
import { components } from '@invited-only/invited-only-api';
import { useQueryClient } from '@tanstack/react-query';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import useFirestoreSubscriptionConnectionStatus from 'src/api/realtime/useFirestoreSubscriptionConnectionStatus';
import { useAuthStore } from 'src/store/authStore';
import { BackendApiContext } from 'contexts/BackendApiContex';

interface ConnectionStatus {
  event: components['schemas']['EventData'];

  guestId: string;
}

const useConnectionRealtimeStatus = ({ event, guestId }: ConnectionStatus) => {
  const { userMetadata } = useAuthStore();
  const queryClient = useQueryClient();
  const { attendees } = useContext(FirebaseCollectionsContext);
  const invitedOnlyBackendApi = useContext(BackendApiContext);

  const { data: connectionStatuses, isLoading } = invitedOnlyBackendApi.useQuery(
    'get',
    '/eventAttendees/host/{hostId}',
    {
      params: {
        path: {
          hostId: event?.hostId || '',
        },
      },
    },
    {
      refetchInterval: 1000,
      enabled: !!event?.uid && !!event?.hostId && !!guestId && !!event?.uid,
      staleTime: 2000,
    },
  );

  useFirestoreSubscriptionConnectionStatus({
    collectionName: attendees || '',
    queryKey: ['get', '/eventAttendees/host/{hostId}', { params: { path: { hostId: userMetadata?.uid || '' } } }],
    docId: event?.uid || '',
  });

  const updateConnectionStatusData = ({
    hostAction = 'none',
    guestAction = 'none',
  }: {
    hostAction: 'confirm' | 'reject' | 'none';
    guestAction: 'confirm' | 'reject' | 'none';
  }) =>
    queryClient.setQueryData(
      ['get', '/eventAttendees/host/{hostId}', { params: { path: { hostId: event?.hostId || '' } } }],
      () => {
        queryClient.setQueryData(
          ['get', '/eventAttendees/host/{hostId}', { params: { path: { hostId: userMetadata?.uid || '' } } }],
          (oldData: components['schemas']['ConnectionRequest'][]) => {
            const newData: components['schemas']['ConnectionRequest'][] = [];
            oldData.forEach((connectionStatus: components['schemas']['ConnectionRequest']) => {
              if (connectionStatus?.id === event?.uid) {
                if (hostAction === 'confirm') {
                  newData.push({ ...connectionStatus, hostConfirm: true });
                }
                if (guestAction === 'confirm') {
                  newData.push({ ...connectionStatus, guestConfirm: true });
                }
              }
            });
            return newData;
          },
        );
      },
    );

  return {
    connectionStatus: connectionStatuses?.filter(
      connectionStatus =>
        `${connectionStatus?.eventId}_${connectionStatus?.hostId}_${connectionStatus?.guestId}` ===
        `${event?.uid}_${event?.hostId}_${guestId}`,
    )[0],
    isLoading,
    updateConnectionStatusData,
  };
};
export default useConnectionRealtimeStatus;
