
import { useContext } from "react";
import { FirebaseCollectionsContext } from "contexts/FirebaseCollectionNamesContext";
import invitedOnlyBackendApi from "src/api/backend-api";
import useFirestoreSubscriptionConnectionStatus from "src/api/realtime/useFirestoreSubscriptionConnectionStatus";
import { useAuthStore } from "src/store/authStore";

interface ConnectionStatus {
    chatId: string;
}

const useConnectionRealtimeStatus = ({ chatId }: ConnectionStatus) => {
    const { userMetadata } = useAuthStore();
    const { attendees } = useContext(FirebaseCollectionsContext);

    const { data: connectionStatuses, isLoading } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/host/{hostId}', {
        params: {
            path: {
                hostId: userMetadata?.uid || ''
            }
        }
    })
    useFirestoreSubscriptionConnectionStatus({
        collectionName: attendees || '',
        queryKey: ['get', '/eventAttendees/host/{hostId}', { params: { path: { hostId: userMetadata?.uid || '' } } }],
        docId: chatId
    })

    return {
        connectionStatus: connectionStatuses?.filter((connectionStatus) => `${connectionStatus.eventId}_${connectionStatus.hostId}_${connectionStatus.guestId}` === chatId)[0],
        isLoading
    };
}
export default useConnectionRealtimeStatus;