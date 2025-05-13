
import { useContext } from "react";
import { components } from "@invited-only/invited-only-api";
import { FirebaseCollectionsContext } from "contexts/FirebaseCollectionNamesContext";
import invitedOnlyBackendApi from "src/api/backend-api";
import useFirestoreSubscriptionConnectionStatus from "src/api/realtime/useFirestoreSubscriptionConnectionStatus";
import { useAuthStore } from "src/store/authStore";

interface ConnectionStatus {
    chat: components['schemas']['Chat'];
}

const useConnectionRealtimeStatus = ({ chat }: ConnectionStatus) => {
    const { userMetadata } = useAuthStore();
    const { attendees } = useContext(FirebaseCollectionsContext);

    const { data: connectionStatuses, isLoading } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/host/{hostId}', {
        params: {
            path: {
                hostId: chat?.hostId || ''
            }

        }
    }, { refetchInterval: 1000 })
    useFirestoreSubscriptionConnectionStatus({
        collectionName: attendees || '',
        queryKey: ['get', '/eventAttendees/host/{hostId}', { params: { path: { hostId: userMetadata?.uid || '' } } }],
        docId: chat?.id || ''
    })

    return {
        connectionStatus: connectionStatuses?.filter((connectionStatus) => `${connectionStatus?.eventId}_${connectionStatus?.hostId}_${connectionStatus?.guestId}` === `${chat?.eventId}_${chat?.hostId}_${chat?.guestId}`)[0],
        isLoading
    };
}
export default useConnectionRealtimeStatus;