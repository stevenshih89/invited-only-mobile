import * as S from './NotificationEmptyFallback.style';
import CreateEventButton from 'src/screens/App/IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';

interface NotificationEmptyFallbackProps {
    isJoinedEvents: boolean;
}

const NotificationEmptyFallback = ({ isJoinedEvents }: NotificationEmptyFallbackProps) => {
    return (
        <S.Container>
            <S.EmptyStateContainer>
                <S.TitleText>No Notifications</S.TitleText>
                <S.SubtitleText>
                    {isJoinedEvents ? 'Notifications for events you&apos;ve joined will show up here! Connect with hosts to get started.' : 'Notifications for connections and events will show up here! Just create an event to start.'}
                </S.SubtitleText>
                {!isJoinedEvents && <CreateEventButton />}
            </S.EmptyStateContainer>
        </S.Container>
    )
}

export default NotificationEmptyFallback;