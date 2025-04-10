import {useState} from 'react';
import {components} from 'src/api/v1';
import {Event} from 'src/types/event';
import {User} from 'src/types/userInfo';

interface UseCardSwipeProps<T> {
  cardsData: T[];
}

interface UseCardSwipeReturn<T> {
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleSuperInvite: () => void;
  cards: T[];
  hasCards: boolean;
  hasMoreCards: boolean;
}

const useCardSwipe = <T>({cardsData}: UseCardSwipeProps<T>): UseCardSwipeReturn<T> => {
  const [cards, setCards] = useState<T[]>(cardsData);

  const handleSwipeLeft = () => {
    console.log('swipe left', cards);
    if (cards?.length === 0) return;

    setCards(prevCards => prevCards.slice(0, -1));
  };

  const handleSwipeRight = () => {
    console.log('swipe right', cards);
    if (cards?.length === 0) return;

    setCards(prevCards => prevCards.slice(0, -1));
  };

  const handleSuperInvite = () => {
    console.log('handleSuperInvite', cards);
    if (cards?.length === 0) return;

    setCards(prevCards => prevCards.slice(0, -1));
  };

  const hasCards = cards?.length > 0;
  const hasMoreCards = cards?.length > 0;

  return {
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
    hasCards,
    hasMoreCards,
    cards,
  };
};

export default useCardSwipe;
