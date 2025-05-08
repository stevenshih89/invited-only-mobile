import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '@rneui/themed';

//import components
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as S from './Header.style';
import useUser from 'hooks/user/useUser';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { profileStackPath } from 'constants/pathLocations';
import { whiteColor } from 'constants/colors.ts';

//import icons
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Logo from 'assets/images/icons/logo.svg';
import ProfilePersonIcon from 'assets/images/icons/profile-person.svg';
import NotificationBellIcon from 'assets/images/icons/notification-bell.svg';

import { Satoshi700 } from 'constants/fonts';
import useGetNotifications from 'screens/App/Notifications/hooks/useGetNotifications';

interface HeaderTypeProps {
  headerType?: 'IO' | 'IO-JE' | 'myEvents' | 'profile' | 'request' | 'chat';
  showHeaderTop?: boolean;
  logoType?: string;
  badge?: boolean;
  setTypeEvents?: any;
  typeEvents?: boolean;
}

const Header: FC<HeaderTypeProps> = ({ badge, logoType, showHeaderTop = true }) => {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const { data: notifications } = useGetNotifications();

  const { user: userInfo } = useUser();

  const headerInsets = {
    paddingTop: insets.top,
  };

  return (
    <S.Container style={headerInsets}>
      {showHeaderTop && (
        <S.WrapperHeader>
          {logoType === 'logo' ? <Logo width={157} height={32} /> : <LogoPrimary width={157} height={32} />}
          <S.HeaderRight>
            <S.ProfileButton activeOpacity={0.7} onPress={() => navigation.navigate(profileStackPath as never)}>
              <ProfilePersonIcon width={24} height={24} />
            </S.ProfileButton>
            {badge && (
              <S.NotificationButton onPress={() => navigation.navigate('/notifications-stack')} activeOpacity={0.7}>
                <NotificationBellIcon width={32} height={32} />
                {notifications && notifications?.length > 0 && (
                  <Badge
                    value={notifications?.length || 0}
                    badgeStyle={S.BadgeStyle}
                    textStyle={{
                      color: whiteColor,
                      fontSize: RFValue(10, 932),
                      fontFamily: Satoshi700,
                    }}
                  />
                )}
              </S.NotificationButton>
            )}
          </S.HeaderRight>
        </S.WrapperHeader>
      )}
      <Text>{userInfo?.uid}</Text>
    </S.Container>
  );
};

export default Header;
