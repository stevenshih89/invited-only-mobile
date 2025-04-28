import React from 'react';
import Collapsible from 'react-native-collapsible';
import * as S from './ToggleInvitationStatusDropdown.style';
import Check from 'src/assets/images/icons/check.svg'


interface ToggleInvitationStatusDropdownProps {
    isVisible: boolean;

    onClose: () => void;
    invitationStatus: string; // Or maybe just pass all possible statuses
}

// Example statuses - replace with actual data from props or context
const statuses: { status: string, description: string }[] = [{ status: 'Invited, Connection Made', description: 'Invitation received and connection is established' }, { status: 'Host Approve', description: 'You need to approve the guest' }, { status: 'Pending Guest Confirmation', description: 'The guest needs to accept the invitation' }, { status: 'Attending Confirmed', description: 'The guest has accepted the invitation' }];
export const getCurrentStatus = (invitationStatus: string) => {
    switch (invitationStatus) {
        case 'connectionInitiated':
            return 1;
        case 'hostApprovePendingForGuest':
            return 2;
        case 'guestApprovePendingForHost':
            return 3;
        case 'attendingComplete':
            return 4;
        case 'completed':
            return 5;
        case 'rejected':
    }
}

export const ToggleInvitationStatusDropdown: React.FC<ToggleInvitationStatusDropdownProps> = ({
    isVisible,
    invitationStatus,
}) => {
    const currentStatus = getCurrentStatus(invitationStatus);

    return (
        <Collapsible collapsed={!isVisible} align="center">
            <S.DropdownContainer
                onStartShouldSetResponder={() => true}
            >
                {statuses.map((status, index) => (
                    <React.Fragment key={status.status}>
                        <S.DropdownItem>
                            {index < statuses.length - 1 && (
                                <S.ConnectingLine
                                    isCompleted={currentStatus !== undefined && currentStatus >= index + 2}
                                />
                            )}
                            <S.InvitationStepAndStatusContainer>
                                <S.InvitationStepContainer>
                                    <S.InvitationStepText>
                                        {currentStatus && currentStatus >= index + 1 ? <Check /> : index + 1}
                                    </S.InvitationStepText>
                                </S.InvitationStepContainer>
                                <S.InvitationStatusTextContainer>
                                    <S.InvitationStatusText>
                                        {status.status}
                                    </S.InvitationStatusText>
                                    <S.InvitationStatusDescription>
                                        {status.description}
                                    </S.InvitationStatusDescription>
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
