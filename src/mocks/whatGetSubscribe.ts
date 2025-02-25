import { SvgProps } from "react-native-svg";
import { useUser } from "src/store/userStore";
//icons
import CalendarIcon from 'assets/images/icons/calendar-white.svg';
import UnlimitedIcon from 'assets/images/icons/unlimited-new.svg';
import IOIcon from 'assets/images/icons/io.svg';
import EyeIcon from 'assets/images/icons/eye.svg';
import FlashIcon from 'assets/images/icons/flash-white.svg';

interface WhatGetItem {
  title: string;
  description: string;
  icon: React.FC<SvgProps>;
  titleDescription: string;
}

const {user: userInfo} = useUser();

export const whatGet: WhatGetItem[] = [
    {
      title: `Unlimited Events ${userInfo?.accountType === 'host' ? 'Creation' : 'Attendance'}`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited swipe (join)',
      description:
        userInfo?.accountType === 'host'
          ? 'Share Unlimited VIP Tables and Events to Invite.'
          : 'Swipe through unlimited events and connections. Join now and explore endless possibilities!',
      icon: CalendarIcon,
    },
    {
      title: 'Unlimited Invitations',
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Invitations' : 'Unlimited invitations (getting invites)',
      description:
        userInfo?.accountType === 'host'
          ? 'Send Unlimited Invitations and Create Your Guest List'
          : 'Receive endless event invitations. Join now and never miss out!',
      icon: UnlimitedIcon,
    },
    {
      title: `Unlimited ${userInfo?.accountType === 'host' ? 'Guest' : ''} Connections`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited join offers',
      description:
        userInfo?.accountType === 'host'
          ? 'Enjoy endless connections to build your guests lists.'
          : 'Get unlimited opportunities to join exclusive events. Let`s start right now!',
      icon: IOIcon,
    },
    {
      title: `5 Super ${userInfo?.accountType === 'host' ? 'Invites' : 'Join'} each week.`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : '5 Super join a week',
      description: `Send 5 super ${userInfo?.accountType === 'host' ? 'Invites' : 'Join'} each week.`,
      icon: FlashIcon,
    },
    {
      title: `See Who Wants to ${userInfo?.accountType === 'host' ? 'Join' : 'Invite'} You`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited Events Join',
      description:
        userInfo?.accountType === 'host'
          ? 'View interested guests who want to join you in real-time.'
          : 'View interested hosts who want to invite you in real-time.',
      icon: EyeIcon,
    },
  ];