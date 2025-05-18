import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './ApproveActionButton.style';
import CheckmarkIcon from 'src/assets/images/icons/check.svg';
import invitedOnlyBackendApi from 'src/api/backend-api';


interface ApproveActionButtonProps extends TouchableOpacityProps {
    chat: components['schemas']['Chat'];
    isJoinedEvent: boolean;
}

export const ApproveActionButton: React.FC<ApproveActionButtonProps> = ({ chat, isJoinedEvent, ...rest }) => {
    const { mutate: approveChat } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees', {
        onSuccess: (response) => {
            console.log('Chat approved', response);
        },
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
            <S.ButtonText>Approve</S.ButtonText>
        </S.ButtonContainer>
    );
};