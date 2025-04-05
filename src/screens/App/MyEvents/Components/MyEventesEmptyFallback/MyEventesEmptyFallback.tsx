import * as S from './MyEventsEmptyFallback.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

import MyEventsFallbackImage from 'src/assets/images/app/my-events-empty-fallback.png';
import CreateNewEventButton from '../CreateNewEventButton/CreateNewEventButton';
const MyEventsEmptyFallback = () => {
  return (
    <DefaultBackground>
      <S.Container>
        <S.EmptyFallbackImage source={MyEventsFallbackImage} />
        <S.FallbackTextContainer>
          <S.TextContainer>
            <S.FallbackTitleText>No events</S.FallbackTitleText>
          </S.TextContainer>
          <S.TextContainer>
            <S.FallbackInstructorTex>Create your first event to start connecting with guests.</S.FallbackInstructorTex>
          </S.TextContainer>
        </S.FallbackTextContainer>
        <CreateNewEventButton />
      </S.Container>
    </DefaultBackground>
  );
};

export default MyEventsEmptyFallback;
