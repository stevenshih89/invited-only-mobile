
import { Text } from 'react-native';
import AppLoader from '../AppLoader/AppLoader';
import Card from '../Components/Card/Card';
import IO from './IO';
import EmptyStateView from './components/EmptyStateView/EmptyStateView';
import useEventsDetails from './hooks/useEventsDetails';
import useGetHighRankUsers from './hooks/useGetHighRankUsers';
import * as S from './IOWrapper.styled';
import InviteGuestsEvent from './components/InviteGuestsEvent/InviteGuestsEvent';
import useUser from 'hooks/user/useUser';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalUpgradeAccount from 'components/Modal/ModalUpgradeAccount/ModalUpgradeAccount';

const IOWrapper = () => {

  const { events, isLoading } = useEventsDetails();

  const { user, isLoading: isLoadingUser } = useUser();
  const isLocked = user?.uid && !user?.accountReviewed

  const { data: highRankUsers, isLoading: isLoadingHighRankUsers } = useGetHighRankUsers({ isLocked });



  if (isLoading || !events || isLoadingUser || isLoadingHighRankUsers) {
    return (
      <DefaultBackground>
        <AppLoader />
        <ModalLockedAccount />
        <ModalUpgradeAccount />
      </DefaultBackground>
    );
  }


  if (events.length === 0) {
    return (
      <S.Container>
        <ModalLockedAccount />
        <ModalUpgradeAccount />
        {!isLocked && <EmptyStateView />}
        {isLocked && <S.CardContainer>
          <InviteGuestsEvent
            selectedEvent={events[0]}
            cardsToShow={highRankUsers || []}
            isLoading={false}
            onSwipeLeft={() => { }}
            onSwipeRight={() => { }}
            onSuperInvite={() => { }}
            allCards={highRankUsers || []}
          />
        </S.CardContainer>}
      </S.Container>
    );
  }

  return <IO events={events} />;
};
export default IOWrapper;

