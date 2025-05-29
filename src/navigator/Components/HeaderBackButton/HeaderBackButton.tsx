import React from 'react';
import {ViewStyle, StyleProp} from 'react-native';
import * as S from './HeaderBackButton.style';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';

const HeaderBackButton = ({containerStyle}: {containerStyle?: StyleProp<ViewStyle>}) => {
  return (
    <S.Container testID="header-back-button" style={containerStyle}>
      <ArrowLeft width={16} height={16} />
    </S.Container>
  );
};

export default HeaderBackButton;
