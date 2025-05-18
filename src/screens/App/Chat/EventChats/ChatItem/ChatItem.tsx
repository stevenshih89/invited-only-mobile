
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { formatDistance } from 'date-fns';
import React, { StrictMode } from 'react';
import { components } from '@invited-only/invited-only-api';
import useGetEvent from '../hooks/useGetEvent';
import * as S from './ChatItem.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import IOImage from 'src/assets/images/app/IO.png'

import { useAuthStore } from 'src/store/authStore';
import invitedOnlyBackendApi from 'src/api/backend-api';

interface ChatItemProps {
    chat: components['schemas']['Chat'];
    isJoinedEvent: boolean;
    isSupportChat?: boolean;
}

export const ChatItem = ({ chat, isJoinedEvent, isSupportChat }: ChatItemProps) => {
    const navigation = useAppNavigation();
    const { data: event, isLoading: isEventLoading } = useGetEvent(chat?.eventId || '');
    const { userMetadata } = useAuthStore.getState();
    const { mutate: updateChatSeen } = invitedOnlyBackendApi.useMutation('patch', '/chat/{chatId}/seen')
    const userLastSeen = chat.userLastSeen?.some((user) => user.userId === userMetadata.uid);

    return (
        <StrictMode>
            <TouchableOpacity onPress={() => {
                updateChatSeen({ params: { path: { chatId: chat.id || '' } }, body: { userId: userMetadata.uid || '' } })
                navigation.navigate('/chat/chat-window', { chat, isJoinedEvent, isSupportChat: isSupportChat || false });
            }}>
                <S.Container isSupportChat={isSupportChat}>
                    <S.NarrowLeftContainer>
                        <S.AvatarContainer>
                            {isSupportChat ? <S.AvatarImage source={IOImage} /> : <S.AvatarImage source={{ uri: isJoinedEvent ? chat.hostImageUrl : chat.guestImageUrl }} />}
                        </S.AvatarContainer>
                    </S.NarrowLeftContainer>
                    <S.WideRightContainer>
                        <S.InnerRowContainer>
                            <S.StatusBadge>
                                {!isSupportChat ? (
                                    <>
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
                                                {!userLastSeen ? 'New Connection' : 'Invite Connection'}
                                            </S.StatusText>
                                        )}
                                    </>
                                ) : (
                                    null
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
                        {!isSupportChat ? <S.InnerRowContainer>
                            <S.LastMessageText>
                                {typeof chat.lastMessage === 'object' && chat.lastMessage !== null
                                    ? (chat.lastMessage as any).content
                                    : chat.lastMessage}
                            </S.LastMessageText>
                        </S.InnerRowContainer> : <S.InnerRowContainer>
                            <S.LastMessageText>
                                Need Help? Chat with us now
                            </S.LastMessageText>
                        </S.InnerRowContainer>}
                    </S.WideRightContainer>
                </S.Container>
            </TouchableOpacity>
        </StrictMode>
    );
};