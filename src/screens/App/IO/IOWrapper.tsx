import {EventQueries} from 'src/apiv2/queries/eventQueries';
import IO from './IO';

import AppLoader from '../AppLoader/AppLoader';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

const IOWrapper = () => {
  const {data: events, isLoading} = EventQueries.useGetMyEvents();

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
