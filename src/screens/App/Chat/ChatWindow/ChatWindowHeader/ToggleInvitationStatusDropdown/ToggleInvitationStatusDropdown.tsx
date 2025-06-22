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

// Example statuses - replace with actual data from props or context
const hostStatuses: { status: string; description: string }[] = [
  { status: 'Invited!', description: 'Host and Guest swiped — connection established.' },
  { status: 'Host Approval', description: 'Host reviews and approves the guest.' },
  { status: 'Guest Confirmation', description: 'Guest confirms attendance — you’re all set.' },
];
const guestStatuses: { status: string; description: string }[] = [
  { status: 'Invited!', description: 'Host and Guest swiped — connection established.' },
  { status: 'Host Approval', description: 'Host reviews and approves the guest.' },
  { status: 'Guest Confirmation', description: 'Event owner approved you; now accept the invite' },
];
export const getCurrentStatus = (invitationStatus: string, isJoinedEvent: boolean) => {
  if (!isJoinedEvent) {
    switch (invitationStatus) {
      case 'connectionInitiated':
        return 1;
      case 'guestApprovePendingForHost':
        return 2;
      case 'attendingComplete':
        return 3;
    }
  } else {
    switch (invitationStatus) {
      case 'connectionInitiated':
        return 1;
      case 'hostApprovePendingForGuest':
        return 2;
      case 'attendingComplete':
        return 3;
    }
  }
};

export const ToggleInvitationStatusDropdown: React.FC<ToggleInvitationStatusDropdownProps> = ({
  isVisible,
  invitationStatus,
  isJoinedEvent,
}) => {
  const currentStatus = getCurrentStatus(invitationStatus, isJoinedEvent);
  const statuses = isJoinedEvent ? guestStatuses : hostStatuses;
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
