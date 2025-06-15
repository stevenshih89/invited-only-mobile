import * as S from './MyEventsEmptyFallback.style';

import MyEventsFallbackImage from 'src/assets/images/app/my-events-empty-fallback.png';

const MyEventsEmptyFallback = () => {
  return (
    <S.Container>
      <S.EmptyFallbackImage resizeMode="contain" source={MyEventsFallbackImage} />
      <S.FallbackTextContainer>
        <S.TextContainer>
          <S.FallbackTitleText>No events</S.FallbackTitleText>
        </S.TextContainer>
        <S.TextContainer>
          <S.FallbackInstructorTex>Create your first event to start connecting with guests.</S.FallbackInstructorTex>
        </S.TextContainer>
      </S.FallbackTextContainer>
    </S.Container>
  );
};

export default MyEventsEmptyFallback;
