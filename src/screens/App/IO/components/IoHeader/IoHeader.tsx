import React from 'react';
import * as S from './IoHeader.style';
import {EventsDropdown} from './Components/EventsDropdown';
import {Event} from 'src/types/event';
import CreateEventButton from './Components/CreateEventButton/CreateEventButton';

interface Event {
  id: string;
  title: string;
}

interface IoHeaderProps {
  requestsCount: number;
  onRequestPress: () => void;
  events: Event.Info[];
  selectedEvent: Event.Info | null;
  onEventSelect: (event: Event.Info) => void;
}

const IoHeader: React.FC<IoHeaderProps> = ({events, selectedEvent, requestsCount, onEventSelect, onRequestPress}) => {
  return (
    <S.HeaderContainer>
      {events.length < 0 ? (
        <>
          <EventsDropdown events={events} onEventSelect={onEventSelect} selectedEvent={selectedEvent} />

          <S.RequestButton onPress={onRequestPress}>
            <S.RequestButtonText>Requests</S.RequestButtonText>
            {requestsCount > 0 && (
              <S.RequestBadge>
                <S.RequestBadgeText>{requestsCount}</S.RequestBadgeText>
              </S.RequestBadge>
            )}
          </S.RequestButton>
        </>
      ) : (
        <CreateEventButton />
      )}
    </S.HeaderContainer>
  );
};

export default IoHeader;
