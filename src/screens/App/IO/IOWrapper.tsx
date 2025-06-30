import {useState} from 'react';
import AppLoader from '../AppLoader/AppLoader';
import IO from './IO';
import useEventsDetails from './hooks/useEventsDetails';
import useGetHighRankUsers from './hooks/useGetHighRankUsers';
import * as S from './IOWrapper.styled';
import InviteGuestsEvent from './components/InviteGuestsEvent/InviteGuestsEvent';
import IoHeader from './components/IoHeader/IoHeader';
import useUser from 'hooks/user/useUser';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import {useFirstTimeShowStore} from 'src/store/firstTimeShowStore';
import ModalUpgradeSecondModal from 'components/Modal/ModalUpgradeSecondModal/ModalUpgradeSecondModal';
import ModalShareTable from 'components/Modal/ModalShareTable/ModalShareTable';

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
            </DefaultBackground>
        );
    }
    if (isLocked && isUnderReview) {
        return (
            <S.FakeContainer>
                <InviteGuestsEvent
                    isLockedProfile={true}
                    isScrollEnabled={true}
                    selectedEvent={events[0]}
                    cardsToShow={highRankUsers || []}
                    isLoading={false}
                    onSwipeLeft={() => {}}
                    onSwipeRight={() => {}}
                    onSuperInvite={() => {}}
                    allCards={highRankUsers || []}
                />
                <ModalLockedAccount />
            </S.FakeContainer>
        );
    }

    if (!isUnderReview && isLocked) {
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
                    onSwipeLeft={() => !isFakeSwipeShowed && handleFakeSwipe()}
                    onSwipeRight={() => !isFakeSwipeShowed && handleFakeSwipe()}
                    onSuperInvite={() => !isFakeSwipeShowed && handleFakeSwipe()}
                    allCards={highRankUsers || []}
                />
                <ModalUpgradeSecondModal open={isUpgradeModalShow || isFakeSwipeShowed} />
            </S.FakeContainer>
        );
    }

    if (!isLocked && !isUnderReview && events.length === 0) {
        return (
            <S.Container>
                <S.CardContainer>
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
                        selectedEvent={events[0]}
                        cardsToShow={highRankUsers || []}
                        isLoading={false}
                        onSwipeLeft={() => {}}
                        onSwipeRight={() => {}}
                        onSuperInvite={() => {}}
                        allCards={highRankUsers || []}
                    />
                </S.CardContainer>
                <ModalShareTable />
            </S.Container>
        );
    }

    return <IO events={events} />;
};
export default IOWrapper;
