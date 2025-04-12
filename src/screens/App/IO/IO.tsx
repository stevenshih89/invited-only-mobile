import React, {useState, useMemo, useCallback} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useUser} from 'src/store/userStore';
import * as S from './IO.style';

import InviteGuestsEvent from './Components/InviteGuestsEvent/InviteGuestsEvent';
import IoHeader from './Components/IoHeader/IoHeader';
import AppLoader from '../AppLoader/AppLoader';
import {components} from 'src/api/v1';
import invitedOnlyBackendApi from 'src/api/backend-api';
import usePersistentCardSwipe from './hooks/usePersistentCardSwipe';
import {Text} from 'react-native';

type GuestUser = components['schemas']['User'];

interface Props {
  events: components['schemas']['EventData'][];
}

const IO = ({events}: Props) => {
  const {user: userInfo} = useUser();
  const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);

  const {data: guestsData, isLoading: isGuestsLoading} = invitedOnlyBackendApi.useQuery('get', '/users/event/{eventId}', {
    params: {
      path: {
        eventId: selectedEvent?.uid || 'no-event',
      },
    },
    enabled: !!selectedEvent?.uid, // Only fetch if an event is selected
  });

  const guests = useMemo(() => guestsData || [], [guestsData]);

  const {
    cards: currentEventCards,
    hasCards,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
  } = usePersistentCardSwipe<GuestUser>({
    cardsData: guests,
    eventId: selectedEvent?.uid,
  });

  const handleEventSelect = (event: components['schemas']['EventData']) => {
    setSelectedEvent(event);
  };

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
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        ) : (
          <>
            <IoHeader
              events={events}
              selectedEvent={selectedEvent}
              requestsCount={0} // Placeholder
              onEventSelect={handleEventSelect}
              onRequestPress={() => {}} // Placeholder
            />
            {!hasCards && guests.length > 0 ? (
              <DefaultBackground>
                <S.IoContainer style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'white'}}>No cards to show</Text>
                </S.IoContainer>
              </DefaultBackground>
            ) : (
              <InviteGuestsEvent
                selectedEvent={selectedEvent}
                cardsToShow={currentEventCards}
                isLoading={!hasCards && guests.length > 0}
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
