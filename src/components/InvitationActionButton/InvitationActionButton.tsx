import React from 'react';
import * as S from './InvitationActionButton.style';
import ConfirmedBadge from 'src/assets/images/icons/event-confirm-badge.svg';
import HourGlassIcon from 'assets/images/icons/hourglass-filled.svg';
import {ApproveActionButton} from 'screens/App/Chat/ChatWindow/ChatWindowHeader/ApproveActionButton/ApproveActionButton';

interface InvitationActionButtonProps {
    connectionDetails: {guestId: string; hostId: string; eventId: string};
    isJoinedEvent: boolean;
    invitationStatus: string;
    updateConnectionStatusData: (data: {hostAction: 'confirm' | 'reject' | 'none'; guestAction: 'confirm' | 'reject' | 'none'}) => void;
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
                    <HourGlassIcon width={16} height={16} />
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
                    <HourGlassIcon width={16} height={16} />
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
