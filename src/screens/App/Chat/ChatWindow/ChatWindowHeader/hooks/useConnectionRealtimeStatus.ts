
import { useContext } from "react";
import { components } from "@invited-only/invited-only-api";
import { useQueryClient } from "@tanstack/react-query";
import { FirebaseCollectionsContext } from "contexts/FirebaseCollectionNamesContext";
import invitedOnlyBackendApi from "src/api/backend-api";
import useFirestoreSubscriptionConnectionStatus from "src/api/realtime/useFirestoreSubscriptionConnectionStatus";
import { useAuthStore } from "src/store/authStore";

interface ConnectionStatus {
    chat: components['schemas']['Chat'];
}

const useConnectionRealtimeStatus = ({ chat }: ConnectionStatus) => {
    const { userMetadata } = useAuthStore();
    const queryClient = useQueryClient();
    const { attendees } = useContext(FirebaseCollectionsContext);

    const { data: connectionStatuses, isLoading } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/host/{hostId}', {
        params: {
            path: {
                hostId: chat?.hostId || ''
            }

        }
    }, { refetchInterval: 1000, enabled: !!chat?.id && !!chat?.hostId && !!chat?.guestId && !!chat?.eventId })
    useFirestoreSubscriptionConnectionStatus({
        collectionName: attendees || '',
        queryKey: ['get', '/eventAttendees/host/{hostId}', { params: { path: { hostId: userMetadata?.uid || '' } } }],
        docId: chat?.id || ''
    })
    console.log(connectionStatuses);

    const updateConnectionStatusData = ({ hostAction = 'none', guestAction = 'none' }: { hostAction: 'confirm' | 'reject' | 'none', guestAction: 'confirm' | 'reject' | 'none' }) => queryClient.setQueryData(['get', '/eventAttendees/host/{hostId}', { params: { path: { hostId: chat?.hostId || '' } } }], (oldData: components['schemas']['ConnectionRequest'][]) => {
        const newData: components['schemas']['ConnectionRequest'][] = [];
        oldData.forEach((connectionStatus: components['schemas']['ConnectionRequest']) => {
            if (connectionStatus?.id === chat?.id) {
                if (hostAction === 'confirm') {
                    newData.push({ ...connectionStatus, hostConfirm: true });
                }
                if (guestAction === 'confirm') {
                    newData.push({ ...connectionStatus, hostConfirm: true });
                }
            }
            newData.push(connectionStatus);
        })
        return newData;
    })

    return {
        connectionStatus: connectionStatuses?.filter((connectionStatus) => `${connectionStatus?.eventId}_${connectionStatus?.hostId}_${connectionStatus?.guestId}` === `${chat?.eventId}_${chat?.hostId}_${chat?.guestId}`)[0],
        isLoading,
        updateConnectionStatusData
    };
}
export default useConnectionRealtimeStatus;