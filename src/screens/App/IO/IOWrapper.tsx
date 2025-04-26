import { Text } from 'react-native';
import AppLoader from '../AppLoader/AppLoader';
import IO from './IO';
import EmptyStateView from './components/EmptyStateView/EmptyStateView';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import invitedOnlyBackendApi from 'src/api/backend-api';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalUpgradeAccount from 'components/Modal/ModalUpgradeAccount/ModalUpgradeAccount';


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
        <ModalLockedAccount />
        <ModalUpgradeAccount />
      </DefaultBackground>
    );
  }
  if (events.length === 0) {
    return (
      <DefaultBackground>
        <ModalLockedAccount />
        <ModalUpgradeAccount />
        <EmptyStateView />
      </DefaultBackground>
    );
  }

  return <IO events={events} />;
};
export default IOWrapper;
