import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { formatDistance } from 'date-fns';
import { StrictMode } from 'react';
import { components } from '@invited-only/invited-only-api';
import useGetEvent from '../hooks/useGetEvent';
import * as S from './ChatItem.style';
import { useAppNavigation } from 'hooks/useAppNavigation';

import { useAuthStore } from 'src/store/authStore';
import invitedOnlyBackendApi from 'src/api/backend-api';

interface ChatItemProps {
    chat: components['schemas']['Chat'];
    isJoinedEvent: boolean;
}

export const ChatItem = ({ chat, isJoinedEvent }: ChatItemProps) => {
    const navigation = useAppNavigation();
    const { data: event, isLoading: isEventLoading } = useGetEvent(chat?.eventId || '');
    const { userMetadata } = useAuthStore.getState();
    const { mutate: updateChatSeen } = invitedOnlyBackendApi.useMutation('patch', '/chat/{chatId}/seen')
    const userLastSeen = chat.userLastSeen?.some((user) => user.userId === userMetadata.uid);

    return (
        <StrictMode>
            <TouchableOpacity onPress={() => {
                updateChatSeen({ params: { path: { chatId: chat.id || '' } }, body: { userId: userMetadata.uid || '' } })
                navigation.navigate('/chat/chat-window', { chat, isJoinedEvent });
            }}>
                <S.Container>
                    <S.NarrowLeftContainer>
                        <S.AvatarContainer>
                            <S.AvatarImage source={{ uri: isJoinedEvent ? chat.hostImageUrl : chat.guestImageUrl }} />
                        </S.AvatarContainer>
                    </S.NarrowLeftContainer>
                    <S.WideRightContainer>
                        <S.InnerRowContainer>
                            <S.StatusBadge>
                                {isJoinedEvent ? (
                                    <S.EventBadgeContainer>
                                        <S.SmallEventAvatarContainer>
                                            {isEventLoading ? <ActivityIndicator size="small" color="#fff" /> : <S.SmallEventAvatarImage source={{ uri: event?.photos?.[0]?.image || '' }} />}
                                        </S.SmallEventAvatarContainer>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={S.SmallEventNameText}>
                                            {event?.name || 'Event Name That Is Long And Will Truncate'}
                                        </Text>
                                    </S.EventBadgeContainer>
                                ) : (
                                    <S.StatusText>
                                        {!userLastSeen ? 'New Connection' : 'Invite Match'}
                                    </S.StatusText>
                                )}
                            </S.StatusBadge>
                            <S.LastMessageTimestamp>{chat.lastMessageTimestamp && formatDistance(new Date(chat.lastMessageTimestamp), new Date(), { addSuffix: true })}</S.LastMessageTimestamp>
                        </S.InnerRowContainer>
                        <S.InnerRowContainer>
                            <S.UnreadBadgeAndNameContainer>
                                <S.NameText>{isJoinedEvent ? chat.hostName : chat.guestName}</S.NameText>
                                {chat.unreadMessages && chat.unreadMessages > 0 ? (
                                    <S.UnreadBadge>
                                        <S.UnreadCount>
                                            {chat.unreadMessages}
                                        </S.UnreadCount>
                                    </S.UnreadBadge>
                                ) : null}
                            </S.UnreadBadgeAndNameContainer>
                        </S.InnerRowContainer>
                        <S.InnerRowContainer>
                            <S.LastMessageText>
                                {typeof chat.lastMessage === 'object' && chat.lastMessage !== null
                                    ? (chat.lastMessage as any).content
                                    : chat.lastMessage}
                            </S.LastMessageText>
                        </S.InnerRowContainer>
                    </S.WideRightContainer>
                </S.Container>
            </TouchableOpacity>
        </StrictMode>
    );
};