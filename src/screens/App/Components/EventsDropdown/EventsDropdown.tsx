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
}
export const EventsDropdown = ({ events, onEventSelect, selectedEvent, onDropdownChange }: EventsDropDownProps) => {
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
    setDropdownVisible(!dropdownVisible);
  };

  const handleEventSelect = (event: components['schemas']['EventData']) => {
    onEventSelect(event);
    setDropdownVisible(false);
    if (onDropdownChange) {
      onDropdownChange();
    };
  };

  const selectedIndex = sortedEvents.findIndex(event => event.uid === selectedEvent?.uid);

  return (
    <S.DropdownContainer>
      <S.DropdownButton onPress={toggleDropdown}>
        <S.DropdownIcon>{dropdownVisible ? <ArrowUp /> : <ArrowDown />}</S.DropdownIcon>
        <S.DropdownText numberOfLines={1}>{selectedEvent ? selectedEvent.name : 'Select Event'}</S.DropdownText>
        {selectedEvent && selectedEvent.uid !== 'joined-events' && (
          <S.EventCounter>
            {selectedIndex + 1}/{events.length}
          </S.EventCounter>
        )}
      </S.DropdownButton>

      {dropdownVisible && (
        <S.DropdownMenu>
          {sortedEvents.map((event, index) => (
            <S.DropdownItem key={index} onPress={() => handleEventSelect(event)}>
              <S.DropdownItemText>{event.name}</S.DropdownItemText>
            </S.DropdownItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};

export default EventsDropdown;