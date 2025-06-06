import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import * as S from './GuestCard.styled';
import Card from './Card';
import useCardSwipe from './hooks/useCardSwipe';

interface GuestCardPackProps {
  guests: Array<{
    id: string;
    name: string;
    age: number;
    image: string[];
    bio?: string;
  }>;
}

const GuestCardPack: React.FC<GuestCardPackProps> = ({guests = []}) => {
  const {handleSwipeLeft, handleSwipeRight, handleSuperInvite, visibleCards, hasCards, currentIndex} = useCardSwipe({guests});
  const [previousIndex, setPreviousIndex] = useState(0);

  // Track when the current index changes to trigger animations
  useEffect(() => {
    setPreviousIndex(currentIndex);
  }, [currentIndex]);

  const renderCards = () => {
    if (!hasCards) {
      return <Text style={S.styles.noCardsText}>No guests to show!</Text>;
    }

    if (visibleCards.length === 0) {
      return <Text style={S.styles.noCardsText}>No more guests to show!</Text>;
    }

    return visibleCards
      .map((guest, index) => (
        <Card
          key={guest.id}
          guest={guest}
          index={index}
          isTopCard={index === 0}
          onReject={handleSwipeLeft}
          onSuperInvite={handleSuperInvite}
          onInvite={handleSwipeRight}
        />
      ))
      .reverse();
  };

  return (
    <S.Container>
      <S.CardContainer>{renderCards()}</S.CardContainer>
    </S.Container>
  );
};

export default GuestCardPack;
