import React from 'react';
import { components } from '@invited-only/invited-only-api';
import * as S from './EventListItem.style';
import EventListItemHostContent from './EventListItemHostContent/EventListItemHostContent';
import EventListItemGuestConetnt from './EventListItemGuestConetnt/EventListItemGuestConetnt';


interface EventListItemProps {
  event: components['schemas']['EventData'];
  imageUrl?: string;
  statusEvent?: string;
  attendees?: { avatarUrl?: string }[];
  requestCount?: number;
  onPress?: (eventId: string) => void;
  onViewRequests?: (eventId: string) => void;
  isReview?: boolean;
  isHost?: boolean;
}


const EventListItem: React.FC<EventListItemProps> = ({ event, imageUrl, statusEvent, attendees = [], requestCount, onPress, isReview, isHost }) => {
  const handlePress = () => onPress && onPress(event.uid);
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
      {isHost ? <EventListItemHostContent event={event} isReview={isReview || false} requestCount={requestCount || 0} /> : <EventListItemGuestConetnt event={event} />}

    </S.CardContainer>
  );
};

export default EventListItem;
