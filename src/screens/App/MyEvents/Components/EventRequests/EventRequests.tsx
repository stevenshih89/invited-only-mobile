import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { components } from '@invited-only/invited-only-api';
import { useState } from 'react';
import { useGetEventRequests } from './hooks/useGetEventRequests';
import * as S from './EventRequests.style';
import { RequestCard } from './RequestCard/RequestCard';
import { EventRequestEmptyFallback } from './EventRequestEmptyFallback/EventRequestEmptyFallback';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import { useAppNavigation } from 'hooks/useAppNavigation';
import NewConnectionModal from 'screens/App/IO/components/InviteGuestsEvent/Components/NewConnectionModal/NewConnectionModal';

interface EventRequestsProps {
  eventId: string;
}

const EventRequests = ({ eventId }: EventRequestsProps) => {
  const { pendingSwipeRequests, isLoading, updateEventAttendee } = useGetEventRequests(eventId);
  const navigation = useAppNavigation();
  const inset = useSafeAreaInsets();
  const [newConnectionModal, setNewConnectionModal] = useState<components['schemas']['User'] | null>(null);

  if (isLoading) {
    return <S.Container style={{ paddingTop: inset.top }}>
      <AppLoader />
    </S.Container>;
  }

  if (pendingSwipeRequests.length === 0 && newConnectionModal === null) {
    return <EventRequestEmptyFallback />;
  }

  return <S.Container >
    <FlatList
      numColumns={2}
      data={pendingSwipeRequests}
      renderItem={({ item }) => (
        <RequestCard
          guestReuestUid={item.guestId}
          isSuperJoinRequest={false}
          connectionDetails={item}
          updateEventAttendee={updateEventAttendee}
          setNewConnectionModal={setNewConnectionModal}
          onPress={() => {
            navigation.navigate('/user-profile-preview', {
              userUid: item.guestId,
            });
          }}
        />
      )}
      keyExtractor={(item) => item.id || ''}
    />
    <NewConnectionModal
      visible={!!newConnectionModal}
      onClose={() => setNewConnectionModal(null)}
      cardData={newConnectionModal}
      isEvent={false}
      eventId={eventId}
    />
  </S.Container>;
};

export default EventRequests;
