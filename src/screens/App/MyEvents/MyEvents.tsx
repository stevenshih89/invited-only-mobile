import React from 'react';
import * as S from './MyEvents.style';
import MyEventsEmptyFallback from './Components/MyEventesEmptyFallback/MyEventesEmptyFallback';
import EventList from './Components/EventList/EventList';
import { useAuthStore } from 'src/store/authStore';
import AppLoader from 'screens/App/AppLoader/AppLoader'; // Assuming location
import DefaultBackground from 'components/DefaultBackground/DefaultBackground'; // Assuming location
import invitedOnlyBackendApi from 'src/api/backend-api';

const MyEvents = () => {
  const { userMetadata } = useAuthStore.getState();
  const { data: events, isLoading } = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
    params: {
      path: {
        hostId: userMetadata.uid || '',
      },
    },
  });


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
