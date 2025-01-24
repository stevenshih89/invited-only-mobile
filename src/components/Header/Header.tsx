import React, {FC, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
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
  earlyAccessPath,
  eventCreatingStackPath,
  notificationsPath,
  notificationsStackPath,
  paymentPath,
  settingsPath,
} from 'constants/pathLocations';
import {lightGray5Color, orangeColor, whiteColor} from 'constants/colors.ts';
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
import {Satoshi500} from 'constants/fonts';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {onUserProfileChangeSubscription} from 'helpers/userProfile';
import {UserInfo} from 'src/types/userInfo';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {EventData} from 'src/types/event';
import {useMyEvents} from 'src/store/myEvents';
import Config from 'react-native-config';
import {useDemoFlowStore} from '../../store/demoFlowStore';
import {Marquee} from '@animatereactnative/marquee';

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
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const route = useRoute();
  const {hintStep, setHintStep, event, isVisibleSwipeGuide} = useDemoFlowStore();
  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;
  const [eventStarting, setEventStarting] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  // const [myEvents, setMyEvents] = useState<Array<any>>();
  const styles = useStyles();

  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const setChat = useChat((i: any) => i.setActiveEvent);

  const userData = useUser((i: any) => i?.user);

  const {setActiveEvent, activeEvent, myEvents, setMyEvents, setLoadingMyEvents} = useMyEvents(state => state);

  const {activeEventDate, setActiveEventDate} = useContext(EventsDate);

  const fetchMyEvents = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        setLoadingMyEvents(true);
        const querySnapshot = await firestore()
          .collection(apiEventsCollection)
          .where('uid', '==', user.uid)
          .where('isCancelled', '==', false)
          .orderBy('createdAt', 'desc')
          .get();

        if (querySnapshot.empty) {
          setMyEvents([]);
          console.warn('Header_fetchMyEvents_querySnapshot_empty');
          setActiveEvent({});
          setChat('');
          setLoadingMyEvents(false);
          return;
        }

        const data = querySnapshot.docs.map(doc => doc.data() as EventData);

        const filteredEvents = data.filter(event => {
          if (event?.date && event?.hour) {
            const adjustedDate = moment(`${event?.date}, ${event?.hour}`, 'DD.MM.YYYY, HH:mm').add(12, 'hours');
            if (adjustedDate.isBefore(moment())) {
              return false;
            }
            return true;
          }
          return false;
        });
        console.warn('Header_fetchMyEvents', filteredEvents);

        if (!filteredEvents.length) {
          setMyEvents([]);
          console.warn('Header_fetchMyEvents_filteredEvents_empty');
          setActiveEvent({});
          setChat('');
          setLoadingMyEvents(false);
          return;
        }

        setMyEvents(filteredEvents);

        // if (!activeEvent?.id) {
        //   console.warn('Header_fetchMyEvents_activeEvent_empty');
        //   setActiveEvent(filteredEvents[0]);
        //   setChat(filteredEvents[0]?.id);
        //   return;
        // }
        console.warn('Header_fetchMyEvents_activeEvent', activeEvent);

        const currentEvent = filteredEvents.find((event: EventData) => event?.id === activeEvent?.id);
        const eventIndex = currentEvent ? filteredEvents.findIndex((event: any) => event?.id === currentEvent?.id) : 0;

        console.warn('Header_fetchMyEvents_currentEvent', currentEvent);

        console.warn('Header_fetchMyEvents', filteredEvents[eventIndex]);

        setActiveEvent(filteredEvents[eventIndex]);
        setChat(filteredEvents[eventIndex]?.id);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      } finally {
        setLoadingMyEvents(false);
      }
    }
  };

  const handleGoToEarlyAccess = () => {
    navigation.navigate(commonStackPath, {screen: earlyAccessPath} as never);
  };

  useEffect(() => {
    if (!isDemo) {
      fetchMyEvents();
    }
  }, [headerType, userData?.uid, isDemo]);

  const goToCreateEvent = async (): void => {
    if (!userInfo?.accountConfirmed) {
      return;
    }
    if (userInfo?.accountPremium) {
      navigation.navigate(eventCreatingStackPath);
    } else {
      navigation.navigate(paymentPath as never);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = onUserProfileChangeSubscription(info => {
        setUserInfo((prev: any) => ({...prev, ...info}));
      });

      return subscription;
    }, []),
  );

  useEffect(() => {
    if (userInfo?.accountType) {
      setTypeEvents && setTypeEvents(userInfo?.accountType?.toLowerCase() === 'host' ? false : true);
    }
  }, [userInfo?.accountType]);

  useEffect(() => {
    const subscription = onUserProfileChangeSubscription(info => {
      setUserInfo((prev: UserInfo) => ({...prev, ...info}));
    });

    return subscription;
  }, []);

  useEffect(() => {
    if (isDemo) {
      setActiveEvent(event);
    }
  }, [isDemo, hintStep]);

  console.warn('Header_event', userInfo?.accountType);

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
    <TouchableOpacity
      onPress={() => {
        setChat(`${event.id}`);
        setActiveEvent(event);
      }}
      style={styles.eventButton}>
      <View style={[styles.eventViewFlatList, {borderColor: activeEvent?.id === event?.id ? whiteColor : lightGray5Color}]}>
        <FastImage style={styles.imageEvent} source={{uri: image}} />
        {numberBadge > 0 && <Badge value={numberBadge} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />}
      </View>
      <View style={{maxWidth: screenWidth / 5, overflow: 'hidden'}}>
        {title.length >= 10 ? (
          <Marquee spacing={MARQUEE_SPACING} speed={MARQUEE_SPEED}>
            <Text
              style={{
                marginTop: screenHeight / 190,
                color: whiteColor,
                fontFamily: Satoshi500,
                fontSize: RFValue(13, 812),
                textAlign: 'center',
              }}>
              {title}
            </Text>
          </Marquee>
        ) : (
          <Text
            numberOfLines={1}
            style={{
              marginTop: screenHeight / 190,
              color: whiteColor,
              fontFamily: Satoshi500,
              fontSize: RFValue(13, 812),
              textAlign: 'center',
            }}>
            {title}
          </Text>
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
    </TouchableOpacity>
  );

  const ItemEventsJoining = ({title, image, date, icon, value}: ItemProps) => (
    <TouchableOpacity
      onPress={() => {
        if (userInfo?.accountConfirmed) {
          setActiveEventDate(value);
        }
      }}
      style={styles.eventButton}>
      <View style={[styles.eventViewFlatList, {borderColor: activeEventDate === value ? whiteColor : lightGray5Color}]}>
        <View style={styles.imageEventsJoining}>{icon}</View>
      </View>
      <Text style={styles.textButton}>{title}</Text>
      <ModalEventRemindes
        eventStarting={eventStarting}
        setEventStarting={setEventStarting}
        time="24h"
        image={image}
        city={title}
        date={date}
      />
    </TouchableOpacity>
  );

  const isHost = userInfo?.isHost;

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

  const headerInsets = {
    paddingTop: insets.top,
  };

  const handleCheckType = (type: 'IO' | 'myEvents' | 'profile' | 'request' | 'chat' | 'IO-JE' | undefined) => {
    switch (type) {
      case 'IO':
        return (
          <>
            {isHost ? (
              <ScrollView horizontal scrollEnabled={!!myEvents?.length} contentContainerStyle={{marginVertical: screenHeight / 50}}>
                <TouchableOpacity style={styles.eventButton} onPress={goToCreateEvent} disabled={isDemo}>
                  <View style={styles.eventView}>
                    <AddIcon width={26} height={26} />
                  </View>
                  <Text style={styles.textButton}>Create event</Text>
                </TouchableOpacity>
                {(isDemo || myEvents) &&
                  (isDemo ? [event] : myEvents).map((event: any, index: number) => {
                    const isActive = activeEvent?.id === event?.id;
                    const eventIsFinished = isEventFinished(event?.date, event?.hour);
                    const allPeople = event?.female + event?.femaleFriend + event?.male + event?.maleFriend;
                    const eventIsFull = event?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length === allPeople;

                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.eventButton}
                        activeOpacity={0.7}
                        onPress={() => {
                          if (!userData?.accountConfirmed) {
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
                          {event?.photos?.[0]?.image && (
                            <FastImage style={{width: '100%', height: '100%', borderRadius: 50}} source={{uri: event?.photos[0]?.image}} />
                          )}
                        </View>
                        <View style={{maxWidth: screenWidth / 5, overflow: 'hidden'}}>
                          {`${event?.name || event?.placeName}`.length >= 10 ? (
                            <Marquee spacing={MARQUEE_SPACING} speed={MARQUEE_SPEED}>
                              <Text
                                style={{
                                  marginTop: screenHeight / 190,
                                  color: whiteColor,
                                  fontFamily: Satoshi500,
                                  fontSize: RFValue(13, 812),
                                  textAlign: 'center',
                                }}>
                                {`${event?.name || event?.placeName}`}
                              </Text>
                            </Marquee>
                          ) : (
                            <Text
                              numberOfLines={1}
                              style={{
                                marginTop: screenHeight / 190,
                                color: whiteColor,
                                fontFamily: Satoshi500,
                                fontSize: RFValue(13, 812),
                                textAlign: 'center',
                              }}>
                              {`${event?.name || event?.placeName}`}
                            </Text>
                          )}
                        </View>
                        {/* <Text
                          style={{
                            marginTop: screenHeight / 190,
                            color: whiteColor,
                            fontFamily: Satoshi500,
                            fontSize: RFValue(13, 812),
                            textAlign: 'center',
                          }}>
                          {event?.name || event?.placeName}
                        </Text> */}
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
                    if (!userData?.accountConfirmed) {
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
                      width: 63,
                      height: 63,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CalendarCheckIcon width={26} height={26} />
                  </View>
                  <Text
                    style={{
                      marginTop: screenHeight / 190,
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(13, 812),
                      textAlign: 'center',
                    }}>
                    Upcoming Events
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.eventButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!userData?.accountConfirmed) {
                      return;
                    }
                    setActiveEventDate(THIS_WEEK);
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: activeEventDate === THIS_WEEK ? whiteColor : lightGray5Color,
                      borderStyle: 'solid',
                      padding: 3,
                      width: 63,
                      height: 63,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <WIcon />
                  </View>
                  <Text
                    style={{
                      marginTop: screenHeight / 190,
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(13, 812),
                      textAlign: 'center',
                    }}>
                    This week
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.eventButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!userData?.accountConfirmed) {
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
                      width: 63,
                      height: 63,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MIcon />
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
            {myEvents?.map((event: any, index: number) => {
              if (event?.eventReviewed && !event?.statusEvent) {
                return null;
              }
              const isActive = activeEvent?.id === event.id;
              const eventIsFinished = isEventFinished(event?.date, event?.hour);
              const allPeople = event?.female + event?.femaleFriend + event?.male + event?.maleFriend;
              const eventIsFull = event?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length === allPeople;

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.eventButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!userData?.accountConfirmed) {
                      return;
                    }

                    if (eventIsFinished) {
                      showToast('inviteMatch', 'Create new event', `Event is ended: ${event?.date}`, {ownerPhoto: event.photos[0].image});
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
                    <Image
                      // source={{uri: event?.photos?.find(({id}: {id: number}) => id === 0).image}}
                      source={{uri: event?.photos[0]?.image}}
                      style={{width: '100%', height: '100%', borderRadius: 50}}
                    />
                  </View>
                  <View style={{maxWidth: screenWidth / 5, overflow: 'hidden'}}>
                    {`${event?.name || event?.placeName}`.length >= 10 ? (
                      <Marquee spacing={MARQUEE_SPACING} speed={MARQUEE_SPEED}>
                        <Text
                          style={{
                            marginTop: screenHeight / 190,
                            color: whiteColor,
                            fontFamily: Satoshi500,
                            fontSize: RFValue(13, 812),
                            textAlign: 'center',
                          }}>
                          {`${event?.name || event?.placeName}`}
                        </Text>
                      </Marquee>
                    ) : (
                      <Text
                        numberOfLines={1}
                        style={{
                          marginTop: screenHeight / 190,
                          color: whiteColor,
                          fontFamily: Satoshi500,
                          fontSize: RFValue(13, 812),
                          textAlign: 'center',
                        }}>
                        {`${event?.name || event?.placeName}`}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <FlatList
            data={DATAEventsJoining}
            horizontal={true}
            style={{marginTop: screenHeight / 50, marginBottom: 25}}
            renderItem={({item}) => (
              <ItemEventsJoining image={item.image} title={item.title} date={item.date} icon={item.icon} value={item.value} />
            )}
            keyExtractor={item => item.id}
          />
        );
      case 'chat':
        return (
          <View style={[styles.wrapperHeaderButtonsChat, {marginTop: userData?.accountType === 'host' ? 0 : screenHeight / 50}]}>
            {isHost ? (
              <View style={[styles.rowButtonsChat, {marginTop: 10}]}>
                <FlatList
                  data={myEvents}
                  horizontal={true}
                  renderItem={({item, index}) => (
                    <Item
                      event={item}
                      filledTo={item?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length}
                      allPeople={item.female + item.male}
                      image={item.photos[0]?.image}
                      girlInvitation={item.male + item.maleFriend}
                      numberBadge={item.numberBadge}
                      title={item.name || item.placeName}
                      date={item.date}
                      hour={item.hour}
                      index={index}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : (
              <View style={[styles.rowButtonsChat]}>
                <FlatList
                  data={DATAEventsJoining}
                  horizontal={true}
                  renderItem={({item}) => (
                    <ItemEventsJoining image={item.image} title={item.title} date={item.date} icon={item.icon} value={item.value} />
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

  const [countNotifications, setCountNotifications] = useState(0);

  const getCountNotifications = () => {
    return firestore()
      .collection(apiUserInfoCollection)
      .doc(userData?.uid)
      .collection('notifications')
      .onSnapshot(querySnapshot => {
        setCountNotifications(querySnapshot.docs.length);
      });
  };

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getCountNotifications();
      if (unsubscribe) {
        return () => unsubscribe();
      }
    }, []),
  );

  return (
    <View style={[styles.container, headerInsets]}>
      {(!userInfo?.accountConfirmed && headerType !== 'profile') ||
        (!userData?.isPassedDemo && isDemo && hintStep !== 7 && isVisibleSwipeGuide && <View style={styles.overlayContainer} />)}
      {showHeaderTop && (
        <View style={styles.wrapperHeader}>
          {logoType === 'logo' ? <Logo width={157} height={32} /> : <LogoPrimary width={157} height={32} />}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {userInfo?.accountType && userInfo?.accountConfirmed && !isHost && headerType !== 'profile' && (
              <TouchableOpacity style={{marginRight: 10}} onPress={handleGoToEarlyAccess}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(14, 812),
                    textDecorationLine: 'underline',
                  }}>
                  IO Invitations
                </Text>
              </TouchableOpacity>
            )}
            {badge && (
              <TouchableOpacity onPress={goToNotifications} activeOpacity={0.7} style={{paddingRight: 6}}>
                <NotificationIcon width={32} height={32} />
                <Badge value={countNotifications} badgeStyle={styles.badgeStyle} textStyle={styles.badgeText} />
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
      {userInfo?.uid && handleCheckType(headerType)}
    </View>
  );
};

export default Header;
