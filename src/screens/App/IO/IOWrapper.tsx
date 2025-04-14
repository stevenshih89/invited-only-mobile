import IO from './IO';
import auth from '@react-native-firebase/auth';
import AppLoader from '../AppLoader/AppLoader';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import invitedOnlyBackendApi from 'src/api/backend-api';
import {ApiPaths} from 'src/api/v1';
import {Text} from 'react-native';

const IOWrapper = () => {
  const user = auth().currentUser;
  const {data: events, isLoading} = invitedOnlyBackendApi.useQuery('get', '/events/host/{hostId}', {
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
        <Text style={{color: 'white'}}>No events found</Text>
      </DefaultBackground>
    );
  }

  return <IO events={events} />;
};
export default IOWrapper;
