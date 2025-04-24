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
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalUpgradeAccount from 'components/Modal/ModalUpgradeAccount/ModalUpgradeAccount';
import { components } from 'src/api/v1';
import { useAuthStore } from 'src/store/authStore';
import invitedOnlyBackendApi from 'src/api/backend-api';

type GuestUser = components['schemas']['User'];

interface Props {
  events: components['schemas']['EventData'][];
}

const IO = ({ events }: Props) => {
  const { userMetadata: user } = useAuthStore();
  const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);
  const { data: userData } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: user?.uid,
      },
    },
  });
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
        {!userData?.accountConfirmed ? (
          <ModalLockAccount haveCode isPremium={userData?.accountPremium} accountType={userData?.accountType} isVisibleButton={true} />
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
      <ModalLockedAccount />
      <ModalUpgradeAccount />
    </DefaultBackground>
  );
};

export default gestureHandlerRootHOC(IO);
