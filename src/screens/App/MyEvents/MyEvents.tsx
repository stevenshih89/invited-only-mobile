import React from 'react';
import {EventQueries, EventApiResponse} from 'src/apiv2/queries/eventQueries'; // Use EventApiResponse for consistency
import * as S from './MyEvents.style';
import MyEventsEmptyFallback from './Components/MyEventesEmptyFallback/MyEventesEmptyFallback';
import AppLoader from 'screens/App/AppLoader/AppLoader'; // Assuming location
import DefaultBackground from 'components/DefaultBackground/DefaultBackground'; // Assuming location
import EventList from './Components/EventList/EventList';
import invitedOnlyBackendApi from 'src/api/backend-api';
import auth from '@react-native-firebase/auth';

const MyEvents = () => {
  const {data: events, isLoading} = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
    params: {
      path: {
        hostId: auth().currentUser?.uid || '',
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
