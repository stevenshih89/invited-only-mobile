import * as S from './EmtryStateChatFallback.style';
import CreateEventButton from 'screens/App/IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';

export const EmptyStateChatFallback = () => {
  return (
    <S.Container>
      <S.EmptyStateTitle>{'No chats'}</S.EmptyStateTitle>
      <S.EmptyStateDescription>
        {'Chats for your events and connections will be here! Just create an event to start.'}
      </S.EmptyStateDescription>
      <CreateEventButton />
    </S.Container>
  );
};
