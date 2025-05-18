import { showToast } from "helpers/showToast";
import invitedOnlyBackendApi from "src/api/backend-api";

interface UseHostConnectionActionsProps {
    hostId: string;
    guestId: string;
    eventId: string;
    onSuccess?: () => void;
}

const useHostConnectionActions = ({ hostId, guestId, eventId, onSuccess }: UseHostConnectionActionsProps) => {

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
                onSuccess?.();
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
                onSuccess?.();
            },
            onError: () => {
                showToast('warning', 'Event rejection failed', 'Event rejection failed');
            }
        });
    };

    const handleHostCancelEvent = () => {
        updateEventAttendee({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                hostConfirm: false,
            },
        });
    };
    return {
        handleHostConfirmEvent,
        handleHostRejectEvent,
        isUpdatingEventAttendee,
        handleHostCancelEvent
    };
};

export default useHostConnectionActions;