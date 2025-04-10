import React from 'react';
import * as S from './IoHeader.style';
import {EventsDropdown} from './Components/EventsDropdown';
import CreateEventButton from './Components/CreateEventButton/CreateEventButton';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import auth from '@react-native-firebase/auth';
import {EventApiResponse} from 'src/apiv2/queries/eventQueries';
import {components} from 'src/api/v1';

interface Event {
  id: string;
  title: string;
}

interface IoHeaderProps {
  requestsCount: number;
  onRequestPress: () => void;
  events: components['schemas']['EventData'][];
  selectedEvent: components['schemas']['EventData'];
  onEventSelect: (event: components['schemas']['EventData']) => void;
}

const IoHeader: React.FC<IoHeaderProps> = ({events, selectedEvent, requestsCount, onEventSelect, onRequestPress}) => {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    return <AppLoader />;
  }
  console.log('events', events);

  return (
    <S.HeaderContainer>
      {events.length > 0 ? (
        <S.RequestAndEventsContainer>
          <EventsDropdown events={events} onEventSelect={onEventSelect} selectedEvent={selectedEvent} />
          {requestsCount > 0 && (
            <S.RequestButton onPress={onRequestPress}>
              <S.RequestButtonText>Requests</S.RequestButtonText>

              <S.RequestBadge>
                <S.RequestBadgeText>{requestsCount}</S.RequestBadgeText>
              </S.RequestBadge>
            </S.RequestButton>
          )}
        </S.RequestAndEventsContainer>
      ) : (
        <CreateEventButton />
      )}
    </S.HeaderContainer>
  );
};

export default IoHeader;
