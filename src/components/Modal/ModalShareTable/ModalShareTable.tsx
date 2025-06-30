import React, {FC} from 'react';

import * as S from './ModalShareTable.style';
import UpgradeModalGirls from 'assets/images/app/upgrade-modal-girls.png';
import {useAppNavigation} from 'hooks/useAppNavigation';

const ModalShareTable: FC = () => {
    const navigation = useAppNavigation();

    const handleShareTable = () => {
        navigation.navigate('/event-creating-stack' as never);
    };

    return (
        <S.Container>
            <S.ModalWrapper>
                <S.ContentWrapper>
                    <S.StyledBlurView />
                    <S.Title>{`Let's Start Inviting`}</S.Title>
                    <S.Description>{`Swipe to invite guests to your event. Over 3000+ guests are waiting for you.`}</S.Description>
                    <S.InfoContainer>
                        <S.InfoWrapper>
                            <S.StyledBlurView />
                            <S.ImageWrapper>
                                <S.ImageContainer>
                                    <S.StyledImage source={UpgradeModalGirls} resizeMode="cover" />
                                </S.ImageContainer>
                                <S.TextContainer>
                                    <S.InfoTitle>{`Don't Miss Out Requests`}</S.InfoTitle>
                                    <S.InfoDescription>{`See who wants to join your event or table`}</S.InfoDescription>
                                </S.TextContainer>
                            </S.ImageWrapper>
                        </S.InfoWrapper>
                    </S.InfoContainer>
                    <S.StyledButton testID="start-inviting-button" title="Share a Table or Event" onPress={handleShareTable} />
                </S.ContentWrapper>
            </S.ModalWrapper>
        </S.Container>
    );
};

export default ModalShareTable;
