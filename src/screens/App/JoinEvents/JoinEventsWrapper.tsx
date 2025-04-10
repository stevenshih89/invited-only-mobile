import {FC, ReactElement} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

import AppLoader from '../AppLoader/AppLoader';
import auth from '@react-native-firebase/auth';
import JoinEvents from './JoinEvents';
import {ErrorText} from 'components/Inputs/InputPhoneView.style';
import invitedOnlyBackendApi from 'src/api/backend-api';

const JoinEventsWrapper = (): ReactElement => {
  const user = auth().currentUser;
  const {
    data: eventsResponse,
    isLoading,
    isError,
  } = invitedOnlyBackendApi.useQuery('get', '/events/user/{userId}', {
    params: {
      path: {
        userId: user?.uid || '',
      },
    },
  });

  console.log('on the wrapper ', eventsResponse);
  console.log('isLoading', isLoading);
  console.log('isError', isError);
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
