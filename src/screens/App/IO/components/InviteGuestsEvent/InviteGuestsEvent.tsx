import React from 'react';
import * as S from './InviteGuestsEvent.styled';
import useCardSwipe from './hooks/useCardSwipe';
import {ScrollView} from 'react-native-gesture-handler';
import GuestBasicInfoCard from './Components/GuestBasicInfoCard/GuestBasicInfoCard';
import GuestBioCard from './Components/GuestBioCard/GuestBioCard';
import {GuestCard} from './Components/GuestCard/GuestCard';
import {components} from 'src/api/v1';
import GuestLanguagesCard from './Components/GuestLanguagesCard/GuestLanguagesCard';
interface InviteGuestsEvent {
  guests: components['schemas']['User'][];
}

const InviteGuestsEvent = ({guests}: InviteGuestsEvent) => {
  const {handleSwipeLeft, handleSwipeRight, handleSuperInvite, hasCards, cards} = useCardSwipe({
    cardsData: guests,
  });
  console.log('cards', cards);
  const renderCards = () => {
    if (!hasCards) {
      return <S.NoCardsText>No more guests to show.</S.NoCardsText>;
    }

    return cards?.map((guest, index) => (
      <GuestCard
        key={guest.uid}
        guest={guest}
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
        {cards?.length > 0 && cards[cards.length - 1] && (
          <>
            <GuestBasicInfoCard guestInfo={cards[cards.length - 1]} />
            <GuestBioCard guestInfo={cards[cards.length - 1]} />
            <GuestLanguagesCard guestInfo={cards[cards.length - 1]} />
            <S.BlockAndReportContainer>
              <S.BlockAndReportButton>
                <S.BlockText>Block and Report</S.BlockText>
              </S.BlockAndReportButton>
            </S.BlockAndReportContainer>
          </>
        )}
      </S.Container>
    </ScrollView>
  );
};

export default InviteGuestsEvent;
