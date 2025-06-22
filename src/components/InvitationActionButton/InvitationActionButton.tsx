import React from 'react';
import { ActivityIndicator } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './InvitationActionButton.style';
import ConfirmedBadge from 'src/assets/images/icons/event-confirm-badge.svg';
import { whiteColor } from 'constants/colors';
import { ApproveActionButton } from 'screens/App/Chat/ChatWindow/ChatWindowHeader/ApproveActionButton/ApproveActionButton';

interface InvitationActionButtonProps {
    connectionDetails: { guestId: string, hostId: string, eventId: string };
    isJoinedEvent: boolean;
    invitationStatus: string;
    updateConnectionStatusData: (data: { hostAction: 'confirm' | 'reject' | 'none', guestAction: 'confirm' | 'reject' | 'none' }) => void;
}

export const InvitationActionButton: React.FC<InvitationActionButtonProps> = ({
    connectionDetails,
    isJoinedEvent,
    invitationStatus,
    updateConnectionStatusData,
}) => {
    const renderActionButtonForHost = () => {
        if (invitationStatus === 'attendingComplete') {
            return <ConfirmedBadge />;
        }
        if (invitationStatus === 'hostApprovePendingForGuest') {
            return (
                <S.WaitingContainer>
                    <ActivityIndicator size="small" color={whiteColor} />
                    <S.WaitingText>Waiting</S.WaitingText>
                </S.WaitingContainer>
            );
        }
        if (invitationStatus === 'connectionInitiated' || invitationStatus === 'guestApprovePendingForHost') {
            return (
                <ApproveActionButton
                    connectionDetails={connectionDetails}
                    isJoinedEvent={isJoinedEvent}
                    updateConnectionStatusData={updateConnectionStatusData}
                />
            );
        }
        return null;
    };

    const renderActionButtonForGuest = () => {
        if (invitationStatus === 'attendingComplete') {
            return <ConfirmedBadge />;
        }
        if (invitationStatus === 'connectionInitiated') {
            return (
                <S.WaitingContainer>
                    <ActivityIndicator size="small" color={whiteColor} />
                    <S.WaitingText>Waiting</S.WaitingText>
                </S.WaitingContainer>
            );
        }
        if (invitationStatus === 'hostApprovePendingForGuest') {
            return (
                <ApproveActionButton
                    connectionDetails={connectionDetails}
                    isJoinedEvent={isJoinedEvent}
                    updateConnectionStatusData={updateConnectionStatusData}
                />
            );
        }
        return null;
    };

    return isJoinedEvent ? renderActionButtonForGuest() : renderActionButtonForHost();
}; 