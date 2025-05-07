import {FC} from 'react';
import moment from 'moment';
import * as S from './InviteCard.style';
import {EventData} from 'src/types/event';
import RejectIcon from 'src/assets/images/icons/close.svg';
import CalendarIcon from 'src/assets/images/icons/calendar-event.svg';
import InviteIcon from 'src/assets/images/icons/Invite.svg';
import SuperInviteIcon from 'src/assets/images/icons/lightning-fill.svg';

interface Props {
  event: EventData;
}

const InviteCard: FC<Props> = ({event}) => {
  const totalGuests = (event.female || 0) + (event.male || 0) + (event.femaleFriend || 0);

  const isSuperInvite = true;

  return (
    <S.Wrapper>
      <S.BackgroundImage source={{uri: event?.photos?.[0]?.image}}>
        <S.Content>
          <S.BadgeRow>
            <S.BlurOverlay />
            <S.HostImage source={{uri: event?.hostImage}} />
            <S.BadgeText>{event.hostName}</S.BadgeText>
            <S.CountBadge>
              <S.BadgeText>{totalGuests}</S.BadgeText>
            </S.CountBadge>
          </S.BadgeRow>
          {isSuperInvite && (
            <S.BadgeRow isSuperInvite={isSuperInvite}>
              <S.BlurOverlay />
              <SuperInviteIcon width={12} height={12} />
              <S.BadgeText>Super Invite</S.BadgeText>
            </S.BadgeRow>
          )}
          <S.EventInfo>
            <S.EventName>{event.name}</S.EventName>
            <S.EventDate>{moment(event.date).format('DD MMMM, HH:mm')}</S.EventDate>
          </S.EventInfo>
          <S.ActionsRow>
            <S.IconButton>
              <S.BlurOverlay />
              <RejectIcon width={12} height={12} />
            </S.IconButton>
            <S.IconButton>
              <S.BlurOverlay />
              <CalendarIcon width={12} height={12} />
            </S.IconButton>
            <S.InviteButton>
              <S.BlurOverlay />
              <InviteIcon width={22} height={22} />
              <S.InviteText>Join</S.InviteText>
            </S.InviteButton>
          </S.ActionsRow>
        </S.Content>
        <S.GradientOverlay colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']} />
      </S.BackgroundImage>
    </S.Wrapper>
  );
};

export default InviteCard;
