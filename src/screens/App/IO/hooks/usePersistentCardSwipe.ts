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
  // isLoading could potentially be added here too if needed
}

const usePersistentCardSwipe = <T extends GuestUser>({
  cardsData,
  eventId,
}: UsePersistentCardSwipeProps<T>): UsePersistentCardSwipeReturn<T> => {
  // State for dismissed card UIDs, managed within the hook
  const [dismissedCardsPerEvent, setDismissedCardsPerEvent] = useState<Record<string, Set<string>>>({});

  // Memoize the derived list of cards to show for the current event
  const currentEventCards = useMemo(() => {
    if (!eventId || !cardsData) {
      return [];
    }
    const dismissedIds = dismissedCardsPerEvent[eventId] || new Set<string>();
    return cardsData.filter((guest: T) => !dismissedIds.has(guest.uid));
  }, [eventId, cardsData, dismissedCardsPerEvent]);

  // Swipe Handlers defined within the hook
  const handleSwipe = useCallback(
    (direction: 'left' | 'right' | 'super') => {
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

  const handleSwipeLeft = useCallback(() => handleSwipe('left'), [handleSwipe]);
  const handleSwipeRight = useCallback(() => handleSwipe('right'), [handleSwipe]);
  const handleSuperInvite = useCallback(() => handleSwipe('super'), [handleSwipe]);

  const hasCards = currentEventCards.length > 0;

  return {
    cards: currentEventCards,
    hasCards,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
  };
};

export default usePersistentCardSwipe;
