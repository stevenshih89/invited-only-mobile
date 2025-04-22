import { TouchableOpacity } from 'react-native';
import { formatDistance } from 'date-fns';
import { StrictMode } from 'react';
import * as S from './ChatItem.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { components } from 'src/api/v1';
import { useAuthStore } from 'src/store/authStore';

interface ChatItemProps {
    chat: components['schemas']['Chat'];
}

export const ChatItem = ({ chat }: ChatItemProps) => {
    const navigation = useAppNavigation();
    const { userMetadata } = useAuthStore.getState();
    const userLastSeen = chat.userLastSeen?.some((user) => user.userId === userMetadata.uid);

    return (
        <StrictMode>
            <TouchableOpacity onPress={() => {
                navigation.navigate('/chat/chat-window', { chat });
            }}>
                <S.Container>
                    <S.NarrowLeftContainer>
                        <S.AvatarContainer>
                            <S.AvatarImage source={{ uri: chat.guestImageUrl }} />
                        </S.AvatarContainer>
                    </S.NarrowLeftContainer>
                    <S.WideRightContainer>
                        <S.InnerRowContainer>
                            <S.StatusBadge>
                                <S.StatusText>
                                    {!userLastSeen ? 'New Connection' : 'Invite Match'}
                                </S.StatusText>
                            </S.StatusBadge>
                            <S.LastMessageTimestamp>{chat.lastMessageTimestamp && formatDistance(new Date(chat.lastMessageTimestamp), new Date(), { addSuffix: true })}</S.LastMessageTimestamp>
                        </S.InnerRowContainer>
                        <S.InnerRowContainer>
                            <S.UnreadBadgeAndNameContainer>
                                <S.NameText>{chat.guestName}</S.NameText>
                                {chat.unreadMessages && chat.unreadMessages > 0 ? ( // Use ternary
                                    <S.UnreadBadge>
                                        <S.UnreadCount>
                                            {chat.unreadMessages}
                                        </S.UnreadCount>
                                    </S.UnreadBadge>
                                ) : null}
                            </S.UnreadBadgeAndNameContainer>
                        </S.InnerRowContainer>
                        <S.InnerRowContainer>
                            <S.LastMessageText>{chat.lastMessage}</S.LastMessageText>
                        </S.InnerRowContainer>
                    </S.WideRightContainer>
                </S.Container>
            </TouchableOpacity>
        </StrictMode>
    );
};