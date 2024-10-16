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
import {blackColor, grayColor, lightGray13Color, lightGray16Color, lightGray20Color, lightGray2Color, lightGray5Color, lightGreenColor, whiteColor} from 'constants/colors';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import ModalCancelAttending from './ModalCancelAttending';
import ModalAcceptInvitation from './ModalAcceptInvitation';
import {useUser} from '../../../store/userStore';
import {
  ACCEPTED_STATUS,
  ALL,
  APPROVED_STATUS,
  CANCEL_STATUS,
  INVITE_MATCH_STATUS,
  NOT_ACCEPTED_STATUS,
  screenHeight,
  screenWidth,
  THIS_MONTH,
  THIS_WEEKEND,
} from 'constants/common.ts';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {EventsDate} from 'contexts/EventsDate.tsx';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import {useAdminActions} from 'src/store/adminActions';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';

//import images
import CalendarCheckIcon from 'assets/images/icons/calendar-check.svg';
import WIcon from 'assets/images/icons/W.svg';
import MIcon from 'assets/images/icons/M.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import AddIcon from 'assets/images/icons/add.svg';

import Button from 'components/Button/Button';
import {commonStackPath, eventActiveInfoPath, eventCreatingStackPath, IOPath, paymentPath} from 'constants/pathLocations';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes';
import {sendNotification} from 'helpers/fcmHelper';
import {AccountInfoFlyWeight, useUserProfileChangeSubscription} from 'helpers/userProfile';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {calculateAge} from 'helpers/calculateAge';

const MyEvents: FC<any> = ({navigation}) => {
  const styles = useStyles();
  const MY_EVENTS = 'my_events';

  const [isVisibleCancelAttendingModal, setIsVisibleCancelAttendingModal] = useState<boolean>(false);
  const [isVisibleAcceptInvitationModal, setIsVisibleAcceptInvitationModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(MY_EVENTS);
  const [visibleModalEventRemindes, setVisibleModalEventRemindes] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const countMyEvent = useRef(0);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);

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

  const [userInfo, setUserInfo] = useState<any>();
  const [hostInfo, setHostInfo] = useState<any>({});

  const {accountConfirmed} = useUserProfileChangeSubscription();
  useEffect(() => {
    if (userInfo && userInfo?.length) {
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
      // console.log('user of users', user);

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
        // console.error('error sending notification:', error);
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
          // console.log('error update notifications', error);
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

  const fetchHostInfo = async (hostUid: string) => {
    try {
      const hostDoc = await firestore().collection('userInfo').doc(hostUid).get();
      if (hostDoc.exists) {
        setHostInfo(hostDoc.data());
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (activeModalEvent?.host?.hostUid) {
      fetchHostInfo(activeModalEvent.host.hostUid);
    }
  }, [activeModalEvent]);

  const handleOpenCancelAttendingModal = (
    eventInfo: {list: any; host: any; image: string; textCityName: string; date: string; numberOfGirlsInvited: string},
    userInfo,
  ) => {
    setActiveModalEvent(eventInfo);
    setActiveUserInfo(userInfo);
    setIsVisibleCancelAttendingModal(true);
  };

  const handleOpenAcceptInvitationModal = (
    eventInfo: {
      list: any;
      host: any;
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
            status: ACCEPTED_STATUS,
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
      const getDoc = await firestore().collection('userInfo').doc(eventDataList?.uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings.myEvents) {
        await sendNotification(
          eventDataList?.uid,
          `${user?.name} accepted your invitation`,
          'Invitation Accepted!',
          'Accepted',
          'Accepted'.toUpperCase(),
          user,
        );
      }
      setIsVisibleAcceptInvitationModal(false);
    } catch (e) {
      // console.log(e);
    }
  };

  const handleRejectInvitation = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = user?.uid;
      changeStatus(list?.usersList, uid, NOT_ACCEPTED_STATUS);
      await firestore().collection('Events').doc(list?.id).update({
        usersList: list?.usersList,
      });
      setIsVisibleAcceptInvitationModal(false);
      const getDoc = await firestore().collection('userInfo').doc(list?.uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings?.myEvents) {
        await sendNotification(list?.uid, `${user?.name} rejected your invitation`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), user);
      }
      showToast('inviteMatch', `You rejected ${list?.placeName} event`, 'Not now', {
        ownerPhoto: list?.hostImage,
        status: 'REJECTED'.toUpperCase(),
      });
    } catch (e) {
      showToast('inviteMatch', '', 'Error!');
      // console.log(e);
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

      changeStatus(list?.usersList, uid, NOT_ACCEPTED_STATUS);

      await firestore().collection('Events').doc(list?.id).update({
        usersList: list?.usersList,
      });
      setIsVisibleCancelAttendingModal(false);
      const getDoc = await firestore().collection('userInfo').doc(list?.uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings.myEvents) {
        await sendNotification(list?.uid, `${user?.name} rejected your invitation`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), user);
      }
      showToast('inviteMatch', `You rejected ${list?.placeName} event`, 'Not now', {
        ownerPhoto: list?.hostImage,
        status: 'REJECTED'.toUpperCase(),
      });
    } catch (e) {
      showToast('inviteMatch', '', 'Error!');
      // console.log(e);
    }
  };

  const handleGetEventsIJoining = async events => {
    try {
      const uid = user?.uid;
      const data = events?.docs?.map(i => i?.data());

      const filterData = data?.filter(obj => {
        return obj?.usersList?.some(user => {
          return (
            user?.uid === uid &&
            (user?.status === INVITE_MATCH_STATUS || user?.status === ACCEPTED_STATUS || user?.status === APPROVED_STATUS)
          );
        });
      });
      setEventsJoiningData(filterData);
      setEventsImJoining(filterData);
    } catch (e) {
      // console.log('error events im joining', e);
      // showToast('cancel', 'Error!');
    }
  };

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

  const customButton = (item: any[]) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list: item}} as never)}
        style={{
          height: 65,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          backgroundColor: lightGray20Color,
          marginTop: 25,
        }}>
        <Text
          style={{
            color: blackColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(16, 812),
          }}>
          Manage Event
        </Text>
      </TouchableOpacity>
    );
  };

  const changeStatusGuestUsersList = async (status: string, id: string, uidHost: string, placeName: string, date: string, hostPhoto: string) => {
    const eventQuerySnapshot = await firestore().collection('Events').doc(id).get();
    const eventDataList = eventQuerySnapshot.data();
    if (!eventDataList?.usersList.length) {
      return;
    }

    try {
      const updatedUsersList = eventDataList?.usersList?.map(userItem => {
        if (userItem.uid === user?.uid) {
          return {

            ...userItem,
            status,
          };
        }
        return userItem;
      });
      await firestore().collection('Events').doc(id).update({
        usersList: updatedUsersList,
      });
      switch (status) {
        case ACCEPTED_STATUS:
          showToast('inviteMatch', `See you at ${date}`, 'You accept to this event!', {
            ownerPhoto: hostPhoto,
            status: 'Accept'.toUpperCase(),
          });
          await sendNotification(
            uidHost,
            `${user?.name} accepted your invitation`,
            'Invitation Accepted!',
            'Accepted',
            'Accepted'.toUpperCase(),
            user,
          );
          break;
        case NOT_ACCEPTED_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
          await sendNotification(uidHost, `${user?.name} rejected your invitation`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), user);
          break;
        case CANCEL_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
            await sendNotification(
              uidHost,
              `${user?.name} rejected your invitation`,
              'Not now.',
              'Rejected',
              'Rejected'.toUpperCase(),
              user,
            );
        default:
          break;
      }
    } catch (e) {
      console.log('error update status guest', e);
    }
  }

  const customButtonsGuest = (id: string, usersList: any[], date: string, uidHost: string, placeName: string, hostPhoto: string) => {

    const findUser = usersList.find(item => item.id === user?.id)
    const status = findUser.status

    return (
      <>
        {status === ACCEPTED_STATUS? 
        <TouchableOpacity
        onPress={() => changeStatusGuestUsersList(CANCEL_STATUS, id, uidHost, placeName, date, hostPhoto)}
        style={{
          height: 65,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          backgroundColor: lightGray20Color,
          marginTop: 25,
        }}>
        <Text
          style={{
            color: blackColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(16, 812),
          }}>
          Cancel attending
        </Text>
      </TouchableOpacity>:
      <>
      <TouchableOpacity
        onPress={() => changeStatusGuestUsersList(ACCEPTED_STATUS, id, uidHost, placeName, date, hostPhoto)}
        style={{
          height: 65,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          backgroundColor: blackColor,
          marginTop: 25,
        }}>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(16, 812),
          }}>
           Accept invitation
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeStatusGuestUsersList(NOT_ACCEPTED_STATUS, id, uidHost, placeName, date, hostPhoto)}
        style={{
          height: 65,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          backgroundColor: lightGray20Color,
          marginTop: 25,
        }}>
        <Text
          style={{
            color: blackColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(16, 812),
          }}>
          Reject invitation
        </Text>
      </TouchableOpacity>
      </>
      }
      </>
    )
  }

  const UserInfoTop = ({ showTotalEvents = true }: { showTotalEvents?: boolean}) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{flexDirection: 'row'}}>
        <View style={{alignSelf: 'flex-start'}}>
          <FastImage style={{width: 50, height: 50, borderRadius: 50}} source={{uri: userInfo?.photos?.[0]?.image || ''}} />
          <View
            style={{
              position: 'absolute',
              bottom: 2,
              right: 0,
              width: 12,
              height: 12,
              borderRadius: 12,
              borderWidth: 1.25,
              borderColor: blackColor,
              backgroundColor: lightGreenColor,
            }}
          />
        </View>
        <View style={{marginLeft: 10, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: blackColor,
                borderRadius: 5,
                paddingHorizontal: 12,
                paddingVertical: 2,
                alignSelf: 'flex-start',
                borderWidth: 1,
                borderColor: whiteColor,
              }}>
              {userInfo?.accountType === 'guest' && (
                <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                  Guest
                </Text>
              )}
              {userInfo?.accountType === 'host' &&(
                <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                  Host
                </Text>
              )}
            </View>
            {(userInfo?.accountPremium || userInfo?.accountType === 'guest') && (
              <LinearGradient
                colors={['#977B4A', '#E5D291', '#A28453']}
                style={{
                  marginLeft: 6,
                  alignSelf: 'flex-start',
                  borderRadius: 4,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  backgroundColor: blackColor,
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                {
                  <Text
                    style={{
                      color: blackColor,
                      fontSize: RFValue(10, 812),
                      fontFamily: Satoshi700,
                    }}>
                    Premium
                  </Text>
                }
              </LinearGradient>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi700,
                fontSize: RFValue(16, 812),
                marginTop: 4,
              }}>
              {userInfo?.name}
              {userInfo?.showAge ? <Text>,</Text> : null}
            </Text>
            {userInfo?.showAge && (
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(13, 812),
                  marginTop: 5,
                }}>
                {' '}
                {calculateAge(userInfo?.date)}
              </Text>
            )}
            <View style={{marginLeft: 8}}>{userInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} />}</View>
          </View>
        </View>
      </View>
      {showTotalEvents && <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(26, 812),
          }}>
          {userInfo?.eventsList?.length? userInfo?.eventsList?.length : eventsJoiningData.length}
        </Text>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi500,
            fontSize: RFValue(12, 812),
          }}>
          Total events
        </Text>
      </View>}
      </View>
    );
  };
  

  return (
    <>
      <View style={styles.container}>
        {userInfo?.photos?.length > 0 && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />}
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
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
            <TouchableOpacity
              style={{
                paddingVertical: screenWidth / 60,
                paddingHorizontal: screenHeight / 70,
                borderRadius: 8,
                flex: 1,
                alignItems: 'center',
                marginLeft: 10,
                borderWidth: 1,
                borderColor: lightGray13Color,
                flexDirection: 'row',
                justifyContent: 'center'
              }}
              onPress={() => navigation.navigate(eventCreatingStackPath)}>
                <AddIcon width={16} height={16}/>
              <Text style={{
                color: whiteColor,
                fontFamily: Satoshi500,
                fontSize: RFValue(16, 812),
                marginLeft: 10
              }}>Create event</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
              style={[
                styles.buttonMyEvents,
                {alignItems: 'center', marginVertical: 20, backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color},
              ]}
              onPress={() => setActiveTab(MY_EVENTS)}>
              <Text style={[styles.textMyEvents, {color: activeTab === MY_EVENTS ? blackColor : whiteColor}]}>My events</Text>
            </TouchableOpacity>
        )}
        <View style={{flex: 1, height: '100%'}}>
          {isHost ? (
            activeTab === MY_EVENTS ? (
              <>
                {<UserInfoTop showTotalEvents={true}/>}
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{flex: 1, height: '100%', marginBottom: screenHeight / 10}}
                  data={myEventsData}
                  keyExtractor={item => item.id.toString()}
                  ListEmptyComponent={() => (
                    <>
                      {userInfo?.accountConfirmed && (
                        <View style={{marginTop: screenHeight / 6}}>
                          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                            Let's create an event
                          </Text>
                          <Text
                            style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
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
                      statusEvent={item?.statusEvent}
                      eventReviewed={item?.eventReviewed}
                      allPeople={item?.female + item?.male}
                      date={item?.date}
                      textCityName={item?.name}
                      placeName={item?.placeName}
                      estimeTime={item?.hour}
                      numberOfGirlsInvited={item?.female}
                      placeName={item?.placeName}
                      invitingPeople={item?.usersList?.filter(i => i?.status !== NOT_ACCEPTED_STATUS)}
                      accountConfirmed={user?.accountConfirmed}
                      findAcceptedGuest={item?.usersList?.filter(item => item.status === INVITE_MATCH_STATUS)}
                      totalRequestsGuests={item?.requestsList?.length}
                      item={item}
                      showGuestList={true}
                      customButton={customButton(item)}
                    />
                  )}
                />
              </>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
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
                    joinedPeopleCount={item?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length}
                    status={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status}
                    isAcceptedInvitation={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status === ACCEPTED_STATUS}
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
              {<UserInfoTop showTotalEvents={true}/>}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
                      You don't have any active event.
                    </Text>
                    <Button title="Join event" onPress={goToIOStack} />
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                renderItem={({item}) => (
                  <MyEventsCard
                      imageBg={item?.photos}
                      list={item}
                      statusEvent={item?.statusEvent}
                      eventReviewed={item?.eventReviewed}
                      allPeople={item?.female + item?.male}
                      date={item?.date}
                      textCityName={item?.name}
                      placeName={item?.placeName}
                      estimeTime={item?.hour}
                      numberOfGirlsInvited={item?.female}
                      placeName={item?.placeName}
                      invitingPeople={item?.usersList?.filter(i => i?.status !== NOT_ACCEPTED_STATUS)}
                      accountConfirmed={user?.accountConfirmed}
                      findAcceptedGuest={item?.usersList?.filter(item => item.status === INVITE_MATCH_STATUS)}
                      totalRequestsGuests={item?.requestsList?.length}
                      item={item}
                      showGuestList={false}
                      customButton={customButtonsGuest(item?.id, item?.usersList, item?.date, item?.uid, item?.placeName, item?.hostImage)}
                      showInfoTop={true}
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
        hostInfo={hostInfo}
      />
      <ModalAcceptInvitation
        handleRejectInvitation={handleRejectInvitation}
        handleAcceptInvitation={handleAcceptInvitation}
        isVisible={isVisibleAcceptInvitationModal}
        onClose={() => setIsVisibleAcceptInvitationModal(false)}
        userInfo={activeUserInfo}
        eventInfo={activeModalEvent}
        hostInfo={hostInfo}
      />
      {!userInfo?.accountConfirmed && !loading && (
        <ModalLockAccount
          wrapperStyle={{marginTop: 100}}
          isVisibleButton={true}
          isPremium={userInfo?.accountPremium}
          accountType={userInfo?.accountType}
        />
      )}
      { hoursUntilEvent < 25 && hoursUntilEvent > 0 && (
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
