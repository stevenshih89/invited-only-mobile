import React from 'react';
import { components } from '@invited-only/invited-only-api';
import { EventsDropdown } from '../../../Components/EventsDropdown/EventsDropdown';
import * as S from './IoHeader.style';
import CreateEventButton from './Components/CreateEventButton/CreateEventButton';
import useGetEventRequests from './hooks/useGetEventRequests';

interface IoHeaderProps {
  onRequestPress: () => void;
  events: components['schemas']['EventData'][];
  selectedEvent: components['schemas']['EventData'];
  onEventSelect: (event: components['schemas']['EventData']) => void;
  onDropdownChange: () => void;
}

const IoHeader: React.FC<IoHeaderProps> = ({ events, selectedEvent, onEventSelect, onRequestPress, onDropdownChange }) => {


  const { requests } = useGetEventRequests({ eventId: selectedEvent.uid });



  return (
    <S.HeaderContainer>
      {events.length > 0 ? (
        <S.RequestAndEventsContainer>
          <EventsDropdown events={events} onEventSelect={onEventSelect} selectedEvent={selectedEvent} onDropdownChange={onDropdownChange} />
          <S.RequestButton onPress={onRequestPress}>
            <S.RequestButtonText>Requests</S.RequestButtonText>
            <S.RequestBadge>
              <S.RequestBadgeText>{requests?.length || 0}</S.RequestBadgeText>
            </S.RequestBadge>
          </S.RequestButton>
        </S.RequestAndEventsContainer>
      ) : (
        <CreateEventButton />
      )}
    </S.HeaderContainer>
  );
};

export default IoHeader;


