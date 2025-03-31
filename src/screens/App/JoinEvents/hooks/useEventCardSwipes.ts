import {useState} from 'react';
import {Event} from 'src/types/event';

interface UseEventCardSwipesProps {
  events: Event.Info[];
}

interface UseEventCardSwipesResponse {
  currentIndex: number;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleSuperInvite: () => void;
  visibleCards: Event.Info[];
  hasCards: boolean;
  hasMoreCards: boolean;
}

const useEventCardsSwipes = ({events}: UseEventCardSwipesProps): UseEventCardSwipesResponse => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (currentIndex < events.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < events.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSuperInvite = () => {
    if (currentIndex < events.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const visibleCards = events.slice(currentIndex, currentIndex + 4);
  const hasCards = events.length > 0;
  const hasMoreCards = currentIndex < events.length;

  return {
    currentIndex,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
    visibleCards,
    hasCards,
    hasMoreCards,
  };
};

export default useEventCardsSwipes;
