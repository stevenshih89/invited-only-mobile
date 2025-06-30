import {useContext} from 'react';
import {BackendApiContext} from 'contexts/BackendApiContex';
import {showToast} from 'helpers/showToast';

interface UseHostConnectionActionsProps {
    hostId: string;
    guestId: string;
    eventId: string;
    onSuccess?: () => void;
}

const useHostConnectionActions = ({hostId, guestId, eventId, onSuccess}: UseHostConnectionActionsProps) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);

    const {mutate: updateEventAttendee, isPending: isUpdatingEventAttendee} = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees');

    const handleHostConfirmEvent = () => {
        updateEventAttendee(
            {
                body: {
                    eventId: eventId,
                    guestId: guestId,
                    hostId: hostId,
                    hostConfirm: true,
                },
            },
            {
                onSuccess: () => {
                    showToast('basic', `Now waiting on the guest confirmation`, `You've Approved the Guest`);
                    onSuccess?.();
                },
                onError: () => {
                    showToast('basic', '', 'Approving failed');
                },
            },
        );
    };

    const handleHostRejectEvent = (showToastMessage: boolean = true) => {
        updateEventAttendee(
            {
                body: {
                    eventId: eventId,
                    guestId: guestId,
                    hostId: hostId,
                    hostConfirm: false,
                    rejectedBy: 'host',
                    rejectionReason: 'hostRejected',
                    rejectedAt: new Date().toISOString(),
                },
            },
            {
                onSuccess: () => {
                    if (showToastMessage) {
                        showToast('basic', 'Guest rejected successfully', 'Guest rejected');
                    }
                    onSuccess?.();
                },
                onError: () => {
                    if (showToastMessage) {
                        showToast('basic', 'Guest rejection failed', 'Guest rejection failed');
                    }
                },
            },
        );
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
        handleHostCancelEvent,
    };
};

export default useHostConnectionActions;
