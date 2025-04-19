import invitedOnlyBackendApi from 'src/api/backend-api';
import CreateEventButton from '../IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';
import * as S from './Chat.style';
import auth from '@react-native-firebase/auth';

import AppLoader from '../AppLoader/AppLoader';
import { EmptyStateChatFallback } from './Components/EmtryStateChatFallback';
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
  console.log(events);
  if (events?.length === 0) {
    return (
      <S.ChatContainer>
        <EmptyStateChatFallback emptyType="no-events" />
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
