import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetEventRequests } from './hooks/useGetEventRequests';
import * as S from './EventRequests.style';
import { RequestCard } from './RequestCard/RequestCard';
import AppLoader from 'screens/App/AppLoader/AppLoader';

const EventRequests = () => {
  const { pendingSwipeRequests, isLoading } = useGetEventRequests();
  const inset = useSafeAreaInsets();

  if (isLoading) {
    return <S.Container style={{ paddingTop: inset.top }}>
      <AppLoader />
    </S.Container>;
  }

  return <S.Container style={{ paddingTop: inset.top }}>
    <FlatList
      numColumns={2}
      data={pendingSwipeRequests}
      renderItem={({ item }) => <RequestCard guestReuestUid={item.guestId} isSuperJoinRequest={false} connectionDetails={item} />}
      keyExtractor={(item) => item.id || ''}
    />
  </S.Container>;
};

export default EventRequests;
