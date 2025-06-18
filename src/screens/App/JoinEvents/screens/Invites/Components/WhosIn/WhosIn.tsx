import { Text } from 'react-native';

import { components } from '@invited-only/invited-only-api';
import useUserSwipe from './hooks/useUserSwipe';
import * as S from './WhosIn.style';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import { GuestCard } from 'screens/App/IO/components/InviteGuestsEvent/Components/GuestCard/GuestCard';
import useGetHighRankUsers from 'screens/App/IO/hooks/useGetHighRankUsers';
import usePersistentCardSwipeNoEvent from 'screens/App/IO/hooks/usePersistentCardSwipeNoEvent';
import useUser from 'hooks/user/useUser';

const WhosIn = () => {
    const { user } = useUser();
    const { swipeUser } = useUserSwipe();
    const { data: highRankUsers, isLoading: isLoadingHighRankUsers, hasNextPage, fetchNextPage, status } = useGetHighRankUsers({ isLocked: false });
    const {
        cards,
        hasCards,
        handleSwipeLeft,
        handleSwipeRight,
        handleSuperInvite,
        resetDeck,
    } = usePersistentCardSwipeNoEvent<components['schemas']['User']>({
        cardsData: highRankUsers
    });
    const swipeLeft = user?.dailySwipes?.count || 0;

    if (!hasCards && hasNextPage && status === 'success') {
        resetDeck();
        fetchNextPage();
    }

    if (isLoadingHighRankUsers) {
        return <AppLoader />;
    }
    if (!cards || cards.length === 0) {
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
                {cards.map((guest, index) => (
                    <GuestCard
                        overrideShowDots={true}
                        raiseShuffle={true}
                        key={guest.uid}
                        guest={guest}
                        index={index}
                        isTopCard={index === cards.length - 1}
                        onReject={() => {
                            swipeUser(guest.uid || '');
                            swipeLeft > 0 && handleSwipeLeft()
                        }}
                        onSuperInvite={() => {
                            swipeUser(guest.uid || '');
                            swipeLeft > 0 && handleSuperInvite()
                        }}
                        onInvite={() => {
                            swipeUser(guest.uid || '');
                            swipeLeft > 0 && handleSwipeRight()
                        }}
                        topIndex={cards.length - 1}
                    />
                ))}
            </S.Body>
        </S.Container>
    );
}

export default WhosIn;