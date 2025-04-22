import React from 'react';
import * as S from './HeaderBackButton.style';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';

const HeaderBackButton = () => {
  return (
    <S.Container testID="header-back-button">
      <ArrowLeft width={16} height={16} />
    </S.Container>
  );
};

export default HeaderBackButton;
