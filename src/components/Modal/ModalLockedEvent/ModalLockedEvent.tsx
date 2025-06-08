import React, { FC } from 'react';

import { components } from '@invited-only/invited-only-api';
import * as S from './ModalLockedEvent.style';
import LockIcon from 'assets/images/icons/key-rounded.svg';


const ModalLockedEvent: FC<{ event: components['schemas']['EventData'] }> = ({ event }) => {

  if (event?.eventReviewed || event?.eventReviewed === undefined) {
    return null;
  }

  return (
    <S.Container>
      <S.ModalWrapper>
        <S.ContentWrapper>
          <S.StyledBlurView />
          <S.LockBadgeContainer>
            <S.LockBadge>
              <LockIcon />
              <S.LockText>Under Review</S.LockText>
            </S.LockBadge>
          </S.LockBadgeContainer>
          <S.Title>Event Under Review</S.Title>
          <S.Description>
            Thank you for your patience. Your event is being reviewed. We&apos;ll notify you once it&apos;s approved.
          </S.Description>
        </S.ContentWrapper>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default ModalLockedEvent;
