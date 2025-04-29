import React, {FC} from 'react';
import {SvgProps} from 'react-native-svg';
import * as S from './ListItem.style';
import {screenWidth} from 'constants/common';

interface ListItemProps {
  item: {
    title: string;
    description: string;
    icon: FC<SvgProps>;
  };
}

const ListItem: FC<ListItemProps> = ({item}) => {
  const Icon = item.icon;
  return (
    <S.Container>
      <S.Inner>
        <S.IconWrapper>
          <Icon width={screenWidth / 18} height={screenWidth / 18} />
        </S.IconWrapper>
        <S.Info>
          <S.Title>{item.title}</S.Title>
          <S.Description>{item.description}</S.Description>
        </S.Info>
      </S.Inner>
    </S.Container>
  );
};

export default ListItem;
