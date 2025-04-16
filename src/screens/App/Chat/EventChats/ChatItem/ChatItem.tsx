import { components } from 'src/api/v1';
import * as S from './ChatItem.style';
import { TouchableOpacity } from 'react-native';
import { useAppNavigation } from 'hooks/useAppNavigation';


interface ChatItemProps {
    chat: components['schemas']['Chat'];
}

export const ChatItem = ({ chat }: ChatItemProps) => {
    const navigation = useAppNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('/chat/chat-window', { chat });
        }}>
            <S.Container>
                <S.AvatarContainer>
                    <S.AvatarImage source={{ uri: chat.guestImageUrl }} />
                </S.AvatarContainer>
                <S.ContentContainer>
                    <S.HeaderContainer>
                        <S.StatusBadge>
                            <S.StatusText>New Connection</S.StatusText>
                        </S.StatusBadge>
                        <S.TimeText>2 hours ago</S.TimeText>
                    </S.HeaderContainer>
                    <S.TextContainer>
                        <S.NameContainer>
                            <S.NameText>{chat.guestName}</S.NameText>
                            <S.UnreadBadge>
                                <S.UnreadCount>3</S.UnreadCount>
                            </S.UnreadBadge>
                        </S.NameContainer>
                        <S.MessageText>
                            Hi! I'm interested in your event. Could you share more details?
                        </S.MessageText>
                    </S.TextContainer>
                </S.ContentContainer>
            </S.Container>
        </TouchableOpacity>
    );
};  