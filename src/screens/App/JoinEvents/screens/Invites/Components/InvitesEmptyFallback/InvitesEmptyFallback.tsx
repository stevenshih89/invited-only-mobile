import React from 'react';
import * as S from './InvitesEmptyFallback.style';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import MyEventsFallbackImage from 'src/assets/images/app/invites-empty-fallback.png';

import useUser from 'hooks/user/useUser';

const InvitesEmptyFallback = () => {
    const {user} = useUser();
    const isUnderReview = user?.uid && !user?.accountReviewed && !user?.accountConfirmed;

    return (
        <S.FallbackContainer>
            <S.Container>
                <S.EmptyFallbackImage testID="empty-state-image" resizeMode="contain" source={MyEventsFallbackImage} />
                <S.FallbackTextContainer testID="empty-state-text-container">
                    <S.TextContainer>
                        <S.FallbackTitleText testID="empty-state-title">Build Your Profile, Get More Invites</S.FallbackTitleText>
                    </S.TextContainer>
                    <S.TextContainer>
                        <S.FallbackInstructorTex testID="empty-state-description">Add details to attract invites!</S.FallbackInstructorTex>
                    </S.TextContainer>
                </S.FallbackTextContainer>
            </S.Container>
            <ModalLockedAccount />
        </S.FallbackContainer>
    );
};

export default InvitesEmptyFallback;
