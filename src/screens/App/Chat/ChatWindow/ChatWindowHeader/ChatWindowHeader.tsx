import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { components } from "@invited-only/invited-only-api";
import * as S from "./ChatWindowHeader.style";
import { ToggleInvitationStatusDropdown } from "./ToggleInvitationStatusDropdown/ToggleInvitationStatusDropdown";
import { ApproveActionButton } from "./ApproveActionButton/ApproveActionButton";
import useConnectionRealtimeStatus from "./hooks/useConnectionRealtimeStatus";
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import ConfirmedBadge from 'src/assets/images/icons/event-confirm-badge.svg';

import { useAppNavigation } from "hooks/useAppNavigation";
import { whiteColor } from "constants/colors";
import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

interface ChatWindowHeaderProps {
    chat: components['schemas']['Chat'];
    isJoinedEvent?: boolean;
}

type connecitonStatus = 'connectionInitiated' | 'hostApprovePendingForGuest' | 'guestApprovePendingForHost' | 'attendingComplete' | 'completed' | 'rejected' | undefined;



const getInvitationStatus = (connectionStatus: components['schemas']['ConnectionRequest'] | undefined): connecitonStatus => {
    if (!connectionStatus?.hostConfirm && !connectionStatus?.guestConfirm) {
        return 'connectionInitiated';
    }
    if (connectionStatus?.hostConfirm && !connectionStatus?.guestConfirm) {
        return 'hostApprovePendingForGuest';
    }
    if (!connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
        return 'guestApprovePendingForHost';
    }
    if (connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
        return 'attendingComplete';
    }
    if (connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
        return 'completed';
    }
    if (connectionStatus?.hostConfirm && connectionStatus?.guestConfirm) {
        return 'rejected';
    }
}

export const ChatWindowHeader = ({ chat, isJoinedEvent }: ChatWindowHeaderProps) => {
    const { goBack } = useAppNavigation();
    const { userMetadata } = useAuthStore();
    const insets = useSafeAreaInsets();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const { connectionStatus, isLoading } = useConnectionRealtimeStatus({ chat });
    const { mutate: updateChatSeen } = invitedOnlyBackendApi.useMutation('patch', '/chat/{chatId}/seen')
    const invitationStatus = getInvitationStatus(connectionStatus);
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const renderActionButtonForHost = () => {
        if (invitationStatus === 'attendingComplete') {
            return <ConfirmedBadge />
        }
        if (invitationStatus === 'hostApprovePendingForGuest') {
            return <S.WaitingContainer>
                <ActivityIndicator size="small" color={whiteColor} />
                <S.WaitingText>Waiting</S.WaitingText>
            </S.WaitingContainer>
        }
        if (invitationStatus === 'connectionInitiated' || invitationStatus === 'guestApprovePendingForHost') {
            return <ApproveActionButton chat={chat} isJoinedEvent={isJoinedEvent || false} />
        }
    }

    const renderActionButtonForGuest = () => {
        if (invitationStatus === 'attendingComplete') {
            return <ConfirmedBadge />
        }
        if (invitationStatus === 'guestApprovePendingForHost') {
            return <S.WaitingContainer>
                <ActivityIndicator size="small" color={whiteColor} />
                <S.WaitingText>Waiting</S.WaitingText>
            </S.WaitingContainer>
        }
        if (invitationStatus === 'connectionInitiated' || invitationStatus === 'hostApprovePendingForGuest') {
            return <ApproveActionButton chat={chat} isJoinedEvent={isJoinedEvent || false} />
        }
    }

    return (
        <S.HeaderContainer style={{ paddingTop: insets.top }}>
            <S.HeaderRow>
                <S.BackButton onPress={() => {
                    updateChatSeen({ params: { path: { chatId: chat.id || '' } }, body: { userId: userMetadata.uid || '' } })
                    goBack();

                }}>
                    <ArrowLeft />
                </S.BackButton>

                <S.ProfileContainer>
                    <S.Avatar source={{ uri: isJoinedEvent ? chat.hostImageUrl : chat.guestImageUrl }} />
                    <S.NameContainer>
                        <S.NameText>{isJoinedEvent ? chat.hostName : chat.guestName}</S.NameText>
                    </S.NameContainer>
                </S.ProfileContainer>
                <S.MoreButton>
                    <View />
                </S.MoreButton>
            </S.HeaderRow>
            <S.HeaderRow>

                <S.HeaderCollapsedContainer>
                    <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.7}>
                        <S.InvitationStatusContainer>
                            <S.InvitationLeftContainer>
                                <S.StyledArrow isOpen={isDropdownVisible} />
                                <S.InvitationStatusTextContainer>
                                    <S.InvitationStatusText>Invitation Status</S.InvitationStatusText>
                                    <S.InvitationStatusDescription>Track status from invitation to approval</S.InvitationStatusDescription>
                                </S.InvitationStatusTextContainer>
                            </S.InvitationLeftContainer>
                            <S.InvitationRightContainer>
                                {isLoading ? <ActivityIndicator size="small" color={whiteColor} /> : isJoinedEvent ? renderActionButtonForGuest() : renderActionButtonForHost()}
                            </S.InvitationRightContainer>
                        </S.InvitationStatusContainer>
                    </TouchableOpacity>
                    <S.DropdownWrapper>
                        <ToggleInvitationStatusDropdown
                            isVisible={isDropdownVisible}
                            onClose={() => setIsDropdownVisible(false)}
                            invitationStatus={invitationStatus || ''}
                            isJoinedEvent={isJoinedEvent || false}
                        />
                    </S.DropdownWrapper>
                </S.HeaderCollapsedContainer>

            </S.HeaderRow>

        </S.HeaderContainer>
    );
};
