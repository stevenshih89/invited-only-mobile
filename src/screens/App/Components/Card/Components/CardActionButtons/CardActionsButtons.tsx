import { View } from "react-native"
import * as S from './CardActionsButtons.style';

interface CardActionsButtonsProps {
    disabled: boolean;
    onReject?: () => void;
    onSuperInvite?: () => void;
    onInvite?: () => void;
}

export const CardActionsButtons = ({ disabled, onReject, onSuperInvite, onInvite }: CardActionsButtonsProps = {
    disabled: false,
    onReject: () => { },
    onSuperInvite: () => { },
    onInvite: () => { },
}) => {
    return (
        <S.ButtonsContainer>
            <S.RejectButton disabled={disabled} onPress={onReject}>
                <S.RejectIcon />
                <S.RejectButtonText>Reject</S.RejectButtonText>
            </S.RejectButton>
            <S.SuperInviteButton disabled={disabled} onPress={onSuperInvite}>
                <S.SuperInviteIcon style={{ opacity: 1 }} />
                <S.SuperInviteButtonText>Super Invite</S.SuperInviteButtonText>
            </S.SuperInviteButton>
            <S.InviteButton disabled={disabled} onPress={onInvite}>
                <S.InviteIcon style={{ opacity: 1 }} />
                <S.InviteButtonText>Invite</S.InviteButtonText>
            </S.InviteButton>
        </S.ButtonsContainer>
    );
};
