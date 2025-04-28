import React, { useState } from 'react';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import AppLoader from '../AppLoader/AppLoader';
import * as S from './IO.style';
import usePersistentCardSwipe from './hooks/usePersistentCardSwipe';
import { useEventGuests } from './hooks/useEventGuests';
import IoHeader from './components/IoHeader/IoHeader';
import InviteGuestsEvent from './components/InviteGuestsEvent/InviteGuestsEvent';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalUpgradeAccount from 'components/Modal/ModalUpgradeAccount/ModalUpgradeAccount';
import { components } from 'src/api/v1';


type GuestUser = components['schemas']['User'];

interface Props {
  events: components['schemas']['EventData'][];
}

const IO = ({ events }: Props) => {

  const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);
  const { guests, isLoading: isGuestsLoading, isFetchingNextPage, hasNextPage, fetchNextPage, status } = useEventGuests(selectedEvent?.uid);
  const {
    cards: currentEventCards,
    hasCards,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
    resetDeck,
  } = usePersistentCardSwipe<GuestUser>({
    cardsData: guests,
    eventId: selectedEvent?.uid,
  });

  const handleEventSelect = (event: components['schemas']['EventData']) => {
    setSelectedEvent(event);
  };
  if (!hasCards && status === 'success' && hasNextPage) {
    resetDeck(selectedEvent?.uid ?? '');
    fetchNextPage();
  }

  if (isGuestsLoading || isFetchingNextPage) {
    return (
      <DefaultBackground>
        <AppLoader />
      </DefaultBackground>
    );
  }

  return (
    <DefaultBackground>
      <S.IoContainer>
        <>
          <IoHeader
            events={events}
            selectedEvent={selectedEvent}
            requestsCount={0}
            onEventSelect={handleEventSelect}
            onRequestPress={() => { }}
          />
          {!isGuestsLoading && !hasCards && guests.length > 0 ? (
            <DefaultBackground>
              <S.IoContainer>
                <Text style={{ color: 'white' }}>No more guests for this event.</Text>
              </S.IoContainer>
            </DefaultBackground>
          ) : (
            <InviteGuestsEvent
              selectedEvent={selectedEvent}
              cardsToShow={currentEventCards}
              allCards={guests}
              isLoading={isGuestsLoading || isFetchingNextPage}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSuperInvite={handleSuperInvite}
            />
          )}
        </>
      </S.IoContainer>
      {isGuestsLoading || isFetchingNextPage || !hasCards && guests.length > 0 ? null : <ModalLockedAccount />}

      <ModalUpgradeAccount />
    </DefaultBackground>
  );
};

export default gestureHandlerRootHOC(IO);
