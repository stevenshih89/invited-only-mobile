import * as S from './HostBadge.style';

interface Props {
  imageUrl: string | null;
  totalGuests: number;
  withGuestCount?: boolean;
}

const HostBadge = ({ imageUrl, totalGuests, withGuestCount = true }: Props) => {
  return (
    <S.HostBadgeContainer>
      <S.HostBadge>
        <S.HostInfoRow>
          <S.HostImage source={{ uri: imageUrl }} />
          <S.HostName>Host</S.HostName>
          {withGuestCount && (
            <S.GuestCountBadge>
              <S.GuestCountText>{totalGuests}</S.GuestCountText>
            </S.GuestCountBadge>
          )}
        </S.HostInfoRow>
      </S.HostBadge>
    </S.HostBadgeContainer>
  );
};

export default HostBadge;
