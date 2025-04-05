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
  const {handleSwipeLeft, handleSwipeRight, handleSuperInvite, hasCards, cards} = useCardSwipe({cardsData: guests});

  const renderCards = () => {
    if (!hasCards) {
      return <S.NoCardsText>No guests to show!</S.NoCardsText>;
    }

    return cards.map((guest, index) => (
      <GuestCard
        key={index}
        guest={guest as User.Info}
        index={index}
        isTopCard={index === cards.length - 1}
        onReject={handleSwipeLeft}
        onSuperInvite={handleSuperInvite}
        onInvite={handleSwipeRight}
        topIndex={cards.length - 1}
      />
    ));
  };

  return (
    <ScrollView>
      <S.Container>
        <S.CardContainer>{renderCards()}</S.CardContainer>
        {cards[cards.length - 1] && <GuestBasicInfoCard guestInfo={cards[cards.length - 1]} />}
        {guests[cards.length - 1] && <GuestBioCard guestInfo={cards[cards.length - 1]} />}
      </S.Container>
    </ScrollView>
  );
};

export default InviteGuestsEvent;
