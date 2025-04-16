import { components } from "src/api/v1";
import * as S from './EventChats.style';
import EventsDropdown from "src/screens/App/Components/EventsDropdown/EventsDropdown";
import { useState } from "react";
import AppLoader from "screens/App/AppLoader/AppLoader";
import { ChatItem } from "./ChatItem/ChatItem";
import invitedOnlyBackendApi from "src/api/backend-api";

interface EventChatsProps {
    events: components['schemas']['EventData'][];
}

const EventChats = ({ events }: EventChatsProps) => {
    const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);
    const { data: chats, isLoading: isChatLoading } = invitedOnlyBackendApi.useQuery('get', '/chat/event/{eventId}', {
        params: {
            path: {
                eventId: selectedEvent.uid
            }
        },
    });

    return (
        <S.Container>
            <EventsDropdown events={events} onEventSelect={setSelectedEvent} selectedEvent={selectedEvent} />
            {isChatLoading ? (
                <AppLoader />
            ) : (
                <S.ChatsContainer
                    data={chats || []}
                    renderItem={({ item }: { item: components['schemas']['Chat'] }) => <ChatItem chat={item} />}
                    keyExtractor={(item: components['schemas']['Chat']) => `${item.eventId}_${item.guestId}_${item.hostId}`}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            )}
        </S.Container>
    );
};

export default EventChats;  