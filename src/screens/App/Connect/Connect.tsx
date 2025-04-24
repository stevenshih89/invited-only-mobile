import ConnectTabs from './ConnectTabs';
import ModalComingSoon from 'components/Modal/ModalComingSoon/ModalComingSoon';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

const Connect = () => {
  return (
    <DefaultBackground>
      <ConnectTabs />
      <ModalComingSoon />
    </DefaultBackground>
  );
};

export default Connect;
