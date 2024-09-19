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
import {eventCreatingStackPath, joinEventsPath, myProfileViewPath, paymentPath, userProfilePath} from 'constants/pathLocations.ts';
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
import PersoneIcon from 'assets/images/icons/Users.svg';
import {EventsDate} from 'contexts/EventsDate.tsx';
import Loading from 'components/Loading/Loading';
import SuperInvite from './screens/SuperInvite/SuperInvite';
import Match, {MatchData} from './screens/Match/Match';
// import ModalSuperInvite from 'components/Modal/ModalSuperInvite';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import SuperJoin from 'components/Modal/ModalSuperJoin/SuperJoin';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites';
import moment from 'moment';
import {handleCreateChat} from 'helpers/chat';
import {checkIsFullGuests} from 'helpers/checkIsFullGuests';
import FullEvent from 'components/FullEvent';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {onUserProfileChangeSubscription} from 'helpers/userProfile';
import {User, UserInfo} from 'src/types/userInfo';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import {useAdminActions} from 'src/store/adminActions';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';

const USERS_FETCHING_DELAY = 3000;

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
  const setUser = useUser((i: any) => i?.setUser);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setRejectModalVisible = useAdminActions((i: any) => i?.setRejectModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);

  const allEventsLength = useRef(0);

  const eventsRef = useRef<any[]>();
  const counterSuperInvitesRef = useRef(0);
  const counterWeeklySuperInvitesRef = useRef(0);

  const cardRef = useRef(null);

  useEffect(() => {
    const subscription = onUserProfileChangeSubscription(info => {
      setUserInfo((prev: UserInfo) => ({...prev, ...info}));
      setUser(info);
    });

    return subscription;
  }, []);

  const handleAutoSwipeRight = (uid: string) => {
    if (cardRef.current) {
      cardRef.current.autoSwipeRight();
    }
    sortEvents(uid);
  };

  const handleAutoSwipeLeft = () => {
    if (cardRef.current) {
      cardRef.current.autoSwipeLeft();
    }
  };

  let currentDate = new Date();
  const isHost = userHost?.accountType === 'host';

  const setRejectVisible = () => {
    setAcceptModalVisible(false);
    setRejectModalVisible(true);
  };

  const setAcceptVisible = () => {
    setRejectModalVisible(false);
    setAcceptModalVisible(true);
  };

  useEffect(() => {
    if (userInfo && userInfo?.showModalAccept) {
      setAcceptModalVisible(true);
    }
  }, [userInfo]);

  useEffect(() => {
    const unsubscribe = onMatchNotificationSubscription(
      message => {
        const data = message?.data;
        setMatchData(data);
        setIsVisibleMatch(true);
      },
      setRejectVisible,
      setAcceptVisible,
    );
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

  useFocusEffect(
    useCallback(() => {
      getSuperInvites();
    }, []),
  );

  const handleOpenSuperInvite = async (item, uid?: string): void => {
    setActiveSuperInviteUser(item);
    decrementCounterSuperInvites(1);
    try {
      if (counterSuperInvites > 0) {
        setIsVisibleSuperInvite(true);
        handleChangeListsEventsAfterSuperInvite(uid);
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
      if (!userInfo?.accountReviewed) {
        showToast('inviteMatch', 'have a code? click here', 'Your account is under review', {
          ownerPhoto: userInfo?.photos[0].image,
          status: 'ON REVIEW',
          path: 'invitationCode',
        });
      }
    }
  }, [userInfo]);

  useFocusEffect(
    useCallback(() => {
      setCurrentEventCardPosition(1);
    }, [activeEvent]),
  );

  // const getWeekNumber = date => {
  //   let firstDayOfYear: Date = new Date(date.getFullYear(), 0, 1);
  //   let pastDaysOfYear: number = (date - firstDayOfYear) / 86400000;
  //   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  // };

  function filterDataByWeekMonth(data: any, days: number) {    
    const today = new Date();
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + days);

    const filter = data.filter(item => {
        const parts = item.date.split('.');
        const itemDate = new Date(parts[2], parts[1] - 1, parts[0]);
        if (isNaN(itemDate)) {
            return false;
        }
        return itemDate >= today && itemDate <= nextWeek;
    });
    return filter;
}

  // const filterDataByWeekAndMonth = (data, week, month) => {
  //   console.log('data', data, week, month);
    
  //   const weekNumber: number = parseInt(week);
  //   const monthNumber: number = parseInt(month);

  //   const isInWeek = (dateString, weekNumber): boolean => {
  //     const date: Date = new Date(dateString);
  //     const targetWeek: 1 | 0 = new Date(date.getFullYear(), 0, 1).getDay() === 0 ? 0 : 1;
  //     const currentWeek: number = Math.floor(
  //       ((date - new Date(date.getFullYear(), 0, 1)) / 86400000 + new Date(date.getFullYear(), 0, 1).getDay() + 1) / 7,
  //     );
  //     return currentWeek === weekNumber - targetWeek;
  //   };

  //   const isInMonth = (dateString, monthNumber): boolean => {
  //     const date: Date = new Date(dateString);
  //     return date.getMonth() + 1 === monthNumber;
  //   };

  //   const filteredData = data?.filter(event => {
  //     const eventDate = event?.date?.split('.').reverse().join('-');
  //     return isInWeek(eventDate, weekNumber) && isInMonth(eventDate, monthNumber);
  //   });

  //   return filteredData;
  // };

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

          if (userInfoDoc.data().accountReviewed && !userInfoDoc.data().accountConfirmed) {
            setRejectModalVisible(true);
          }
        }
        const isWeek = hasWeekPassed(userInfoDoc?.data()?.lastUpdateSuperInvite);
        if (isWeek) {
          await firestore().collection('userInfo').doc(user.uid).update({
            lastUpdateSuperInvite: Date.now(),
            weeklySuperInvites: 5,
          });
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, USERS_FETCHING_DELAY);
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

  const onReject = async (uid: string, eventId: string) => {
    const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;
    try {
      await firestore()
        .collection('Events')
        .doc(activeEventId)
        .update({
          rejectsList: firestore.FieldValue.arrayUnion({uid}),
        });

      setEvents(prev => prev.filter(i => i?.info?.uid !== uid));
    } catch (error) {
      console.error(error);
    }
  };

  const onInvite = async (forUserUid: string, eventId: string, superInvite?: boolean) => {
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

      if (isHost) {
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
            nameHost: event?.hostName,
            nameGuest: matchedGuest?.name,
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
            nameHost: event?.hostName,
            nameGuest: matchedGuest?.name,
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
      // console.log('eror invite', error);
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

    setCurrentEventCardPosition(prev => prev + 1);

    setTimeout(() => {
      setEvents(filter);
    }, 20);

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
      // console.log('reject', events);
      // console.log('uid', uid);
      const filter: any[] = events?.filter(i => i?.info?.uid !== uid);
      // console.log('filter events', filter);
      setEvents(filter);
    }
  };

  const filterEventsByBlockedUsers = async (events: any[]) => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }
    const blockedUsers = await firestore().collection('report').where('uidSender', '==', user?.uid).get();

    const blockedUsersList = blockedUsers.docs.map(doc => doc.data().uid);
    const filteredEvents = events.filter(event => !blockedUsersList.includes(event?.info?.uid));

    return filteredEvents;
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

    // const currentMonth = new Date().getMonth() + 1;
    
    // const currentWeek = getWeekNumber(currentDate);    

    const filterDataWM =
      activeEventDate === 'all'
        ? enrichedEvents
        : activeEventDate === 'this_weekend'
        ? filterDataByWeekMonth(enrichedEvents, 7)
        : filterDataByWeekMonth(enrichedEvents, 31);

    if (!filterDataWM.length) {
      return;
    }        

    filterDataWM?.map((event: any) => {
      const currUserPhotos = event?.userPhotos?.filter(i => i.image !== null).map((photo: any) => photo?.image);
      const eventPhotos = event?.photos?.filter(i => i.image !== null).map((photo: any) => photo?.image);

      data.push({
        component: (
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              hostInfo={event?.hostInfo}
              userInfo={userInfo}
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
              handleAutoSwipeRight={() => handleAutoSwipeRight(event?.id)}
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

    const sortedByInterestsData = sortByInterests(sortByDate(filteredData)?.reverse(), userHost);

    const recommendedData = (await filterEventsByBlockedUsers(sortedByInterestsData)) || [];


    setTimeout(() => {
      setEvents(recommendedData);
      eventsRef.current = recommendedData;
      allEventsLength.current = recommendedData.length;
    }, 2000);
  };

  const sortEvents = (uid: string) => {
    if (uid) {
      const res = eventsRef.current?.filter(item => item.info.uid !== uid);
      eventsRef.current = res;
      setEvents(res);
      setCurrentEventCardPosition(prev => prev + 1);
    }
  };

  const getListForHost = async () => {
    const user = auth().currentUser;
    let users: any;

    if (activeEvent.male > 0 && activeEvent.female > 0) {
      users = await firestore().collection('userInfo').limit(20).get();
    } else if (activeEvent.male > 0) {
      users = await firestore().collection('userInfo').where('gender', '==', 'man').limit(20).get();
    } else if (activeEvent.female > 0) {
      users = await firestore().collection('userInfo').where('gender', '==', 'woman').limit(20).get();
    }

    const getActualDataEvent = (await firestore().collection('Events').doc(activeEvent?.id).get()).data();

    const blockedUsers = await firestore().collection('report').where('uidSender', '==', user?.uid).get();

    const blockedUsersList = blockedUsers.docs.map(doc => doc.data().uid);

    const data: any[] = [];
    const usersList = await users?._docs;
    usersList
      ?.filter(item => {
        if (blockedUsersList.includes(item?._data.uid)) {
          return false;
        }

        if (getActualDataEvent?.rejectsList?.find(j => j?.uid === item?._data.uid)) {
          return false;
        }

        if (getActualDataEvent?.usersList?.find(j => j?.uid === item?._data.uid)) {
          return false;
        }
        if (item?._data?.uid === userHost?.uid) {
          return false;
        }
        return true;
      })
      ?.map((item: any, index: number): void => {

        const {name, bio, accountType, gender, address, homeAddress, height, alcohol, date, accountConfirmed, uid, accountPremium} =
          item?._data;

        const findSuperJoin = getActualDataEvent?.requestsList.find(i => {
          if (item?._data.uid === i.uid && i.superInvite) {
            return true;
          }
        });

        setNameUser(name);
        const girlPhotos = item?._data?.photos?.filter((item: User.Photo) => item.image !== null).map((image: User.Photo) => image?.image);
        const interests = item?._data?.interests?.map((i: User.Interests) => i?.title);
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
                onInvite={() => onInvite(uid, item?._data?.id)}
                handleOpenSuperInvite={() => handleOpenSuperInvite(item?._data, uid)}
                photos={girlPhotos}
                accountType={accountType}
                handleAutoSwipeRight={() => handleAutoSwipeRight(item?._data?.id)}
                isShowWantsJoin={findSuperJoin}
                isPremium={accountPremium}
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
                  <TouchableOpacity
                    onPress={() => {
                      handleAutoSwipeLeft();
                      setTimeout(() => {
                        sortEvents(item?._data?.uid);
                      }, 500);
                    }}
                    style={styles.buttonCloseOrCheck}>
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
                  <TouchableOpacity
                    onPress={() => {
                      handleAutoSwipeRight(item?._data?.id);
                    }}
                    style={styles.buttonCloseOrCheck}>
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
      });

    allEventsLength.current = data.length;
    setEvents(data);
    eventsRef.current = data;
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // // console.log('Authorization status:', authStatus);
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

  if (!loading && myEvents.length < 1 && userInfo.accountConfirmed && isHost && !isVisibleMatch && !acceptModalVisible) {
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
      </View>
    );
  }

  if (
    ((!loading &&
      (isHost
        ? currentEventCardPosition > allEventsLength.current && !lastVisible
        : currentEventCardPosition > allEventsLength.current && allEventsLength.current)) ||
      !allEventsLength.current) &&
    !acceptModalVisible &&
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

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
        <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo?.photos[0].image} />
        <ModalFullEvent
          isVisible={isVisibleModalFullEvent}
          idEvent={activeEvent.id}
          setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
        />
        {totalQuantityGuests > 0 && (
          <FullEvent
            text={`Event is full: ${acceptQuantityGuest}/${totalQuantityGuests} Guests Accepted`}
            activeEvent={activeEvent}
            totalQuantityGuests={totalQuantityGuests}
            totalRequestsGuests={totalRequestsGuests}
            acceptQuantityGuest={acceptQuantityGuest}
            rightComponent={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PersoneIcon width={16} height={16} />
                <Text
                  style={{
                    fontFamily: Satoshi700,
                    fontSize: RFValue(12, 812),
                    color: whiteColor,
                    marginLeft: 2,
                  }}>{`${acceptQuantityGuest}/${totalQuantityGuests}`}</Text>
              </View>
            }
          />
        )}
        {!userInfo?.accountConfirmed && <ModalLockAccount isVisibleButton={false} />}
        <View style={styles.container}>
          {events?.map((item, index) => {
            return (
              <View style={styles.cardContainer} pointerEvents="box-none" key={index.toString()}>
                <TinderCard
                  ref={cardRef}
                  // @ts-ignore
                  cardWidth="100%"
                  // @ts-ignore
                  cardHeight="100%"
                  onSwipedLeft={() => {
                    onReject(item?.info?.uid, item?.info?.id);
                    setTimeout(() => {
                      setCurrentEventCardPosition(prev => prev + 1);
                    }, 500);
                  }}
                  onSwipedRight={() => {
                    onInvite(item?.info?.uid, item?.info?.id);
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
          })}
          {!activeEvent.eventReviewed && userInfo.accountType === 'host' && (
            <ModalLockAccount
              haveCode={false}
              isVisibleButton={false}
              text="Your event is under review. Thank you for your patience. You will be notified if your account is accepted"
            />
          )}
          <ModalReport
            handleAutoSwipeLeft={handleAutoSwipeLeft}
            modalReport={modalReport}
            setModalReport={setModalReport}
            uidSender={userHost?.uid}
            uid={uidScamUser}
          />
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

