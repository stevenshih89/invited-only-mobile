import { useState } from "react";
import { components } from "@invited-only/invited-only-api";
import { EmptyStateChatFallback } from "../Components/EmtryStateChatFallback";
import * as S from './EventChats.style';
import { ChatItem } from "./ChatItem/ChatItem";
import useGetChats from "./hooks/useGetAllChats";
import EventsDropdown from "src/screens/App/Components/EventsDropdown/EventsDropdown";
import AppLoader from "screens/App/AppLoader/AppLoader";
import useGetUserById from "hooks/useGetUserById";
import { useAuthStore } from "src/store/authStore";
import useEventAttendes from "screens/App/IO/hooks/useEventAttendes";
import useUser from "hooks/user/useUser";

interface EventChatsProps {
    events: components['schemas']['EventData'][];
}

const EventChats = ({ events }: EventChatsProps) => {

    const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);
    const { chats, isChatLoading } = useGetChats({ eventId: selectedEvent.uid });
    const { userMetadata } = useAuthStore.getState();
    const { data: user } = useGetUserById(userMetadata.uid);
    const { attendingGuests } = useEventAttendes(selectedEvent.uid);
    const isLocked = user?.uid && !user?.accountReviewed;
    return (
        <S.Container>
            {!isLocked && <EventsDropdown events={events} onEventSelect={setSelectedEvent} selectedEvent={selectedEvent} attendingGuestsCount={attendingGuests?.length ?? 0} />}
            {selectedEvent.uid !== 'joined-events' && <ChatItem chat={{
                eventId: `support-${userMetadata.uid}`,
                hostId: 'support-agent',
                guestId: userMetadata.uid,
                guestImageUrl: user?.photos?.[0]?.image ?? '',
                hostName: 'Support Team',
                guestName: user?.name,
            }} isJoinedEvent={true} isSupportChat={true} />}
            {isChatLoading ? (
                <AppLoader />
            ) : chats?.length && chats?.length > 0 ? (
                <S.ChatsContainer
                    data={chats || []}
                    renderItem={({ item }: { item: components['schemas']['Chat'] }) => <ChatItem chat={item} isJoinedEvent={selectedEvent.uid === 'joined-events'} />}
                    keyExtractor={(item: components['schemas']['Chat']) => item.id}
                    contentContainerStyle={{ flexGrow: 1, }}
                />
            ) : (
                <EmptyStateChatFallback emptyType="no-chats" />
            )}
        </S.Container>
    );
};

export default EventChats;