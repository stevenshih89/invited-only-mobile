import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Badge} from '@rneui/themed';

//import components
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, settingsPath} from 'constants/pathLocations';
import {lightRedColor, whiteColor} from 'constants/colors.ts';
import {useUser} from '../../store/userStore';

import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Logo from 'assets/images/icons/logo.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';

import SettingsIcon from 'assets/images/icons/settings.svg';

import {useRoute} from '@react-navigation/native';

import {useNotifications} from 'src/store/notificationsStore';
import * as S from './Header.style';
import {Satoshi700} from 'constants/fonts';

import {Text} from 'react-native';

interface HeaderTypeProps {
  headerType?: 'IO' | 'IO-JE' | 'myEvents' | 'profile' | 'request' | 'chat';
  showHeaderTop?: boolean;
  logoType?: string;
  badge?: boolean;
  setTypeEvents?: any;
  typeEvents?: boolean;
}

const Header: FC<HeaderTypeProps> = ({badge, logoType, headerType, showHeaderTop = true}) => {
  const route = useRoute();

  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const {notificationsCount} = useNotifications();

  const {user: userInfo} = useUser();

  const headerInsets = {
    paddingTop: insets.top,
  };

  return (
    <S.Container style={headerInsets}>
      {showHeaderTop && (
        <S.WrapperHeader>
          {logoType === 'logo' ? <Logo width={157} height={32} /> : <LogoPrimary width={157} height={32} />}
          <S.HeaderRight>
            {badge && (
              <S.NotificationButton onPress={() => navigation.navigate('/notifications-stack')} activeOpacity={0.7}>
                <NotificationIcon width={32} height={32} />
                <Badge
                  value={notificationsCount}
                  badgeStyle={{
                    position: 'absolute',
                    borderColor: lightRedColor,
                    bottom: -4,
                    right: 0,
                    backgroundColor: lightRedColor,
                  }}
                  textStyle={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                  }}
                />
              </S.NotificationButton>
            )}
            {headerType === 'profile' && (
              <S.SettingsButton activeOpacity={0.7} onPress={() => navigation.navigate(commonStackPath, {screen: settingsPath} as never)}>
                <SettingsIcon width={32} height={32} />
              </S.SettingsButton>
            )}
          </S.HeaderRight>
        </S.WrapperHeader>
      )}
      <Text>{userInfo?.uid}</Text>
    </S.Container>
  );
};

export default Header;
