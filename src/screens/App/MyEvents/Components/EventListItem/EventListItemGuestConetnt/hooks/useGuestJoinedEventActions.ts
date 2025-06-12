import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';
import { showToast } from "helpers/showToast";

interface GuestJoinedEventActionsProps {
    eventId: string;
    guestId: string;
    hostId: string;
}

const useGuestJoinedEventActions = ({ eventId, guestId, hostId }: GuestJoinedEventActionsProps) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { mutate: cancelInvitation } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees')


    const handleCancelInvitation = () => {
        cancelInvitation({
            body: {
                eventId,
                guestId,
                hostId,
                guestConfirm: false,
                rejectedAt: new Date().toISOString(),
                rejectedBy: 'guest',
                status: 'rejected'
            }
        },
            {
                onSuccess: () => {
                    showToast('cancel', 'Invitation cancelled')
                },
                onError: () => {
                    showToast('warning', 'Failed to cancel invitation')
                }
            }
        )

    }

    return { handleCancelInvitation }
}

export default useGuestJoinedEventActions;