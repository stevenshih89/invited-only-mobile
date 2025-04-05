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


type ItemProps = {
  title: string;
  allPeople: number;
  filledTo: number;
  image: any;
  numberBadge: number;
  date?: string;
  activeEvent?: string;
  hour?: string;
  girlInvitation?: number | string;
  icon?: ReactNode;
  index?: number;
  value?: string;
  event?: EventData;
};

const Header: FC<HeaderTypeProps> = ({setTypeEvents, badge, logoType, headerType, showHeaderTop = true}) => {
  const MARQUEE_SPEED = 0.4;
  const MARQUEE_SPACING = 30;
  const [eventStarting, setEventStarting] = useState<boolean>(false);

  const goToCreateEvent = useCreateEvent();


  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const {notificationsCount} = useNotifications();

  const {user: userInfo} = useUser();


  const {setActiveEvent, activeEvent, myEvents, setMyEvents, setLoadingMyEvents} = useMyEvents(state => state);

  const {activeEventDate, setActiveEventDate} = useContext(EventsDate);


  const handleGoToEarlyAccess = () => {
    navigation.navigate(commonStackPath, {screen: earlyAccessPath} as never);
  };

  useEffect(() => {
    if (userInfo?.uid && isHost) {
      // fetch my events
    }
  }, [headerType, userInfo?.uid]);

  useEffect(() => {
    if (userInfo?.accountType) {
      setTypeEvents && setTypeEvents(userInfo?.accountType?.toLowerCase() === 'host' ? false : true);
    }
  }, [userInfo?.accountType]);

  const DATAEventsJoining = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Upcoming Events',
      value: ALL,
      image: CalendarIcon,
      icon: <CalendarCheckIcon width={26} height={26} color={whiteColor} />,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'This week',
      value: THIS_WEEK,
      image: EventBG,
      icon: <WIcon color={whiteColor} />,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'This month',
      value: THIS_MONTH,
      image: EventBG,
      icon: <MIcon color={whiteColor} />,
    },
  ];

  const Item = ({title, numberBadge, image, date, hour, girlInvitation, event, index}: ItemProps) => (
    <S.EventButton
      onPress={() => {


      }}>
      <S.EventViewFlatList style={{borderColor: activeEvent?.id === event?.id ? whiteColor : lightGray5Color}}>
        <S.ImageEvent source={{uri: image}} />
        {numberBadge > 0 && (
          <Badge
            value={numberBadge}
            badgeStyle={{
              position: 'absolute',
              borderColor: blackColor,
              borderWidth: 1,
              bottom: -4,
              right: 0,
              backgroundColor: lightRedColor,
            }}
            textStyle={{
              color: whiteColor,
              fontFamily: Satoshi700,
            }}
          />
        )}
      </S.EventViewFlatList>
      <View style={{maxWidth: screenWidth / 5, overflow: 'hidden'}}>
        {title.length >= 10 ? (
          <Marquee spacing={MARQUEE_SPACING} speed={MARQUEE_SPEED}>
            <S.EventTitleText>{title}</S.EventTitleText>
          </Marquee>
        ) : (
          <S.EventTitleText numberOfLines={1}>{title}</S.EventTitleText>
        )}
      </View>
      <ModalEventRemindes
        girlInvitation={girlInvitation}
        eventStarting={eventStarting}
        setEventStarting={setEventStarting}
        time={hour}
        image={image}
        city={title}
        date={date}
      />
    </S.EventButton>
  );

  const ItemEventsJoining = ({title, image, date, icon, value}: ItemProps) => (
    <S.JoinEventButton
      onPress={() => {
        if (userInfo?.accountConfirmed) {
          setActiveEventDate(value);
        }
      }}>
      <S.EventViewFlatList style={{borderColor: activeEventDate === value ? whiteColor : lightGray5Color}}>
        <S.ImageEventsJoining>{icon}</S.ImageEventsJoining>
      </S.EventViewFlatList>
      <S.TextButton>{title}</S.TextButton>
      <ModalEventRemindes
        eventStarting={eventStarting}
        setEventStarting={setEventStarting}
        time="24h"
        image={image}
        city={title}
        date={date}
      />
    </S.JoinEventButton>
  );

  const isHost = userInfo?.accountType === 'host';

  const isEventFinished = (eventDate: string, eventHour: string) => {
    if (eventDate && eventHour) {
      const adjustedDate = moment(`${eventDate}, ${eventHour}`, 'DD.MM.YYYY, HH:mm').add(12, 'hours');
      if (adjustedDate.isBefore(moment())) {
        return true;
      } else {
        return false;
      }
    }
  };

  const goToNotifications = (): void => {
    // @ts-ignore
    navigation.navigate(notificationsStackPath, {screen: notificationsPath, userInfo});
  };

=======
>>>>>>> main
  const headerInsets = {
    paddingTop: insets.top,
  };

  return (
    <S.Container style={headerInsets}>

      {!userInfo?.accountConfirmed && headerType !== 'profile' && <S.OverlayContainer />}

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
