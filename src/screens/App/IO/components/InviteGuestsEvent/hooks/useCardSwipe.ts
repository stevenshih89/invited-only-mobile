import {useState} from 'react';
import {Event} from 'src/types/event';
import {User} from 'src/types/userInfo';

interface UseCardSwipeProps {
  cardsData: User.Info[] | Event.Info[];
}

interface UseCardSwipeReturn {
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleSuperInvite: () => void;
  cards: User.Info[] | Event.Info[];
  hasCards: boolean;
  hasMoreCards: boolean;
}

const useCardSwipe = ({cardsData}: UseCardSwipeProps): UseCardSwipeReturn => {
  const [cards, setCards] = useState<User.Info[] | Event.Info[]>(cardsData);

  const handleSwipeLeft = () => {
    if (cards?.length === 0) return;

    setCards(prevCards => prevCards.slice(0, -1));
  };

  const handleSwipeRight = () => {
    if (cards?.length === 0) return;

    setCards(prevCards => prevCards.slice(0, -1));
  };

  const handleSuperInvite = () => {
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
