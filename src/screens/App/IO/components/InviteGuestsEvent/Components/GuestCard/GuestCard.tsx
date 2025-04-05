import Card from 'screens/App/Components/Card/Card';
import {User} from 'src/types/userInfo';
import * as S from './GuestCard.style';
import {useCardGesture} from '../../hooks/useCardGesture';

interface Props {
  isTopCard: boolean;
  onReject: () => void;
  onSuperInvite: () => void;
  onInvite: () => void;
  guest: User.Info;
  index: number;
  topIndex: number;
}

export const GuestCard = ({isTopCard, guest, onInvite, onReject, onSuperInvite, index, topIndex}: Props) => {
  const {gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite} =
    useCardGesture({
      onSwipeLeft: onReject,
      onSwipeRight: onInvite,
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
    console.log('click??');

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
      distanceFromTop={topIndex - index}
      uid={guest.uid}
      backgroundUrls={guest.photos}
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
            <S.CardName>{guest.name},</S.CardName>
            <S.CardGuestAge>{guest.age}</S.CardGuestAge>
          </S.CardNameAndAge>
          <S.ButtonsContainer>
            <S.RejectButton onPress={onClickReject}>
              <S.RejectIcon />
              <S.RejectButtonText>Reject</S.RejectButtonText>
            </S.RejectButton>
            <S.SuperInviteButton onPress={onClickSuperLike}>
              <S.SuperInviteIcon style={{opacity: 1}} />
              <S.SuperInviteButtonText>Super Invite</S.SuperInviteButtonText>
            </S.SuperInviteButton>
            <S.InviteButton onPress={onClickInvite}>
              <S.InviteIcon style={{opacity: 1}} />
              <S.InviteButtonText>Invite</S.InviteButtonText>
            </S.InviteButton>
          </S.ButtonsContainer>
        </S.CardContent>
      )}
    </Card>
  );
};
