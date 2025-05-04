import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetEventRequests } from './hooks/useGetEventRequests';
import * as S from './EventRequests.style';
import { RequestCard } from './RequestCard/RequestCard';
import { EventRequestEmptyFallback } from './EventRequestEmptyFallback/EventRequestEmptyFallback';
import AppLoader from 'screens/App/AppLoader/AppLoader';


interface EventRequestsProps {
  eventId: string;
}

const EventRequests = ({ eventId }: EventRequestsProps) => {
  const { pendingSwipeRequests, isLoading, updateEventAttendee } = useGetEventRequests(eventId);
  const inset = useSafeAreaInsets();

  if (isLoading) {
    return <S.Container style={{ paddingTop: inset.top }}>
      <AppLoader />
    </S.Container>;
  }

  if (pendingSwipeRequests.length === 0) {
    return <EventRequestEmptyFallback />;
  }


  return <S.Container >
    <FlatList
      numColumns={2}
      data={pendingSwipeRequests}
      renderItem={({ item }) => <RequestCard guestReuestUid={item.guestId} isSuperJoinRequest={false} connectionDetails={item} updateEventAttendee={updateEventAttendee} />}
      keyExtractor={(item) => item.id || ''}
    />
  </S.Container>;
};

export default EventRequests;
