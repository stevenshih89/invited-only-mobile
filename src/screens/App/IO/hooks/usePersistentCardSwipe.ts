import {useState, useMemo, useCallback} from 'react';

// Define Guest type or import if shared
type GuestUser = {uid: string; [key: string]: any}; // Basic structure, adjust if needed

interface UsePersistentCardSwipeProps<T extends GuestUser> {
  cardsData: T[] | undefined;
  eventId: string | undefined;
}

interface UsePersistentCardSwipeReturn<T extends GuestUser> {
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleSuperInvite: () => void;
  cards: T[]; // Derived list of remaining cards
  hasCards: boolean;
  resetDeck: (eventId: string) => void;
  // isLoading could potentially be added here too if needed
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
    return cardsData.filter((guest: T) => !dismissedIds.has(guest.uid));
  }, [eventId, cardsData, dismissedCardsPerEvent]);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right' | 'super') => {
      console.log('handleSwipe', direction);
      if (!eventId || currentEventCards.length === 0) return;

      const swipedCardUid = currentEventCards[currentEventCards.length - 1]?.uid;
      console.log('swipedCardUid', swipedCardUid);
      console.log('currentEventCards', currentEventCards);
      if (!swipedCardUid) return;
      console.log('swipedCardUid', swipedCardUid);
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

  const handleSwipeLeft = useCallback(() => handleSwipe('left'), [handleSwipe]);
  const handleSwipeRight = useCallback(() => handleSwipe('right'), [handleSwipe]);
  const handleSuperInvite = useCallback(() => handleSwipe('super'), [handleSwipe]);

  const resetDeck = useCallback((eventIdToReset: string) => {
    setDismissedCardsPerEvent(prev => {
      const newState = {...prev};
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
