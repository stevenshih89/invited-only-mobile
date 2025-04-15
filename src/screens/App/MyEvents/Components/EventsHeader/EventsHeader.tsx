

import CreateEventButton from 'screens/App/IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';
import * as S from './EventsHeader.style';

const EventsHeader = () => {
  return (
    <S.Container>
      <S.EventsHeaderTitle>Events</S.EventsHeaderTitle>
      <CreateEventButton />
    </S.Container>
  );
};

export default EventsHeader;
