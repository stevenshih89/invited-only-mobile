import {useState} from 'react';
import AppLoader from '../AppLoader/AppLoader';
import IO from './IO';
import EmptyStateView from './components/EmptyStateView/EmptyStateView';
import useEventsDetails from './hooks/useEventsDetails';
import useGetHighRankUsers from './hooks/useGetHighRankUsers';
import * as S from './IOWrapper.styled';
import InviteGuestsEvent from './components/InviteGuestsEvent/InviteGuestsEvent';
import IoHeader from './components/IoHeader/IoHeader';
import useUser from 'hooks/user/useUser';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalUpgradeAccount from 'components/Modal/ModalUpgradeAccount/ModalUpgradeAccount';
import {useFirstTimeShowStore} from 'src/store/firstTimeShowStore';
import ModalUpgradeSecondModal from 'components/Modal/ModalUpgradeSecondModal/ModalUpgradeSecondModal';

const IOWrapper = () => {

    const {events, isLoading} = useEventsDetails();

    const {user, isLoading: isLoadingUser} = useUser();
    const isLocked = user?.uid && !user?.accountPremium;
    const isUnderReview = user?.uid && !user?.accountReviewed;
    const {data: highRankUsers, isLoading: isLoadingHighRankUsers} = useGetHighRankUsers({isLocked});
    const {isFakeSwipeShowed} = useFirstTimeShowStore();
    const [isUpgradeModalShow, setIsUpgradeModalShow] = useState(false);

    const handleFakeSwipe = () => {
        setIsUpgradeModalShow(true);
    };

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
        {!isLocked && !isUnderReview ? (
          <EmptyStateView />
        ) : (
          <S.CardContainer>
            <InviteGuestsEvent
              isLockedProfile={true}
              selectedEvent={events[0]}
              cardsToShow={highRankUsers || []}
              isLoading={false}
              onSwipeLeft={() => { }}
              onSwipeRight={() => { }}
              onSuperInvite={() => { }}
              allCards={highRankUsers || []}
            />
          </S.CardContainer>
        )}
      </S.Container>
    );
  }


    if (!isUnderReview && isLocked && !isFakeSwipeShowed) {
        return (
            <S.FakeContainer>
                <IoHeader
                    events={[]}
                    selectedEvent={events[0]}
                    onEventSelect={() => {}}
                    onRequestPress={() => {}}
                    onDropdownChange={() => {}}
                    attendingGuests={[]}
                />
                <InviteGuestsEvent
                    isLockedProfile={true}
                    isScrollEnabled={true}
                    selectedEvent={events[0]}
                    cardsToShow={highRankUsers || []}
                    isLoading={false}
                    onSwipeLeft={handleFakeSwipe}
                    onSwipeRight={handleFakeSwipe}
                    onSuperInvite={handleFakeSwipe}
                    allCards={highRankUsers || []}
                />
                <ModalUpgradeSecondModal open={isUpgradeModalShow} />
            </S.FakeContainer>
        );
    }

    if (events.length === 0) {
        return (
            <S.Container>
                <ModalLockedAccount />
                <ModalUpgradeAccount />
                {!isLocked && !isUnderReview ? (
                    <EmptyStateView />
                ) : (
                    <S.CardContainer>
                        <InviteGuestsEvent
                            isLockedProfile={true}
                            selectedEvent={events[0]}
                            cardsToShow={highRankUsers || []}
                            isLoading={false}
                            onSwipeLeft={() => {}}
                            onSwipeRight={() => {}}
                            onSuperInvite={() => {}}
                            allCards={highRankUsers || []}
                        />
                    </S.CardContainer>
                )}
            </S.Container>
        );
    }

    return <IO events={events} />;
};
export default IOWrapper;
