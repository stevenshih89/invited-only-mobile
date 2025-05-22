import {FC} from 'react';
import moment from 'moment';
import {components} from '@invited-only/invited-only-api';

import {ActivityIndicator} from '@ant-design/react-native';
import * as S from './InviteCard.style';
import RejectIcon from 'src/assets/images/icons/close.svg';
import CalendarIcon from 'src/assets/images/icons/calendar-event.svg';
import InviteIcon from 'src/assets/images/icons/Invite.svg';
import SuperInviteIcon from 'src/assets/images/icons/lightning-fill.svg';
import useSwipeCardAction from 'screens/App/Components/Card/hooks/useSwipeCardAction';
import {useAuthStore} from 'src/store/authStore';
import {whiteColor} from 'constants/colors';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {eventProfilePreviewPath, userProfilePreviewPath} from 'constants/pathLocations';

interface Props {
  event: components['schemas']['EventData'];
  updateInvitesData: (eventId: string, swipe: 'left' | 'right') => void;
}

const InviteCard: FC<Props> = ({event, updateInvitesData}) => {
  const totalGuests = (event.female || 0) + (event.male || 0) + (event.femaleFriend || 0);
  const {createEventAttendee, isPending} = useSwipeCardAction();

  const navigation = useAppNavigation();
  const isSuperInvite = true;
  const {userMetadata} = useAuthStore();

  const navigateToProfile = () => {
    //@ts-ignore
    navigation.navigate(userProfilePreviewPath, {
      userUid: event.hostId,
    });
  };

  const navigateToEventPreview = () => {
    //@ts-ignore
    navigation.navigate(eventProfilePreviewPath, {
      event,
    });
  };

  return (
    <S.Wrapper>
      <S.BackgroundImage source={{uri: event?.photos?.[0]?.image}}>
        <S.Content onPress={navigateToEventPreview}>
          <S.TouchableBadgeRow onPress={navigateToProfile}>
            <S.BlurOverlay />
            <S.HostImage source={{uri: event?.hostImage}} />
            <S.BadgeText>{event.hostName}</S.BadgeText>
            <S.CountBadge>
              <S.BadgeText>{totalGuests}</S.BadgeText>
            </S.CountBadge>
          </S.TouchableBadgeRow>
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
          {isPending ? (
            <ActivityIndicator size={'large'} color={whiteColor} />
          ) : (
            <S.ActionsRow>
              <S.IconButton
                onPress={() =>
                  createEventAttendee(
                    {
                      body: {
                        guestId: userMetadata?.uid || '',
                        hostId: event.hostId || '',
                        eventId: event.uid,
                        guestSwipe: 'left',
                      },
                    },
                    {onSuccess: () => updateInvitesData(event.uid, 'left')},
                  )
                }>
                <S.BlurOverlay />
                <RejectIcon width={12} height={12} />
              </S.IconButton>
              <S.IconButton>
                <S.BlurOverlay />
                <CalendarIcon width={12} height={12} />
              </S.IconButton>
              <S.InviteButton
                onPress={() =>
                  createEventAttendee(
                    {
                      body: {
                        guestId: userMetadata?.uid || '',
                        hostId: event.hostId || '',
                        eventId: event.uid,
                        guestSwipe: 'right',
                      },
                    },
                    {onSuccess: () => updateInvitesData(event.uid, 'right')},
                  )
                }>
                <S.BlurOverlay />
                <InviteIcon width={22} height={22} />
                <S.InviteText>Join</S.InviteText>
              </S.InviteButton>
            </S.ActionsRow>
          )}
        </S.Content>
        <S.GradientOverlay colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']} />
      </S.BackgroundImage>
    </S.Wrapper>
  );
};

export default InviteCard;
