import * as S from './JoinedEventsEmptyFallback.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import MyEventsFallbackImage from 'src/assets/images/app/joined-events-empty-fallback.png';

const JoinedEventsEmptyFallback = () => {
  return (
    <S.FallbackContainer>
      <S.Container>
        <S.EmptyFallbackImage resizeMode="contain" source={MyEventsFallbackImage} />
        <S.FallbackTextContainer>
          <S.TextContainer>
            <S.FallbackTitleText>{`Build Your Profile,\nGet More Invites`}</S.FallbackTitleText>
          </S.TextContainer>
          <S.TextContainer>
            <S.FallbackInstructorTex>Add details to attract invites!</S.FallbackInstructorTex>
          </S.TextContainer>
        </S.FallbackTextContainer>
      </S.Container>
      <ModalLockedAccount />
    </S.FallbackContainer>
  );
};

export default JoinedEventsEmptyFallback;
