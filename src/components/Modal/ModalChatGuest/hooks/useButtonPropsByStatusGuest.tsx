import {useMemo} from 'react';
import * as S from '../ModalChatGuest.style';
import CouponIcon from 'assets/images/icons/coupon-fill.svg';
import {connecitonStatus} from 'hooks/useInvitationStatus';
import {ButtonProps} from 'typescript/interfaces';
import HourGlassIcon from 'assets/images/icons/hourglass-filled.svg';

interface UseButtonPropsByStatusProps {
    invitationStatus: connecitonStatus;
    onPress: () => void;
}

export const useButtonPropsByStatus = ({invitationStatus, onPress}: UseButtonPropsByStatusProps) => {
    const getButtonPropsByStatus = (): ButtonProps => {
        if (invitationStatus === 'guestApprovePendingForHost') {
            return {
                title: (
                    <S.ButtonContentWrapper>
                        <HourGlassIcon width={16} height={16} />
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
                title: 'Accept Invite',
                variant: 'default' as const,
                onPress: () => {
                    onPress();
                },
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
