import * as S from './NotificationEmptyFallback.style';

const NotificationEmptyFallback = () => {
  return (
    <S.Container>
      <S.EmptyStateContainer>
        <S.TitleText>No Notifications</S.TitleText>
        <S.SubtitleText>
          Notifications for connections and events will be shown here
        </S.SubtitleText>
      </S.EmptyStateContainer>
    </S.Container>
  );
};

export default NotificationEmptyFallback;
