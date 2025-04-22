import React from 'react';
import {GestureResponderEvent} from 'react-native';
// Example icon set

import * as S from './EventRequearHeader.style';

interface EventRequearHeaderProps {
  title: string;
  onBackPress?: (event: GestureResponderEvent) => void;
  onRightActionPress?: (event: GestureResponderEvent) => void;
}

const EventRequearHeader: React.FC<EventRequearHeaderProps> = ({title, onBackPress, onRightActionPress}) => {
  return (
    <S.HeaderContainer>
      <S.LeftActionContainer onPress={onBackPress}>
        <S.ArrowLeftIcon />
      </S.LeftActionContainer>

      <S.TitleText>{title}</S.TitleText>

      <S.RightActionContainer onPress={onRightActionPress}>
        <S.InviteAllText>Invite All</S.InviteAllText>
      </S.RightActionContainer>
    </S.HeaderContainer>
  );
};

export default EventRequearHeader;
