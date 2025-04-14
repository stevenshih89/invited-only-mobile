import Card from 'screens/App/Components/Card/Card';

import {Event} from 'src/types/event';
import {Gesture} from 'react-native-gesture-handler';
import {useUser} from 'src/store/userStore';
import LockedFeatureComponent from 'screens/App/Components/LockedFeatureComponent/LockedFeatureComponent';
import {useCardGesture} from 'screens/App/IO/Components/InviteGuestsEvent/hooks/useCardGesture';
import {components} from 'src/api/v1';
import {Text} from 'react-native';

interface Props {
  onReject: () => void;
  onInvite: () => void;
  onSuperInvite: () => void;
  isTopCard: boolean;
  event: components['schemas']['EventData'];
  index: number;
}
const EventCard = ({onInvite, onReject, isTopCard, event, index}: Props) => {
  const {gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite} =
    useCardGesture({
      onSwipeLeft: onReject,
      onSwipeRight: onInvite,
      enabled: isTopCard,
      index: index,
      isTopCard: isTopCard,
      topIndex: 0,
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
      <Text>Event Card</Text>
    </Card>
  );
};

export default EventCard;
