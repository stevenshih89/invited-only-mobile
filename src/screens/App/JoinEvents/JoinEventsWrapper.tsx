import {FC, ReactElement} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

import AppLoader from '../AppLoader/AppLoader';
import {EventQueries} from 'src/apiv2/queries/eventQueries';
import JoinEvents from './JoinEvents';
import {ErrorText} from 'components/Inputs/InputPhoneView.style';

const JoinEventsWrapper = (): ReactElement => {
  console.log('on the wrapper ');
  const {data: eventsResponse, isLoading, isError} = EventQueries.useGetEventsForUser();
  console.log('on the wrapper ', eventsResponse);

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
