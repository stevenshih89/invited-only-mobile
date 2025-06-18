import { components } from '@invited-only/invited-only-api';
import moment from 'moment';

import { ComponentType } from 'react';
import { useCardGesture } from '../../hooks/useCardGesture';
import * as S from './GuestCard.style';
import Card from 'screens/App/Components/Card/Card';
import { CardActionsButtons, CardActionsButtonsProps } from 'screens/App/Components/Card/Components/CardActionButtons/CardActionsButtons';
import useUser from 'hooks/user/useUser';

interface Props {
  isTopCard: boolean;
  onReject: () => void;
  onSuperInvite: () => void;
  onInvite: () => void;
  guest: components['schemas']['User'];
  index: number;
  topIndex: number;
  overrideShowDots?: boolean
  raiseShuffle?: boolean
  actionButtonsOverride?: boolean
  CardActionsComponent?: ComponentType<CardActionsButtonsProps>;

}

export const GuestCard = ({ isTopCard, guest, onInvite, onReject, onSuperInvite, index, topIndex, overrideShowDots, raiseShuffle, actionButtonsOverride, CardActionsComponent }: Props) => {
  const { user } = useUser();
  const isLocked = user?.uid && !user?.accountPremium;

  const { gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite } =
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
      raiseShuffle,
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
      showDots={!isLocked || overrideShowDots}
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

      {((!isLocked && isTopCard) || (actionButtonsOverride && isTopCard)) && (
        <S.CardContent>
          <S.CardNameAndAge>
            <S.StyledCheckStar />
            <S.CardName>
              {guest.name}
              {guest.showAge && ','}
            </S.CardName>
            {guest.showAge && <S.CardGuestAge>{calculateAge(guest.birthday)}</S.CardGuestAge>}
          </S.CardNameAndAge>
          {CardActionsComponent ? <CardActionsComponent
            disabled={false} onReject={onClickReject} onSuperInvite={onClickSuperLike} onInvite={onClickInvite} /> : <CardActionsButtons
            disabled={false} onReject={onClickReject} onSuperInvite={onClickSuperLike} onInvite={onClickInvite} />}
        </S.CardContent>
      )}
    </Card>
  );
};
