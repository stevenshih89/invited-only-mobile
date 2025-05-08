import { showToast } from "helpers/showToast";
import invitedOnlyBackendApi from "src/api/backend-api";

interface UseHostConnectionActionsProps {
    hostId: string;
    guestId: string;
    eventId: string;
}

const useHostConnectionActions = ({ hostId, guestId, eventId }: UseHostConnectionActionsProps) => {

    const { mutate: updateEventAttendee, isPending: isUpdatingEventAttendee } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees')

    const handleHostConfirmEvent = () => {
        updateEventAttendee({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                hostConfirm: true,
            },
        }, {
            onSuccess: () => {
                showToast('success', 'Event approved successfully', 'Event approved');
            },
            onError: () => {
                showToast('warning', 'Event approval failed', 'Event approval failed');
            }
        });
    };

    const handleHostRejectEvent = () => {
        updateEventAttendee({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                hostConfirm: false,
                rejectedBy: 'host',
                rejectionReason: 'hostRejected',
                rejectedAt: new Date().toISOString(),
            },
        }, {
            onSuccess: () => {
                showToast('success', 'Event rejected successfully', 'Event rejected');
            },
            onError: () => {
                showToast('warning', 'Event rejection failed', 'Event rejection failed');
            }
        });
    };
    return {
        handleHostConfirmEvent,
        handleHostRejectEvent,
        isUpdatingEventAttendee,
    };
};

export default useHostConnectionActions;