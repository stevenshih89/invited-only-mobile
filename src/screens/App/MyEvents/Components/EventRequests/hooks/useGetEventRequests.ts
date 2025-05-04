
import { components } from "@invited-only/invited-only-api";
import { useQueryClient } from "@tanstack/react-query";
import invitedOnlyBackendApi from "src/api/backend-api";

export const useGetEventRequests = (eventId: string) => {
    const queryClient = useQueryClient();
    const { data: rawData, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/eventAttendees/{eventId}', {
        params: {
            path: {
                eventId: eventId || '',
            },

        },
    }, {
        refetchInterval: 1000,
    });

    const data = rawData as components['schemas']['ConnectionRequest'][] | undefined;

    const pendingSwipeRequests: components['schemas']['ConnectionRequest'][] = [];

    if (data && data.length > 0 && !isLoading) {
        data?.forEach((item) => {
            if (item.guestSwipe === 'right' && item.hostSwipe === 'none') {
                pendingSwipeRequests.push(item);
            }
        });
    }

    const updateEventAttendee = (guestId: string, hostId: string, hostSwipe: string) => {
        queryClient.setQueryData(['get', '/eventAttendees/{eventId}', {
            params: {
                path: {
                    eventId: eventId || '',
                },
            },
        }], (oldData: components['schemas']['ConnectionRequest'][]) => {
            return oldData.map((item) => {
                if (item.guestId === guestId && item.hostId === hostId) {
                    return { ...item, hostSwipe: hostSwipe }
                }
                return item;
            })
        })
    }


    return { pendingSwipeRequests: pendingSwipeRequests || [], isLoading, error, updateEventAttendee };
};
