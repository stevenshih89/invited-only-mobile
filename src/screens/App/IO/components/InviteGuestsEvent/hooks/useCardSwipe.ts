import {useState} from 'react';
import {User} from 'src/types/userInfo';

interface UseCardSwipeProps {
  guests: User.Info[];
}

interface UseCardSwipeReturn {
  currentIndex: number;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleSuperInvite: () => void;
  visibleCards: User.Info[];
  hasCards: boolean;
  hasMoreCards: boolean;
}

const useCardSwipe = ({guests}: UseCardSwipeProps): UseCardSwipeReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (currentIndex < guests.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < guests.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSuperInvite = () => {
    if (currentIndex < guests.length) {
      console.log('Super Invite:', guests[currentIndex].name);
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const visibleCards = guests.slice(currentIndex, currentIndex + 4);
  const hasCards = guests.length > 0;
  const hasMoreCards = currentIndex < guests.length;

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

export default useCardSwipe;
