import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import HostPremiumCard from '../../components/HostPremium/HostPremium';
import * as S from './MyPlan.style';
import WhatGetItem from './Components/WhatGetItem';
import { useUser } from 'src/store/userStore';
import CalendarIcon from 'assets/images/icons/calendar-event.svg';
import ExportIcon from 'assets/images/icons/export.svg';
import IOIcon from 'assets/images/icons/io.svg';
import EyeIcon from 'assets/images/icons/eye-solid.svg';
import FlashIcon from 'assets/images/icons/lightning-fill.svg';

interface WhatGetItem {
  title: string;
  description: string;
  icon: React.FC<SvgProps>;
  titleDescription: string;
}

const MyPlan: FC = () => {
  const { user: userData } = useUser();

  const whatGet: WhatGetItem[] = [
    {
      title: `Unlimited Table/Events ${userData?.accountType === 'host' ? 'Sharing' : 'Attendance'}`,
      titleDescription: userData?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited swipe (join)',
      description:
        userData?.accountType === 'host'
          ? 'Share Unlimited VIP Tables and Events to Invite.'
          : 'Swipe through unlimited events and connections. Join now and explore endless possibilities!',
      icon: CalendarIcon,
    },
    {
      title: 'Unlimited Invitations',
      titleDescription: userData?.accountType === 'host' ? 'Unlimited Invitations' : 'Unlimited invitations (getting invites)',
      description:
        userData?.accountType === 'host'
          ? 'Send Unlimited Invitations and Create Your Guest List'
          : 'Receive endless event invitations. Join now and never miss out!',
      icon: ExportIcon,
    },
    {
      title: `Unlimited Swipes`,
      titleDescription: userData?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited join offers',
      description:
        userData?.accountType === 'host'
          ? 'Enjoy endless connections to build your guests lists.'
          : 'Get unlimited opportunities to join exclusive events. Let`s start right now!',
      icon: IOIcon,
    },
    {
      title: `5 Super ${userData?.accountType === 'host' ? 'Invites' : 'Join'} a week.`,
      titleDescription: userData?.accountType === 'host' ? 'Unlimited Events Creation' : '5 Super join a week',
      description: `Send 5 super ${userData?.accountType === 'host' ? 'Invites' : 'Join'} each week.`,
      icon: FlashIcon,
    },
    {
      title: `See who wants to ${userData?.accountType === 'host' ? 'join' : 'invite'} you`,
      titleDescription: userData?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited Events Join',
      description:
        userData?.accountType === 'host'
          ? 'View interested guests who want to join you in real-time.'
          : 'View interested hosts who want to invite you in real-time.',
      icon: EyeIcon,
    },
  ];

  return (
    <S.Container>
      {userData.accountType === 'host' && <HostPremiumCard />}
      {userData?.accountType === 'host' && (
        <S.FeaturesCard>
          <S.ListColumnWrapper>
            <S.WhatYouGetText>What you {userData?.accountType === 'host' ? 'get' : 'have'}:</S.WhatYouGetText>
          </S.ListColumnWrapper>
          {whatGet.map(item => {
            return <WhatGetItem key={item.title} {...item} />;
          })}
        </S.FeaturesCard>
      )}
    </S.Container>
  );
};

export default MyPlan;
