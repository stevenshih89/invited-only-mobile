import invitedOnlyBackendApi from "src/api/backend-api";

const useEventAttendes = (eventId: string) => {
    const { data: attendees, isLoading } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/{eventId}', {
        params: {
            path: { eventId: eventId },
        },

    }, {
        refetchInterval: 1000,
    });

    const attendingGuests = attendees?.filter((attendee) => attendee.status === 'confirmation-complete');
    const rejectedGuests = attendees?.filter((attendee) => attendee.status === 'rejected');
    const pendingGuests = attendees?.filter((attendee) => attendee.status === 'pending-confirmation');

    return { attendingGuests, pendingGuests, rejectedGuests, isLoading };
};
export default useEventAttendes;