import React from 'react';
import { EventApiResponse } from 'src/apiv2/queries/eventQueries';
import { View } from 'react-native';
import * as S from './EventListItem.style';
import ManageEventIcon from 'src/assets/images/icons/manage-event-icon.svg';

// Define more specific props based on the layout
interface EventListItemProps {
  event: EventApiResponse;

  imageUrl?: string; // URL for the main background image
  status?: string; // e.g., 'Active'
  attendees?: { avatarUrl?: string }[]; // List of attendee avatars (URLs)
  requestCount?: number; // Make optional or allow 0
  onPress?: (eventId: string) => void;
  onViewRequests?: (eventId: string) => void;
  onManage?: (eventId: string) => void;
}

// Helper to format date (you might have a utils function for this)
const formatDate = (dateString: string | Date) => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(dateString));
  } catch (e) {
    return 'Invalid Date';
  }
};

const EventListItem: React.FC<EventListItemProps> = ({
  event,
  imageUrl, // Receive imageUrl (could be undefined now)
  status = 'Unknown', // Default status
  attendees = [], // Default empty attendees
  requestCount, // Receive optional/0 count
  onPress,
  onViewRequests,
  onManage
}) => {

  const handlePress = () => onPress && onPress(event.id);
  const handleViewRequests = () => onViewRequests && onViewRequests(event.id);
  const handleManage = () => onManage && onManage(event.id);

  const displayedAttendees = attendees.slice(0, 2); // Show max 2 avatars + count
  const remainingAttendees = attendees.length - displayedAttendees.length;

  const showRequestsButton = requestCount !== undefined && requestCount > 0;

  return (
    <S.CardContainer onPress={handlePress} activeOpacity={0.8}>
      
      {imageUrl ? (
        <S.EventImageBackground
          source={{ uri: imageUrl }}
          resizeMode="cover"
        >
          <S.ImageOverlay>
            <S.StatusButton>
              <S.StatusText>{status}</S.StatusText>
            </S.StatusButton>
            <S.UserAvatarContainer>
              {displayedAttendees.map((attendee, index) => (
                <S.AvatarImage
                  key={index}
                  source={{ uri: attendee.avatarUrl || 'https://via.placeholder.com/32' }}
                />
              ))}
              {remainingAttendees > 0 && (
                <S.AvatarCountBadge>
                  <S.AvatarCountText>+{remainingAttendees}</S.AvatarCountText>
                </S.AvatarCountBadge>
              )}
            </S.UserAvatarContainer>
          </S.ImageOverlay>
        </S.EventImageBackground>
      ) : (
        <S.ImageFallbackContainer>
          <S.StatusButton>
            <S.StatusText>{status}</S.StatusText>
          </S.StatusButton>
          <S.FallbackText>No Image Available</S.FallbackText>
        </S.ImageFallbackContainer>
      )}

      <S.ContentContainer>
        <S.InfoContainer>
          <S.DateText>{formatDate(event.createdAt)}</S.DateText>
          <S.EventNameText>{event.name}</S.EventNameText>
          {event.description && <S.LocationText>{event.description}</S.LocationText>}
        </S.InfoContainer>

        <S.ActionsContainer>
          {showRequestsButton ? (
            <S.ViewRequestsButton onPress={handleViewRequests} activeOpacity={0.7}>
              <S.ViewRequestsText>View Requests</S.ViewRequestsText>
              {requestCount && <S.RequestCountBadge>
                <S.RequestCountText>{requestCount}
                </S.RequestCountText>
              </S.RequestCountBadge>}
            </S.ViewRequestsButton>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <S.ManageButton onPress={handleManage} activeOpacity={0.7}>
            <ManageEventIcon />
          </S.ManageButton>
        </S.ActionsContainer>
      </S.ContentContainer>
    </S.CardContainer>
  );
};

export default EventListItem; 