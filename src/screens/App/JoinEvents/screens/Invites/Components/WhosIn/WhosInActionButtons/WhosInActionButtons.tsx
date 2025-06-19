import * as S from './WhosInActionButtons.style';
import useUser from 'hooks/user/useUser';
import { useAppNavigation } from 'hooks/useAppNavigation';

export interface WhosInActionButtonsProps {
    disabled: boolean;
    onReject?: () => void;
    onSuperInvite?: () => void;
    onInvite?: () => void;
}

export const WhosInActionButtons = ({ disabled, onReject, onInvite }: WhosInActionButtonsProps) => {
    const navigation = useAppNavigation();
    const { user } = useUser();
    return (
        <S.ButtonsContainer>
            <S.RejectButton disabled={disabled} onPress={onReject}>
                <S.RejectIcon />
                <S.RejectButtonText>Reject</S.RejectButtonText>
            </S.RejectButton>
            <S.SuperInviteButton disabled={disabled} onPress={() => {
                if (!user?.accountPremium) {
                    navigation.navigate('/profile/payment');
                } else {
                    navigation.navigate('/event-creating-stack');
                }
            }}>
                <S.SuperInviteIcon style={{ opacity: 1 }} />
                <S.SuperInviteButtonText>Invite</S.SuperInviteButtonText>
            </S.SuperInviteButton>
            <S.InviteButton disabled={disabled} onPress={onInvite}>
                <S.InviteIcon style={{ opacity: 1 }} />
                <S.InviteButtonText>Next</S.InviteButtonText>
            </S.InviteButton>
        </S.ButtonsContainer>
    );
};
export default WhosInActionButtons;