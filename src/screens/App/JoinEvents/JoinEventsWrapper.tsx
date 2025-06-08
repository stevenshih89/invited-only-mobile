import { ReactElement } from 'react';

import AppLoader from '../AppLoader/AppLoader';
import JoinEvents from './JoinEvents';
import useGetUserEvents from './hooks/useGetUserEvents';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import { ErrorText } from 'components/Inputs/InputPhoneView.style';

const JoinEventsWrapper = (): ReactElement => {

  const { events, isLoading, isError, hasNextPage, fetchNextPage } = useGetUserEvents();

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

  return <JoinEvents events={events} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isLoading={isLoading} />;
};

export default JoinEventsWrapper;
