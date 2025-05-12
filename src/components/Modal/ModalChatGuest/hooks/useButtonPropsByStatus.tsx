import {useMemo} from 'react';
import {ActivityIndicator} from 'react-native';
import * as S from '../ModalChatGuest.style';
import CouponIcon from 'assets/images/icons/coupon-fill.svg';
import {connecitonStatus} from 'hooks/useInvitationStatus';
import {ButtonProps} from 'typescript/interfaces';
import {whiteColor} from 'constants/colors';

export const useButtonPropsByStatus = (invitationStatus: connecitonStatus) => {
  const getButtonPropsByStatus = (): ButtonProps => {
    if (invitationStatus === 'guestApprovePendingForHost') {
      return {
        title: (
          <S.ButtonContentWrapper>
            <ActivityIndicator size="small" color={whiteColor} />
            <S.ButtonText>Waiting</S.ButtonText>
          </S.ButtonContentWrapper>
        ),
        variant: 'outline' as const,
        disabled: true,
        onPress: () => {},
      };
    }
    if (invitationStatus === 'connectionInitiated' || invitationStatus === 'hostApprovePendingForGuest') {
      return {
        title: 'Approve Guest',
        variant: 'default' as const,
        onPress: () => {},
      };
    }

    return {
      title: (
        <S.ButtonContentWrapper>
          <CouponIcon width={20} height={20} />
          <S.ButtonText>Confirmed</S.ButtonText>
        </S.ButtonContentWrapper>
      ),
      variant: 'outline' as const,
      disabled: true,
      onPress: () => {},
    };
  };

  const buttonProps = useMemo(() => getButtonPropsByStatus(), [invitationStatus]);

  return {
    buttonProps,
  };
};
