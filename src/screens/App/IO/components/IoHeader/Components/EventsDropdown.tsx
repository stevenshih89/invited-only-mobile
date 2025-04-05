import {useState} from 'react';
import * as S from './EventsDropdown.style';
import ArrowDown from 'src/assets/images/icons/arrow-down.svg';
import ArrowUp from 'src/assets/images/icons/arrow-up-thin.svg';
import {EventApiResponse} from 'src/apiv2/queries/eventQueries';

interface EventsDropDownProps {
  events: EventApiResponse[];
  selectedEvent: EventApiResponse;
  onEventSelect: (event: EventApiResponse) => void;
}
export const EventsDropdown = ({events, onEventSelect, selectedEvent}: EventsDropDownProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Sort events by createdAt date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEventSelect = (event: EventApiResponse) => {
    onEventSelect(event);
    setDropdownVisible(false);
  };

  // Use 'id' for comparison
  const selectedIndex = sortedEvents.findIndex(event => event.id === selectedEvent?.id);
  return (
    <S.DropdownContainer>
      <S.DropdownButton onPress={toggleDropdown}>
        <S.DropdownIcon>{dropdownVisible ? <ArrowUp /> : <ArrowDown />}</S.DropdownIcon>
        <S.DropdownText numberOfLines={1}>{selectedEvent ? selectedEvent.name : 'Select Event'}</S.DropdownText>
        {selectedEvent && (
          <S.EventCounter>
            {selectedIndex + 1}/{events.length}
          </S.EventCounter>
        )}
      </S.DropdownButton>

      {dropdownVisible && (
        <S.DropdownMenu>
          {/* Key is already using event.id which is correct */}
          {sortedEvents.map((event, index) => (
            <S.DropdownItem key={event.id} onPress={() => handleEventSelect(event)}>
              <S.DropdownItemText>{event.name}</S.DropdownItemText>
            </S.DropdownItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};
