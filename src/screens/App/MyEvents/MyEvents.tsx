import React, {FC, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {CLOUD_MESSAGING_SERVER_KEY} from '@env';

//import components
import useStyles from 'screens/App/MyEvents/styles.ts';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';
import {useMyEvents} from '../../../store/myEvents';
import {showToast} from 'helpers/showToast.ts';
import {blackColor, grayColor, lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import ModalCancelAttending from './ModalCancelAttending';
import ModalAcceptInvitation from './ModalAcceptInvitation';
import {useUser} from '../../../store/userStore';
import {ALL, screenHeight, THIS_MONTH, THIS_WEEKEND} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {EventsDate} from 'contexts/EventsDate.tsx';

//import images
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import Button from 'components/Button/Button';
import {eventCreatingStackPath, IOPath, paymentPath} from 'constants/pathLocations';
import {IOStackNavigation} from 'navigator/AppStackScreens/AppStackScreens';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes';
import {sendNotification} from 'helpers/fcmHelper';
import {AccountInfoFlyWeight, useUserProfileChangeSubscription} from 'helpers/userProfile';

const MyEvents: FC<any> = ({navigation}) => {
  const styles = useStyles();
  const MY_EVENTS = 'my_events';
  const EVENTS_JOINING = 'events_joining';

  const [isVisibleCancelAttendingModal, setIsVisibleCancelAttendingModal] = useState<boolean>(false);
  const [isVisibleAcceptInvitationModal, setIsVisibleAcceptInvitationModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(MY_EVENTS);
  const [visibleModalEventRemindes, setVisibleModalEventRemindes] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const countMyEvent = useRef(0);

  const [activeModalEvent, setActiveModalEvent] = useState<any>({
    id: 0,
    image: '',
    textCityName: '',
    date: '',
    numberOfGirlsInvited: 0,
    host: {
      name: '',
      image: '',
    },
  });
  const [activeUserInfo, setActiveUserInfo] = useState<any>({});

  const [myEventsData, setMyEventsData] = useState([]);
  const [eventsJoiningData, setEventsJoiningData] = useState([]);
  const [hoursUntilEvent, setHoursUntilEvent] = useState<number>();
  const [currentEvent, setCurrentEvent] = useState();

  const user = useUser((i: any) => i?.user);
  const setEventsImJoining = useMyEvents((i: any) => i?.setEventsImJoining);
  const isHost = user?.accountType === 'host';
  const {activeEventDate, setActiveEventDate} = useContext(EventsDate);

  const [userInfo, setUserInfo] = useState<any>({});

  const {accountConfirmed} = useUserProfileChangeSubscription();
  useEffect(() => {
    if (!Object.keys(userInfo).length) {
      return;
    }

    setUserInfo((prev: Partial<AccountInfoFlyWeight>) => ({...prev, accountConfirmed}));
  }, [accountConfirmed]);

  const calculateHoursUntilEvent = (eventDate, eventTime) => {
    const now = new Date();

    const [day, month, year] = eventDate.split('.');
    const [hours, minutes] = eventTime.split(':');

    const eventDateTime = new Date(year, month - 1, day, hours, minutes);

    const diffInMilliseconds = eventDateTime - now;

    if (diffInMilliseconds < 0) {
      return 0;
    }

    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    return Math.floor(diffInHours);
  };

  // const getFcmTokens = async (usersList: []) => {
  //   let tokens: string[] = [];

  //   const promises = usersList.map(async item => {
  //     const userInfo = await firestore().collection('userInfo').doc(item?.uid).get();
  //     console.log('userInfo', userInfo);
  //     return userInfo.data().fcmToken;
  //   });

  //   tokens = await Promise.all(promises);

  //   return tokens;
  // };

  // const sendNotification = async (usersList: [], title: string, body: string) => {
  //   const tokens = await getFcmTokens(usersList);

  //   const response = await fetch('https://fcm.googleapis.com/fcm/send', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       registration_ids: tokens,
  //       notification: {
  //         title: title,
  //         body: body,
  //       },
  //     }),
  //   });

  //   if (!response.ok) {
  //     const error = await response.json();
  //     console.error('error sending notification:', error);
  //   } else {
  //     const data = await response.json();
  //     console.log('notification sent successfully:', data);
  //   }
  // };

  const generateRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const userData = useUser((i: any) => i?.user);

  const getFcmTokens = async (usersList: []) => {
    let users: Object[] = [];

    const promises = usersList.map(async item => {
      const userInfo = await firestore().collection('userInfo').doc(item?.uid).get();
      return {uid: userInfo?.data()?.uid, token: userInfo?.data()?.fcmToken};
    });

    users = await Promise.all(promises);

    return users;
  };

  const sendNotificationInner = async (usersList: [], title: string, body: string, mark: string) => {
    const users = await getFcmTokens(usersList);

    for (const user of users) {
      console.log('user of users', user);

      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
        },
        body: JSON.stringify({
          to: user.token,
          notification: {
            title: title,
            body: body,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('error sending notification:', error);
      } else {
        const data = await response.json();
        const userDoc = await firestore().collection('userInfo').doc(user.uid).get();
        const userNotifications = userDoc.data()?.notifications || [];
        const id = generateRandomId(8);
        const notification = {
          id,
          title: title,
          body: body,
          mark: mark,
          uid: userData?.uid,
        };
        try {
          await firestore()
            .collection('userInfo')
            .doc(user.uid)
            .update({
              notifications: [...userNotifications, notification],
            });
        } catch (error) {
          console.log('error update notifications', error);
        }
      }
    }
  };

  const checkTimeEvent = item => {
    if (item) {
      const res = calculateHoursUntilEvent(item.date, item.hour);
      setHoursUntilEvent(res);
      setCurrentEvent(item);
      setVisibleModalEventRemindes(true);
      if (res < 25) {
        sendNotificationInner(item?.usersList, `${item?.name} starting in ${res}h!`, 'Click here to confirm', 'start');
      }
      countMyEvent.current = countMyEvent.current + 1;
    }
  };

  useEffect(() => {
    if (myEventsData && myEventsData.length > countMyEvent.current) {
      checkTimeEvent(myEventsData[countMyEvent.current]);
    }
  }, [myEventsData, countMyEvent.current]);

  const fetchUserInfo = async () => {
    setLoading(true);
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
    }, []),
  );

  const handleOpenCancelAttendingModal = (
    eventInfo: {image: string; textCityName: string; date: string; numberOfGirlsInvited: string},
    userInfo,
  ) => {
    setActiveModalEvent(eventInfo);
    setActiveUserInfo(userInfo);
    setIsVisibleCancelAttendingModal(true);
  };

  const handleOpenAcceptInvitationModal = (
    eventInfo: {
      image: string;
      textCityName: string;
      date: string;
      numberOfGirlsInvited: string;
    },
    userInfo,
  ) => {
    setActiveModalEvent(eventInfo);
    setActiveUserInfo(userInfo);
    setIsVisibleAcceptInvitationModal(true);
  };

  const goToCreateEvent = (): void => {
    if (!user?.accountConfirmed) {
      return;
    }
    if (!user.accountPremium) {
      navigation.navigate(paymentPath);
    } else {
      navigation.navigate(eventCreatingStackPath);
    }
  };

  const goToIOStack = () => {
    navigation.navigate(IOPath);
  };

  const handleAcceptInvitation = async () => {
    let list = activeModalEvent?.list;
    const eventQuerySnapshot = await firestore().collection('Events').doc(list?.id).get();
    const eventDataList = eventQuerySnapshot.data();
    if (!eventDataList?.usersList.length) {
      return;
    }

    try {
      const updatedUsersList = eventDataList?.usersList?.map(userItem => {
        if (userItem.uid === user?.uid) {
          return {
            // @ts-ignore
            ...userItem,
            status: 'accepted',
          };
        }
        return userItem;
      });
      await firestore().collection('Events').doc(list?.id).update({
        usersList: updatedUsersList,
      });
      showToast('inviteMatch', `See you at ${eventDataList?.date}`, 'You joined to this event!', {
        ownerPhoto: eventDataList?.hostImage,
        status: 'Joined'.toUpperCase(),
      });
      await sendNotification(
        eventDataList?.uid,
        `${user?.name} accepted your invitation`,
        'Invitation Accepted!',
        'Accepted',
        'Accepted'.toUpperCase(),
        user,
      );
      setIsVisibleAcceptInvitationModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  // const handleAcceptInvitation = async () => {
  //   try {
  //     let list = activeModalEvent?.list;
  //     const uid = user?.uid;

  //     changeStatus(list?.usersList, uid, 'accepted');
  //     console.log('handleAcceptInvitation');

  //     console.log('accepted', list?.usersList);
  //     await firestore().collection('Events').doc(list?.id).update({
  //       usersList: list?.usersList,
  //     });
  //     setIsVisibleAcceptInvitationModal(false);
  //     showToast('inviteMatch', '', `You accepted ${activeModalEvent.textCityName} event`);
  //   } catch (e) {
  //     showToast('inviteMatch', '', 'Error!');
  //     console.log(e);
  //   }
  // };

  const handleRejectInvitation = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = user?.uid;
      changeStatus(list?.usersList, uid, 'notAccepted');
      await firestore().collection('Events').doc(list?.id).update({
        usersList: list?.usersList,
      });
      setIsVisibleAcceptInvitationModal(false);
      await sendNotification(list?.uid, `${user?.name} rejected your invitation`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), user);
      showToast('inviteMatch', `You rejected ${list?.placeName} event`, 'Not now', {
        ownerPhoto: list?.hostImage,
        status: 'REJECTED'.toUpperCase(),
      });
    } catch (e) {
      showToast('inviteMatch', '', 'Error!');
      console.log(e);
    }
  };

  const changeStatus = (usersList: any, uid: string, status: string): void => {
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].uid === uid) {
        usersList[i].status = status;
        break;
      }
    }
  };

  const handleCancelAttending = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = user?.uid;

      changeStatus(list?.usersList, uid, 'notAccepted');

      await firestore().collection('Events').doc(list?.id).update({
        usersList: list?.usersList,
      });
      setIsVisibleCancelAttendingModal(false);
      await sendNotification(list?.uid, `${user?.name} rejected your invitation`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), user);
      showToast('inviteMatch', `You rejected ${list?.placeName} event`, 'Not now', {
        ownerPhoto: list?.hostImage,
        status: 'REJECTED'.toUpperCase(),
      });
    } catch (e) {
      showToast('inviteMatch', '', 'Error!');
      console.log(e);
    }
  };

  const handleGetEventsIJoining = async events => {
    try {
      const uid = user?.uid;
      const data = events?.docs?.map(i => i?.data());

      const filterData = data?.filter(obj => {
        return obj?.usersList?.some(user => {
          return user?.uid === uid && (user?.status === 'invite_match' || user?.status === 'accepted' || user?.status === 'approved');
        });
      });
      setEventsJoiningData(filterData);
      setEventsImJoining(filterData);
    } catch (e) {
      console.log('error events im joining', e);
      // showToast('cancel', 'Error!');
    }
  };

  // const getMyEvents = async () => {
  //   try {
  //     if (user) {
  //       const querySnapshot = await firestore().collection('Events').where('uid', '==', `${user?.uid}`).get();
  //       const data = querySnapshot?.docs?.map(i => i?.data());
  //       setMyEventsData(data);
  //     }
  //   } catch (e) {
  //     console.log('error my events', e);
  //   }
  // };

  useEffect(() => {
    let myEventsSubscribe: any;
    let eventsJoiningSubscribe: any;
    if (user?.uid) {
      myEventsSubscribe = firestore()
        .collection('Events')
        .where('uid', '==', `${user?.uid}`)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.empty) {
            return;
          }
          const data = querySnapshot?.docs?.map(i => i?.data());
          setMyEventsData(data);
        });
    }

    eventsJoiningSubscribe = firestore()
      .collection('Events')
      .onSnapshot(querySnapshot => {
        handleGetEventsIJoining(querySnapshot);
      });

    return () => {
      myEventsSubscribe && myEventsSubscribe();
      eventsJoiningSubscribe && eventsJoiningSubscribe();
    };
  }, [setIsVisibleCancelAttendingModal, isVisibleCancelAttendingModal]);

  // useFocusEffect(
  //   useCallback(() => {
  //     getMyEvents();
  //     handleGetEventsIJoining();
  //   }, [setIsVisibleCancelAttendingModal, isVisibleCancelAttendingModal]),
  // );

  return (
    <>
      <View style={styles.container}>
        {isHost ? (
          <View style={styles.wrapperHeaderButtonMyEvents}>
            <TouchableOpacity
              style={[
                styles.buttonMyEvents,
                {flex: 1, alignItems: 'center', backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color},
              ]}
              onPress={() => setActiveTab(MY_EVENTS)}>
              <Text style={[styles.textMyEvents, {color: activeTab === MY_EVENTS ? blackColor : whiteColor}]}>My events</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[
                styles.buttonEventsJoining,
                {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: activeTab === EVENTS_JOINING ? whiteColor : lightGray2Color,
                },
              ]}
              onPress={() => setActiveTab(EVENTS_JOINING)}>
              <Text
                style={[
                  {
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                    color: activeTab === EVENTS_JOINING ? blackColor : whiteColor,
                  },
                ]}>
                Join Events
              </Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <View style={{marginVertical: screenHeight / 50, height: 77, flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.eventButton}
              activeOpacity={0.7}
              onPress={() => {
                if (!user?.accountConfirmed) {
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
                if (!user?.accountConfirmed) {
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
                if (!user?.accountConfirmed) {
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
          </View>
        )}
        <View style={{flex: 1, height: '100%'}}>
          {isHost ? (
            activeTab === MY_EVENTS ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex: 1, height: '100%', marginBottom: screenHeight / 10}}
                data={myEventsData}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={() => (
                  <>
                    {userInfo?.accountConfirmed && (
                      <View style={{marginTop: screenHeight / 6}}>
                        <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(44, 812), marginBottom: 20}}>
                          Let's create an event
                        </Text>
                        <Text
                          style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(17, 812), opacity: 0.8, marginBottom: 40}}>
                          Get started by creating an event to begin inviting guests.
                        </Text>
                        <Button title="Create event" onPress={goToCreateEvent} />
                      </View>
                    )}
                  </>
                )}
                renderItem={({item}) => (
                  <MyEventsCard
                    imageBg={item?.photos}
                    list={item}
                    activeState={item?.statusEvent}
                    allPeople={item?.female + item?.male}
                    date={item?.date}
                    textCityName={item?.name}
                    placeName={item?.placeName}
                    estimeTime={item?.hour}
                    numberOfGirlsInvited={item?.female}
                    placeName={item?.placeName}
                    invitingPeople={item?.usersList?.filter(i => i?.status !== 'notAccepted')}
                    accountConfirmed={user?.accountConfirmed}
                    findAcceptedGuest={item?.usersList?.filter(item => item.status === 'invite_match')}
                    totalRequestsGuests={item?.requestsList?.length}
                    item={item}
                  />
                )}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(44, 812), marginBottom: 20}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(17, 812), opacity: 0.8, marginBottom: 40}}>
                      You don't have any active event.
                    </Text>
                    <Button title="Join event" onPress={goToIOStack} />
                  </View>
                )}
                renderItem={({item}) => (
                  <JoiningEventsCard
                    id={item?.id}
                    uid={item?.uid}
                    activeState={item.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item.date}
                    deleteUsers={item.deleteUsers}
                    oldDate={item.oldDate}
                    oldName={item.oldName}
                    oldHour={item.oldHour}
                    dateNewViewed={item.dateNewViewed}
                    nameNewViewed={item.nameNewViewed}
                    hourNewViewed={item.hourNewViewed}
                    hour={item?.hour}
                    placeName={item?.placeName}
                    list={item}
                    image={item?.photos[0]?.image}
                    textCityName={item.name}
                    estimeTime={item.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    host={{name: item?.name, image: item?.hostImage, hostUid: item?.uid}}
                    joinedPeopleCount={item?.usersList?.filter(i => i?.status === 'accepted')?.length}
                    status={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status}
                    isAcceptedInvitation={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status === 'accepted'}
                    handleOpenCancelAttendingModal={handleOpenCancelAttendingModal}
                    handleOpenAcceptInvitationModal={handleOpenAcceptInvitationModal}
                    handleAcceptInvitation={handleAcceptInvitation}
                    handleGetEventsIJoining={handleGetEventsIJoining}
                  />
                )}
              />
            )
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(44, 812), marginBottom: 20}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(17, 812), opacity: 0.8, marginBottom: 40}}>
                      You don't have any active event.
                    </Text>
                    <Button title="Join event" onPress={goToIOStack} />
                  </View>
                )}
                renderItem={({item}) => (
                  <JoiningEventsCard
                    uid={item?.uid}
                    activeState={item.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item.date}
                    oldName={item.oldName}
                    oldHour={item.oldHour}
                    dateNewViewed={item.dateNewViewed}
                    nameNewViewed={item.nameNewViewed}
                    hourNewViewed={item.hourNewViewed}
                    hour={item?.hour}
                    placeName={item?.placeName}
                    list={item}
                    image={item?.photos[0]?.image}
                    textCityName={item.address}
                    estimeTime={item.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    host={{name: item?.name, image: item?.hostImage, hostUid: item?.uid}}
                    joinedPeopleCount={item?.usersList?.filter(i => i?.status === 'accepted')?.length}
                    status={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status}
                    isAcceptedInvitation={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status === 'accepted'}
                    handleOpenCancelAttendingModal={handleOpenCancelAttendingModal}
                    handleOpenAcceptInvitationModal={handleOpenAcceptInvitationModal}
                    handleAcceptInvitation={handleAcceptInvitation}
                    handleGetEventsIJoining={handleGetEventsIJoining}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
      <ModalCancelAttending
        handleCancelAttending={handleCancelAttending}
        isVisible={isVisibleCancelAttendingModal}
        onClose={() => setIsVisibleCancelAttendingModal(false)}
        eventInfo={activeModalEvent}
        userInfo={activeUserInfo}
      />
      <ModalAcceptInvitation
        handleRejectInvitation={handleRejectInvitation}
        handleAcceptInvitation={handleAcceptInvitation}
        isVisible={isVisibleAcceptInvitationModal}
        onClose={() => setIsVisibleAcceptInvitationModal(false)}
        userInfo={activeUserInfo}
        eventInfo={activeModalEvent}
      />
      {!userInfo?.accountConfirmed && !loading && (
        <ModalLockAccount
          wrapperStyle={{marginTop: 100}}
          isVisibleButton={true}
          isPremium={userInfo?.accountPremium}
          accountType={userInfo?.accountType}
        />
      )}
      {hoursUntilEvent < 25 && hoursUntilEvent > 0 && (
        <ModalEventRemindes
          currentEvent={currentEvent}
          uid={userInfo?.uid}
          eventStarting={visibleModalEventRemindes}
          setEventStarting={setVisibleModalEventRemindes}
          hoursUntilEvent={hoursUntilEvent}
          countMyEvent={countMyEvent}
        />
      )}
    </>
  );
};

export default MyEvents;
