import React, {useState} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useUser} from 'src/store/userStore';
import * as S from './IO.style';

import {sampleGuests} from './Components/InviteGuestsEvent/guests.mock';
import InviteGuestsEvent from './Components/InviteGuestsEvent/InviteGuestsEvent';
import IoHeader from './Components/IoHeader/IoHeader';
import {EventApiResponse, EventQueries} from 'src/apiv2/queries/eventQueries';
import AppLoader from '../AppLoader/AppLoader';


interface Props {
  events: EventApiResponse[];
}

const IO = ({events}: Props) => {
  const {user: userInfo} = useUser();
  const [selectedEvent, setSelectedEvent] = useState<EventApiResponse>(events[0]);
  const {data: guests, isLoading} = EventQueries.useGetUserForEvent(selectedEvent.id);
  const handleEventSelect = (event: EventApiResponse) => {
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
            <InviteGuestsEvent guests={guests?.users || []} />
          </>
        )}
      </S.IoContainer>
    </DefaultBackground>
  );
};

export default gestureHandlerRootHOC(IO);
