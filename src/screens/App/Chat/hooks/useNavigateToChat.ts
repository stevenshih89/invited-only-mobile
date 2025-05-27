
import { useAppNavigation } from "hooks/useAppNavigation";
import useGetUserById from "hooks/useGetUserById";

interface UseNavigateToChatProps {
    eventId: string;
    hostId: string;
    guestId: string;
    asGuest: boolean;
    isEnabled?: boolean;
}

const useNavigateToChat = ({ eventId, hostId, guestId, asGuest }: UseNavigateToChatProps) => {

    const { data: host } = useGetUserById(hostId);
    const { data: guest } = useGetUserById(guestId);

    const navigation = useAppNavigation();
    const navigateToChat = () => {
        navigation.navigate('/chat/chat-window', { chat: { eventId, hostId, guestId, hostName: host?.name, guestName: guest?.name, hostImageUrl: host?.photos?.[0]?.image ?? '', guestImageUrl: guest?.photos?.[0]?.image ?? '' }, isJoinedEvent: asGuest ? true : false });
    }

    return { navigateToChat };
};

export default useNavigateToChat;