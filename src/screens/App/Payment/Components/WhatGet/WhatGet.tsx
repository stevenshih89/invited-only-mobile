import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { FC } from 'react';
import * as S from './WhatGet.style';
import { ControlledTooltip } from 'components/ControlledTooltip/ControlledTooltip';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import CloseCircleIcon from 'assets/images/icons/close-circle.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import { lightGray5Color } from 'constants/colors';
import CalendarIcon from 'assets/images/icons/calendar-event.svg';
import IOIcon from 'assets/images/icons/io.svg';
import ExportIcon from 'assets/images/icons/export.svg';
import FlashIcon from 'assets/images/icons/lightning-fill.svg';
import EyeIcon from 'assets/images/icons/eye-solid.svg';

interface WhatGetItem {
  title: string;
  description: string;
  icon: FC<SvgProps>;
}

interface WhatGetProps {
  duration: number;
  durationName: string;
  fullPrice?: string;
}

const WhatGet: FC<WhatGetProps> = ({ duration, durationName, fullPrice }) => {
  const data: WhatGetItem[] = [
    {
      title: 'Unlimited Tables/Events Sharing',
      description: 'Share Unlimited VIP Tables and Events to Invite.',
      icon: CalendarIcon,
    },
    {
      title: 'Unlimited Invitations',
      description: 'Send Unlimited Invitations and Create Your Guest List',
      icon: ExportIcon,
    },
    {
      title: 'Unlimited Swipes',
      description: 'Enjoy endless connections to build your guests lists.',
      icon: IOIcon,
    },
    {
      title: '5 Super Invites a week',
      description: 'Send 5 super invites each week.',
      icon: FlashIcon,
    },
    {
      title: 'See who wants to join you',
      description: 'View interested guests who want to join you in real-time.',
      icon: EyeIcon,
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.HeaderText>{duration + ' ' + durationName.charAt(0).toUpperCase() + durationName.slice(1, durationName.length)}</S.HeaderText>
        <S.HeaderText>{fullPrice}</S.HeaderText>
      </S.Header>
      <S.SubHeader>
        <S.HeaderText>What you get:</S.HeaderText>
        <S.HeaderText>Premium</S.HeaderText>
      </S.SubHeader>
      <View>
        {data.map((item, index) => {
          return (
            <S.ListItemContainer key={item.title} isLast={index + 1 === data.length}>
              <S.ItemLeftSection>
                <S.IconContainer>
                  <item.icon />
                </S.IconContainer>
                <S.ItemTitle>{item.title}</S.ItemTitle>
                <ControlledTooltip
                  width={300}
                  height={100}
                  backgroundColor={lightGray5Color}
                  withOverlay={false}
                  popover={
                    <S.TooltipContent>
                      <S.TooltipHeader>
                        <S.TooltipTitle>{item.title}</S.TooltipTitle>
                        <CloseCircleIcon />
                      </S.TooltipHeader>
                      <S.TooltipDescription>{item.description}</S.TooltipDescription>
                    </S.TooltipContent>
                  }>
                  <InfoCircleIcon />
                </ControlledTooltip>
              </S.ItemLeftSection>
              <CheckIcon />
            </S.ListItemContainer>
          );
        })}
      </View>
    </S.Container>
  );
};

export default WhatGet;
