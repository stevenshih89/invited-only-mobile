import { useCardGesture } from '../../hooks/useCardGesture';
import * as S from './GuestCard.style';
import Card from 'screens/App/Components/Card/Card';
import { components } from 'src/api/v1';
import { CardActionsButtons } from 'screens/App/Components/Card/Components/CardActionButtons/CardActionsButtons';

interface Props {
  isTopCard: boolean;
  onReject: () => void;
  onSuperInvite: () => void;
  onInvite: () => void;
  guest: components['schemas']['User'];
  index: number;
  topIndex: number;
}

export const GuestCard = ({ isTopCard, guest, onInvite, onReject, onSuperInvite, index, topIndex }: Props) => {

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
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  return (
    <Card
      distanceFromTop={topIndex - index}
      uid={guest.uid || ''}
      backgroundUrls={guest.photos || []}
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
            <S.CardName>{guest.name}{guest.showAge && ','}</S.CardName>
            {guest.showAge && <S.CardGuestAge>{calculateAge(guest.birthday)}</S.CardGuestAge>}
          </S.CardNameAndAge>
          <CardActionsButtons disabled={true} onReject={onClickReject} onSuperInvite={onClickSuperLike} onInvite={onClickInvite} />
        </S.CardContent>
      )}
    </Card>
  );
};
