import { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import AppLoader from '../AppLoader/AppLoader';
import * as S from './Events.style';
// Your existing list component
// The placeholder
import EventsHeader from './Components/EventsHeader/EventsHeader';
import NewEventsScreen from './NewEventsScreen';
import MyEventList from './Components/MyEventList/MyEventList';
import JoinedEventsList from './Components/JoinedEventsList/JoinedEventsList';
import useRequestedEvents from './Components/JoinedEventsList/hooks/useRequestedEvents';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import { useAuthStore } from 'src/store/authStore';
import useUser from 'hooks/user/useUser';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalEventInfo from 'components/Modal/ModalEventInfo/ModalEventInfo';
import { BackendApiContext } from 'contexts/BackendApiContex';

type EventInfoName = 'myEvents' | 'joinedEvents';

const Events = () => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { user } = useUser();
  const isLocked = !user?.accountReviewed;
  const { userMetadata } = useAuthStore.getState();
  const [isVisibleModalEventInfo, setIsVisibleModalEventInfo] = useState(false);
  const [selectedEventInfoName, setSelectedEventInfoName] = useState<EventInfoName | null>(null);

  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
    MyEvents: false,
    JoinedEvents: false,
  });

  const { data: joinedEvents, isLoading: isLoadingJoinedEvents } = useRequestedEvents();


  const { data: myEvents, isLoading: isLoadingMyEvents } = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
    params: {
      path: {
        hostId: userMetadata.uid || '',
      },
    },
  });

  const handlePressTooltip = (name: EventInfoName) => {
    setSelectedEventInfoName(name);
    setIsVisibleModalEventInfo(true);
  };

  const eventInfoData: Record<EventInfoName, { title: string; description: string }> = {
    myEvents: {
      title: 'Your Events',
      description: `Events you’ve created or are hosting. Manage invitations, track guests, and stay in control of your table.`,
    },
    joinedEvents: {
      title: `Events You’re Invited To`,
      description: `Events where you’ve been invited, matched, or requested to join. View details, respond to invites, and plan your night.`,
    },
  };

  if (isLoadingMyEvents || isLoadingJoinedEvents) {
    return (
      <DefaultBackground>
        <AppLoader />
      </DefaultBackground>
    );
  }

  return (
    <S.ScreenContainer>
      <EventsHeader />
      {isLocked ? (
        <NewEventsScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 24,
          }}>
          <MyEventList
            toggle={() => setIsOpen({ ...isOpen, MyEvents: !isOpen['MyEvents'] })}
            title="Your Events"
            events={myEvents || []}
            isOpen={isOpen['MyEvents']}
            onPressTooltip={() => handlePressTooltip('myEvents')}
          />
          <JoinedEventsList
            toggle={() => setIsOpen({ ...isOpen, JoinedEvents: !isOpen['JoinedEvents'] })}
            title="Events You’re Invited To"
            events={joinedEvents || []}
            isOpen={isOpen['JoinedEvents']}
            onPressTooltip={() => handlePressTooltip('joinedEvents')}
          />
        </ScrollView>
      )}
      <ModalLockedAccount />
      <ModalEventInfo
        isVisible={isVisibleModalEventInfo}
        onClose={() => setIsVisibleModalEventInfo(false)}
        closeText="Got it"
        title={eventInfoData[selectedEventInfoName ?? 'myEvents'].title}
        description={eventInfoData[selectedEventInfoName ?? 'myEvents'].description}
      />
    </S.ScreenContainer>
  );
};

export default Events;
