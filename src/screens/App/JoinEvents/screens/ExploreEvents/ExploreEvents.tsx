import { ScrollView } from 'react-native';
import { FC, useCallback, useRef } from 'react';
import { components } from '@invited-only/invited-only-api';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import HostButton from '../../Components/EventCard/Components/HostButton/HostButton';
import PhotosList from '../../Components/EventCard/Components/PhotosList/PhotosList';
import ActionButtons from '../../Components/EventCard/Components/ActionButtons/ActionButtons';
import EventCard from '../../Components/EventCard/EventCard';
import EventInfo from '../../Components/EventCard/Components/EventInfo/EventInfo';
import ExploreEventsEmptyFallback from '../../Components/ExploreEventsEmptyFallback/ExploreEventsEmptyFallback';
import * as S from './ExploreEvents.style';
import usePersistentCardSwipe from 'screens/App/IO/hooks/usePersistentCardSwipe';
import ModalReport from 'components/Modal/ModalReport/ModalReport';
import useSwipeCardAction from 'screens/App/Components/Card/hooks/useSwipeCardAction';

import NewConnectionModal from 'screens/App/IO/components/InviteGuestsEvent/Components/NewConnectionModal/NewConnectionModal';
import { useAuthStore } from 'src/store/authStore';
import useNewConnectionModal from 'screens/App/IO/components/InviteGuestsEvent/hooks/useNewConnectionModal';

interface ExploreEventsProps {
  events: components['schemas']['EventData'][];
}

const ExploreEvents: FC<ExploreEventsProps> = ({ events }) => {
  const { userMetadata } = useAuthStore();
  const {
    cards: currentEventCards,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
  } = usePersistentCardSwipe<components['schemas']['EventData']>({
    cardsData: events,
    eventId: '1',
  });



  const hasCards = currentEventCards.length > 0;
  const currentCard = hasCards ? currentEventCards[currentEventCards.length - 1] : undefined;
  console.log('currentCard', currentCard);
  const { createEventAttendee, swipeDataRes } = useSwipeCardAction();

  const { isModalVisible, closeModal, matchedCard } = useNewConnectionModal({ swipeDataRes, allCards: events, isEvent: true });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleBlockAndReport = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  if (!currentCard || !events.length) {
    return (
      <S.Container>

        <ExploreEventsEmptyFallback />
        <NewConnectionModal cardData={matchedCard} visible={isModalVisible} onClose={closeModal} isEvent={true} eventId={currentCard?.uid || ''} />
      </S.Container>
    );
  }

  return (
    <ScrollView>
      <S.Container>
        <S.EventCardContainer>
          {currentEventCards.map((event, index) => (
            <EventCard
              key={event.uid}
              event={event}
              index={index}
              isTopCard={index === currentEventCards.length - 1}
              onReject={() => {
                handleSwipeLeft()
                createEventAttendee({
                  body: {
                    guestId: userMetadata?.uid || '',
                    hostId: currentCard?.hostId || '',
                    eventId: currentCard?.uid || '',
                    guestSwipe: 'left',
                  },
                });
              }}
              onSuperInvite={() => {
                handleSuperInvite()
                createEventAttendee({
                  body: {
                    guestId: userMetadata?.uid || '',
                    hostId: currentCard?.hostId || '',
                    eventId: currentCard?.uid || '',
                    guestSwipe: 'right',
                  },
                });
              }}
              onInvite={() => {
                handleSwipeRight()
                createEventAttendee({
                  body: {
                    guestId: userMetadata?.uid || '',
                    hostId: currentCard?.hostId || '',
                    eventId: currentCard?.uid || '',
                    guestSwipe: 'right',
                  },
                });
              }}
              topIndex={currentEventCards.length - 1}
            />
          ))}
        </S.EventCardContainer>
      </S.Container>
      <S.BottomWrapper>
        <HostButton hostName={currentCard?.hostName || ''} hostImage={currentCard?.hostImage || ''} />
        <EventInfo event={currentCard} />
        <PhotosList photosList={currentCard?.photos || []} />
        <ActionButtons onReject={handleSwipeLeft} onSuperInvite={handleSuperInvite} onInvite={handleSwipeRight} />
        <S.BlockAndReportContainer>
          <S.BlockAndReportButton onPress={handleBlockAndReport}>
            <S.BlockText>Block and Report</S.BlockText>
          </S.BlockAndReportButton>
        </S.BlockAndReportContainer>
        <ModalReport ref={bottomSheetModalRef} />
        <NewConnectionModal cardData={matchedCard} visible={isModalVisible} onClose={closeModal} isEvent={true} eventId={currentCard?.uid || ''} />
      </S.BottomWrapper>
    </ScrollView>
  );
};
export default ExploreEvents;
