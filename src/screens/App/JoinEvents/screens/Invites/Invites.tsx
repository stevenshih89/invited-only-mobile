import { FC } from 'react';
import { FlatList } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import InviteCard from './Components/InviteCard/InviteCard';
import * as S from './Invites.style';
import useGetInvites from './hooks/useGetInvites';
import { whiteColor } from 'constants/colors';
import JoinedEventsEmptyFallback from 'screens/App/MyEvents/Components/JoinedEventsEmptyFallback/JoinedEventsEmptyFallback';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';


const Invites: FC = () => {

  const { data: pendingInvitesEvents, isLoading, updateInvitesData } = useGetInvites();

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
              <InviteCard event={item} updateInvitesData={updateInvitesData} />
            </S.InviteCardWrapper>
          )}
        />
      }
      <ModalLockedAccount />

    </S.Container>
  );
};

export default Invites;
