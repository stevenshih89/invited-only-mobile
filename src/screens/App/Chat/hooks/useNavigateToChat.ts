
import { useEffect, useState } from "react";
import { components } from "@invited-only/invited-only-api";
import useGetChats from "../EventChats/hooks/useGetAllChats";
import { useAppNavigation } from "hooks/useAppNavigation";

interface UseNavigateToChatProps {
    eventId: string;
    hostId: string;
    guestId: string;
    asGuest: boolean;
    isEnabled?: boolean;
}

const useNavigateToChat = ({ eventId, hostId, guestId, asGuest, isEnabled = true }: UseNavigateToChatProps) => {
    const navigation = useAppNavigation();

    const { chats, isChatLoading } = useGetChats({ eventId, isEnabled });

    const [chat, setChat] = useState<components['schemas']['Chat'] | null>(null);
    useEffect(() => {
        const chat = chats?.find((chat) => chat.hostId === hostId && chat.guestId === guestId);
        setChat(chat || null);
    }, [chats]);
    const navigateToChat = () => {
        navigation.navigate('/chat/chat-window', { chat: chat || {}, isJoinedEvent: asGuest ? true : false });
    }

    return { navigateToChat, isChatLoading, isChatFound: !!chat };
};

export default useNavigateToChat;