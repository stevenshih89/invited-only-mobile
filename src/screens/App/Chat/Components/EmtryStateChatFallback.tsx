import CreateEventButton from 'screens/App/IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';
import * as S from './EmtryStateChatFallback.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
interface EmptyStateChatFallbackProps {
    emptyType: 'no-chats' | 'no-events';
}

export const EmptyStateChatFallback = ({ emptyType }: EmptyStateChatFallbackProps) => {
    const title = emptyType === 'no-chats' ? 'No chats' : 'No events';
    const description = emptyType === 'no-chats' ? 'Chats for your events and connections will be here! Just create invite people to your events.' : 'Create an event to start chatting with your connections.';
    const navigation = useAppNavigation();
    return (
        <S.Container>
            <S.EmptyStateTitle>{title || 'No chats'}</S.EmptyStateTitle>
            <S.EmptyStateDescription>
                {description || 'Chats for your events and connections will be here! Just create an event to start.'}
            </S.EmptyStateDescription>
            {emptyType === 'no-events' && <CreateEventButton />}
            {emptyType === 'no-chats' && <S.NavigateToInviteButton onPress={() => {
                navigation.navigate('/io');
            }}>
                <S.NavigateToInviteButtonText>Invite</S.NavigateToInviteButtonText>
            </S.NavigateToInviteButton>}

        </S.Container>
    );
};