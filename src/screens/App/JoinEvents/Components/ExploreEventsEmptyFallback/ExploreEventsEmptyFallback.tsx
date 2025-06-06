import * as S from './ExploreEventsEmptyFallback.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import MyEventsFallbackImage from 'src/assets/images/app/joined-events-empty-fallback.png';

const ExploreEventsEmptyFallback = () => {
  return (
    <DefaultBackground>
      <S.Container testID="empty-state-container">
        <S.EmptyFallbackImage testID="empty-state-image" resizeMode="contain" source={MyEventsFallbackImage} />
        <S.FallbackTextContainer testID="empty-state-text-container">
          <S.TextContainer>
            <S.FallbackTitleText testID="empty-state-title">{`Build Your Profile,\nGet More Invites`}</S.FallbackTitleText>
          </S.TextContainer>
          <S.TextContainer>
            <S.FallbackInstructorTex testID="empty-state-description">Add details to attract invites!</S.FallbackInstructorTex>
          </S.TextContainer>
        </S.FallbackTextContainer>
      </S.Container>
    </DefaultBackground>
  );
};

export default ExploreEventsEmptyFallback;
