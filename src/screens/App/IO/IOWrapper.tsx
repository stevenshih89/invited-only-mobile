import AppLoader from '../AppLoader/AppLoader';
import IO from './IO';
import EmptyStateView from './components/EmptyStateView/EmptyStateView';
import useEventsDetails from './hooks/useEventsDetails';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalUpgradeAccount from 'components/Modal/ModalUpgradeAccount/ModalUpgradeAccount';



const IOWrapper = () => {
  const { events, isLoading } = useEventsDetails();

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
