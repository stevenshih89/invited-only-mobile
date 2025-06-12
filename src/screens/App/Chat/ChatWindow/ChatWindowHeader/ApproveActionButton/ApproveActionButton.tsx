import React, { useContext } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './ApproveActionButton.style';
import CheckmarkIcon from 'src/assets/images/icons/check.svg';
import { BackendApiContext } from 'contexts/BackendApiContex';


interface ApproveActionButtonProps extends TouchableOpacityProps {
    chat: components['schemas']['Chat'];
    isJoinedEvent: boolean;
    updateConnectionStatusData: (data: { hostAction: 'confirm' | 'reject' | 'none', guestAction: 'confirm' | 'reject' | 'none' }) => void;
}

export const ApproveActionButton: React.FC<ApproveActionButtonProps> = ({ chat, isJoinedEvent, updateConnectionStatusData, ...rest }) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { mutate: approveChat } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees', {
        onSuccess: (response) => {
            // updateConnectionStatusData({ hostAction: isJoinedEvent ? 'none' : 'confirm', guestAction: isJoinedEvent ? 'confirm' : 'none' });
        },
        onError: (error) => {

            console.error('Error approving chat', error);
        }
    });

    return (
        <S.ButtonContainer onPress={() => approveChat({
            body: {
                guestId: chat.guestId ?? '',
                hostId: chat.hostId ?? '',
                eventId: chat.eventId ?? '',
                guestConfirm: isJoinedEvent ? true : undefined,
                hostConfirm: isJoinedEvent ? undefined : true,
                guestConfirmAt: isJoinedEvent ? new Date().toISOString() : undefined,
                hostConfirmAt: isJoinedEvent ? undefined : new Date().toISOString(),
            },
        })} {...rest}>
            <S.IconContainer>
                <CheckmarkIcon />
            </S.IconContainer>
            <S.ButtonText>{!isJoinedEvent ? 'Approve' : 'Accept'}</S.ButtonText>
        </S.ButtonContainer>
    );
};