import Invites from '../JoinEvents/screens/Invites/Invites';

import ModalComingSoon from 'components/Modal/ModalComingSoon/ModalComingSoon';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

const Connect = () => {
  return (
    <DefaultBackground>
      <ModalComingSoon />
      <Invites />
    </DefaultBackground>
  );
};

export default Connect;
