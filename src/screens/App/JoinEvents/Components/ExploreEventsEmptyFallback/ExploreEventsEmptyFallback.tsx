import * as S from './ExploreEventsEmptyFallback.style';
import EventCardLocked from 'src/assets/images/app/empty-card-fallback-event.png';
import useUser from 'hooks/user/useUser';
import MapLoader from 'screens/App/IO/components/MapLoader/MapLoader';

const ExploreEventsEmptyFallback = () => {
  const { user } = useUser();
  const isLocked = user?.uid && !user?.accountReviewed;
  if (isLocked) {
    return (
      <S.Container>
        <S.LockedContainer source={EventCardLocked} resizeMode="contain" />
      </S.Container>
    )
  }
  return (
    <S.Container>
      <MapLoader />
      <S.MapLoaderText>That&apos;s all for now!</S.MapLoaderText>
      <S.MapLoaderSubText>Please check later – new events will be listed soon.</S.MapLoaderSubText>
    </S.Container>
  );
};

export default ExploreEventsEmptyFallback;
