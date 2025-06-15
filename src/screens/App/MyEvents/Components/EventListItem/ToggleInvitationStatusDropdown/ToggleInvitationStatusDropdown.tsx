import React from 'react';
import Collapsible from 'react-native-collapsible';
import * as S from './ToggleInvitationStatusDropdown.style';
import Check from 'src/assets/images/icons/check.svg';

interface ToggleInvitationStatusDropdownProps {
  isVisible: boolean;

  onClose: () => void;
  invitationStatus: string;
  isJoinedEvent: boolean;
}

const guestStatuses: {status: string; description: string}[] = [
  {status: 'Invited!', description: 'Invitation received and connection is established'},
  {status: 'Host Approval', description: 'Host reviews and approves the Guest.'},
  {status: 'Guest Confirmation', description: 'Guest confirms attendance — you’re all set.'},
];
export const getCurrentStatus = (invitationStatus: string, isJoinedEvent: boolean) => {
  if (!isJoinedEvent) {
    switch (invitationStatus) {
      case 'connectionInitiated':
        return 1;
      case 'hostApprovePendingForGuest':
        return 2;
      case 'guestApprovePendingForHost':
        return 2;
      case 'attendingComplete':
        return 4;
      case 'completed':
        return 5;
      case 'rejected':
        return 6;
    }
  } else {
    switch (invitationStatus) {
      case 'connectionInitiated':
        return 1;
      case 'guestApprovePendingForHost':
        return 2;
      case 'hostApprovePendingForGuest':
        return 2;
      case 'attendingComplete':
        return 4;
    }
  }
};

export const ToggleInvitationStatusDropdown: React.FC<ToggleInvitationStatusDropdownProps> = ({
  isVisible,
  invitationStatus,
  isJoinedEvent,
}) => {
  const currentStatus = getCurrentStatus(invitationStatus, isJoinedEvent);
  const statuses = guestStatuses;
  return (
    <Collapsible collapsed={!isVisible} align="center">
      <S.DropdownContainer onStartShouldSetResponder={() => true}>
        {statuses.map((status, index) => (
          <React.Fragment key={status.status}>
            <S.DropdownItem>
              {index < statuses.length - 1 && <S.ConnectingLine isCompleted={currentStatus !== undefined && currentStatus >= index + 2} />}
              <S.InvitationStepAndStatusContainer>
                <S.InvitationStepContainer>
                  <S.InvitationStepText>{currentStatus && currentStatus >= index + 1 ? <Check /> : index + 1}</S.InvitationStepText>
                </S.InvitationStepContainer>
                <S.InvitationStatusTextContainer>
                  <S.InvitationStatusText>{status.status}</S.InvitationStatusText>
                  <S.InvitationStatusDescription>{status.description}</S.InvitationStatusDescription>
                </S.InvitationStatusTextContainer>
              </S.InvitationStepAndStatusContainer>
            </S.DropdownItem>
            {index < statuses.length - 1 && <S.Separator />}
          </React.Fragment>
        ))}
      </S.DropdownContainer>
    </Collapsible>
  );
};
