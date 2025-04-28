import { ReactElement } from 'react';

import AppLoader from '../AppLoader/AppLoader';
import JoinEvents from './JoinEvents';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import { ErrorText } from 'components/Inputs/InputPhoneView.style';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';

const JoinEventsWrapper = (): ReactElement => {
  const { userMetadata } = useAuthStore.getState();
  const {
    data: eventsResponse,
    isLoading,
    isError,
  } = invitedOnlyBackendApi.useQuery('get', '/events/user/{userId}', {
    params: {
      path: {
        userId: userMetadata.uid || '',
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
  if (isError) {
    <DefaultBackground>
      <ErrorText>Somthing went wrong</ErrorText>
    </DefaultBackground>;
  }

  return <JoinEvents events={eventsResponse?.events || []} />;
};

export default JoinEventsWrapper;
