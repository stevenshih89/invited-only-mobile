import Card from 'screens/App/Components/Card/Card';


import { useCardGesture } from 'screens/App/IO/components/InviteGuestsEvent/hooks/useCardGesture';
import { components } from 'src/api/v1';
import * as S from './EventCard.style';
import HostBadge from './Components/HostBadge';
import auth from '@react-native-firebase/auth';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { CardActionsButtons } from 'screens/App/Components/Card/Components/CardActionButtons/CardActionsButtons';
import CardsNameAndDate from 'screens/App/Components/Card/Components/CardsNameAndDate/CardsNameAndDate';
import { View } from 'react-native';

interface Props {
  onReject: () => void;
  onInvite: () => void;
  onSuperInvite: () => void;
  isTopCard: boolean;
  event: components['schemas']['EventData'];
  index: number;
}


const EventCard = ({ onInvite, onReject, isTopCard, event, index }: Props) => {
  const { gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite } =
    useCardGesture({
      onSwipeLeft: onReject,
      onSwipeRight: onInvite,
      enabled: isTopCard,
      index: index,
      isTopCard: isTopCard,
      topIndex: 0,
    });

  const { mutate: createEventAttendee } = invitedOnlyBackendApi.useMutation('post', '/eventAttendees/create', {
    onSuccess: () => {
      console.log('Event attendee created');
    },
    onError: () => {
      console.log('Error creating event attendee');
    },
  });
  console.log('event', event);
  const onClickReject = () => {
    if (isTopCard) {
      createEventAttendee({
        body: {
          guestId: auth().currentUser?.uid || '',
          hostId: event.hostId || '',
          eventId: event.uid || '',
          guest_swipe: 'left',
          guest_swipe_at: new Date().toISOString(),
        }

      });
      animateReject();
    }
  };

  const onClickInvite = () => {
    if (isTopCard) {
      createEventAttendee({
        body: {
          guestId: auth().currentUser?.uid || '',
          hostId: event.hostId || '',
          eventId: event.uid || '',
          guest_swipe: 'right',
          guest_swipe_at: new Date().toISOString(),
        }
      });
      animateInvite();
    }
  };

  const onClickSuperLike = () => {
    if (isTopCard) {
      animateSuperInvite();
    }
  };

  const totalGuests = (event.female || 0) + (event.male || 0) + (event.femaleFriend || 0);

  const date = event.date ? new Date(event.date) : undefined;
  return (
    <Card
      uid={event.uid}
      backgroundUrls={event.photos || []}
      index={index}
      isTopCard={isTopCard}
      onReject={onClickReject}
      onSuperInvite={onClickSuperLike}
      onInvite={onClickInvite}
      gestureHandler={gestureHandler}
      animatedStyle={animatedStyle}
      likeOpacityStyle={likeOpacityStyle}
      nopeOpacityStyle={nopeOpacityStyle}
      distanceFromTop={0}>
      <S.CardContent>
        <S.BadgeContainer>
          <HostBadge imageUrl={event.hostImage || null} totalGuests={totalGuests} />
        </S.BadgeContainer>
        <S.CardBottomContainer>
          <CardsNameAndDate eventName={event.name || ''} date={date} hour={event.hour || ''} />
          <CardActionsButtons disabled={true} onReject={onClickReject} onSuperInvite={onClickSuperLike} onInvite={onClickInvite} />
        </S.CardBottomContainer>
      </S.CardContent>
    </Card>
  );
};

export default EventCard;
