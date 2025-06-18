import * as S from './CardActionsButtons.style';

export interface CardActionsButtonsProps {
    thisVersion?: boolean;
    disabled: boolean;
    onReject?: () => void;
    onSuperInvite?: () => void;
    onInvite?: () => void;
    isEvent?: boolean;
}

export const CardActionsButtons = ({ disabled, onReject, onSuperInvite, onInvite, thisVersion = false, isEvent = false }: CardActionsButtonsProps = {
    disabled: false,
    onReject: () => { },
    onSuperInvite: () => { },
    onInvite: () => { },
    thisVersion: false,
}) => {

    return (
        <S.ButtonsContainer>
            <S.RejectButton disabled={disabled} onPress={onReject}>
                <S.RejectIcon />
                {!thisVersion && <S.RejectButtonText>Reject</S.RejectButtonText>}
            </S.RejectButton>
            {!thisVersion && <S.SuperInviteButton disabled={disabled} onPress={onSuperInvite}>
                <S.SuperInviteIcon style={{ opacity: 1 }} />
                <S.SuperInviteButtonText>{isEvent ? 'Super Join' : 'Super Invite'}</S.SuperInviteButtonText>
            </S.SuperInviteButton>}
            <S.InviteButton disabled={disabled} onPress={onInvite}>
                <S.InviteIcon style={{ opacity: 1 }} />
                <S.InviteButtonText>{isEvent ? 'Join' : 'Invite'}</S.InviteButtonText>
            </S.InviteButton>
        </S.ButtonsContainer>
    );
};
