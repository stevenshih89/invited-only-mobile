import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { EmptyStateChatFallback } from "../Components/EmtryStateChatFallback";
import * as S from './EventChats.style';
import { ChatItem } from "./ChatItem/ChatItem";
import { components } from "src/api/v1";
import EventsDropdown from "src/screens/App/Components/EventsDropdown/EventsDropdown";
import AppLoader from "screens/App/AppLoader/AppLoader";
import invitedOnlyBackendApi from "src/api/backend-api";

interface EventChatsProps {
    events: components['schemas']['EventData'][];
}

const EventChats = ({ events }: EventChatsProps) => {
    const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);
    const { data: chats, isLoading: isChatLoading, refetch } = invitedOnlyBackendApi.useQuery('get', '/chat/event/{eventId}', {
        params: {
            path: {
                eventId: selectedEvent.uid
            }
        },
    });
    useFocusEffect(useCallback(() => {
        refetch();
    }, [chats]));
    return (
        <S.Container>
            <EventsDropdown events={events} onEventSelect={setSelectedEvent} selectedEvent={selectedEvent} />
            {isChatLoading ? (
                <AppLoader />
            ) : chats?.length && chats?.length > 0 ? (
                <S.ChatsContainer
                    data={chats || []}
                    renderItem={({ item }: { item: components['schemas']['Chat'] }) => <ChatItem chat={item} />}
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