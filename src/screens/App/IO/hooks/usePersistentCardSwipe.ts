import { useState, useMemo, useCallback } from 'react';


type GuestUser = { uid?: string;[key: string]: any };

interface UsePersistentCardSwipeProps<T extends GuestUser> {
  cardsData: T[] | undefined;
  eventId: string | undefined;
}

interface UsePersistentCardSwipeReturn<T extends GuestUser> {
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleSuperInvite: () => void;
  cards: T[];
  hasCards: boolean;
  resetDeck: (eventId: string) => void;
}

const usePersistentCardSwipe = <T extends GuestUser>({
  cardsData,
  eventId,
}: UsePersistentCardSwipeProps<T>): UsePersistentCardSwipeReturn<T> => {
  const [dismissedCardsPerEvent, setDismissedCardsPerEvent] = useState<Record<string, Set<string>>>({});

  const currentEventCards = useMemo(() => {
    if (!eventId || !cardsData) {
      return [];
    }
    const dismissedIds = dismissedCardsPerEvent[eventId] || new Set<string>();
    return cardsData.filter((guest: T) => !dismissedIds.has(guest.uid || ''));
  }, [eventId, cardsData, dismissedCardsPerEvent]);

  const handleSwipe = useCallback(
    () => {
      if (!eventId || currentEventCards.length === 0) return;
      const swipedCardUid = currentEventCards[currentEventCards.length - 1]?.uid;
      if (!swipedCardUid) return;
      setDismissedCardsPerEvent(prev => {
        const currentDismissed = prev[eventId] || new Set<string>();
        const newDismissed = new Set<string>(currentDismissed);
        newDismissed.add(swipedCardUid);
        return {
          ...prev,
          [eventId]: newDismissed,
        };
      });
    },
    [eventId, currentEventCards],
  );

  const handleSwipeLeft = useCallback(() => handleSwipe(), [handleSwipe]);
  const handleSwipeRight = useCallback(() => handleSwipe(), [handleSwipe]);
  const handleSuperInvite = useCallback(() => handleSwipe(), [handleSwipe]);

  const resetDeck = useCallback((eventIdToReset: string) => {
    setDismissedCardsPerEvent(prev => {
      const newState = { ...prev };
      delete newState[eventIdToReset];
      return newState;
    });
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

export default usePersistentCardSwipe;
