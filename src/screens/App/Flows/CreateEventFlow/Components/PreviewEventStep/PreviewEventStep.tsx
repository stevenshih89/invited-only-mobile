import { View } from 'react-native';
import { useFormikContext } from 'formik';

import { components } from '@invited-only/invited-only-api';
import * as S from './PreviewEventStep.style';
import Card from 'screens/App/Components/Card/Card';
import HostBadge from 'screens/App/JoinEvents/Components/EventCard/Components/HostBadge';
import { CardActionsButtons } from 'screens/App/Components/Card/Components/CardActionButtons/CardActionsButtons';
import CardsNameAndDate from 'screens/App/Components/Card/Components/CardsNameAndDate/CardsNameAndDate';
import { useAuthStore } from 'src/store/authStore';
import invitedOnlyBackendApi from 'src/api/backend-api';

const PreviewEventStep = () => {
  const { values } = useFormikContext<Partial<components['schemas']['EventData']>>();


  const { userMetadata } = useAuthStore();
  const { data: user } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    enabled: !!userMetadata.uid,
    params: {
      path: {
        id: userMetadata.uid,
      },
    },
  });

  const photoUrls = [
    values.photos?.[0]?.image,
    ...(values.photos?.[1] ? [values.photos?.[1].image] : []),
    ...(values.photos?.[2] ? [values.photos?.[2].image] : []),
  ];

  const totalGuests = (values.maleFriend ?? 0) + (values.femaleFriend ?? 0);

  return (
    <S.Container>
      <S.BadgeContainer>
        <HostBadge imageUrl={user?.photos?.[0]?.image ?? null} totalGuests={totalGuests} withGuestCount={false} />
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
            <CardsNameAndDate eventName={values.name ?? ''} date={values.date ?? ''} hour={values.hour ?? ''} />
            <CardActionsButtons disabled={true} />
          </S.CardContent>
        </View>
      </Card>
    </S.Container>
  );
};
export default PreviewEventStep;
