
import { showToast } from "helpers/showToast";
import invitedOnlyBackendApi from "src/api/backend-api";

interface GuestJoinedEventActionsProps {
    eventId: string;
    guestId: string;
    hostId: string;
}

const useGuestJoinedEventActions = ({ eventId, guestId, hostId }: GuestJoinedEventActionsProps) => {
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