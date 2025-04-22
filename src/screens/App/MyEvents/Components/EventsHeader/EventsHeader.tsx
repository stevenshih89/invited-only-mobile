import * as S from './EventsHeader.style';
import CreateEventButton from 'screens/App/IO/components/IoHeader/Components/CreateEventButton/CreateEventButton';

const EventsHeader = () => {
  return (
    <S.Container>
      <S.EventsHeaderTitle>Events</S.EventsHeaderTitle>
      <CreateEventButton />
    </S.Container>
  );
};

export default EventsHeader;
