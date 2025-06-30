import * as S from './HostBadge.style';

interface Props {
    imageUrl: string | null;
    totalGuests: number;
    withGuestCount?: boolean;
}

const HostBadge = ({imageUrl, totalGuests, withGuestCount = true}: Props) => {
    return (
        <S.HostBadgeContainer testID="host-badge-container">
            <S.HostBadge testID="host-badge">
                <S.HostInfoRow testID="host-info-row">
                    <S.HostImage testID="host-image" source={{uri: imageUrl}} />
                    <S.HostName testID="host-name">Host</S.HostName>
                    {withGuestCount && (
                        <S.GuestCountBadge testID="guest-count-badge">
                            <S.GuestCountText testID="guest-count-text">{totalGuests}</S.GuestCountText>
                        </S.GuestCountBadge>
                    )}
                </S.HostInfoRow>
            </S.HostBadge>
        </S.HostBadgeContainer>
    );
};

export default HostBadge;
