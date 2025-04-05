import * as S from './HostBadge.style';

interface Props {
  imageUrl: string | null;
  totalGuests: number;
}

const HostBadge = ({imageUrl, totalGuests}: Props) => {
  return (
    <S.HostBadgeContainer>
      <S.HostBadge>
        <S.HostInfoRow>
          <S.HostImage source={imageUrl} />
          <S.HostName>Host</S.HostName>
          <S.GuestCountBadge>
            <S.GuestCountText>+{totalGuests}</S.GuestCountText>
          </S.GuestCountBadge>
        </S.HostInfoRow>
      </S.HostBadge>
    </S.HostBadgeContainer>
  );
};

export default HostBadge;
