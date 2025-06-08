import React, { FC } from 'react';

import * as S from './ModalStartInviting.style';
import ThreeGirls from 'assets/images/app/three-girls.png';
import { selectIsStartInvitingModalShowed, useAuthStore } from 'src/store/authStore';

const ModalStartInviting: FC = () => {
  const isStartInvitingModalShowed = useAuthStore(selectIsStartInvitingModalShowed);

  const { setIsStartInvitingModalShowed } = useAuthStore();

  const handleStartInviting = () => {
    setIsStartInvitingModalShowed(true);
  };

  if (isStartInvitingModalShowed) {
    return null;
  }

  return (
    <S.Container>
      <S.ModalWrapper>
        <S.ContentWrapper>
          <S.StyledBlurView />
          <S.Title>{`Let's Start Inviting`}</S.Title>
          <S.Description>{`Share your table or event and start swiping!Over 3000+ Guests are waiting for you`}</S.Description>
          <S.InfoContainer>
            <S.InfoWrapper>
              <S.StyledBlurView />
              <S.ImageWrapper>
                <S.ImageContainer>
                  <S.StyledImage source={ThreeGirls} resizeMode="cover" />
                </S.ImageContainer>
                <S.TextContainer>
                  <S.InfoTitle>{`Don't Miss Out Requests`}</S.InfoTitle>
                  <S.InfoDescription>{`Share your table and see who want to connect with you`}</S.InfoDescription>
                </S.TextContainer>
              </S.ImageWrapper>
            </S.InfoWrapper>
          </S.InfoContainer>
          <S.StyledButton testID="start-inviting-button" title="Start Inviting" onPress={handleStartInviting} />
        </S.ContentWrapper>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default ModalStartInviting;
