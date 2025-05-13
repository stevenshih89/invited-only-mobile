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
import GuestPhotosList from './Components/GuestPhotosList/GuestPhotosList';
import GuestActionButtons from './Components/GuestActionButtons/GuestActionButtons';
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

const InviteGuestsEvent = ({
  selectedEvent,
  cardsToShow,
  isLoading,
  onSwipeLeft,
  onSwipeRight,
  onSuperInvite,
  allCards,
}: InviteGuestsEventProps) => {
  const hasCards = cardsToShow.length > 0;
  const currentCard: GuestUser | undefined = hasCards ? cardsToShow[cardsToShow.length - 1] : undefined;

  const { createEventAttendee, swipeDataRes } = useSwipeCardAction();
  const { isModalVisible, closeModal, matchedCard } = useNewConnectionModal({ swipeDataRes, allCards, isEvent: false });

  const onReject = () => {
    onSwipeLeft();
    createEventAttendee({
      body: {
        guestId: currentCard?.uid || '',
        hostId: selectedEvent.hostId || '',
        eventId: selectedEvent.uid,
        hostSwipe: 'left',
      },
    });
  };

  const onInvite = () => {
    onSwipeRight();
    createEventAttendee({
      body: {
        guestId: currentCard?.uid || '',
        hostId: selectedEvent.hostId || '',
        eventId: selectedEvent.uid,
        hostSwipe: 'right',
      },
    });
  };

  const renderCards = () => {
    if (isLoading) {
      return <AppLoader />;
    }
    if (!hasCards) {
      return <S.NoCardsText>No more guests to show.</S.NoCardsText>;
    }
    console.log("invite guests event guest id", currentCard?.uid);
    console.log("invite guests event host id", selectedEvent.hostId);
    console.log("invite guests event event id", selectedEvent.uid);

    return cardsToShow.map((guest, index) => (
      <GuestCard
        key={guest.uid}
        guest={guest}
        index={index}
        isTopCard={index === cardsToShow.length - 1}
        onReject={onReject}
        onSuperInvite={onSuperInvite}
        onInvite={onInvite}
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
            <GuestBasicInfoCard
              homeAddress={currentCard?.homeAddress || ''}
              work={currentCard?.work || { title: '', description: '' } as components['schemas']['Work']}
              gender={currentCard?.gender || 'other'}
              listOfInterestsImages={currentCard?.interests || []}
            />
            <GuestBioCard bio={currentCard?.bio || ''} />
            <GuestLanguagesCard languages={currentCard?.languages || []} />
            <GuestPhotosList photosList={currentCard?.photos || []} />
            <GuestActionButtons onReject={onReject} onSuperInvite={onSuperInvite} onInvite={onInvite} />
            <S.BlockAndReportContainer>
              <S.BlockAndReportButton>
                <S.BlockText>Block and Report</S.BlockText>
              </S.BlockAndReportButton>
            </S.BlockAndReportContainer>
          </>
        )}
      </S.Container>
      {matchedCard && <NewConnectionModal cardData={matchedCard} visible={isModalVisible} onClose={closeModal} isEvent={false} eventId={selectedEvent.uid} />}
    </ScrollView>
  );
};

export default InviteGuestsEvent;
