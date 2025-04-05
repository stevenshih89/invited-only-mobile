import Card from 'screens/App/Components/Card/Card';
import {useCardGesture} from 'screens/App/IO/Components/InviteGuestsEvent/hooks/useCardGesture';

import {Event} from 'src/types/event';
import {Gesture} from 'react-native-gesture-handler';
import {useUser} from 'src/store/userStore';
import LockedFeatureComponent from 'screens/App/IO/Components/LockedFeatureComponent/LockedFeatureComponent';

interface Props {
  onReject: () => void;
  onInvite: () => void;
  onSuperInvite: () => void;
  isTopCard: boolean;
  event: Event.Info;
  index: number;
}
const EventCard = ({onInvite, onReject, isTopCard, event, index}: Props) => {
  const {user: userInfo} = useUser();
  const {gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite} =
    useCardGesture({
      onSwipeLeft: onReject,
      onSwipeRight: onInvite,
      enabled: isTopCard,
      index: index,
      isTopCard: isTopCard,
      topIndex: 0,
    });

  const disabledGesture = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate(() => {})
    .onEnd(() => {});
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
      isStatic
      uid={event.uid}
      backgroundUrls={[event.photos[0]]}
      index={index}
      isTopCard={isTopCard}
      onReject={onClickReject}
      onSuperInvite={onClickSuperLike}
      onInvite={onClickInvite}
      gestureHandler={userInfo.gender === 'man' ? disabledGesture : gestureHandler}
      animatedStyle={animatedStyle}
      likeOpacityStyle={likeOpacityStyle}
      nopeOpacityStyle={nopeOpacityStyle}
      distanceFromTop={0}>
      <LockedFeatureComponent hostImage={event.hostImage} hostName={event.hostName} />
    </Card>
  );
};

export default EventCard;
