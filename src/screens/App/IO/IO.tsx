import React, {useState} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useUser} from 'src/store/userStore';
import * as S from './IO.style';

import InviteGuestsEvent from './Components/InviteGuestsEvent/InviteGuestsEvent';
import IoHeader from './Components/IoHeader/IoHeader';
import {EventApiResponse, EventQueries} from 'src/apiv2/queries/eventQueries';
import AppLoader from '../AppLoader/AppLoader';
import {components, paths} from 'src/api/v1';
import invitedOnlyBackendApi from 'src/api/backend-api';

interface Props {
  events: components['schemas']['EventData'][];
}

const IO = ({events}: Props) => {
  const {user: userInfo} = useUser();
  const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);
  const {data: guests, isLoading} = invitedOnlyBackendApi.useQuery('get', '/users/event/{eventId}', {
    params: {
      path: {
        eventId: selectedEvent?.uid || 'no-event',
      },
    },
  });

  console.log('guests for event', selectedEvent?.uid, selectedEvent.name, guests);

  const handleEventSelect = (event: components['schemas']['EventData']) => {
    setSelectedEvent(event);
  };
  if (isLoading) {
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
              requestsCount={0}
              onEventSelect={handleEventSelect}
              onRequestPress={() => {}}
            />
            <InviteGuestsEvent selectedEvent={selectedEvent} guests={guests || []} />
          </>
        )}
      </S.IoContainer>
    </DefaultBackground>
  );
};

export default gestureHandlerRootHOC(IO);
