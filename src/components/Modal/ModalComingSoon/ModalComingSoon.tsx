import React, { FC } from 'react';
import * as S from './ModalComingSoon.style';
import LockIcon from 'assets/images/icons/key-rounded.svg';

const ModalComingSoon: FC = () => {
  return (
    <S.Container>
      <S.ModalWrapper>
        <S.ContentWrapper>
          <S.StyledBlurView />
          <S.LockBadgeContainer>
            <S.LockBadge>
              <LockIcon />
              <S.LockText>Locked</S.LockText>
            </S.LockBadge>
          </S.LockBadgeContainer>
          <S.Title>Coming Soon</S.Title>
          <S.CountdownContainer>
            <S.CountdownWrapper>
              <S.StyledBlurView />
              <S.StyledCountDown
                until={50000}
                showSeparator
                timeToShow={['H', 'M', 'S']}
                onFinish={() => { }}
                onPress={() => { }}
                size={36}
              />
            </S.CountdownWrapper>
          </S.CountdownContainer>
        </S.ContentWrapper>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default ModalComingSoon;
