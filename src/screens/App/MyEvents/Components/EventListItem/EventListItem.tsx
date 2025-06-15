import React, {useState} from 'react';
import {components} from '@invited-only/invited-only-api';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import * as S from './EventListItem.style';
import EventListItemHostContent from './EventListItemHostContent/EventListItemHostContent';
import EventListItemGuestConetnt from './EventListItemGuestConetnt/EventListItemGuestConetnt';
import useConnectionRealtimeStatus from './hooks/useConnectionRealtimeStatus';
import {ApproveActionButton} from './ApproveActionButton/ApproveActionButton';
import {ToggleInvitationStatusDropdown} from './ToggleInvitationStatusDropdown/ToggleInvitationStatusDropdown';
import {Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';
import {useAuthStore} from 'src/store/authStore';
import {useInvitationStatus} from 'hooks/useInvitationStatus';
import ConfirmedBadge from 'src/assets/images/icons/event-confirm-badge.svg';

interface EventListItemProps {
  event: components['schemas']['EventData'];
  imageUrl?: string;
  statusEvent?: string;
  attendees?: {avatarUrl?: string}[];
  requestCount?: number;
  onPress?: (eventId: string) => void;
  onViewRequests?: (eventId: string) => void;
  isReview?: boolean;
  isHost?: boolean;
}

const EventListItem: React.FC<EventListItemProps> = ({
  event,
  imageUrl,
  statusEvent,
  attendees = [],
  requestCount,
  onPress,
  isReview,
  isHost,
}) => {
  const {userMetadata} = useAuthStore.getState();
  const handlePress = () => onPress && onPress(event.uid);
  const displayedAttendees = attendees.slice(0, 2);
  const remainingAttendees = attendees.length - displayedAttendees.length;
  const {connectionStatus, isLoading, updateConnectionStatusData} = useConnectionRealtimeStatus({event, guestId: userMetadata.uid || ''});
  const {invitationStatus} = useInvitationStatus(connectionStatus);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
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
      return (
        <ApproveActionButton
          event={event}
          guestId={userMetadata.uid || ''}
          isJoinedEvent={true}
          updateConnectionStatusData={updateConnectionStatusData}
        />
      );
    }
  };

  return (
    <S.CardContainer onPress={handlePress} activeOpacity={0.8}>
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
              {isLoading ? <ActivityIndicator size="small" color={whiteColor} /> : renderActionButtonForGuest()}
            </S.InvitationRightContainer>
          </S.InvitationStatusContainer>
        </TouchableOpacity>
        <ToggleInvitationStatusDropdown
          isVisible={isDropdownVisible}
          onClose={() => setIsDropdownVisible(false)}
          invitationStatus={invitationStatus || ''}
          isJoinedEvent={true}
        />
      </S.HeaderCollapsedContainer>
      {imageUrl ? (
        <S.EventImageBackground source={{uri: imageUrl}} resizeMode="cover">
          <S.ImageOverlay>
            <S.StatusButton>
              <S.StyledBlurView blurAmount={10} blurType="ultraThinMaterialDark" />
              <S.StatusText>{statusEvent}</S.StatusText>
            </S.StatusButton>
            <S.UserAvatarContainer>
              {isHost ? (
                <>
                  {displayedAttendees.map((attendee, index) => (
                    <S.AvatarImage key={index} source={{uri: attendee.avatarUrl || 'https://via.placeholder.com/32'}} />
                  ))}
                  {remainingAttendees > 0 && (
                    <S.AvatarCountBadge>
                      <S.AvatarCountText>+{remainingAttendees}</S.AvatarCountText>
                    </S.AvatarCountBadge>
                  )}
                </>
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingLeft: 6, paddingRight: 12}}>
                  <S.StyledBlurView blurAmount={10} blurType="ultraThinMaterialDark" />
                  <S.AvatarImage
                    style={{width: 22, height: 22, marginLeft: 0}}
                    source={{uri: event.hostImage || 'https://via.placeholder.com/32'}}
                  />
                  <Text
                    style={{
                      fontSize: RFValue(14, 932),
                      color: whiteColor,
                      fontFamily: Satoshi500,
                    }}>
                    {event.hostName}
                  </Text>
                </View>
              )}
            </S.UserAvatarContainer>
          </S.ImageOverlay>
        </S.EventImageBackground>
      ) : (
        <S.ImageFallbackContainer>
          <S.StatusButton>
            <S.StatusText>{statusEvent}</S.StatusText>
          </S.StatusButton>
          <S.FallbackText>No Image Available</S.FallbackText>
        </S.ImageFallbackContainer>
      )}
      {isHost ? (
        <EventListItemHostContent event={event} isReview={isReview || false} requestCount={requestCount || 0} />
      ) : (
        <EventListItemGuestConetnt event={event} />
      )}
    </S.CardContainer>
  );
};

export default EventListItem;
