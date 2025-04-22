import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import * as S from './ToggleInvitationStatusDropdown.style';

// Define the possible invitation statuses - you might want to get these from your API types
// TODO: Replace with actual types/enum if available

interface ToggleInvitationStatusDropdownProps {
    isVisible: boolean;
    anchorElementRef: React.RefObject<View | null>;
    onClose: () => void;
    currentStatus: number; // Or maybe just pass all possible statuses
}

// Example statuses - replace with actual data from props or context
const statuses: { status: string, description: string }[] = [{ status: 'Invited, Connection Made', description: 'Invitation received and connection is established' }, { status: 'Host Approve', description: 'You need to approve the guest' }, { status: 'Pending Guest Confirmation', description: 'The guest needs to accept the invitation' }, { status: 'Attending Confirmed', description: 'The guest has accepted the invitation' }];

export const ToggleInvitationStatusDropdown: React.FC<ToggleInvitationStatusDropdownProps> = ({
    isVisible,
    anchorElementRef,
    onClose,
    currentStatus,
}) => {
    const [dropdownLayout, setDropdownLayout] = React.useState({ x: 0, y: 0, width: 0 });

    React.useEffect(() => {
        if (isVisible && anchorElementRef.current) {
            anchorElementRef.current.measureInWindow((x, y, width, height) => {
                setDropdownLayout({ x, y: y + height, width });
            });
        }
    }, [isVisible, anchorElementRef]);

    if (!isVisible) {
        return null;
    }

    return (
        <Modal transparent visible={isVisible} onRequestClose={onClose} animationType="none"> // Use none for custom positioning
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{ flex: 1, width: '100%' }}>
                    <S.DropdownContainer
                        style={{
                            transform: [{ translateX: -dropdownLayout.x }],
                            position: 'absolute',
                            top: dropdownLayout.y,
                            left: dropdownLayout.x,
                            width: 1000,
                        }}
                        onStartShouldSetResponder={() => true}
                    >
                        {statuses.map((status, index) => (
                            <React.Fragment key={status.status}>
                                <S.DropdownItem>
                                    <S.InvitationStepAndStatusContainer>
                                        <S.InvitationStepContainer>
                                            <S.InvitationStepText>
                                                {currentStatus >= index + 1 ? '✓' : index + 1}
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
                </View>
            </TouchableWithoutFeedback>
        </Modal >
    );
};
