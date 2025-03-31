import React, {FC, ReactNode, useContext, useEffect, useState} from 'react';
import {View, FlatList, ScrollView, Alert, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Badge} from '@rneui/themed';
import auth from '@react-native-firebase/auth';

//import components
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, earlyAccessPath, notificationsPath, notificationsStackPath, settingsPath} from 'constants/pathLocations';
import {blackColor, lightGray5Color, lightRedColor, orangeColor, whiteColor} from 'constants/colors.ts';
import {screenHeight, THIS_WEEK, ALL, THIS_MONTH, ACCEPTED_STATUS, screenWidth} from 'constants/common.ts';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes.tsx';
import {EventsDate} from 'contexts/EventsDate';
import {useChat} from '../../store/chatStore';
import {useUser} from '../../store/userStore';
import {showToast} from 'helpers/showToast.ts';

//import icons
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Logo from 'assets/images/icons/logo.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';
import AddIcon from 'assets/images/icons/add.svg';
import SettingsIcon from 'assets/images/icons/settings.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import CalendarCheckIcon from 'assets/images/icons/calendar-check.svg';
import InfoCircleGrayIcon from 'assets/images/icons/info-circle-gray.svg';
import InfoCircleOrangeIcon from 'assets/images/icons/info-circle-orange.svg';

import WIcon from 'assets/images/icons/W.svg';
import MIcon from 'assets/images/icons/M.svg';

//import images
import EventBG from 'assets/images/app/card-event-bg.png';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {EventData} from 'src/types/event';
import {useMyEvents} from 'src/store/myEvents';
import Config from 'react-native-config';
import {useDemoFlowStore} from '../../store/demoFlowStore';
import {Marquee} from '@animatereactnative/marquee';
import firebase from '@react-native-firebase/app';
import {useNotifications} from 'src/store/notificationsStore';
import * as S from './Header.style';
import {Satoshi700} from 'constants/fonts';
import {useCreateEvent} from 'hooks/useCreateEvent';
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
              <S.NotificationButton onPress={() => navigation.navigate('/notifications')} activeOpacity={0.7}>
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
