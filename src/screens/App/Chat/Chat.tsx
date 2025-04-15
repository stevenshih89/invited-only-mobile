import invitedOnlyBackendApi from 'src/api/backend-api';
import CreateEventButton from '../IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';
import * as S from './Chat.style';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';

const Chat = () => {

  const {data: chats} = invitedOnlyBackendApi.useQuery('get', '/chat/{userId}',{
    params: {
      path: {
        userId: auth().currentUser?.uid || '',
      },
    },
  });
  console.log(chats);
  
  return (
    <S.ChatContainer>
      <S.EmptyStateContainer>
        <S.EmptyStateTitle>No chats</S.EmptyStateTitle>
        <S.EmptyStateDescription>
          {chats?.map((chat) => (
            <Text key={chat.guestId}>{chat.guestId}</Text>
          ))}
        </S.EmptyStateDescription>
      </S.EmptyStateContainer>
      <CreateEventButton />
    </S.ChatContainer>
  );
};

export default Chat;
