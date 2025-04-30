import React from 'react';
import * as S from './EventListItem.style';
import ManageEventIcon from 'src/assets/images/icons/manage-event-icon.svg';
import { components } from 'src/api/v1';
import { useAppNavigation } from 'hooks/useAppNavigation';

interface EventListItemProps {
  event: components['schemas']['EventData'];
  imageUrl?: string;
  statusEvent?: string;
  attendees?: { avatarUrl?: string }[];
  requestCount?: number;
  onPress?: (eventId: string) => void;
  onViewRequests?: (eventId: string) => void;
  isReview?: boolean;
}

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

const EventListItem: React.FC<EventListItemProps> = ({ event, imageUrl, statusEvent, attendees = [], requestCount, onPress, isReview }) => {
  const handlePress = () => onPress && onPress(event.uid);
  const { navigate } = useAppNavigation();
  const displayedAttendees = attendees.slice(0, 2);
  const remainingAttendees = attendees.length - displayedAttendees.length;


  return (
    <S.CardContainer onPress={handlePress} activeOpacity={0.8}>
      {imageUrl ? (
        <S.EventImageBackground source={{ uri: imageUrl }} resizeMode="cover">
          <S.ImageOverlay>
            <S.StatusButton>
              <S.StatusText>{statusEvent}</S.StatusText>
            </S.StatusButton>
            <S.UserAvatarContainer>
              {displayedAttendees.map((attendee, index) => (
                <S.AvatarImage key={index} source={{ uri: attendee.avatarUrl || 'https://via.placeholder.com/32' }} />
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
            <S.StatusText>{statusEvent}</S.StatusText>
          </S.StatusButton>
          <S.FallbackText>No Image Available</S.FallbackText>
        </S.ImageFallbackContainer>
      )}

      <S.ContentContainer>
        <S.InfoContainer>
          <S.DateText>{formatDate(event.createdAt || '')}</S.DateText>
          <S.EventNameText>{event.name}</S.EventNameText>
          {event.location && <S.LocationText>{event.location}</S.LocationText>}
        </S.InfoContainer>
        <S.ActionsContainer disabled={true}>
          <S.ViewRequestsButton
            disabled={!isReview}
            onPress={() => {
              navigate('/events/requests');
            }}
            activeOpacity={0.7}
          >
            <S.ViewRequestsText disabled={!isReview}>View Requests</S.ViewRequestsText>
            {requestCount ? (
              <S.RequestCountBadge>
                <S.RequestCountText>{requestCount}</S.RequestCountText>
              </S.RequestCountBadge>
            ) : null}
          </S.ViewRequestsButton>
          <S.ManageButton onPress={() => navigate('/events/manage-event', { eventId: event.uid })} activeOpacity={0.7} disabled={!isReview}  >
            <ManageEventIcon />
          </S.ManageButton>
        </S.ActionsContainer>
      </S.ContentContainer>
    </S.CardContainer>
  );
};

export default EventListItem;
