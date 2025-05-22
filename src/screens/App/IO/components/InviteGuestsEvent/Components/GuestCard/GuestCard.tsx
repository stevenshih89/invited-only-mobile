import {components} from '@invited-only/invited-only-api';
import moment from 'moment';
import {useCardGesture} from '../../hooks/useCardGesture';
import * as S from './GuestCard.style';
import Card from 'screens/App/Components/Card/Card';
import {CardActionsButtons} from 'screens/App/Components/Card/Components/CardActionButtons/CardActionsButtons';

interface Props {
  isTopCard: boolean;
  onReject: () => void;
  onSuperInvite: () => void;
  onInvite: () => void;
  guest: components['schemas']['User'];
  index: number;
  topIndex: number;
}

export const GuestCard = ({isTopCard, guest, onInvite, onReject, onSuperInvite, index, topIndex}: Props) => {
  const {gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite} =
    useCardGesture({
      onSwipeLeft: () => {
        onReject();
      },
      onSwipeRight: () => {
        onInvite();
      },
      enabled: isTopCard,
      index: index,
      isTopCard: isTopCard,
      topIndex,
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

  const calculateAge = (birthday: string | undefined) => {
    if (!birthday) return '';
    return moment().diff(moment(birthday, 'MM.DD.YYYY'), 'years');
  };
  return (
    <Card
      distanceFromTop={topIndex - index}
      uid={guest.uid || ''}
      backgroundUrls={guest.photos?.filter(photo => photo.image !== '' && photo.image !== null && photo.image !== undefined) || []}
      index={index}
      isTopCard={isTopCard}
      onInvite={onInvite}
      onReject={onReject}
      onSuperInvite={onSuperInvite}
      gestureHandler={gestureHandler}
      animatedStyle={animatedStyle}
      likeOpacityStyle={likeOpacityStyle}
      nopeOpacityStyle={nopeOpacityStyle}>
      {isTopCard && (
        <S.CardContent>
          <S.CardNameAndAge>
            <S.StyledCheckStar />
            <S.CardName>
              {guest.name}
              {guest.showAge && ','}
            </S.CardName>
            {guest.showAge && <S.CardGuestAge>{calculateAge(guest.birthday)}</S.CardGuestAge>}
          </S.CardNameAndAge>
          <CardActionsButtons disabled={false} onReject={onClickReject} onSuperInvite={onClickSuperLike} onInvite={onClickInvite} />
        </S.CardContent>
      )}
    </Card>
  );
};
