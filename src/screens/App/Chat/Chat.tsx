import invitedOnlyBackendApi from 'src/api/backend-api';
import CreateEventButton from '../IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';
import * as S from './Chat.style';
import auth from '@react-native-firebase/auth';

import AppLoader from '../AppLoader/AppLoader';
import EventChats from './EventChats/EventChats';

const Chat = () => {
  const { data: events, isLoading: isEventsLoading } = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
    params: {
      path: {
        hostId: auth().currentUser?.uid || '',
      },
    },
  });

  if (isEventsLoading) {
    return <AppLoader />;
  }

  if (events?.length === 0) {
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
  }
  else if (events) {
    return (
      <EventChats events={events} />
    );
  }


};

export default Chat;
