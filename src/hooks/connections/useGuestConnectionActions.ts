import { showToast } from "helpers/showToast";
import invitedOnlyBackendApi from "src/api/backend-api";

interface UseGuestConnectionActionsProps {
    hostId: string;
    guestId: string;
    eventId: string;
    onSuccess?: () => void;
}

const useGuestConnectionActions = ({ hostId, guestId, eventId, onSuccess }: UseGuestConnectionActionsProps) => {

    const { mutate: updateEventAttendee, isPending: isUpdatingEventAttendee } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees')

    const handleGuestConfirmEvent = () => {
        updateEventAttendee({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                guestConfirm: true,
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

    const handleGuestRejectEvent = () => {
        updateEventAttendee({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                guestConfirm: false,
                rejectedBy: 'guest',
                rejectionReason: 'guestRejected',
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
    return {
        handleGuestConfirmEvent,
        handleGuestRejectEvent,
        isUpdatingEventAttendee,
    };
};

export default useGuestConnectionActions;