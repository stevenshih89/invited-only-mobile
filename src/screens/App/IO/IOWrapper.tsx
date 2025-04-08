import {EventQueries} from 'src/apiv2/queries/eventQueries';
import IO from './IO';

import AppLoader from '../AppLoader/AppLoader';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

const IOWrapper = () => {
  const {data: events, isLoading, error} = EventQueries.useGetMyEvents();
  console.log('events', events, 'error?', error, 'is loading?', isLoading);
  console.log('on IO wrapper');

  if (isLoading || !events) {
    return (
      <DefaultBackground>
        <AppLoader />
      </DefaultBackground>
    );
  }

  return <IO events={events} />;
};
export default IOWrapper;
