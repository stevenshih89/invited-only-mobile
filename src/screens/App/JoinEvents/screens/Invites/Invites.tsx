import { FC } from 'react';
import { FlatList } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import InviteCard from './Components/InviteCard/InviteCard';
import * as S from './Invites.style';
import useGetInvites from './hooks/useGetInvites';
import { whiteColor } from 'constants/colors';
import JoinedEventsEmptyFallback from 'screens/App/MyEvents/Components/JoinedEventsEmptyFallback/JoinedEventsEmptyFallback';


const Invites: FC = () => {

  const { data: pendingInvitesEvents, isLoading, invalidateInvitedEvents } = useGetInvites();

  if (pendingInvitesEvents.length === 0) {
    return <JoinedEventsEmptyFallback />
  }

  return (
    <S.Container>
      {isLoading ? <ActivityIndicator size={'large'} color={whiteColor} /> :
        <FlatList
          data={pendingInvitesEvents}
          keyExtractor={item => item.uid}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={4}
          windowSize={5}
          initialNumToRender={4}
          renderItem={({ item }) => (
            <S.InviteCardWrapper key={item.uid}>
              <InviteCard event={item} invalidateInvitedEvents={invalidateInvitedEvents} />
            </S.InviteCardWrapper>
          )}
        />
      }
    </S.Container>
  );
};

export default Invites;
