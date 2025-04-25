import AppLoader from '../AppLoader/AppLoader';
import * as S from './Chat.style';
import { EmptyStateChatFallback } from './Components/EmtryStateChatFallback';
import EventChats from './EventChats/EventChats';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
const Chat = () => {
  const { userMetadata } = useAuthStore.getState();
  const { data: events, isLoading: isEventsLoading } = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
    params: {
      path: {
        hostId: userMetadata.uid || '',
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
        <ModalLockedAccount />
      </S.ChatContainer>
    );
  } else if (events) {
    return <EventChats events={events} />;
  }
};

export default Chat;
