export type InvitationStatus =
    | 'connectionInitiated'
    | 'hostApprovePendingForGuest'
    | 'guestApprovePendingForHost'
    | 'attendingComplete'
    | 'completed'
    | 'rejected'
    | undefined;

export const getInvitationStatusDescription = (
    invitationStatus: InvitationStatus,
    isJoinedEvent: boolean = false
): string => {
    if (!invitationStatus) {
        return '';
    }

    switch (invitationStatus) {
        case 'attendingComplete':
            return 'You are attending this event';

        case 'guestApprovePendingForHost':
            return 'Host approval needed';

        case 'hostApprovePendingForGuest':
            return isJoinedEvent ? 'Your confirmation needed' : 'Guest confirmation needed';

        case 'connectionInitiated':
            return isJoinedEvent ? 'Host approval needed' : 'Your approval needed';

        case 'completed':
            return 'Event completed';

        case 'rejected':
            return 'Invitation rejected';

        default:
            return '';
    }
}; 