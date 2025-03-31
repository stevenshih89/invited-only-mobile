import React, {useState} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useUser} from 'src/store/userStore';
import * as S from './IO.style';

import {sampleGuests} from './Components/InviteGuestsEvent/guests.mock';
import InviteGuestsEvent from './Components/InviteGuestsEvent/InviteGuestsEvent';
import IoHeader from './Components/IoHeader/IoHeader';
import {Event} from 'src/types/event';
import {mockInfoList} from './events.mock';

// Sample events data - replace with actual data from your API

const IO = () => {
  const {user: userInfo} = useUser();
  const [selectedEvent, setSelectedEvent] = useState(mockInfoList[0]);

  // Handle event selection
  const handleEventSelect = (event: Event.Info) => {
    setSelectedEvent(event);
    console.log(`Selected event: ${event.name}`);
  };

  // Handle request button press
  const handleRequestPress = () => {
    // Navigate to requests screen
    // navigation.navigate('Requests');
  };

  return (
    <DefaultBackground>
      <S.IoContainer>
        {false ? (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        ) : (
          <>
            <IoHeader
              events={mockInfoList}
              selectedEvent={selectedEvent}
              requestsCount={5}
              onEventSelect={handleEventSelect}
              onRequestPress={handleRequestPress}
            />
            <InviteGuestsEvent guests={sampleGuests} />
          </>
        )}
      </S.IoContainer>
    </DefaultBackground>
  );
};

export default gestureHandlerRootHOC(IO);
