import * as S from './EmtryStateChatFallback.style';
import CreateEventButton from 'screens/App/IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';


interface EmptyStateChatFallbackProps {
  emptyType: 'no-chats' | 'no-events';
}

export const EmptyStateChatFallback = ({ emptyType }: EmptyStateChatFallbackProps) => {
  return (
    <S.Container>
      <S.EmptyStateTitle>{emptyType === 'no-chats' ? 'No chats' : 'No events'}</S.EmptyStateTitle>
      <S.EmptyStateDescription>
        {emptyType === 'no-chats' ? 'Chats for your events and connections will be here! Start inviting guests to your events.' : 'Events for your connections will be here! Just create an event to start.'}
      </S.EmptyStateDescription>
      {emptyType !== 'no-chats' ? <CreateEventButton /> : null}
    </S.Container>
  );
};
