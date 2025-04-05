import React from 'react';
import {EventQueries, EventApiResponse} from 'src/apiv2/queries/eventQueries'; // Use EventApiResponse for consistency
import * as S from './MyEvents.style';
import MyEventsEmptyFallback from './Components/MyEventesEmptyFallback/MyEventesEmptyFallback';
import AppLoader from 'screens/App/AppLoader/AppLoader'; // Assuming location
import DefaultBackground from 'components/DefaultBackground/DefaultBackground'; // Assuming location
// We will create this component next:
import EventList from './Components/EventList/EventList';
import EventsTabs from './Components/EventsTabs/EventsTabs';

// Remove Props interface, as events are fetched internally now

const MyEvents = () => { // Remove props

  const {data: events, isLoading} = EventQueries.useGetMyEvents();
  console.log('events', events);
  
  if (isLoading) {
    return (
      <DefaultBackground>
        <AppLoader />
      </DefaultBackground>
    );
  }
  if (!events || events.length === 0) {
    return <MyEventsEmptyFallback />;
  }
  return (
    <S.Container>
      <EventList events={events} />
    </S.Container>
  );
};

export default MyEvents;
