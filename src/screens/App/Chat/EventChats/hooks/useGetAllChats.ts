import { useContext } from "react";
import useUser from "hooks/user/useUser";
import { BackendApiContext } from "contexts/BackendApiContex";

interface UseGetAllChatsProps {
    eventId: string;
    isEnabled?: boolean;
}

const useGetChats = ({ eventId, isEnabled = true }: UseGetAllChatsProps) => {
    const { user } = useUser();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data: chats, isLoading: isChatLoading } = invitedOnlyBackendApi.useQuery('get', '/chat/event/{eventId}', {
        params: {
            path: {
                eventId: eventId
            }
        },
    }, {
        enabled: !!eventId && eventId !== 'joined-events' && isEnabled,
        refetchInterval: 1000
    });


    const { data: joinedEventsChats } = invitedOnlyBackendApi.useQuery('get', '/chat/user/guest/{guestId}/', {
        params: {
            path: {
                guestId: user?.uid || ''
            }
        }
    }, {
        enabled: eventId === 'joined-events',
        refetchInterval: 1000
    });
    const filteredJoinedEventsChats = joinedEventsChats?.filter(chat => chat.hostId !== 'support-agent');

    return {
        chats: eventId === 'joined-events' ? filteredJoinedEventsChats : chats,
        isChatLoading
    }

}

export default useGetChats;