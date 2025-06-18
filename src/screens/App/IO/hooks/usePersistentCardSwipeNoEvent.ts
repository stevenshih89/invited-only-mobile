import { useState, useMemo, useCallback } from 'react';


type GuestUser = { uid?: string;[key: string]: any };

interface UsePersistentCardSwipeProps<T extends GuestUser> {
    cardsData: T[] | undefined;
}

interface UsePersistentCardSwipeReturn<T extends GuestUser> {
    handleSwipeLeft: () => void;
    handleSwipeRight: () => void;
    handleSuperInvite: () => void;
    cards: T[];
    hasCards: boolean;
    resetDeck: () => void;
}

const usePersistentCardSwipeNoEvent = <T extends GuestUser>({
    cardsData,
}: UsePersistentCardSwipeProps<T>): UsePersistentCardSwipeReturn<T> => {
    const [dismissedCards, setDismissedCards] = useState<Set<string>>(new Set());

    const currentEventCards = useMemo(() => {
        if (!cardsData) {
            return [];
        }
        const dismissedIds = dismissedCards || new Set<string>();
        return cardsData.filter((guest: T) => !dismissedIds.has(guest.uid || ''));
    }, [cardsData, dismissedCards]);

    const handleSwipe = useCallback(
        () => {
            if (currentEventCards.length === 0) return;

            const swipedCardUid = currentEventCards[currentEventCards.length - 1]?.uid;
            if (!swipedCardUid) return;
            setDismissedCards(prev => {
                const newDismissed = new Set<string>(prev);
                newDismissed.add(swipedCardUid);
                return newDismissed;
            });
        },
        [currentEventCards],
    );

    const handleSwipeLeft = useCallback(() => handleSwipe(), [handleSwipe]);
    const handleSwipeRight = useCallback(() => handleSwipe(), [handleSwipe]);
    const handleSuperInvite = useCallback(() => handleSwipe(), [handleSwipe]);

    const resetDeck = useCallback(() => {
        setDismissedCards(new Set());
    }, []);

    const hasCards = currentEventCards.length > 0;

    return {
        cards: currentEventCards,
        hasCards,
        handleSwipeLeft,
        handleSwipeRight,
        handleSuperInvite,
        resetDeck,
    };
};

export default usePersistentCardSwipeNoEvent;
