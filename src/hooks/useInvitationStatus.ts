import {useMemo} from 'react';

export type connecitonStatus =
  | 'connectionInitiated'
  | 'hostApprovePendingForGuest'
  | 'guestApprovePendingForHost'
  | 'attendingComplete'
  | 'completed'
  | 'rejected'
  | undefined;

export const useInvitationStatus = (connectionStatus: components['schemas']['ConnectionRequest'] | undefined) => {
  const getInvitationStatus = (): connecitonStatus => {
    if (!connectionStatus?.hostConfirm && !connectionStatus?.guestConfirm) {
      return 'connectionInitiated';
    }
    if (connectionStatus?.hostConfirm && !connectionStatus?.guestConfirm) {
      return 'hostApprovePendingForGuest';
    }
    if (!connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
      return 'guestApprovePendingForHost';
    }
    if (connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
      return 'attendingComplete';
    }
    if (connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
      return 'completed';
    }
    if (connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
      return 'rejected';
    }
  };

  const invitationStatus = useMemo(() => getInvitationStatus(), [connectionStatus]);

  return {
    invitationStatus,
  };
};
