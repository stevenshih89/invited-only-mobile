import { FlatList, View } from 'react-native';
import * as S from './TabsList.style';
import {
  accountSettingPath,
  faqPath,
  helpAndSecurityPath,
  invitationsPath,
  myPlanPath,
  notificationSettingPath,
  profileEditingPath,
} from 'constants/pathLocations';
import { useAppNavigation } from 'hooks/useAppNavigation';
import PencilIcon from 'assets/images/icons/pencil.svg';
import FluentMoneyIcon from 'assets/images/icons/fluent-money.svg';
import TicketFillIcon from 'assets/images/icons/ticket-fill.svg';
import SettingFillIcon from 'assets/images/icons/setting-fill.svg';
import NotificationBellIcon from 'assets/images/icons/notification-bell.svg';
import SharpPrivacyTipIcon from 'assets/images/icons/sharp-privacy-tip.svg';
import MessageSolidIcon from 'assets/images/icons/message-solid.svg';
import ArrowRightSLineIcon from 'assets/images/icons/arrow-right-s-line.svg';

const TabsList = () => {
  const navigation = useAppNavigation();

  const tabsList = [
    {
      path: profileEditingPath,
      title: 'Edit Profile',
      icon: PencilIcon,
    },
    {
      path: myPlanPath,
      title: 'My Plan',
      icon: FluentMoneyIcon,
    },
    {
      path: invitationsPath,
      title: 'Invitations',
      icon: TicketFillIcon,
    },
    {
      path: accountSettingPath,
      title: 'Account Setting',
      icon: SettingFillIcon,
    },
    {
      path: notificationSettingPath,
      title: 'Notification Setting',
      icon: NotificationBellIcon,
    },
    {
      path: helpAndSecurityPath,
      title: 'Help & Security',
      icon: SharpPrivacyTipIcon,
    },
    {
      path: faqPath,
      title: 'FAQs',
      icon: MessageSolidIcon,
    },
  ];
  return (
    <FlatList
      data={tabsList}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      keyExtractor={item => item.path}
      renderItem={({ item }) => {
        if (!item.path) {
          return null;
        }
        const Icon = item.icon;
        return (
          <S.MenuItem testID="menu-item" onPress={() => navigation.navigate(item.path as never)} activeOpacity={0.8}>
            <S.MenuItemContent>
              <S.MenuItemIconContainer>
                <Icon width={24} height={24} />
              </S.MenuItemIconContainer>
              <S.MenuItemText>{item.title}</S.MenuItemText>
            </S.MenuItemContent>
            <ArrowRightSLineIcon />
          </S.MenuItem>
        );
      }}
    />
  );
};

export default TabsList;
