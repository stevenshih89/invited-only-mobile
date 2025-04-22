import {FC} from 'react';
import {SvgProps} from 'react-native-svg';
import * as S from './WhatGetItem.style';
import {ControlledTooltip} from 'components/ControlledTooltip/ControlledTooltip';
import CheckIcon from 'assets/images/icons/check.svg';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';

interface WhatGetItemProps {
  title: string;
  description: string;
  icon: React.FC<SvgProps>;
  titleDescription: string;
}

const WhatGetItem: FC<WhatGetItemProps> = ({title, description, icon, titleDescription}) => {
  const Icon = icon;
  return (
    <S.ListItem key={title}>
      <S.RowTextAndIcon>
        <S.IconWrapper>
          <Icon width={16} height={16} />
        </S.IconWrapper>
        <S.ListText>{title}</S.ListText>
        <ControlledTooltip
          width={300}
          height={100}
          backgroundColor="lightGray5Color"
          withOverlay={false}
          popover={
            <S.TooltipWrapper>
              <S.TooltipTitleRow>
                <S.TooltipTitle>{titleDescription}</S.TooltipTitle>
                <CloseIcon />
              </S.TooltipTitleRow>
              <S.TooltipDescription>{description}</S.TooltipDescription>
            </S.TooltipWrapper>
          }>
          <InfoCircleIcon />
        </ControlledTooltip>
      </S.RowTextAndIcon>
      <CheckIcon />
    </S.ListItem>
  );
};

export default WhatGetItem;
