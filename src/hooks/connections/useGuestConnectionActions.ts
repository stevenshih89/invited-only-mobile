import {useContext} from 'react';
import {BackendApiContext} from 'contexts/BackendApiContex';
import {showToast} from 'helpers/showToast';

interface UseGuestConnectionActionsProps {
  hostId: string;
  guestId: string;
  eventId: string;
  onSuccess?: () => void;
}

const useGuestConnectionActions = ({hostId, guestId, eventId, onSuccess}: UseGuestConnectionActionsProps) => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);

  const {mutate: updateEventAttendee, isPending: isUpdatingEventAttendee} = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees');

  const handleGuestConfirmEvent = () => {
    updateEventAttendee(
      {
        body: {
          eventId: eventId,
          guestId: guestId,
          hostId: hostId,
          guestConfirm: true,
        },
      },
      {
        onSuccess: () => {
          showToast('basic', 'Event approved successfully', 'Event approved');
          onSuccess?.();
        },
        onError: () => {
          showToast('basic', 'Event approval failed', 'Event approval failed');
        },
      },
    );
  };

  const handleGuestRejectEvent = () => {
    updateEventAttendee(
      {
        body: {
          eventId: eventId,
          guestId: guestId,
          hostId: hostId,
          guestConfirm: false,
          rejectedBy: 'guest',
          rejectionReason: 'guestRejected',
          rejectedAt: new Date().toISOString(),
        },
      },
      {
        onSuccess: () => {
          showToast('basic', 'Event rejected successfully', 'Event rejected');
          onSuccess?.();
        },
        onError: () => {
          showToast('basic', 'Event rejection failed', 'Event rejection failed');
        },
      },
    );
  };
  return {
    handleGuestConfirmEvent,
    handleGuestRejectEvent,
    isUpdatingEventAttendee,
  };
};

export default useGuestConnectionActions;
