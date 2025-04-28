import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as S from './ApproveActionButton.style';
import CheckmarkIcon from 'src/assets/images/icons/check.svg';
import { components } from 'src/api/v1';
import invitedOnlyBackendApi from 'src/api/backend-api';

interface ApproveActionButtonProps extends TouchableOpacityProps {
    chat: components['schemas']['Chat'];
}

export const ApproveActionButton: React.FC<ApproveActionButtonProps> = ({ chat, ...rest }) => {
    const { mutate: approveChat } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees', {
        onSuccess: () => {
            console.log('Chat approved');
        },
    });
    return (
        <S.ButtonContainer onPress={() => approveChat({
            body: {
                guestId: chat.guestId ?? '',
                hostId: chat.hostId ?? '',
                eventId: chat.eventId ?? '',
                hostConfirm: true,
                hostConfirmAt: new Date().toISOString(),
            },
        })} {...rest}>
            <S.IconContainer>
                <CheckmarkIcon />
            </S.IconContainer>
            <S.ButtonText>Approve</S.ButtonText>
        </S.ButtonContainer>
    );
};