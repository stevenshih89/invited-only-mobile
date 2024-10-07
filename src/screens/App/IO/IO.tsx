import {SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Alert, TouchableWithoutFeedback, AppState} from 'react-native';
import React, {FC, useState, useEffect, useContext, useCallback, useRef} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/IO/styles.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import {ACCEPTED_STATUS, APPROVED_STATUS, INVITE_MATCH_STATUS, screenHeight} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {eventCreatingStackPath, myProfileViewPath, paymentPath, userProfilePath} from 'constants/pathLocations.ts';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';
import {calculateAge} from 'helpers/calculateAge';
import {EventContext} from 'contexts/EventContext';
import {blackColor, lightGreenColor, transparentWhite56Color, whiteColor} from 'constants/colors';
import {fcmHelper, onMatchNotificationSubscription, sendNotification} from 'helpers/fcmHelper.ts';
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
import {handleCreateChat} from 'helpers/chat';
import FullEvent from 'components/FullEvent';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {onUserProfileChangeSubscription} from 'helpers/userProfile';
import {User, UserInfo} from 'src/types/userInfo';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import {useAdminActions} from 'src/store/adminActions';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import ModalEventLocked from 'components/Modal/ModalEventLocked/ModalEventLocked';
import {useGuestList} from 'src/store/guestListStore';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard';

const USERS_FETCHING_DELAY = 3000;

const IO: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);

  const [myEvents, setMyEventsList] = useState([]);
  const [nameUser, setNameUser] = useState<string>('');
  const [reportedItem, setReportedItem] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});
  const [matchData, setMatchData] = useState<MatchData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [activeSuperInviteUser, setActiveSuperInviteUser] = useState<any>({});
  const [currentEventCardPosition, setCurrentEventCardPosition] = useState(1);
  const [ownerEventUserPhoto, setOwnerEventUserPhoto] = useState();
  const [lastVisible, setLastVisible] = useState(false);
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);
  const [visibleModalSuperJoin, setVisibleModalSuperJoin] = useState(false);
  const [currentEventInfo, setCurrentEventInfo] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);

  const {setCounterSuperInvites, decrementCounterSuperInvites, counterSuperInvites} = useCounterSuperEvents();

  const {setMyEvents, setActiveEvent, activeEvent} = useContext(EventContext);

  const {activeEventDate} = useContext(EventsDate);
  
  const userHost = useUser((i: any) => i?.user);
  const setUser = useUser((i: any) => i?.setUser);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setRejectModalVisible = useAdminActions((i: any) => i?.setRejectModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);

  const {guestsInvited, setGuestsInvited} = useGuestList();

  const allEventsLength = useRef(0);

  const eventsRef = useRef<any[]>();
  const counterSuperInvitesRef = useRef(0);
  const counterWeeklySuperInvitesRef = useRef(0);

  const cardRef = useRef(null);

  const handleSuperInvite = () => {
    if (counterSuperInvitesRef.current > 0 || counterWeeklySuperInvitesRef.current > 0) {
      flipCoin();
    } else {
      navigation.navigate('/super-invite-pay');
    }
  };

  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const flipCoin = () => {
    rotation.value = withTiming(flipped ? 0 : 180, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    setFlipped(prev => !prev);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 0 : 1,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 1 : 0,
    };
  });

  useEffect(() => {
    if (isVisibleSuperInvite) {
      setFlipped(false);
    }
  }, [isVisibleSuperInvite]);

  useEffect(() => {
    setGuestsInvited(activeEvent?.usersList?.length);
  }, [activeEvent]);

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      try {
        if (nextAppState === 'active' || nextAppState === 'inactive') {
          await firestore()
            .collection('userInfo')
            .doc(userInfo.uid)
            .update({
              online: nextAppState === 'active' ? true : false,
            });
        }
      } catch (error) {
        console.log('error update online', error);
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, userInfo]);

  useEffect(() => {
    let unsubscribeEvent: any;
    if (activeEvent?.id) {
      unsubscribeEvent = firestore()
        .collection('Events')
        .doc(activeEvent?.id)
        .onSnapshot(querySnapshot => {
          if (!querySnapshot.exists) {
            return setActiveEvent({});
          }
          const data = querySnapshot.data();
          const prevEventReviewed = activeEvent?.eventReviewed;
          const currentEventReviewed = data?.eventReviewed;
          const prevStatusEvent = activeEvent?.statusEvent;
          const currentStatusEvent = data?.statusEvent;

          if (prevStatusEvent !== currentStatusEvent || prevEventReviewed !== currentEventReviewed) {
            setActiveEvent({...activeEvent, eventReviewed: currentEventReviewed, statusEvent: currentStatusEvent});
          }
        });
    }
    return () => {
      unsubscribeEvent && unsubscribeEvent();
    };
  }, [activeEvent]);

  useEffect(() => {
    const subscription = onUserProfileChangeSubscription(info => {
      setUserInfo((prev: UserInfo) => ({...prev, ...info}));
      setUser(info);
    });

    return subscription;
  }, []);

  const handleAutoSwipeRight = (uid: string, isSort: boolean = true) => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.autoSwipeRight();
    }
    if (isSort) {
      sortEvents(uid);
    }
  };

  const handleAutoSwipeLeft = () => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.autoSwipeLeft();
    }
  };

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

  const decrementSuperInvite = async (item: any[], coinAnimationTimer = 0) => {
    try {
      if (counterSuperInvites > 0) {
        setTimeout(() => {
          rotation.value = withTiming(0, {
            duration: 1,
            easing: Easing.inOut(Easing.ease),
          });
          setFlipped(prev => !prev);
        }, 500);
        if (userInfo?.accountType === 'host') {
          setTimeout(() => {
            setIsVisibleSuperInvite(true);
          }, coinAnimationTimer);
          await onInvite(item?.uid, item?.id, true);
        } else {
          handleSuperJoin();
          await onInvite(item?.uid, item?.id, true);
        }
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

  const handleOpenSuperInvite = (item: any[], coinAnimationTimer: number): void => {
    setActiveSuperInviteUser(item);
    decrementSuperInvite(item, coinAnimationTimer);
    decrementCounterSuperInvites(1);
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

  const handleReport = (uid: string, event?: any) => {
    const currEvent = isHost ? activeEvent : event;
    setReportedItem({uid, event: currEvent});
    setModalReport(true);
  };

  function filterDataByWeekMonth(data: any, days: number) {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + days);
    const filter = data.filter(item => {
      if (!item || !item.date) {
        return false;
      }
      const parts = item.date.split('.');
      const itemDate = new Date(parts[2], parts[1] - 1, parts[0]);
      if (isNaN(itemDate.getTime())) {
        return false;
      }
      return itemDate >= today && itemDate <= nextWeek;
    });
    return filter;
  }

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

      setTimeout(() => {
        setEvents(prev =>
          prev.filter(i => {
            return isHost ? i?.info?.uid !== uid : i?.info?.id !== eventId;
          }),
        );
      }, 300);
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
      if (!event || event?.statusEvent === false || event?.isCancelled === true) {
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
        const maxGuests = event?.male + event?.female;

        const acceptedUsersList = event?.usersList?.filter(i => i?.status === ACCEPTED_STATUS);
        console.warn('maxGuests', maxGuests, acceptedUsersList.length);

        if (acceptedUsersList?.length >= maxGuests) {
          showToast('inviteMatch', 'You have reached the maximum number of guests', 'Invite');
          setIsVisibleModalFullEvent(true);
          return;
        }

        const matchedGuest = event.requestsList?.find(reqUser => reqUser?.uid === forUserUid && reqUser?.status === 'liked');
        let data = {};
        let matchedGuestData: MatchData;
        if (matchedGuest) {
          data = {
            requestsList: firestore.FieldValue.arrayRemove(matchedGuest),
            usersList: firestore.FieldValue.arrayUnion({...userInvited, status: INVITE_MATCH_STATUS}),
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
            joinEvents: guest?._data.joinEvents,
            location: guest?._data.location,
            premium: userInfo?.accountPremium,
            dateHost: userInfo?.date,
            dateGuest: guest?._data.date,
            onlineGuest: guest?._data.online,
            accountConfirmedHost: guest?._data.accountConfirmed,
            accountConfirmedGuest: userInfo?.accountConfirmed,
            usersListHost: eventData?._data.usersList,
            accountTypeHost: userInfo?.accountType,
            accountTypeGuest: guest?._data.accountType,
            eventImage: eventData?._data.photos[0].image,
            guestsInvited: eventData._data.usersList.length,
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
              console.log('proverka host');

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
                status: INVITE_MATCH_STATUS,
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
            joinEvents: userInfo?.joinEvents,
            location: userInfo?.location,
            premium: guest?._data.accountPremium,
            dateHost: guest?._data.date,
            dateGuest: userInfo?.date,
            onlineGuest: userInfo?.online,
            accountConfirmedHost: userInfo?.accountConfirmed,
            accountConfirmedGuest: userInfo?.accountConfirmed,
            usersListHost: eventData?._data.usersList,
            accountTypeHost: guest?._data.accountType,
            accountTypeGuest: userInfo?.accountType,
            eventImage: eventData?._data.photos[0].image,
            guestsInvited: eventData._data.usersList.length,
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
              console.log('proverka guest');
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

  const handleSuperJoin = () => {
    if (counterSuperInvites > 0) {
      setVisibleModalSuperJoin(true);
      setTimeout(() => {
        setVisibleModalSuperJoin(false);
      }, 4000);
    } else {
      showToast('inviteMatch', "You don't have Super Joins", 'Super Join');
    }
  };

  const handleChangeListsEvents = async (uid: string, type: string): Promise<void> => {
    if (type === 'accept') {
      handleAutoSwipeRight(uid, false);
    } else {
      handleAutoSwipeLeft();
    }
  };

  const filterEventsByBlockedUsers = async (eventsList: any[]) => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }
    const blockedUsers = await firestore().collection('report').where('uidSender', '==', user?.uid).get();
    const blockedMeUsers = await firestore().collection('report').where('uid', '==', user?.uid).get();

    const blockedUsersList = blockedUsers.docs.map(doc => doc.data().uid);
    const blockedMeUsersList = blockedMeUsers.docs.map(doc => doc.data().uidSender);
    const filteredEvents = eventsList.filter(event => {
      if (blockedUsersList.includes(event?.info?.uid) || blockedMeUsersList.includes(event?.info?.uid)) {
        return false;
      }
      return true;
    });

    return filteredEvents;
  };

  const getDataUserEvent = async (uid: string) => {
    const getDoc = await firestore().collection('userInfo').doc(uid).get();
    return getDoc.data();
  };

  const customButton = (id: string) => {
    return (
      <TouchableOpacity
        onPress={() => handleAutoSwipeRight(id)}
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
          Join
        </Text>
      </TouchableOpacity>
    );
  };

  const getListForGuest = async () => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }
    setLoading(true);
    let filteredEvents: any[] = [];

    try {
      const querySnapshot = await firestore().collection('Events').where('statusEvent', '==', true).get();

      filteredEvents = querySnapshot?.docs
        ?.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        ?.filter(event => {
          if (event?.requestsList?.find(j => j?.uid === user?.uid)) {
            return false;
          }
          if (
            event?.usersList?.find(
              j =>
                j?.uid === user?.uid &&
                (j?.status === INVITE_MATCH_STATUS ||
                  j?.status === APPROVED_STATUS ||
                  j?.status === ACCEPTED_STATUS ||
                  j?.status === 'notAccepted'),
            )
          ) {
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

    const filterDataWM =
      activeEventDate === 'all'
        ? enrichedEvents
        : activeEventDate === 'this_weekend'
        ? filterDataByWeekMonth(enrichedEvents, 7)
        : filterDataByWeekMonth(enrichedEvents, 31);
    
    if (!filterDataWM.length) {
      return;
    }

    for (const event of filterDataWM) {
      const currUserPhotos = event?.userPhotos?.filter(i => i.image !== null).map((photo: any) => photo?.image);
      const eventPhotos = event?.photos?.filter(i => i.image !== null).map((photo: any) => photo?.image);
      const userEventData = await getDataUserEvent(event?.uid);

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
              confirmedEvent={event?.statusEvent}
              uidUserEvent={event?.uid}
              hourEvent={event?.hour}
              usersListLength={event?.usersList.length}
              usersList={event?.usersList}
              handleAutoSwipeLeft={handleAutoSwipeLeft}
            />
            <View style={styles.bioWrapper}>
              <Text style={[styles.titleSection]}>Event details</Text>
              <MyEventsCard
                imageBg={event?.photos}
                list={event}
                statusEvent={event?.statusEvent}
                eventReviewed={event?.eventReviewed}
                allPeople={event?.female + event?.male}
                date={event?.date}
                textCityName={event?.name}
                placeName={event?.placeName}
                estimeTime={event?.hour}
                numberOfGirlsInvited={event?.female}
                invitingPeople={event?.usersxwList?.filter(i => i?.status !== 'notAccepted')}
                accountConfirmed={user?.accountConfirmed}
                findAcceptedGuest={event?.usersList?.filter(event => event.status === INVITE_MATCH_STATUS)}
                totalRequestsGuests={event?.requestsList?.length}
                item={event}
                showGuestList={false}
                customButton={customButton(event.id)}
              />
              <Text style={{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Place name</Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{event?.placeName}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}, {marginTop: 20}]}>
                Event name
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{event?.name}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}, {marginTop: 20}]}>
                Event description
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>
                {event?.description}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <View style={{marginVertical: 34}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Address</Text>
                <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{event?.address}</Text>
              </View>
              <View>
                {eventPhotos?.map((image: string) => (
                  <Image source={{uri: image}} style={{width: '100%', height: screenHeight / 4, marginVertical: 10, borderRadius: 20}} />
                ))}
              </View>
              <TouchableOpacity // @ts-ignore
                onPress={() => navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: event?.uid}})}
                style={styles.wrapperHostProfile}>
                <View style={{flexDirection: 'row'}}>
                  {event?.hostImage && (
                    <View style={{flexDirection: 'row'}}>
                      <FastImage source={{uri: event?.hostImage}} style={{width: 40, height: 40, borderRadius: 50}} />
                      {userEventData?.online && (
                        <View
                          style={{
                            width: 11,
                            height: 11,
                            borderRadius: 11,
                            backgroundColor: lightGreenColor,
                            borderWidth: 1.25,
                            borderColor: blackColor,
                            position: 'absolute',
                            bottom: 3,
                            right: 0,
                          }}
                        />
                      )}
                    </View>
                  )}
                  <View style={{marginLeft: 13}}>
                    <View style={{flexDirection: 'row'}}>
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
                      {userEventData?.accountPremium && (
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
                <TouchableWithoutFeedback
                  onPress={() => {
                    setCurrentEventInfo(event);
                    handleSuperInviteBottom(event, 0);
                  }}>
                  <View style={styles.buttonFlash}>
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
                    <Animated.View
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: blackColor,
                          borderRadius: 50,
                          zIndex: 10,
                          justifyContent: 'center',
                          position: 'absolute',
                          alignItems: 'center',
                        },
                        frontAnimatedStyle,
                      ]}>
                      <FlashIcon />
                    </Animated.View>
                    <Animated.View
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: blackColor,
                          borderRadius: 50,
                          zIndex: 10,
                          position: 'absolute',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        backAnimatedStyle,
                      ]}>
                      <Text style={{color: whiteColor, fontSize: 24, fontWeight: '500', transform: [{rotateY: '180deg'}]}}>
                        {counterSuperInvites - 1}
                      </Text>
                    </Animated.View>
                  </View>
                </TouchableWithoutFeedback>
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
              <TouchableOpacity
                onPress={() => {
                  handleReport(event.uid, event.id);
                }}>
                <Text style={styles.textHideNadSendReport}>Block and Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
        info: event,
      });
    }

    const filteredData = data.filter(item => item.info && item.info.eventReviewed);

    const sortedByInterestsData = sortByInterests(sortByDate(filteredData)?.reverse(), userHost);

    const recommendedData = (await filterEventsByBlockedUsers(sortedByInterestsData)) || [];

    setTimeout(() => {
      setEvents(recommendedData);
      eventsRef.current = recommendedData;
      allEventsLength.current = recommendedData.length;
      setLoading(false);
    }, 2000);
  };

  const handleSuperInviteBottom = (item: any, coinAnimationTimer: number) => {
    handleSuperInvite();
    handleOpenSuperInvite(item, coinAnimationTimer);
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
    setLoading(true);

    if (activeEvent.male > 0 && activeEvent.female > 0) {
      users = await firestore().collection('userInfo').limit(20).get();
    } else if (activeEvent.male > 0) {
      users = await firestore().collection('userInfo').where('gender', '==', 'man').limit(20).get();
    } else if (activeEvent.female > 0) {
      users = await firestore().collection('userInfo').where('gender', '==', 'woman').limit(20).get();
    }

    const getActualDataEvent = (await firestore().collection('Events').doc(activeEvent?.id).get()).data();

    const blockedUsers = await firestore().collection('report').where('uidSender', '==', user?.uid).get();

    const blockedMeUsers = await firestore().collection('report').where('uid', '==', user?.uid).get();

    const blockedUsersList = blockedUsers.docs.map(doc => doc.data().uid);
    const blockedMeUsersList = blockedMeUsers.docs.map(doc => doc.data().uidSender);

    const data: any[] = [];
    const usersList = await users?._docs;
    usersList
      ?.filter(item => {
        if (blockedUsersList.includes(item?._data.uid)) {
          return false;
        }

        if (blockedMeUsersList.includes(item?._data.uid)) {
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
                activeEvent={activeEvent}
                location={item?._data.location}
                joinEvents={item?._data.joinEvents}
                online={item?._data.online}
                date={item?._data.date}
                item={item?._data}
                userInfo={userInfo}
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
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setGuestsInvited(guestsInvited + 1);
                      handleSuperInviteBottom(item._data, 400);
                    }}>
                    <View style={styles.buttonFlash}>
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
                      <Animated.View
                        style={[
                          {
                            width: '100%',
                            height: '100%',
                            backgroundColor: blackColor,
                            borderRadius: 50,
                            zIndex: 10,
                            justifyContent: 'center',
                            position: 'absolute',
                            alignItems: 'center',
                          },
                          frontAnimatedStyle,
                        ]}>
                        <FlashIcon />
                      </Animated.View>
                      <Animated.View
                        style={[
                          {
                            width: '100%',
                            height: '100%',
                            backgroundColor: blackColor,
                            borderRadius: 50,
                            zIndex: 10,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                          backAnimatedStyle,
                        ]}>
                        <Text style={{color: whiteColor, fontSize: 24, fontWeight: '500', transform: [{rotateY: '180deg'}]}}>
                          {counterSuperInvites}
                        </Text>
                      </Animated.View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableOpacity
                    onPress={() => {
                      setGuestsInvited(guestsInvited + 1);
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
                    handleReport(uid, activeEvent);
                  }}>
                  <Text style={styles.textHideNadSendReport}>Block and Report</Text>
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
    setLoading(false);
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
  }, [userInfo, userHost, activeEvent?.id, activeEventDate]);

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

  if ((loading || (!userHost && userInfo.accountConfirmed)) && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
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
    !visibleModalSuperJoin &&
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
        <SuperJoin
          isVisibleMatch={visibleModalSuperJoin}
          nameEvent={currentEventInfo?.name}
          imageEvent={currentEventInfo ? currentEventInfo.photos[0]?.image : ''}
        />
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
                    setTimeout(() => {
                      onReject(item?.info?.uid, item?.info?.id);
                    }, 500);
                    setTimeout(() => {
                      setCurrentEventCardPosition(prev => prev + 1);
                    }, 500);
                  }}
                  onSwipedRight={() => {
                    setGuestsInvited(guestsInvited + 1);
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
          {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && <ModalLockAccount haveCode={false} isVisibleButton={false} />}
          {userInfo?.accountConfirmed && isHost && (
            <ModalEventLocked eventReviewed={activeEvent?.eventReviewed} eventStatus={activeEvent?.statusEvent} />
          )}
          <ModalReport
            handleAutoSwipeLeft={handleAutoSwipeLeft}
            modalReport={modalReport}
            setModalReport={setModalReport}
            uidSender={userHost?.uid}
            uid={reportedItem?.uid}
            activeEvent={reportedItem?.event?.id}
          />
          <SuperInvite
            isVisibleSuperInvite={isVisibleSuperInvite}
            activeSuperInviteUser={activeSuperInviteUser}
            onCloseSuperInvite={handleCloseSuperInvite}
            setLastVisible={setLastVisible}
          />
        </View>
      </SafeAreaView>
      {/* isVisibleMatch */}
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default gestureHandlerRootHOC(IO);
