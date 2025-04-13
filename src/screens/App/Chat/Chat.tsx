import CreateEventButton from '../IO/Components/IoHeader/Components/CreateEventButton/CreateEventButton';
import * as S from './Chat.style';
const Chat = () => {
  return (
    <S.ChatContainer>
      <S.EmptyStateContainer>
        <S.EmptyStateTitle>No chats</S.EmptyStateTitle>
        <S.EmptyStateDescription>
          Chats for your events and connections will be here! Just create an event to start.
        </S.EmptyStateDescription>
      </S.EmptyStateContainer>
      <CreateEventButton />
    </S.ChatContainer>
  );
};

export default Chat;
