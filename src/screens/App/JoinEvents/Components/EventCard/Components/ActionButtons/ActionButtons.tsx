import {FC} from 'react';
import * as S from './ActionButtons.style';
import RejectIcon from 'src/assets/images/icons/close.svg';
import SuperInviteIcon from 'src/assets/images/icons/lightning-fill.svg';
import InviteIcon from 'src/assets/images/icons/coupon-fill.svg';

interface ActionButtonsProps {
  onReject: () => void;
  onSuperInvite: () => void;
  onInvite: () => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({onReject, onSuperInvite, onInvite}) => (
  <S.Container>
    <S.Button hitSlop={3} onPress={onReject}>
      <RejectIcon height={24} />
    </S.Button>
    <S.Button hitSlop={3} onPress={onSuperInvite}>
      <SuperInviteIcon height={24} />
    </S.Button>
    <S.Button hitSlop={3} onPress={onInvite}>
      <InviteIcon height={20} />
    </S.Button>
  </S.Container>
);

export default ActionButtons;
