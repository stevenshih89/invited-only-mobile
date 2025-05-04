
import invitedOnlyBackendApi from "src/api/backend-api";

interface UseUpdateEventAttendeeProps {
    guestId: string;
    eventId: string;
    hostId: string;
}

const useReqeustActions = (updateEventAttendee: (guestId: string, hostId: string, hostSwipe: string) => void) => {

    const { mutate: updateAttendens, isPending: isInvitePending } = invitedOnlyBackendApi.useMutation('post', '/eventAttendees/create')
    const handleInviteGuest = ({ guestId, eventId, hostId }: UseUpdateEventAttendeeProps) => {
        updateAttendens({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                hostSwipe: 'right'
            }
        }, {
            onSuccess: () => {
                updateEventAttendee(guestId, hostId, 'right')
            }
        })
    }
    const handleRejectGuest = ({ guestId, eventId, hostId }: UseUpdateEventAttendeeProps) => {
        updateAttendens({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                hostSwipe: 'left'
            }
        }, {
            onSuccess: () => {
                updateEventAttendee(guestId, hostId, 'left')
            }
        })
    }

    return {
        handleInviteGuest,
        handleRejectGuest,
        isPending: isInvitePending
    }

}

export default useReqeustActions;