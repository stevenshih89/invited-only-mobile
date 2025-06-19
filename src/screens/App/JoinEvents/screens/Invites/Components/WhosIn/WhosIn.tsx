import { Text } from 'react-native';

import { components } from '@invited-only/invited-only-api';
import { addDays } from 'date-fns';
import useUserSwipe from './hooks/useUserSwipe';
import * as S from './WhosIn.style';
import WhosInActionButtons from './WhosInActionButtons/WhosInActionButtons';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import { GuestCard } from 'screens/App/IO/components/InviteGuestsEvent/Components/GuestCard/GuestCard';
import usePersistentCardSwipeNoEvent from 'screens/App/IO/hooks/usePersistentCardSwipeNoEvent';
import useUser from 'hooks/user/useUser';

import ModalOutOfSwipes from 'components/Modal/ModalOutOfSwipes/ModalOutOfSwipes';
import useGetHighRankUsersPagination from 'screens/App/IO/hooks/useGetHighRankUsersPagination';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import { useAppNavigation } from 'hooks/useAppNavigation';
import ModalWhisIn from 'components/Modal/ModalWhisIn/ModalWhisIn';

const WhosIn = () => {
    const { user, isLoading } = useUser();
    const navigation = useAppNavigation();
    const { swipeUser, swipeCount } = useUserSwipe({ initialSwipeCount: user?.dailySwipes?.count || 0 });
    const { data: highRankUsers, isLoading: isLoadingHighRankUsers, hasNextPage, fetchNextPage, status } = useGetHighRankUsersPagination({ lastDoc: user?.dailySwipes?.swipedUserId || undefined });
    const {
        cards,
        hasCards,
        handleSwipeLeft,
        handleSwipeRight,
        resetDeck,
    } = usePersistentCardSwipeNoEvent<components['schemas']['User']>({
        cardsData: highRankUsers || []
    });
    const swipeLeft = user?.accountPremium ? '∞' : swipeCount;

    if (!hasCards && hasNextPage && status === 'success') {
        resetDeck();
        fetchNextPage();
    }

    if (!cards || cards?.length === 0) {
        return <Text>No users to show</Text>;
    }

    return (
        <S.Container>
            <S.Header>
                <S.SwipesLeftContainer>
                    <S.SwipesLeftText>Swipes left</S.SwipesLeftText>
                    <S.SwipesLeftNumberContainer>
                        <S.SwipesLeftNumberText>{swipeLeft}</S.SwipesLeftNumberText>
                    </S.SwipesLeftNumberContainer>
                </S.SwipesLeftContainer>
            </S.Header>

            <S.Body>
                {isLoadingHighRankUsers || isLoading ? <AppLoader /> :
                    cards.map((guest, index) => {
                        return (
                            <GuestCard
                                nopeLabelOverride={'Reject'}
                                inviteLabelOverride={'Next'}
                                CardActionsComponent={WhosInActionButtons}
                                actionButtonsOverride={true}
                                overrideShowDots={true}
                                raiseShuffle={true}
                                key={guest.uid}
                                guest={guest}
                                index={index}
                                isTopCard={index === cards.length - 1}
                                onReject={() => {
                                    swipeUser(guest.uid || '');
                                    if (swipeLeft === '∞' || swipeLeft > 0) {
                                        handleSwipeLeft()
                                    }
                                }}
                                onSuperInvite={() => { }}
                                onInvite={() => {
                                    swipeUser(guest.uid || '');
                                    if (swipeLeft === '∞' || swipeLeft > 0) {
                                        handleSwipeRight()
                                    }
                                }}
                                topIndex={cards?.length - 1}
                            />
                        )
                    })
                }
            </S.Body>
            {!user?.accountPremium && swipeLeft === 0 && <ModalOutOfSwipes timeToUnlock={addDays(user?.dailySwipes?.lastUpdated || new Date(), 1)} />}
            <ModalLockedAccount />
            <ModalWhisIn />
        </S.Container>
    );
}

export default WhosIn;