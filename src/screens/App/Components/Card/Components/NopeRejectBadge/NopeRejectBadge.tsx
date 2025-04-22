import * as S from './NopeRejectBadge.style';

interface NopeRejectBadgeProps {
    text: string;
}

export const NopeRejectBadge = ({ text }: NopeRejectBadgeProps) => {
    return (
        <S.NopeRejectBadgeContainer>
            <S.NopeRejectBadgeText>{text}</S.NopeRejectBadgeText>
            <S.LockedBadgeBlurView blurType="light" blurAmount={2} />
        </S.NopeRejectBadgeContainer>
    );
};