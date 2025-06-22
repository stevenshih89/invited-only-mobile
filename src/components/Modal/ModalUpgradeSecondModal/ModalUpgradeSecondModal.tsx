import React, {FC} from 'react';

import * as S from './ModalUpgradeSecondModal.style';
import ThreeGirls from 'assets/images/app/upgrade-modal-girls.png';
import {useFirstTimeShowStore} from 'src/store/firstTimeShowStore';
import {useAppNavigation} from 'hooks/useAppNavigation';

const ModalUpgradeSecondModal: FC<{open: boolean}> = ({open}) => {
    const {setIsFakeSwipeShowed} = useFirstTimeShowStore();
    const navigation = useAppNavigation();

    const handleShareEvent = () => {
        navigation.navigate('/profile/payment');
        setIsFakeSwipeShowed(true);
    };

    if (!open) {
        return null;
    }

    return (
        <S.Container>
            <S.ModalWrapper>
                <S.ContentWrapper>
                    <S.StyledBlurView />
                    <S.Title>{`Become a Premium and Let’s Start Inviting `}</S.Title>
                    <S.Description>{`Swipe to invite guests to your event. Over 3000+ guests are waiting for you.`}</S.Description>
                    <S.InfoContainer>
                        <S.InfoWrapper>
                            <S.StyledBlurView />
                            <S.ImageWrapper>
                                <S.ImageContainer>
                                    <S.StyledImage source={ThreeGirls} resizeMode="cover" />
                                </S.ImageContainer>
                                <S.TextContainer>
                                    <S.InfoTitle>{`Don't Miss Out Requests`}</S.InfoTitle>
                                    <S.InfoDescription>{`See who wants to join your event or table`}</S.InfoDescription>
                                </S.TextContainer>
                            </S.ImageWrapper>
                        </S.InfoWrapper>
                    </S.InfoContainer>
                    <S.StyledButton testID="start-inviting-button" title="Share a Table or Event" onPress={handleShareEvent} />
                </S.ContentWrapper>
            </S.ModalWrapper>
        </S.Container>
    );
};

export default ModalUpgradeSecondModal;
