import {SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useState, useEffect, useContext, useCallback, useRef} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

//import components
import useStyles from 'screens/App/IO/styles.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import {screenHeight} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {eventCreatingStackPath, joinEventsPath, myProfileViewPath, userProfilePath} from 'constants/pathLocations.ts';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';
import {calculateAge} from 'helpers/calculateAge';
import {EventContext} from 'contexts/EventContext';
import {blackColor, transparentWhite56Color, whiteColor} from 'constants/colors';
import {fcmHelper, getFcmToken, onMatchNotificationSubscription, sendNotification} from 'helpers/fcmHelper.ts';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {useUser} from '../../../store/userStore';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';

//import icons
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import PersoneIcon from 'assets/images/icons/Users.svg'
import {EventsDate} from 'contexts/EventsDate.tsx';
import Loading from 'components/Loading/Loading';
import SuperInvite from './screens/SuperInvite/SuperInvite';
import Match, {MatchData} from './screens/Match/Match';
// import ModalSuperInvite from 'components/Modal/ModalSuperInvite';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import SuperJoin from 'components/Modal/ModalSuperJoin/SuperJoin';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites';
import moment from 'moment';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import { useAdminActions } from 'src/store/adminActions';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import {handleCreateChat} from 'helpers/chat';
import { checkIsFullGuests } from 'helpers/checkIsFullGuests';
import FullEvent from 'components/FullEvent';
import ModalFullEvent from 'components/Modal/ModalFullEvent';

const IO: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);

  const [myEvents, setMyEventsList] = useState([]);
  const [nameUser, setNameUser] = useState<string>('');
  const [uidScamUser, setUidScamUser] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});
  const [matchData, setMatchData] = useState<MatchData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [activeSuperInviteUser, setActiveSuperInviteUser] = useState<any>({});
  const [currentEventCardPosition, setCurrentEventCardPosition] = useState(1);
  const [ownerEventUserPhoto, setOwnerEventUserPhoto] = useState();
  const [lastVisible, setLastVisible] = useState(false);
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);

  const {setCounterSuperInvites, decrementCounterSuperInvites, counterSuperInvites} = useCounterSuperEvents();

  const {setMyEvents, setActiveEvent, activeEvent} = useContext(EventContext);

  const {activeEventDate} = useContext(EventsDate);

  const userHost = useUser((i: any) => i?.user);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setRejectModalVisible = useAdminActions((i: any) => i?.setRejectModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);

  const allEventsLength = useRef(0);

  const eventsRef = useRef<any[]>();
  const counterSuperInvitesRef = useRef(0);
  const counterWeeklySuperInvitesRef = useRef(0);

  const cardRef = useRef(null);

  const handleAutoSwipeLeft = () => {
    if (cardRef.current) {
      cardRef.current.autoSwipeLeft();
      
  const handleAutoSwipeRight = () => {
    if (cardRef.current) {
      cardRef.current.autoSwipeRight();
    }
  };

  let currentDate = new Date();
  const isHost = userHost?.accountType === 'host';

  
  const setRejectVisible = () => {
    setRejectModalVisible(true)
  }

  const setAcceptVisible = () => {
    setAcceptModalVisible(true)
  }

  useEffect(() => {
    if(userInfo && userInfo?.showModalAccept) {
      setAcceptModalVisible(true)
    }
  },[userInfo])

  useEffect(() => {
    const unsubscribe = onMatchNotificationSubscription(message => {
      const data = message?.data;        
      setMatchData(data);
      setIsVisibleMatch(true);
    }, setRejectVisible, setAcceptVisible);
    return () => unsubscribe();
  }, []);

  const getSuperInvites = async () => {
    const getDoc = await firestore().collection('userInfo').doc(userHost.uid).get();
    const currentSuperInvites = getDoc?.data()?.superInvites;
    const currentWeeklySuperInvites = getDoc?.data()?.weeklySuperInvites;
    counterSuperInvitesRef.current = currentSuperInvites;
    counterWeeklySuperInvitesRef.current = currentWeeklySuperInvites;
    setCounterSuperInvites(currentSuperInvites + currentWeeklySuperInvites);
  };

  const checkIsFullGuestsFun = async () => {    
    const {allGuests, findAcceptedGuest, totalRequestsGuests} = await checkIsFullGuests(activeEvent?.id);
    if(findAcceptedGuest >= allGuests) {    
      setTotalQuantityGuests(allGuests);
    }
    setTotalRequestsGuests(totalRequestsGuests);
    setAcceptQuantityGuest(findAcceptedGuest);
    return findAcceptedGuest >= allGuests
  }

  useFocusEffect(
    useCallback(() => {
      getSuperInvites();
    }, []),
  );

  const handleOpenSuperInvite = async (item): void => {
    setActiveSuperInviteUser(item);
    try {
      if (counterSuperInvites > 0) {
        setTimeout(() => {
          setIsVisibleSuperInvite(true);
        }, 500);
        if (counterWeeklySuperInvitesRef.current > 0) {
          firestore()
            .collection('userInfo')
            .doc(userHost.uid)
            .update({
              weeklySuperInvites: counterWeeklySuperInvitesRef.current - 1,
            });
          counterWeeklySuperInvitesRef.current -= 1;
        } else if (counterSuperInvitesRef.current > 0) {
          firestore()
            .collection('userInfo')
            .doc(userHost.uid)
            .update({
              superInvites: counterSuperInvitesRef.current - 1,
            });
          counterSuperInvitesRef.current -= 1;
        }
        decrementCounterSuperInvites(1);
      }
    } catch (error) {
      console.log('error supert invite', error);
    }
  };

  const handleCloseSuperInvite = (): void => {
    setIsVisibleSuperInvite(false);
  };

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
  };

  useEffect(() => {
    if (Object.keys(userInfo).length != 0) {
      if (!userInfo?.accountConfirmed || !userInfo?.accountReviewed) {
        showToast('inviteMatch', 'have a code? click here', 'Your account is under review', {
          ownerPhoto: userInfo?.photos[0].image,
          status: 'ON REVIEW',
          path: 'invitationCode',
        });
      }
    }
  }, [userInfo]);

  useEffect(() => {
    setCurrentEventCardPosition(1);
  }, [activeEvent]);

  const getWeekNumber = date => {
    let firstDayOfYear: Date = new Date(date.getFullYear(), 0, 1);
    let pastDaysOfYear: number = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const filterDataByWeekAndMonth = (data, week, month) => {
    const weekNumber: number = parseInt(week);
    const monthNumber: number = parseInt(month);

    const isInWeek = (dateString, weekNumber): boolean => {
      const date: Date = new Date(dateString);
      const targetWeek: 1 | 0 = new Date(date.getFullYear(), 0, 1).getDay() === 0 ? 0 : 1;
      const currentWeek: number = Math.floor(
        ((date - new Date(date.getFullYear(), 0, 1)) / 86400000 + new Date(date.getFullYear(), 0, 1).getDay() + 1) / 7,
      );
      return currentWeek === weekNumber - targetWeek;
    };

    const isInMonth = (dateString, monthNumber): boolean => {
      const date: Date = new Date(dateString);
      return date.getMonth() + 1 === monthNumber;
    };

    const filteredData = data?.filter(event => {
      const eventDate = event?.date?.split('.').reverse().join('-');
      return isInWeek(eventDate, weekNumber) && isInMonth(eventDate, monthNumber);
    });

    return filteredData;
  };

  const handleOpenMatch = async (uidGuest: string, name: string, girlsPhoto: string) => {
    // const userId = auth().currentUser?.uid;
    // const token = await getFcmToken();
    // try {
    //   await firestore().collection('CollectionOfMatches').add({
    //     notificationTokenSender: token,
    //     uidGuest: uidGuest,
    //     hostUid: userId,
    //     name: name,
    //     girlsPhoto: girlsPhoto,
    //   });
    //   showToast('inviteMatch', `Chat with ${name} >`, 'Invitation approved! Waiting for Alexa to accept your invitation.');
    //   // setIsVisibleMatch(true);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const OverlayRight = () => {
    return (
      <View style={[styles.overlayLabelContainerInvite]}>
        <Text style={styles.overlayLabelTextInvite}>{isHost ? 'INVITE' : 'Join'}</Text>
      </View>
    );
  };

  const OverlayLeft = () => {
    return (
      <View style={[styles.overlayLabelContainer]}>
        <Text style={styles.overlayLabelText}>NOPE</Text>
      </View>
    );
  };

  function hasWeekPassed(previousTimestamp: number) {
    const currentTimestamp = Date.now();
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    return currentTimestamp - previousTimestamp >= oneWeekInMilliseconds;
  }

  const fetchUserInfo = async () => {
    setLoading(true);
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();

        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
        const isWeek = hasWeekPassed(userInfoDoc?.data()?.lastUpdateSuperInvite);
        if (isWeek) {
          await firestore().collection('userInfo').doc(user.uid).update({
            lastUpdateSuperInvite: Date.now(),
            superInvites: 5,
          });
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const fetchMyEvents = async (isFirstRender: boolean) => {
    const user = auth().currentUser;
    if (user) {
      try {
        const querySnapshot = await firestore().collection('Events').where('uid', '==', user.uid).get();

        if (querySnapshot.empty) {
          setMyEvents([]);
          return;
        }
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyEventsList(data);
        setMyEvents(data);
        isFirstRender && setActiveEvent(data[0]);
        return data;
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
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

  const getFcmTokenFromUser = async (uid: string) => {
    const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
    return userInfoDoc.data()?.fcmToken;
  };

  const sendNotification = async (forUserUid: string, title: string, body: string, mark: string, status: string) => {
    const token = await getFcmTokenFromUser(forUserUid);

    console.warn('forUserUid', forUserUid);
    try {
      const result = await functions().httpsCallable('sendNotification')({
        token: token,
        priority: 'high',
        notification: {
          title,
          body,
        },
        data: {
          status,
          image: userInfo?.photos[0].image,
        },
      });
      if (result.data.success) {
        console.warn('Notification sent successfully', result.data.data);
      } else {
        console.error('Error sending notification:', result.data.error);
      }
    } catch (error) {
      console.error('Error calling Firebase Function:', error);
    }

    // const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     to: token,
    //     notification: {
    //       title: title,
    //       body: body,
    //     },
    //     data: {
    //       status: status,
    //       image: userInfo?.photos[0].image,
    //     },
    //   }),
    // });

    // if (!response.ok) {
    //   const error = await response.json();
    //   console.error('error sending notification:', error);
    // } else {
    // const data = await response.json();
    const userDoc = await firestore().collection('userInfo').doc(forUserUid).get();
    const userNotifications = userDoc.data()?.notifications;
    const id = generateRandomId(8);
    const notification = {
      id,
      title: title,
      body: body,
      mark: mark,
      uid: userInfo?.uid,
    };
    console.log('notification', notification);

    try {
      await firestore()
        .collection('userInfo')
        .doc(forUserUid)
        .update({
          notifications: [...userNotifications, notification],
        });
    } catch (error) {
      console.log('error update notifications', error);
    }
    // }
  };

  const onReject = async (uid: string, eventId: string) => {
    if(userInfo?.accountType === 'guest') {
      try {
        const doc = firestore().collection('userInfo').doc(userInfo?.uid)
      const data = (await doc.get()).data();
      if(data?.rejectEvents) {
        await doc.update({
          rejectEvents: [...data.rejectEvents, eventId]
        })
      } else {
        await doc.update({
          rejectEvents: [eventId]
        })
      }
      } catch (error) {
        console.log('error update rejectEvents', error);
      }
    } else {
      const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;
    try {
      const doc = firestore().collection('Events').doc(activeEventId)
      const data = (await doc.get()).data()
      if(data?.rejectList) {
        await doc.update({
          rejectList: [...data?.rejectList, uid]
        })
      } else {
        await doc.update({
          rejectList: [uid]
        })
      }
    } catch (error) {
      console.log('error update reject list', error);
    }
  }
}

  const onInvite = async (forUserUid: string, eventId: string, superInvite?: boolean, requestsList: any, usersList: any) => {

    const isFull = await checkIsFullGuestsFun()

    if(isFull) {
      setIsVisibleModalFullEvent(true)
      return
    }
    
    try {
      const guest = await firestore().collection('userInfo').doc(forUserUid).get();
      const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;

      const eventData = await firestore().collection('Events').doc(activeEventId).get();
      const event = eventData.data();
      if (!event) {
        return;
      }

      const userInvited = {
        gender: isHost ? guest.data()?.gender : userHost?.gender,
        name: isHost ? guest.data()?.name : userHost?.name,
        status: 'liked',
        superInvite: superInvite ? superInvite : false,
        uid: isHost ? guest.data()?.uid : userHost?.uid,
        userPhoto: isHost ? guest.data()?.photos[0]?.image : userHost?.photos[0]?.image,
        fcmToken: isHost ? guest.data()?.fcmToken : userHost?.fcmToken,
      };

      if (userHost?.accountType === 'host') {
        const matchedGuest = event.requestsList?.find(reqUser => reqUser?.uid === forUserUid && reqUser?.status === 'liked');
        let data = {};
        let matchedGuestData: MatchData;
        if (matchedGuest) {
          data = {
            requestsList: firestore.FieldValue.arrayRemove(matchedGuest),
            usersList: firestore.FieldValue.arrayUnion({...userInvited, status: 'invite_match'}),
          };
          matchedGuestData = {
            type: 'match',
            name: matchedGuest?.name,
            imageUri: matchedGuest?.userPhoto,
            uidHost: userHost?.uid,
            uidGuest: matchedGuest?.uid,
            eventId: activeEventId,
            superInvite: false,
            userHostImageUri: userHost?.photos[0]?.image,
          };
        } else {
          data = {
            usersList: firestore.FieldValue.arrayUnion(userInvited),
          };
        }
        await firestore()
          .collection('Events')
          .doc(activeEventId)
          .update(data)
          .then(async () => {
            if (matchedGuest && matchedGuestData) {
              await handleCreateChat(matchedGuestData);
              setMatchData(matchedGuestData);
              setIsVisibleMatch(true);
            }
            await sendNotification(
              forUserUid,
              'New invite request',
              `${userInfo.name} wants to invite you!`,
              'invite',
              'Invite Request'.toUpperCase(),
              userInfo,
            );
          });
      } else {
        const matchedGuest = event.usersList?.find(invUser => invUser?.uid === userHost?.uid && invUser?.status === 'liked');
        let data = {};
        let matchedGuestData: MatchData;
        if (matchedGuest) {
          const updatedUsersList = event?.usersList?.map(invUser => {
            if (invUser?.uid === userHost?.uid) {
              return {
                ...invUser,
                status: 'invite_match',
              };
            }
            return invUser;
          });
          data = {
            usersList: updatedUsersList,
          };
          matchedGuestData = {
            type: 'match',
            name: event?.hostName,
            imageUri: matchedGuest?.userPhoto,
            uidHost: event?.uid,
            uidGuest: matchedGuest?.uid,
            eventId: activeEventId,
            superInvite: false,
            userHostImageUri: event?.hostImage,
          };
        } else {
          data = {
            requestsList: firestore.FieldValue.arrayUnion(userInvited),
          };
        }

        await firestore()
          .collection('Events')
          .doc(activeEventId)
          .update(data)
          .then(async () => {
            if (matchedGuest && matchedGuestData) {
              await handleCreateChat(matchedGuestData);
              setMatchData(matchedGuestData);
              setIsVisibleMatch(true);
            }
            await sendNotification(
              event.uid,
              'New join request',
              `${userInfo.name} wants to join you!`,
              'invite',
              'Join Request'.toUpperCase(),
              userInfo,
            );
          });
      }

      setEvents(prev => prev.filter(i => i?.info?.uid !== forUserUid));
    } catch (error) {
      console.log('eror invite', error);
    }
  };

  const handleChangeListsEventsAfterSuperInvite = async (uid: string) => {
    const item = eventsRef.current?.filter(j => {
      return j?.info?.uid === uid;
    });
    if (!item?.length) {
      return;
    }

    const filter: any[] = eventsRef.current?.filter(i => i?.info?.uid !== uid);

    if (filter.length === 0) {
      setLastVisible(true);
    }

    setTimeout(() => {
      setEvents(filter);
    }, 500);

    setCurrentEventCardPosition(prev => prev + 1);

    eventsRef.current = filter;

    await onInvite(item[0]?.info?.uid, item[0]?.info?.id, true);
  };

  const handleChangeListsEvents = async (uid: string, type: string): Promise<void> => {
    if (type === 'accept') {
      const item = events?.filter(j => {
        return j?.info?.uid === uid;
      });

      const filter: any[] = events?.filter(i => i?.info?.uid !== uid);

      setEvents([...filter]);
      await onInvite(item[0]?.info?.uid, item[0]?.info?.id);
    } else {
      console.log('reject', events);
      console.log('uid', uid);
      const filter: any[] = events?.filter(i => i?.info?.uid !== uid);
      console.log('filter events', filter);
      setEvents(filter);
    }
  };

  const getListForGuest = async () => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }

    let filteredEvents: any[] = [];

    try {
      const querySnapshot = await firestore().collection('Events').get();
      filteredEvents = querySnapshot?.docs
        ?.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        ?.filter(event => {
          if (event?.requestsList?.find(j => j?.uid === user?.uid)) {
            return false;
          }
          if (event?.usersList?.find(j => j?.uid === user?.uid && j?.status === 'invite_match')) {
            return false;
          }
          return true;
        });
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    }

    async function enrichElementsWithPhotos(elements) {
      const promises = elements?.map(async element => {
        const docRef = firestore().collection('userInfo').doc(element?.uid);
        const doc = await docRef?.get();

        if (!doc?.exists) {
          return null;
        } else {
          const userData = doc?.data();
          return {...element, userPhotos: userData?.photos, hostInfo: userData};
        }
      });

      return Promise.all(promises);
    }

    const enrichedEvents = await enrichElementsWithPhotos(filteredEvents);

    const data: any[] = [];

    const currentMonth = new Date().getMonth() + 1;
    const currentWeek = getWeekNumber(currentDate);

    const filterDataWM = activeEventDate === 'all' ? enrichedEvents : filterDataByWeekAndMonth(enrichedEvents, currentWeek, currentMonth);

    if (!filterDataWM.length) {
      return;
    }

    filterDataWM?.map((event: any) => {
      const currUserPhotos = event?.userPhotos?.map((photo: any) => photo?.image);
      const eventPhotos = event?.photos?.map((photo: any) => photo?.image);
      data.push({
        component: (
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              hostInfo={event?.hostInfo}
              placeName={event?.placeName}
              girls={event?.female + event?.femaleFriend}
              date={event?.date}
              isShowEventPreview={true}
              isShowWantsJoin={false}
              isShowInvitesTooltip={false}
              isShowCardButtons={false}
              eventPhotos={event?.photos}
              photos={currUserPhotos}
              name={event?.name}
              onInvite={() => onInvite(event?.uid, event?.id)}
              superJoin={() => onInvite(event?.uid, event?.id, true)}
            />
            <View style={styles.bioWrapper}>
              <Text style={styles.titleSection}>Host profile</Text>
              <TouchableOpacity // @ts-ignore
                onPress={() => navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: event?.uid}})}
                style={styles.wrapperHostProfile}>
                <View style={{flexDirection: 'row'}}>
                  {event?.hostImage && (
                    <View style={{flexDirection: 'row'}}>
                      <Image source={{uri: event?.hostImage}} style={{width: 40, height: 40, borderRadius: 50}} />
                      {/*<View style={styles.greenCircle} />*/}
                    </View>
                  )}
                  <View style={{marginLeft: 13}}>
                    <View
                      style={{
                        borderRadius: 4,
                        borderColor: whiteColor,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}>
                      <Text style={{color: whiteColor, textTransform: 'capitalize', fontFamily: Satoshi700, fontSize: RFValue(10, 812)}}>
                        {event?.hostInfo.accountType}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                      <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812), marginRight: 6}}>
                        {event?.hostName}, {calculateAge(event?.hostInfo?.date)}
                      </Text>
                      {event?.hostInfo?.accountConfirmed && <CheckStarWhite />}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.textSeeProfile}>
                    <ArrowRightIcon width={14} height={14} />
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={[styles.titleSection, {marginTop: 20}]}>Event details</Text>
              <Text style={{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}}>Place name</Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>{event?.placeName}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}, {marginTop: 20}]}>
                Event name
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>{event?.name}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}, {marginTop: 20}]}>
                Event description
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>
                {event?.description}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <View style={{marginTop: 28}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <CalendarIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{event?.date}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <ClockIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{event?.hour}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <LocationIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>
                    {event?.address}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <PeopleIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>
                    {event?.female + event?.femaleFriend}x girl
                  </Text>
                </View>
              </View>
              <View>
                {eventPhotos?.map((image: string) => (
                  <Image source={{uri: image}} style={{width: '100%', height: screenHeight / 4, marginVertical: 10, borderRadius: 20}} />
                ))}
              </View>
              <Text style={styles.titleSection}>Already joined</Text>
              <View>
                <View style={styles.wrapperNumberPeople}>
                  <Text style={styles.textUnderSubTitle}>Female</Text>
                  <View style={styles.rowNumberPeople}>
                    <Text style={styles.textNumberInvitedPeople}>{event?.female}</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={[styles.wrapperNumberPeople, {marginTop: 12}]}>
                  <Text style={styles.textUnderSubTitle}>Male</Text>
                  <View style={styles.rowNumberPeople}>
                    <Text style={styles.textNumberInvitedPeople}>{event?.male}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapperButtonsFooter}>
                <TouchableOpacity
                  onPress={() => handleChangeListsEvents(event?.uid, 'reject')}
                  style={[styles.buttonCloseOrCheck, {marginLeft: 1}]}>
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      top: -1,
                      left: -1,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      right: -1,
                      bottom: -1,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: blackColor,
                      borderRadius: 50,
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CloseIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFlash} onPress={handleOpenSuperInvite}>
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      top: -1,
                      left: -1,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      right: -1,
                      bottom: -1,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: blackColor,
                      borderRadius: 50,
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FlashIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeListsEvents(event?.uid, 'accept')}
                  style={[styles.buttonCloseOrCheck, {marginRight: 1}]}>
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      top: -1,
                      left: -1,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      right: -1,
                      bottom: -1,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: blackColor,
                      borderRadius: 50,
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CheckIcon />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.textHideNadSendReport}>Reject and send report</Text>
            </View>
          </View>
        ),
        info: event,
      });
    });

    const filteredData = data.filter(item => item.info && item.info.eventReviewed);

    const recommendedData = sortByInterests(sortByDate(filteredData)?.reverse(), userHost);

    const sortRejectEvents = sortByRejectEvents(recommendedData);
    
    setTimeout(() => {
      setEvents(sortRejectEvents);
      allEventsLength.current = data.length;
    }, 2000);
  };

  const sortByRejectEvents = (data: any) => {
    const filterData = data?.filter(i => {
      return !userInfo?.rejectEvents.includes(i.info.id);
    });
    return filterData;
  };
  

  const getListForHost = async () => {
    let users: any;

    if (activeEvent.male > 0 && activeEvent.female > 0) {
      users = await firestore().collection('userInfo').limit(20).get();
    } else if (activeEvent.male > 0) {
      users = await firestore().collection('userInfo').where('gender', '==', 'man').limit(20).get();
    } else if (activeEvent.female > 0) {
      users = await firestore().collection('userInfo').where('gender', '==', 'woman').limit(20).get();
    }

    const getActualDataEvent = (await firestore().collection('Events').doc(activeEvent?.id).get()).data();

    const data: any[] = [];
    const usersList = await users?._docs;
    usersList
      ?.filter(item => {
        // console.warn('item', item?._data.uid, item?._data);

        if (activeEvent?.usersList?.find(j => j?.uid === item?._data.uid) ||
            activeEvent?.rejectList?.find(j => j === item?._data.uid)
        ) {
          return false;
        }
        if (item?._data?.uid === userHost?.uid) {
          return false;
        }
        return true;

      })
      ?.map((item: any, index: number): void => {
        // console.warn('itemMap', item?._data.uid, item?._data);

        const {name, bio, accountType, gender, address, homeAddress, height, alcohol, date, accountConfirmed, uid} = item?._data;

        const findSuperJoin = getActualDataEvent?.requestsList.find(i => {
          if (item?._data.uid === i.uid && i.superInvite) {
            return true;
          }
        });

        setNameUser(name);
        const girlPhotos = item?._data?.photos?.map((image: any): void => image?.image);
        const interests = item?._data?.interests?.map((i: any): void => i?.title);
        const smoking = item?._data?.smoke?.title;

        const age: string = calculateAge(date);

        data.push({
          component: (
            <View key={index} style={styles.wrapperFakeCard}>
              <TouchingSlider
                name={name}
                age={age}
                homeAddress={homeAddress}
                isShowInvitesTooltip={false}
                isLocked={!userInfo?.accountConfirmed}
                confirmedAccount={accountConfirmed}
                changeEventList={() => handleChangeListsEventsAfterSuperInvite(uid)}
                onInvite={() => onInvite(uid, item?._data?.id, [], [])}
                handleOpenSuperInvite={() => handleOpenSuperInvite(item?._data)}
                handleOpenMatch={() => handleOpenMatch(uid, name, girlPhotos[0])}
                photos={girlPhotos}
                accountType={accountType}
                handleAutoSwipeRight={handleAutoSwipeRight}
                isShowWantsJoin={findSuperJoin}
              />
              <View style={styles.bioWrapper}>
                <Text style={[styles.titleSection, bio && styles.mt31]}>My basics</Text>
                <View style={styles.wrapperTextTags}>
                  {gender && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <TablerGenderIcon />
                      </View>
                      {gender}
                    </Text>
                  )}
                  {address && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <LocationIcon />
                      </View>
                      {address}
                    </Text>
                  )}
                  {homeAddress && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <HomeIcon />
                      </View>
                      {homeAddress}
                    </Text>
                  )}
                  {height && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <ArrowIcon />
                      </View>
                      {height} см
                    </Text>
                  )}
                  {alcohol && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <WineIcon />
                      </View>
                      {alcohol?.title}
                    </Text>
                  )}
                  {smoking && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <SmokeIcon />
                      </View>
                      {smoking}
                    </Text>
                  )}
                </View>
                {bio && (
                  <>
                    <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
                    <Text style={styles.textDescription}>{bio}</Text>
                  </>
                )}
                {!!interests?.length && (
                  <>
                    <Text style={[styles.titleSection, styles.mt31]}>My interests</Text>
                    <View style={styles.wrapperInterestsTags}>
                      {interests?.map((interests: any, index: number) => (
                        <View key={index} style={styles.interestsTags}>
                          <Text style={styles.textTagsInterests}>{interests}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}
                <View style={styles.wrapperImageSectionFaceGirl}>
                  {girlPhotos?.map((photo: any, index: number) => (
                    <Image key={index} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                  ))}
                </View>
                <View style={styles.wrapperButtonsFooter}>
                  <TouchableOpacity onPress={() => handleChangeListsEvents(uid, 'reject')} style={styles.buttonCloseOrCheck}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CloseIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonFlash} onPress={() => handleOpenSuperInvite(item?._data)}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FlashIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleChangeListsEvents(uid, 'accept')} style={styles.buttonCloseOrCheck}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CheckIcon />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setUidScamUser(uid);
                    setModalReport(true);
                  }}>
                  <Text style={styles.textHideNadSendReport}>Hide and send report</Text>
                </TouchableOpacity>
              </View>
            </View>
          ),
          info: item?._data,
        });

        // setTimeout(() => {
        //   setEvents([...data]);
        //   setEventsLength(data.length);
        // }, 3000);
      });
    setTimeout(() => {
      allEventsLength.current = data.length;  
      const sortReports = sortEventsByReportFirstRender(data);       
      setEvents(sortReports);
      eventsRef.current = data;
    }, 2000);
    // console.warn('data', data);

    // setTimeout(() => {
    //   setEvents([...data]);
    //   setEventsLength(data.length);
    // }, 3000);
  };

  const sortEventsByReport = (uid: string) => {     
    if(uid) {
      const res = events?.filter(item => item.info.uid !== uid)
      setEvents(res);
      setCurrentEventCardPosition(prev => prev + 1);
    }
  }

  const sortEventsByReportFirstRender = (data: any) => {    
    const filterData = data.filter(item => {
      return item && !item.info.reports?.includes(userInfo.uid);
    });
  
    return filterData;
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
      fcmHelper(userInfo?.uid).then();
    }
  };

  const sortByDate = (events: any) => {
    events?.sort((a, b) => {
      let dateA: Date | any = new Date(a?.info?.date.split('.').reverse().join('-'));
      let dateB: Date | any = new Date(b?.info?.date.split('.').reverse().join('-'));

      return dateA - dateB;
    });
    return events;
  };

  const sortByInterests = (dataGuest: any, userHost: any) => {
    const filteredGuests = dataGuest.filter(guest => guest?.info?.hostInfo);

    if (!userHost?.interests || userHost?.interests.length === 0) {
      return [];
    }

    const userInterests = userHost?.interests?.map(interest => interest?.title);

    const matchedGuests = filteredGuests?.sort(guest => {
      if (
        !guest?.info?.hostInfo?.interests ||
        guest?.info?.hostInfo?.interests?.length === 0 ||
        guest?.info?.hostInfo?.chooseGuest !== userHost?.chooseGuest
      ) {
        return false;
      }
      return guest?.info?.hostInfo.interests?.some(interest => userInterests?.includes(interest.title));
    });
    return matchedGuests;
  };

  useEffect(() => {
    isHost ? getListForHost() : getListForGuest();
  }, [userInfo, userHost, activeEventDate]);

  useEffect(() => {
    // fetchUserInfo();
    fetchMyEvents(true);
    requestUserPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMyEvents(false);
      fetchUserInfo();
    }, []),
  );

  const goToCreateEvent = (): void => {
    if (!userHost?.accountConfirmed) {
      return;
    }
    if (!userInfo.accountPremium) {
      navigation.navigate(paymentPath as never);
    } else {
      navigation.navigate(eventCreatingStackPath);
    }
  };

  if ((loading || (!userHost && userInfo.accountConfirmed)) && !isVisibleMatch) {
    return <Loading text="Finding people near you..." userInfo={userInfo} />;
  }

  // if (activeEvent?.date && !isVisibleMatch) {
  //   const [day, month, year] = activeEvent?.date?.split('.').map(Number);
  //   const [hours, minutes] = activeEvent?.hour?.split(':').map(Number);

  //   const isExpired = moment().isAfter(moment(`${year}-${month}-${day} ${hours}:${minutes}`));
  //   if (isExpired) {
  //     return (
  //       <View style={{flex: 1}}>
  //         <View style={{flex: 1, width: '100%', backgroundColor: blackColor}}>
  //           {<Loading userInfo={activeEvent} topPosition={false} wrapperText={false} text={`Event Expired: ${activeEvent.date}`} />}
  //         </View>
  //       </View>
  //     );
  //   }
  // }

  if (!loading && myEvents.length < 1 && userInfo.accountConfirmed && isHost && !isVisibleMatch) {
    return (
      <View style={{flex: 1, width: '100%', backgroundColor: blackColor, paddingHorizontal: 24}}>
        <View style={{height: 370}}>
          <Loading userInfo={userInfo} topPosition={true} />
        </View>
        <View>
          <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(14, 812), fontFamily: Satoshi400}}>
            You don't have any active event. Get started by creating an event to begin inviting guests.
          </Text>
        </View>
        <Button onPress={goToCreateEvent} title={'Create event'} buttonStyle={{marginTop: 20, marginBottom: 30}} />
        <View style={{width: '100%', height: 1, backgroundColor: '#282828', marginBottom: 20, alignItems: 'center'}}>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: blackColor,
              borderRadius: 15,
              transform: [{translateY: -15}],
              justifyContent: 'center',
            }}>
            <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(14, 812), fontFamily: Satoshi400}}>or</Text>
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate(joinEventsPath)}>
            <Text style={{color: whiteColor, fontSize: RFValue(14, 812)}}>Start joining!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (
    ((!loading &&
      (isHost
        ? currentEventCardPosition > allEventsLength.current && !lastVisible
        : currentEventCardPosition > allEventsLength.current && allEventsLength.current)) ||
      !allEventsLength.current) &&
    !isVisibleMatch
  ) {
    return (
      <Loading
        text="Sorry, can't find any results. Please try adjusting your search parameters or try again later."
        userInfo={userInfo}
        wrapperText={false}
      />
    );
  }
  console.warn('events', events, isVisibleMatch);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
      <ModalFullEvent isVisible={isVisibleModalFullEvent} idEvent={activeEvent.id} setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}/>
      {totalQuantityGuests > 0 && 
          <FullEvent
            text={`Event is full: ${acceptQuantityGuest}/${totalQuantityGuests} Guests Accepted`}
            activeEvent={activeEvent} 
            totalQuantityGuests={totalQuantityGuests} 
            totalRequestsGuests={totalRequestsGuests}
            acceptQuantityGuest={acceptQuantityGuest}
            rightComponent={<View style={{flexDirection: 'row', alignItems:'center'}}>
            <PersoneIcon width={16} height={16}/>
            <Text style={{fontFamily: Satoshi700, fontSize: RFValue(12, 812), color: whiteColor, marginLeft: 2}}>{`${acceptQuantityGuest}/${totalQuantityGuests}`}</Text>
          </View>}
          />
        }
        {!userInfo?.accountConfirmed && <ModalLockAccount isVisibleButton={false} />}
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible}/>
        <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo?.photos[0].image}/>
        <View style={styles.container}>
          {
            events?.map((item, index) => {
              return (
                <View style={styles.cardContainer} pointerEvents="box-none" key={index.toString()}>
                  <TinderCard
                    ref={cardRef}
                    // @ts-ignore
                    cardWidth="100%"
                    // @ts-ignore
                    cardHeight="100%"
                    onSwipedLeft={() => {
                      onReject(item?.info?.uid, item?.info?.id)
                      setTimeout(() => {
                        setCurrentEventCardPosition(prev => prev + 1);
                      }, 500);
                    }}
                    onSwipedRight={() => {
                      onInvite(item?.info?.uid, item?.info?.id, item?.info?.requestsList, item?.info?.usersList);
                      setTimeout(() => {
                        setCurrentEventCardPosition(prev => prev + 1);
                      }, 500);
                    }}
                    OverlayLabelRight={OverlayRight}
                    OverlayLabelLeft={OverlayLeft}
                    disableBottomSwipe={true}
                    disableTopSwipe={true}
                    cardStyle={styles.card}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{borderRadius: 22, height: screenHeight - 250}}>
                      {item.component}
                    </ScrollView>
                  </TinderCard>
                </View>
              );
            })
            // :
            // <Loading text="Sorry, can't find any results. Please try adjusting your search parameters or try again later." userInfo={userInfo}/>
          }
          {!activeEvent.eventReviewed && userInfo.accountType === 'host' && (
            <ModalLockAccount
              haveCode={false}
              isVisibleButton={false}
              text="Your event is under review. Thank you for your patience. You will be notified if your account is accepted"
            />
          )}
          <ModalReport handleAutoSwipeLeft={handleAutoSwipeLeft} sortEventsByReport={sortEventsByReport} modalReport={modalReport} setModalReport={setModalReport} uidSender={userHost?.uid} uid={uidScamUser} />
          <SuperInvite
            isVisibleSuperInvite={isVisibleSuperInvite}
            activeSuperInviteUser={activeSuperInviteUser}
            onCloseSuperInvite={handleCloseSuperInvite}
            setLastVisible={setLastVisible}
          />
        </View>
      </SafeAreaView>
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default gestureHandlerRootHOC(IO);