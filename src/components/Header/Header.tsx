import React, {FC, useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, FlatList, ScrollView, Alert} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Badge} from '@rneui/themed';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'components/Header/styles.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {
  commonStackPath,
  eventCreatingStackPath,
  joinEventsPath,
  notificationsPath,
  notificationsStackPath,
  settingsPath,
} from 'constants/pathLocations';
import {ANY_DAY, screenHeight, THIS_WEEKEND, TODAY, ALL, THIS_MONTH} from 'constants/common.ts';
import {blackColor, grayColor, lightGray2Color, lightGray5Color, orangeColor, whiteColor} from 'constants/colors.ts';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes.tsx';
import {EventsDate} from 'contexts/EventsDate';
import {useChat} from '../../store/chatStore';
import {useUser} from '../../store/userStore';
import {useRequest} from '../../store/requestsStore';
import {showToast} from 'helpers/showToast.ts';

//import icons
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Logo from 'assets/images/icons/logo.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';
import AddIcon from 'assets/images/icons/add.svg';
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';
import SettingsIcon from 'assets/images/icons/settings.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import InfoCircleGrayIcon from 'assets/images/icons/info-circle-gray.svg';
import InfoCircleOrangeIcon from 'assets/images/icons/info-circle-orange.svg';

//import images
import EventBG from 'assets/images/app/card-event-bg.png';
import {EventContext} from 'contexts/EventContext';
import {Satoshi500} from 'constants/fonts';
import {useMyEvents} from "../../store/myEvents";

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
};

const Header: FC<HeaderTypeProps> = ({typeEvents, setTypeEvents, badge, logoType, headerType, showHeaderTop = true}) => {
  const [eventStarting, setEventStarting] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const styles = useStyles();

  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const selectedChat = useChat((i: any) => i?.activeEvent);
  const setChat = useChat((i: any) => i.setActiveEvent);
  const eventFilter = useChat((i: any) => i?.eventFilter);
  const eventsImJoining = useMyEvents((i: any) => i?.eventsImJoining);
  const requestFilter = useRequest((i: any) => i?.requestFilter);
  const setEventFilter = useChat((i: any) => i?.setEventFilter);
  const setRequestFilter = useRequest((i: any) => i?.setRequestFilter);
  const userHost = useUser((i: any) => i?.user);

  const {myEvents, setActiveEvent, activeEvent} = useContext(EventContext);
  const {activeEventDate, setActiveEventDate} = useContext(EventsDate);

  const goToCreateEvent = (): void => {
    if (!userHost?.accountConfirmed) {
      return;
    }
    navigation.navigate(eventCreatingStackPath);
  };

  const fetchUserInfo = async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();

        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const DATAEventsJoining = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'All',
      allPeople: 4,
      filledTo: 3,
      image: CalendarIcon,
      numberBadge: 0,
      date: '12.12.12',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'This weekend',
      allPeople: 0,
      filledTo: 0,
      image: EventBG,
      numberBadge: 0,
      date: '12.12.12',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'This month',
      allPeople: 4,
      filledTo: 2,
      image: EventBG,
      numberBadge: 0,
      date: '12.12.12',
    },
  ];

  const DATARequestGuest = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'All',
      allPeople: 4,
      filledTo: 3,
      image: CalendarIcon,
      numberBadge: 0,
      date: '12.12.12',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'New',
      allPeople: 0,
      filledTo: 0,
      image: EventBG,
      numberBadge: 0,
      date: '12.12.12',
    },
  ];

  const Item = ({title, filledTo, numberBadge, image, allPeople, date, hour, girlInvitation, activeEvent}: ItemProps) => (
    <TouchableOpacity
      onPress={() => {
        setChat(`${activeEvent}`);
        // setEventStarting(true);
      }}
      style={styles.eventButton}>
      <View style={[styles.eventViewFlatList, {borderColor: activeEvent === selectedChat ? whiteColor : lightGray5Color}]}>
        <Image source={{uri: image}} style={styles.imageEvent} />
        {numberBadge > 0 && <Badge value={numberBadge} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />}
      </View>
      <Text style={styles.textButton}>{title}</Text>
      {allPeople > 0 && (
        <View style={styles.numberPeopleOnEvent}>
          <PeopleIcon />
          <Text style={styles.textNumberPeopleOnEvent}>
            {filledTo}/{allPeople}
          </Text>
        </View>
      )}
      <ModalEventRemindes
        girlInvitation={girlInvitation}
        eventStarting={eventStarting}
        setEventStarting={setEventStarting}
        time={hour}
        image={image}
        city={title}
        date={date}
      />
    </TouchableOpacity>
  );

  const ItemEventsJoining = ({title, numberBadge, image, date}: ItemProps) => (
    <TouchableOpacity onPress={() => setEventFilter(title)} style={styles.eventButton}>
      <View style={[styles.eventViewFlatList, {borderColor: eventFilter === title ? whiteColor : lightGray5Color}]}>
        <View style={styles.imageEventsJoining}>
          <CalendarIcon width={26} height={26} />
        </View>
      </View>
      <Text style={styles.textButton}>{title}</Text>
      <ModalEventRemindes eventStarting={eventStarting} setEventStarting={setEventStarting} time="24h" image={image} city={title} date={date} />
    </TouchableOpacity>
  );

  const ItemRequests = ({title, numberBadge, image, date}: ItemProps) => (
    <TouchableOpacity onPress={() => setRequestFilter(title)} style={styles.eventButton}>
      <View style={[styles.eventViewFlatList, {borderColor: requestFilter === title ? whiteColor : lightGray5Color}]}>
        <View style={styles.imageEventsJoining}>
          <CalendarIcon width={26} height={26} />
        </View>
      </View>
      <Text style={styles.textButton}>{title}</Text>
      <ModalEventRemindes eventStarting={eventStarting} setEventStarting={setEventStarting} time="24h" image={image} city={title} date={date} />
    </TouchableOpacity>
  );

  const isEventFinished = (eventDate: string) => {
    const parts = eventDate.split('.');

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);

    const inputDate = new Date(year, month, day);

    const currentDate = new Date();

    if (inputDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const goToNotifications = (): void => {
    // @ts-ignore
    navigation.navigate(notificationsStackPath, {screen: notificationsPath});
  };

  const headerInsets = {
    paddingTop: insets.top,
  };

  const handleCheckType = (type: 'IO' | 'myEvents' | 'profile' | 'request' | 'chat' | 'IO-JE' | undefined) => {
    const isHost = userInfo?.accountType.toLowerCase() === 'host';

    switch (type) {
      case 'IO':
        return (
          <>
            {isHost ? (
              <ScrollView horizontal scrollEnabled={!!myEvents?.length} contentContainerStyle={{marginVertical: screenHeight / 50}}>
                <TouchableOpacity style={styles.eventButton} onPress={goToCreateEvent}>
                  <View style={styles.eventView}>
                    <AddIcon width={26} height={26} />
                  </View>
                  <Text style={styles.textButton}>Create event</Text>
                </TouchableOpacity>
                {/*@ts-ignore*/}
                <TouchableOpacity
                  onPress={() => {
                    if (!userHost?.accountConfirmed) {
                      return;
                    }
                    navigation.navigate(joinEventsPath);
                  }}
                  style={styles.eventButton}>
                  <View style={styles.eventView}>
                    <CalendarSearchIcon width={26} height={26} />
                  </View>
                  <Text style={styles.textButton}>Join events</Text>
                </TouchableOpacity>
                {myEvents.map((event: any, index: number) => {
                  const isActive = activeEvent?.id === event.id;
                  const eventIsFinished = isEventFinished(event?.date);
                  const allPeople = event?.female + event?.femaleFriend + event?.male + event?.maleFriend;
                  const eventIsFull = event?.usersList?.filter(i => i?.status === 'accepted')?.length === allPeople;

                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.eventButton}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (!userHost?.accountConfirmed) {
                          return;
                        }
                        setActiveEvent(event);
                      }}>
                      <View
                        style={{
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: eventIsFull ? orangeColor : isActive ? whiteColor : lightGray5Color,
                          borderStyle: 'solid',
                          padding: 3,
                          width: 55,
                          height: 55,
                        }}>
                        {eventIsFinished && <InfoCircleGrayIcon style={{position: 'absolute', left: '35%', top: '35%', zIndex: 999}} />}
                        {eventIsFull && <InfoCircleOrangeIcon style={{position: 'absolute', left: '35%', top: '35%', zIndex: 999}} />}
                        <Image source={{uri: event?.photos[0]?.image}} style={{width: '100%', height: '100%', borderRadius: 50}} />
                      </View>
                      <Text
                        style={{
                          marginTop: screenHeight / 190,
                          color: whiteColor,
                          fontFamily: Satoshi500,
                          fontSize: RFValue(13, 812),
                          textAlign: 'center',
                        }}>
                        {event?.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView horizontal scrollEnabled={false} contentContainerStyle={{marginVertical: screenHeight / 50}}>
                <TouchableOpacity
                  style={styles.eventButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!userHost?.accountConfirmed) {
                      return;
                    }
                    setActiveEventDate(ALL);
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: activeEventDate === ALL ? whiteColor : lightGray5Color,
                      borderStyle: 'solid',
                      padding: 3,
                      width: 55,
                      height: 55,
                      backgroundColor: lightGray5Color,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CalendarSearchIcon width={26} height={26} />
                    <Text style={{fontSize: RFValue(6, 812), color: activeEventDate === ALL ? whiteColor : grayColor}}>Today</Text>
                  </View>
                  <Text
                    style={{
                      marginTop: screenHeight / 190,
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(13, 812),
                      textAlign: 'center',
                    }}>
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.eventButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!userHost?.accountConfirmed) {
                      return;
                    }
                    setActiveEventDate(THIS_WEEKEND);
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: activeEventDate === THIS_WEEKEND ? whiteColor : lightGray5Color,
                      borderStyle: 'solid',
                      padding: 3,
                      width: 55,
                      height: 55,
                      backgroundColor: lightGray5Color,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CalendarSearchIcon width={26} height={26} />
                    <Text style={{fontSize: RFValue(6, 812), color: activeEventDate === THIS_WEEKEND ? whiteColor : grayColor}}>Weekend</Text>
                  </View>
                  <Text
                    style={{
                      marginTop: screenHeight / 190,
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(13, 812),
                      textAlign: 'center',
                    }}>
                    This weekend
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.eventButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!userHost?.accountConfirmed) {
                      return;
                    }
                    setActiveEventDate(THIS_MONTH);
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: activeEventDate === THIS_MONTH ? whiteColor : lightGray5Color,
                      borderStyle: 'solid',
                      padding: 3,
                      width: 55,
                      height: 55,
                      backgroundColor: lightGray5Color,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CalendarSearchIcon width={26} height={26} />
                    <Text style={{fontSize: RFValue(6, 812), color: activeEventDate === THIS_MONTH ? whiteColor : grayColor}}>Month</Text>
                  </View>
                  <Text
                    style={{
                      marginTop: screenHeight / 190,
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(13, 812),
                      textAlign: 'center',
                    }}>
                    This month
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </>
        );
      case 'IO-JE':
        return (
          <View style={{flexDirection: 'row', marginVertical: screenHeight / 50}}>
            <TouchableOpacity style={styles.eventButton} onPress={goToCreateEvent}>
              <View style={styles.eventView}>
                <AddIcon width={26} height={26} />
              </View>
              <Text style={styles.textButton}>Create event</Text>
            </TouchableOpacity>
            {/*@ts-ignore*/}
            <TouchableOpacity style={styles.joinEventButton}>
              <View style={styles.joinEventView}>
                <CalendarSearchIcon width={26} height={26} />
              </View>
              <Text style={styles.textButton}>Join events</Text>
            </TouchableOpacity>
          </View>
        );
      case 'myEvents':
        return null;
      case 'profile':
        return null;
      case 'request':
        return isHost ? (
          <ScrollView horizontal scrollEnabled={!!myEvents?.length} contentContainerStyle={{marginVertical: screenHeight / 50}}>
            <TouchableOpacity style={styles.eventButton} onPress={goToCreateEvent}>
              <View style={styles.eventView}>
                <AddIcon width={26} height={26} />
              </View>
              <Text style={styles.textButton}>Create event</Text>
            </TouchableOpacity>
            {/*@ts-ignore*/}
            <TouchableOpacity
              onPress={() => {
                if (!userHost?.accountConfirmed) {
                  return;
                }
                setActiveEvent('host');
              }}
              style={styles.eventButton}>
              <View style={[styles.joinEventActive, {borderColor: activeEvent === 'host' ? whiteColor : lightGray5Color}]}>
                <CalendarSearchIcon width={26} height={26} />
              </View>
              <Text style={styles.textButton}>Join events</Text>
            </TouchableOpacity>
            {myEvents?.map((event: any, index: number) => {
              const isActive = activeEvent?.id === event.id;
              const eventIsFinished = isEventFinished(event?.date);
              const allPeople = event?.female + event?.femaleFriend + event?.male + event?.maleFriend;
              const eventIsFull = event?.usersList?.filter(i => i?.status === 'accepted')?.length === allPeople;

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.eventButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!userHost?.accountConfirmed) {
                      return;
                    }

                    if (eventIsFinished) showToast('warningGrey', 'Create new event', `Event is ended: ${event?.date}`);
                    setActiveEvent(event);
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: eventIsFull ? orangeColor : isActive ? whiteColor : lightGray5Color,
                      borderStyle: 'solid',
                      padding: 3,
                      width: 55,
                      height: 55,
                    }}>
                    {eventIsFinished && <InfoCircleGrayIcon style={{position: 'absolute', left: '35%', top: '35%', zIndex: 999}} />}
                    {eventIsFull && <InfoCircleOrangeIcon style={{position: 'absolute', left: '35%', top: '35%', zIndex: 999}} />}
                    <Image
                      // source={{uri: event?.photos?.find(({id}: {id: number}) => id === 0).image}}
                      source={{uri: event?.photos[0]?.image}}
                      style={{width: '100%', height: '100%', borderRadius: 50}}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: screenHeight / 190,
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(13, 812),
                      textAlign: 'center',
                    }}>
                    {event?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <FlatList
            data={DATARequestGuest}
            horizontal={true}
            style={{marginTop: 17, marginBottom: 25}}
            renderItem={({item}) => (
              <ItemRequests
                filledTo={item.filledTo}
                allPeople={item.allPeople}
                image={item.image}
                numberBadge={item.numberBadge}
                title={item.title}
                date={item.date}
              />
            )}
            keyExtractor={item => item.id}
          />
        );
      case 'chat':
        return (
          <View style={styles.wrapperHeaderButtonsChat}>
            <View style={styles.rowButtonsChat}>
              <TouchableOpacity
                onPress={() => setTypeEvents(false)}
                style={[styles.buttonMyEvents, {backgroundColor: !typeEvents ? whiteColor : lightGray2Color}]}>
                <Text style={[styles.textMyEvents, {color: typeEvents ? whiteColor : blackColor}]}>My events</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTypeEvents(true)}
                style={[styles.buttonEventsJoining, {backgroundColor: !typeEvents ? lightGray2Color : whiteColor}]}>
                <Text style={[styles.textEventsJoining, {color: !typeEvents ? whiteColor : blackColor}]}>Events I'm Joining</Text>
                <View style={styles.rowTextCountEvents}>
                  <Text style={styles.textCountEvents}>{eventsImJoining?.length}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {!typeEvents ? (
              <View style={[styles.rowButtonsChat, {marginTop: screenHeight / 34}]}>
                <FlatList
                  data={myEvents}
                  horizontal={true}
                  renderItem={({item}) => (
                    <Item
                      activeEvent={item.id}
                      filledTo={item?.usersList?.filter((i) => i?.status === 'accepted')?.length}
                      allPeople={item.female + item.femaleFriend + item.male + item.maleFriend}
                      image={item.photos[0]?.image}
                      girlInvitation={item.male + item.maleFriend}
                      numberBadge={item.numberBadge}
                      title={item.placeName}
                      date={item.date}
                      hour={item.hour}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : (
              <View style={[styles.rowButtonsChat, {marginTop: screenHeight / 34}]}>
                <FlatList
                  data={DATAEventsJoining}
                  horizontal={true}
                  renderItem={({item}) => (
                    <ItemEventsJoining
                      filledTo={item.filledTo}
                      allPeople={item.allPeople}
                      image={item.image}
                      numberBadge={item.numberBadge}
                      title={item.title}
                      date={item.date}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, headerInsets]}>
      {showHeaderTop && (
        <View style={styles.wrapperHeader}>
          {logoType === 'logo' ? <Logo width={157} height={32} /> : <LogoPrimary width={157} height={32} />}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {badge && (
              <TouchableOpacity onPress={goToNotifications} activeOpacity={0.7} style={{paddingRight: 6}}>
                <NotificationIcon width={32} height={32} />
                <Badge value={0} badgeStyle={styles.badgeStyle} textStyle={styles.badgeText} />
              </TouchableOpacity>
            )}
            {headerType === 'profile' && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{marginLeft: 10}}
                hitSlop={{right: 10}}
                onPress={() => navigation.navigate(commonStackPath, {screen: settingsPath} as never)}>
                <SettingsIcon width={32} height={32} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      {handleCheckType(headerType)}
    </View>
  );
};

export default Header;
