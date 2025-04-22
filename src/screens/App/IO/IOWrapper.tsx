import { Text } from 'react-native';
import AppLoader from '../AppLoader/AppLoader';
import IO from './IO';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import invitedOnlyBackendApi from 'src/api/backend-api';

import { useAuthStore } from 'src/store/authStore';

const IOWrapper = () => {
  const { userMetadata: user } = useAuthStore();
  console.log('user', user);
  const { data: events, isLoading } = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
    params: {
      path: {
        hostId: user?.uid || '',
      },
    },
  });

  if (isLoading || !events) {
    return (
      <DefaultBackground>
        <AppLoader />
      </DefaultBackground>
    );
  }
  if (events.length === 0) {
    return (
      <DefaultBackground>
        <Text style={{ color: 'white' }}>No events found</Text>
      </DefaultBackground>
    );
  }

  return <IO events={events} />;
};
export default IOWrapper;
