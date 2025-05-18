import { FC } from 'react';
import * as S from './GuestActionButtons.style';
import RejectIcon from 'src/assets/images/icons/close.svg';
import SuperInviteIcon from 'src/assets/images/icons/lightning-fill.svg';
import InviteIcon from 'src/assets/images/icons/coupon-fill.svg';

interface GuestActionButtonsProps {
  onReject: () => void;
  onSuperInvite: () => void;
  onInvite: () => void;
}

const GuestActionButtons: FC<GuestActionButtonsProps> = ({ onReject, onSuperInvite, onInvite }) => (
  <S.Container>
    <S.Button testID="reject-button" hitSlop={3} onPress={onReject}>
      <RejectIcon height={24} />
    </S.Button>
    <S.Button testID="super-invite-button" hitSlop={3} onPress={onSuperInvite}>
      <SuperInviteIcon height={24} />
    </S.Button>
    <S.Button testID="invite-button" hitSlop={3} onPress={onInvite}>
      <InviteIcon height={20} />
    </S.Button>
  </S.Container>
);

export default GuestActionButtons;
