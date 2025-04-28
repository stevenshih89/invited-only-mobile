import invitedOnlyBackendApi from "src/api/backend-api";

interface UseUpdateEventAttendeeProps {
    guestId: string;
    eventId: string;
    hostId: string;
}

const useReqeustActions = () => {
    const { mutate: updateAttendens, isPending: isInvitePending } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees', {
        onSuccess: () => {
            console.log('Event attendee updated');
        },
        onError: () => {
            console.log('Error updating event attendee');
        },
    })
    const handleInviteGuest = ({ guestId, eventId, hostId }: UseUpdateEventAttendeeProps) => {
        updateAttendens({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                hostConfirm: true,
            }
        })
    }
    const handleRejectGuest = ({ guestId, eventId, hostId }: UseUpdateEventAttendeeProps) => {
        updateAttendens({
            body: {
                eventId: eventId,
                guestId: guestId,
                hostId: hostId,
                hostConfirm: false,
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