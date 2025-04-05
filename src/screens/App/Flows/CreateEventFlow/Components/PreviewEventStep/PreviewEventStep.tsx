import {View} from 'react-native';
import * as S from './PreviewEventStep.style';
import Card from 'screens/App/Components/Card/Card';
import {useFormikContext} from 'formik';
import {CreateEventFormValues} from '../../CreateEventFlow';
import {getDateString} from '../EventPlaceStep/EventDatePicker/EventDatePicker';
import {useUser} from 'src/store/userStore';
import HostBadge from 'screens/App/JoinEvents/Components/EventCard/Components/HostBadge';

const PreviewEventStep = () => {
  const {values} = useFormikContext<CreateEventFormValues>();

  const {user} = useUser();
  const photoUrls = [
    values.photos.main,
    ...(values.photos.photo2 ? [values.photos.photo2] : []),
    ...(values.photos.photo3 ? [values.photos.photo3] : []),
  ];
  console.log('userPhoto', user.photos);

  const totalGuests = values.male + values.female;

  return (
    <S.Container>
      <S.BadgeContainer>
        <HostBadge imageUrl={user.photos[0].image} totalGuests={totalGuests} />
      </S.BadgeContainer>
      <Card
        isTopCard
        isStatic
        backgroundUrls={photoUrls.map((photo, index) => {
          return {
            id: index,
            image: photo,
          };
        })}
        index={0}
        uid="1"
        distanceFromTop={0}>
        <View>
          <S.CardContent>
            <S.EventNameAndDate>
              <S.CardName>{values.eventName}</S.CardName>
              <S.CardGuestAge>
                {getDateString(values.date)}, {values.hour}
              </S.CardGuestAge>
            </S.EventNameAndDate>
            <S.ButtonsContainer>
              <S.RejectButton disabled>
                <S.RejectIcon />
                <S.RejectButtonText>Reject</S.RejectButtonText>
              </S.RejectButton>
              <S.SuperInviteButton disabled>
                <S.SuperInviteIcon style={{opacity: 1}} />
                <S.SuperInviteButtonText>Super Invite</S.SuperInviteButtonText>
              </S.SuperInviteButton>
              <S.InviteButton disabled>
                <S.InviteIcon style={{opacity: 1}} />
                <S.InviteButtonText>Invite</S.InviteButtonText>
              </S.InviteButton>
            </S.ButtonsContainer>
          </S.CardContent>
        </View>
      </Card>
    </S.Container>
  );
};
export default PreviewEventStep;
