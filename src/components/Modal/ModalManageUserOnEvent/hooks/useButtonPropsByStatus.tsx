import { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from '../ModalManageUserOnEvent.style';
import { whiteColor } from 'constants/colors';
import CouponIcon from 'assets/images/icons/coupon-fill.svg';

import { ButtonProps } from 'typescript/interfaces';

interface UseButtonPropsByStatusProps {
  request: components['schemas']['ConnectionRequest'] | null;
  approveGuest: () => void;
}

export const useButtonPropsByStatus = ({ request, approveGuest }: UseButtonPropsByStatusProps) => {
  const getButtonPropsByStatus = (): ButtonProps => {

    if (request?.status === 'connection-complete' || (request?.status === 'pending-confirmation' && !request?.hostConfirm && request?.guestConfirm)) {
      return {
        title: 'Approve Guest',
        variant: 'default' as const,
        onPress: () => { approveGuest() },
      };
    }

    if (request?.status === 'pending-confirmation' || request?.status === 'pending-attendance') {
      return {
        title: (
          <S.ButtonContentWrapper>
            <ActivityIndicator size="small" color={whiteColor} />
            <S.ButtonText>Waiting</S.ButtonText>
          </S.ButtonContentWrapper>
        ),
        variant: 'outline' as const,
        disabled: true,
        onPress: () => { },
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
      onPress: () => { },
    };
  };

  const buttonProps = useMemo(() => getButtonPropsByStatus(), [request]);

  return {
    buttonProps,
  };
};
