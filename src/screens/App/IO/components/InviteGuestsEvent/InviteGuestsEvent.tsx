import React from 'react';
import * as S from './InviteGuestsEvent.styled';

import useCardSwipe from './hooks/useCardSwipe';
import {User} from 'src/types/userInfo';
import GuestBasicInfoCard from './Components/GuestBasicInfoCard/GuestBasicInfoCard';
import {ScrollView} from 'react-native-gesture-handler';
import GuestBioCard from './Components/GuestBioCard/GuestBioCard';
import {GuestCard} from './Components/GuestCard/GuestCard';

interface InviteGuestsEvent {
  guests: User.Info[];
}

const InviteGuestsEvent: React.FC<InviteGuestsEvent> = ({guests = []}) => {
  const {handleSwipeLeft, handleSwipeRight, handleSuperInvite, visibleCards, hasCards, currentIndex} = useCardSwipe({guests});

  const renderCards = () => {
    if (!hasCards) {
      return <S.NoCardsText>No guests to show!</S.NoCardsText>;
    }

    if (visibleCards.length === 0) {
      return <S.NoCardsText>No more guests to show!</S.NoCardsText>;
    }

    return visibleCards
      .map((guest, index) => (
        <GuestCard
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
    <ScrollView>
      <S.Container>
        <S.CardContainer>{renderCards()}</S.CardContainer>
        {guests[currentIndex] && <GuestBasicInfoCard guestInfo={guests[currentIndex]} />}
        {guests[currentIndex] && <GuestBioCard guestInfo={guests[currentIndex]} />}
      </S.Container>
    </ScrollView>
  );
};

export default InviteGuestsEvent;
