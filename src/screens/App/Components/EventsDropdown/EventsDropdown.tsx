import { useState } from 'react';
import { components } from '@invited-only/invited-only-api';
import * as S from './EventsDropdown.style';
import ArrowDown from 'src/assets/images/icons/arrow-down.svg';
import ArrowUp from 'src/assets/images/icons/arrow-up-thin.svg';

interface EventsDropDownProps {
  events: components['schemas']['EventData'][];
  selectedEvent: components['schemas']['EventData'];
  onEventSelect: (event: components['schemas']['EventData']) => void;
  onDropdownChange?: () => void;
  attendingGuestsCount: number;
}
export const EventsDropdown = ({ events, onEventSelect, selectedEvent, onDropdownChange, attendingGuestsCount }: EventsDropDownProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const sortedEvents = [...events].sort((a, b) => {
    if (!a.createdAt && !b.createdAt) {
      return 0;
    }
    if (!a.createdAt) {
      return 1;
    }
    if (!b.createdAt) {
      return -1;
    }

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const toggleDropdown = () => {
    if (events.length > 1) {
      setDropdownVisible(!dropdownVisible);
    }
    if (onDropdownChange) {
      onDropdownChange();
    }
  };

  const handleEventSelect = (event: components['schemas']['EventData']) => {
    onEventSelect(event);
    setDropdownVisible(false);
    if (onDropdownChange) {
      onDropdownChange();
    }
  };

  return (
    <S.DropdownContainer>
      <S.DropdownButton onPress={toggleDropdown} disabled={false}>
        <S.DropdownIcon>{events.length > 1 && (dropdownVisible ? <ArrowUp /> : <ArrowDown />)}</S.DropdownIcon>
        <S.DropDownAvatar source={{ uri: selectedEvent.photos?.[0]?.image }} />
        <S.DropdownText numberOfLines={1}>{selectedEvent ? selectedEvent.name : 'Select Event'}</S.DropdownText>
        {selectedEvent && selectedEvent.uid !== 'joined-events' && (
          <S.EventCounter>
            {attendingGuestsCount ?? 0}/{selectedEvent.femaleFriend ?? 0 + (selectedEvent.maleFriend ?? 0)}
          </S.EventCounter>
        )}
      </S.DropdownButton>

      {dropdownVisible && events.length > 1 && (
        <S.DropdownMenu>
          {sortedEvents.map((event, index) => (
            <S.DropdownItem key={index} onPress={() => handleEventSelect(event)}>
              {event.photos?.[0]?.image && <S.DropDownAvatar source={{ uri: event.photos?.[0]?.image }} />}
              <S.DropdownItemText>{event.name}</S.DropdownItemText>
            </S.DropdownItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};

export default EventsDropdown;