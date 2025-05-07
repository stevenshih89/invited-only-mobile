import {components} from '@invited-only/invited-only-api';
import * as S from './EventCard.style';
import HostBadge from './Components/HostBadge';
import Card from 'screens/App/Components/Card/Card';

import {useCardGesture} from 'screens/App/IO/components/InviteGuestsEvent/hooks/useCardGesture';
import {useAuthStore} from 'src/store/authStore';
import {CardActionsButtons} from 'screens/App/Components/Card/Components/CardActionButtons/CardActionsButtons';
import CardsNameAndDate from 'screens/App/Components/Card/Components/CardsNameAndDate/CardsNameAndDate';
import useSwipeCardAction from 'screens/App/Components/Card/hooks/useSwipeCardAction';
import {useNewConnectionModal} from 'screens/App/IO/components/InviteGuestsEvent/hooks/useNewConnectionModal';
import NewConnectionModal from 'screens/App/IO/components/InviteGuestsEvent/Components/NewConnectionModal/NewConnectionModal';

interface Props {
  onReject: () => void;
  onInvite: () => void;
  onSuperInvite: () => void;
  isTopCard: boolean;
  event: components['schemas']['EventData'];
  index: number;
  topIndex: number;
  uniqueEventCards: components['schemas']['EventData'][];
}

const EventCard = ({onInvite, onReject, isTopCard, event, index, topIndex, uniqueEventCards}: Props) => {
  const {userMetadata: user} = useAuthStore();
  const {createEventAttendee, swipeDataRes} = useSwipeCardAction();
  const {isModalVisible, closeModal, matchedCard} = useNewConnectionModal({swipeDataRes, allCards: uniqueEventCards});

  const {gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite} =
    useCardGesture({
      onSwipeLeft: () => {
        onReject();
        createEventAttendee({
          body: {
            guestId: user?.uid,
            hostId: event.hostId ?? '',
            eventId: event.uid,
            guestSwipe: 'left',
          },
        });
      },
      onSwipeRight: () => {
        onInvite();
        createEventAttendee({
          body: {
            guestId: user?.uid,
            hostId: event.hostId ?? '',
            eventId: event.uid,
            guestSwipe: 'right',
          },
        });
      },
      enabled: isTopCard,
      index: index,
      isTopCard: isTopCard,
      topIndex: topIndex,
    });

  const onClickReject = () => {
    if (isTopCard) {
      animateReject();
    }
  };

  const onClickInvite = () => {
    if (isTopCard) {
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
          <CardActionsButtons
            disabled={true}
            thisVersion={false}
            onReject={onClickReject}
            onSuperInvite={onClickSuperLike}
            onInvite={onClickInvite}
          />
        </S.CardBottomContainer>
      </S.CardContent>
      <NewConnectionModal cardData={matchedCard} visible={isModalVisible} onClose={closeModal} />
    </Card>
  );
};

export default EventCard;
