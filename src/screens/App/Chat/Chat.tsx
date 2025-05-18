
import AppLoader from '../AppLoader/AppLoader';
import * as S from './Chat.style';
import { EmptyStateChatFallback } from './Components/EmtryStateChatFallback';
import EventChats from './EventChats/EventChats';
import { useUpdateActiveChatScreen } from './hooks/useUpdateActiveChatScreen';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';



const Chat = () => {
  const { userMetadata } = useAuthStore.getState();
  useUpdateActiveChatScreen();

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
  const chatEvents = [...(events ?? []), {
    uid: 'joined-events',
    name: 'Joined Events',
    priority: 0,
    createdAt: new Date().toISOString(),
  }]

  if (chatEvents?.length === 0) {
    return (
      <S.ChatContainer>
        <EmptyStateChatFallback emptyType="no-events" />
        <ModalLockedAccount />
      </S.ChatContainer>
    );
  } else if (chatEvents?.length > 0) {
    return (
      <S.ChatContainer>
        <EventChats events={chatEvents} />
        <ModalLockedAccount />
      </S.ChatContainer>
    );

  }
};

export default Chat;
