import React, { useState } from 'react';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import AppLoader from '../AppLoader/AppLoader';
import * as S from './IO.style';
import usePersistentCardSwipe from './hooks/usePersistentCardSwipe';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';

import { components } from 'src/api/v1';

import { useEventGuests } from 'screens/App/IO/hooks/useEventGuests';
import IoHeader from 'screens/App/IO/components/IoHeader/IoHeader';
import InviteGuestsEvent from 'screens/App/IO/components/InviteGuestsEvent/InviteGuestsEvent';
import { useAuthStore } from 'src/store/authStore';

type GuestUser = components['schemas']['User'];

interface Props {
  events: components['schemas']['EventData'][];
}

const IO = ({ events }: Props) => {
  const { userMetadata: user } = useAuthStore();
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

  if (isGuestsLoading) {
    return (
      <DefaultBackground>
        <AppLoader />
      </DefaultBackground>
    );
  }

  return (
    <DefaultBackground>
      <S.IoContainer>
        {false ? (
          <ModalLockAccount haveCode isPremium={user?.accountPremium} accountType={user?.accountType} isVisibleButton={true} />
        ) : (
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
                <S.IoContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>No more guests for this event.</Text>
                </S.IoContainer>
              </DefaultBackground>
            ) : (
              <InviteGuestsEvent
                selectedEvent={selectedEvent}
                cardsToShow={currentEventCards}
                isLoading={isGuestsLoading || isFetchingNextPage}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onSuperInvite={handleSuperInvite}
              />
            )}
          </>
        )}
      </S.IoContainer>
    </DefaultBackground>
  );
};

export default gestureHandlerRootHOC(IO);
