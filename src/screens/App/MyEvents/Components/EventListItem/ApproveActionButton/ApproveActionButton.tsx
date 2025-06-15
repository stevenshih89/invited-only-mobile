import React, { useContext } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './ApproveActionButton.style';
import CheckmarkIcon from 'src/assets/images/icons/check.svg';
import { BackendApiContext } from 'contexts/BackendApiContex';

interface ApproveActionButtonProps extends TouchableOpacityProps {
  event: components['schemas']['EventData'];
  isJoinedEvent: boolean;
  updateConnectionStatusData: (data: { hostAction: 'confirm' | 'reject' | 'none'; guestAction: 'confirm' | 'reject' | 'none' }) => void;
  guestId: string;
}

export const ApproveActionButton: React.FC<ApproveActionButtonProps> = ({
  event,
  guestId,
  isJoinedEvent,
  updateConnectionStatusData,
  ...rest
}) => {
  console.log('isJoinedEvent', isJoinedEvent);
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { mutate: approveEvent } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees', {
    onSuccess: response => {
      // updateConnectionStatusData({ hostAction: isJoinedEvent ? 'none' : 'confirm', guestAction: isJoinedEvent ? 'confirm' : 'none' });
    },
    onError: error => {
      console.error('Error approving event', error);
    },
  });

  return (
    <S.ButtonContainer
      onPress={() =>
        approveEvent({
          body: {
            guestId: guestId ?? '',
            hostId: event.hostId ?? '',
            eventId: event.uid ?? '',
            guestConfirm: isJoinedEvent ? true : undefined,
            hostConfirm: isJoinedEvent ? undefined : true,
            guestConfirmAt: isJoinedEvent ? new Date().toISOString() : undefined,
            hostConfirmAt: isJoinedEvent ? undefined : new Date().toISOString(),
          },
        })
      }
      {...rest}>
      <S.IconContainer>
        <CheckmarkIcon />
      </S.IconContainer>
      <S.ButtonText>{'Confirm'}</S.ButtonText>
    </S.ButtonContainer>
  );
};
