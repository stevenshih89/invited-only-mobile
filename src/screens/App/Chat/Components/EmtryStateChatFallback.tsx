import * as S from './EmtryStateChatFallback.style';
import CreateEventButton from 'screens/App/IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';


interface EmptyStateChatFallbackProps {
  emptyType: 'no-chats' | 'no-events';
}

export const EmptyStateChatFallback = ({ emptyType }: EmptyStateChatFallbackProps) => {
  return (
    <S.Container>
      <S.EmptyStateTitle>{emptyType === 'no-chats' ? 'No Active Chats' : 'No events'}</S.EmptyStateTitle>
      <S.EmptyStateDescription>
        {emptyType === 'no-chats' ? 'Your chats with hosts and guests will be shown here once they begin' : 'Events for your connections will be here! Just create an event to start.'}
      </S.EmptyStateDescription>
      {emptyType !== 'no-chats' ? <CreateEventButton /> : null}
    </S.Container>
  );
};
