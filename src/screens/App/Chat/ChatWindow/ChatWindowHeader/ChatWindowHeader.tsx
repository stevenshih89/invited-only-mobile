import React, { useContext, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { components } from '@invited-only/invited-only-api';

import * as S from './ChatWindowHeader.style';
import { ToggleInvitationStatusDropdown } from './ToggleInvitationStatusDropdown/ToggleInvitationStatusDropdown';
import { ApproveActionButton } from './ApproveActionButton/ApproveActionButton';
import useConnectionRealtimeStatus from './hooks/useConnectionRealtimeStatus';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import ConfirmedBadge from 'src/assets/images/icons/event-confirm-badge.svg';
import DotsHorizontalIcon from 'assets/images/icons/dots-horizontal.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { whiteColor } from 'constants/colors';
import { useAuthStore } from 'src/store/authStore';
import { useInvitationStatus } from 'hooks/useInvitationStatus';
import IOImage from 'src/assets/images/app/IO.png'
import { BackendApiContext } from 'contexts/BackendApiContex';

interface ChatWindowHeaderProps {
  chat: components['schemas']['Chat'];
  isJoinedEvent?: boolean;
  handleOpenModalChatHost: () => void;
  isSupportChat?: boolean;
}

export const ChatWindowHeader = ({ chat, isJoinedEvent, handleOpenModalChatHost, isSupportChat }: ChatWindowHeaderProps) => {
  const { goBack, navigate } = useAppNavigation();
  const { userMetadata } = useAuthStore();
  const insets = useSafeAreaInsets();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { connectionStatus, isLoading, updateConnectionStatusData } = useConnectionRealtimeStatus({ chat });
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { mutate: updateChatSeen } = invitedOnlyBackendApi.useMutation('patch', '/chat/{chatId}/seen');
  const { invitationStatus } = useInvitationStatus(connectionStatus);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

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
      return <ApproveActionButton chat={chat} isJoinedEvent={isJoinedEvent || false} updateConnectionStatusData={updateConnectionStatusData} />;
    }
  };

  const renderActionButtonForGuest = () => {
    if (invitationStatus === 'attendingComplete') {
      return <ConfirmedBadge />;
    }
    if (invitationStatus === 'guestApprovePendingForHost') {
      return (
        <S.WaitingContainer>
          <ActivityIndicator size="small" color={whiteColor} />
          <S.WaitingText>Waiting</S.WaitingText>
        </S.WaitingContainer>
      );
    }
    if (invitationStatus === 'connectionInitiated' || invitationStatus === 'hostApprovePendingForGuest') {
      return <ApproveActionButton chat={chat} isJoinedEvent={isJoinedEvent || false} updateConnectionStatusData={updateConnectionStatusData} />;
    }
  };

  return (
    <S.HeaderContainer style={{ paddingTop: insets.top }}>
      <S.HeaderRow>
        <S.BackButton
          onPress={() => {
            updateChatSeen({ params: { path: { chatId: chat.id || '' } }, body: { userId: userMetadata.uid || '' } });
            goBack();
          }}>
          <ArrowLeft />
        </S.BackButton>

        <S.ProfileContainer>
          <TouchableOpacity onPress={() => {
            navigate('/user-profile-preview', {
              userUid: isJoinedEvent ? chat.hostId || '' : chat.guestId || '',
            });
          }}>
            {isSupportChat ? <S.Avatar source={IOImage} /> : <S.Avatar source={{ uri: isJoinedEvent ? chat.hostImageUrl : chat.guestImageUrl }} />}
          </TouchableOpacity>
          <S.NameContainer>
            <S.NameText>{isJoinedEvent ? chat.hostName : chat.guestName}</S.NameText>
          </S.NameContainer>
        </S.ProfileContainer>
        {!isSupportChat ? <S.MoreButton onPress={isJoinedEvent ? handleOpenModalChatHost : handleOpenModalChatHost}>
          <DotsHorizontalIcon />
        </S.MoreButton> : <View style={{ marginRight: 20 }} />}
      </S.HeaderRow>
      {!isSupportChat && <S.HeaderRow>
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
                {isLoading ? (
                  <ActivityIndicator size="small" color={whiteColor} />
                ) : isJoinedEvent ? (
                  renderActionButtonForGuest()
                ) : (
                  renderActionButtonForHost()
                )}
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
      }
    </S.HeaderContainer>
  );
};
