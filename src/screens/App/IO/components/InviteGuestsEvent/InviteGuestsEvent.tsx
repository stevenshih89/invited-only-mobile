import React from 'react';
import { ScrollView } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './InviteGuestsEvent.styled';
import GuestBasicInfoCard from './Components/GuestBasicInfoCard/GuestBasicInfoCard';
import GuestBioCard from './Components/GuestBioCard/GuestBioCard';
import { GuestCard } from './Components/GuestCard/GuestCard';
import GuestLanguagesCard from './Components/GuestLanguagesCard/GuestLanguagesCard';
import { NewConnectionModal } from './Components/NewConnectionModal/NewConnectionModal';


import useNewConnectionModal from './hooks/useNewConnectionModal';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import useSwipeCardAction from 'screens/App/Components/Card/hooks/useSwipeCardAction';

type GuestUser = components['schemas']['User'];

interface InviteGuestsEventProps {
  selectedEvent: components['schemas']['EventData'];
  cardsToShow: GuestUser[];
  isLoading: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperInvite: () => void;
  allCards: GuestUser[];
}

const InviteGuestsEvent = ({ selectedEvent, cardsToShow, isLoading, onSwipeLeft, onSwipeRight, onSuperInvite, allCards }: InviteGuestsEventProps) => {
  const hasCards = cardsToShow.length > 0;
  const currentCard: GuestUser | undefined = hasCards ? cardsToShow[cardsToShow.length - 1] : undefined;


  const { createEventAttendee, swipeDataRes } = useSwipeCardAction();
  const { isModalVisible, closeModal, matchedCard } = useNewConnectionModal({ swipeDataRes, allCards, isEvent: false });

  const renderCards = () => {
    if (isLoading) {
      return <AppLoader />;
    }
    if (!hasCards) {
      return <S.NoCardsText>No more guests to show.</S.NoCardsText>;
    }

    return cardsToShow.map((guest, index) => (
      <GuestCard
        key={guest.uid}
        guest={guest}
        index={index}
        isTopCard={index === cardsToShow.length - 1}
        onReject={() => {
          onSwipeLeft();
          createEventAttendee({
            body: {
              guestId: currentCard?.uid || '',
              hostId: selectedEvent.hostId || '',
              eventId: selectedEvent.uid,
              hostSwipe: 'left',
            },
          });
        }}
        onSuperInvite={onSuperInvite}
        onInvite={() => {
          onSwipeRight();
          createEventAttendee({
            body: {
              guestId: currentCard?.uid || '',
              hostId: selectedEvent.hostId || '',
              eventId: selectedEvent.uid,
              hostSwipe: 'right',
            },
          });
        }}
        topIndex={cardsToShow.length - 1}
      />
    ));
  };

  return (
    <ScrollView>
      <S.Container>
        <S.CardContainer>{renderCards()}</S.CardContainer>

        {!isLoading && currentCard && (
          <>
            <GuestBasicInfoCard guestInfo={currentCard} />
            <GuestBioCard guestInfo={currentCard} />
            <GuestLanguagesCard guestInfo={currentCard} />
            <S.BlockAndReportContainer>
              <S.BlockAndReportButton>
                <S.BlockText>Block and Report</S.BlockText>
              </S.BlockAndReportButton>
            </S.BlockAndReportContainer>
          </>
        )}
      </S.Container>
      {matchedCard && (
        <NewConnectionModal
          cardData={matchedCard}
          visible={isModalVisible}
          onClose={closeModal}
          isEvent={false}
        />
      )}
    </ScrollView>
  );
};

export default InviteGuestsEvent;
