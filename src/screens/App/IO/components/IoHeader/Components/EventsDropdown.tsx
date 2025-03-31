import {useState} from 'react';
import * as S from './EventsDropdown.style';
import ArrowDown from 'src/assets/images/icons/arrow-down.svg';
import ArrowUp from 'src/assets/images/icons/arrow-up-thin.svg';
import {Event} from 'src/types/event';

interface EventsDropDownProps {
  events: Event.Info[];
  selectedEvent: Event.Info | null;
  onEventSelect: (event: Event.Info) => void;
}

export const EventsDropdown = ({events, onEventSelect, selectedEvent}: EventsDropDownProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEventSelect = (event: Event.Info) => {
    onEventSelect(event);
    setDropdownVisible(false);
  };
  return (
    <S.DropdownContainer>
      <S.DropdownButton onPress={toggleDropdown}>
        <S.DropdownIcon>{dropdownVisible ? <ArrowUp /> : <ArrowDown />}</S.DropdownIcon>
        <S.DropdownText numberOfLines={1}>{selectedEvent ? selectedEvent.name : 'Select Event'}</S.DropdownText>
        {selectedEvent && (
          <S.EventCounter>
            {events.findIndex(event => event.uid === selectedEvent.uid) + 1}/{events.length}
          </S.EventCounter>
        )}
      </S.DropdownButton>

      {dropdownVisible && (
        <S.DropdownMenu>
          {events.map(event => (
            <S.DropdownItem key={event.id} onPress={() => handleEventSelect(event)}>
              <S.DropdownItemText>{event.name}</S.DropdownItemText>
            </S.DropdownItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};
