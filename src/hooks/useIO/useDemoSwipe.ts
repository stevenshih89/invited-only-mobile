import {Dispatch, SetStateAction} from 'react';
import {EventData} from 'src/types/event';

interface UseDemoSwipeProps {
  setSwipedCardsCount: Dispatch<SetStateAction<number>>;
  setEvents: Dispatch<SetStateAction<{info: EventData; component: JSX.Element}[]>>;
  handleSwipeCardRight: () => void;
  handleSwipeCardLeft: () => void;
}

export const useDemoSwipe = ({setSwipedCardsCount, setEvents, handleSwipeCardRight, handleSwipeCardLeft}: UseDemoSwipeProps) => {
  const handleDemoSwipeCardRight = ({uid, withSwipeAnimation}: {uid: string; withSwipeAnimation: boolean}) => {
    console.warn('handleDemoSwipeCardRight', uid, withSwipeAnimation);
    setTimeout(() => {
      setSwipedCardsCount(prev => prev + 1);
      setEvents(prev =>
        prev.filter(i => {
          return i?.info?.uid !== uid;
        }),
      );
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
    }
  };

  const handleDemoSwipeCardLeft = ({uid, withSwipeAnimation}: {uid: string; withSwipeAnimation: boolean}) => {
    console.warn('handleDemoSwipeCardLeft', uid, withSwipeAnimation);

    setTimeout(() => {
      setSwipedCardsCount(prev => prev + 1);
      setEvents(prev =>
        prev.filter(i => {
          return i?.info?.uid !== uid;
        }),
      );
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  return {
    handleDemoSwipeCardRight,
    handleDemoSwipeCardLeft,
  };
};
