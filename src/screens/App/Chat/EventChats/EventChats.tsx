import { useState } from "react";
import { components } from "@invited-only/invited-only-api";
import { EmptyStateChatFallback } from "../Components/EmtryStateChatFallback";
import * as S from './EventChats.style';
import { ChatItem } from "./ChatItem/ChatItem";
import useGetChats from "./hooks/useGetAllChats";
import EventsDropdown from "src/screens/App/Components/EventsDropdown/EventsDropdown";
import AppLoader from "screens/App/AppLoader/AppLoader";

interface EventChatsProps {
    events: components['schemas']['EventData'][];
}

const EventChats = ({ events }: EventChatsProps) => {
    const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);
    const { chats, isChatLoading } = useGetChats({ eventId: selectedEvent.uid });

    return (
        <S.Container>
            <EventsDropdown events={events} onEventSelect={setSelectedEvent} selectedEvent={selectedEvent} />
            {isChatLoading ? (
                <AppLoader />
            ) : chats?.length && chats?.length > 0 ? (
                <S.ChatsContainer
                    data={chats || []}
                    renderItem={({ item }: { item: components['schemas']['Chat'] }) => <ChatItem chat={item} isJoinedEvent={selectedEvent.uid === 'joined-events'} />}
                    keyExtractor={(item: components['schemas']['Chat']) => item.id}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            ) : (
                <EmptyStateChatFallback emptyType="no-chats" />
            )}
        </S.Container>
    );
};

export default EventChats;