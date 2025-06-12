import { components } from "@invited-only/invited-only-api";
import { useContext } from "react";
import { useAuthStore } from "src/store/authStore";
import { BackendApiContext } from "contexts/BackendApiContex";

// Define the response type
type EventsResponse = {
    events?: components['schemas']['EventData'][];
    lastDoc?: string | null;
};

const useGetUserEvents = () => {
    const { userMetadata } = useAuthStore.getState();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const {
        data: eventsResponse,
        isLoading,
        isRefetching,
        isError,
        fetchNextPage,
        hasNextPage,
    } = invitedOnlyBackendApi.useInfiniteQuery('get', '/events/user/{userId}', {
        params: {
            path: {
                userId: userMetadata.uid || '',
            },
        },
    }, {


        getNextPageParam: (lastPage: EventsResponse, _allPages: EventsResponse[]) => {
            if (lastPage.events && lastPage.events.length > 0) {
                return lastPage.events[lastPage.events.length - 1].uid;
            }
            return undefined;
        },
        initialPageParam: undefined as string | undefined,
        pageParamName: 'lastdoc',
    });

    return {
        events: eventsResponse?.pages.flatMap((page) => page.events || []) || [],
        isLoading: isLoading || isRefetching,
        isError,
        hasNextPage,
        fetchNextPage,
    }
};

export default useGetUserEvents;
