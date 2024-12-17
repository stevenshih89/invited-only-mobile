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
import {
  ACCEPTED_STATUS,
  ALL,
  APPROVED_STATUS,
  CANCEL_STATUS,
  INVITE_MATCH_STATUS,
  LIKED,
  NOT_ACCEPTED_STATUS,
  screenHeight,
  THIS_MONTH,
  THIS_WEEK,
} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {
  earlyAccessPath,
  commonStackPath,
  eventCreatingStackPath,
  myProfileViewPath,
  paymentPath,
  userProfilePath,
} from 'constants/pathLocations.ts';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';
import {calculateAge} from 'helpers/calculateAge';
import {blackColor, lightGreenColor, transparentWhite16Color, transparentWhite56Color, whiteColor} from 'constants/colors';
import {fcmHelper, onMatchNotificationSubscription, sendNotification} from 'helpers/fcmHelper.ts';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {useUser} from '../../../store/userStore';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';

//import icons
import LoaderIcon from 'assets/images/icons/loader.svg';
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
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import ModalEventLocked from 'components/Modal/ModalEventLocked/ModalEventLocked';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard';
import moment from 'moment';
import {Event, EventData} from 'src/types/event';
import {useScrollPosition} from 'src/store/scrollPosition';
import {getUsersForEvent} from 'src/api/user';
import {filterEventsByThisWeek} from 'helpers/filterEventsByThisWeek';
import {filterEventsByThisMonth} from 'helpers/filterEventsByThisMonth';
import {updateGuestEventsList} from 'helpers/updateGuestEventsList';
import {getUserData} from 'helpers/getUserData';
import analytics from '@react-native-firebase/analytics';
import {inviteUser, IOscreen, joinEvent} from 'constants/analitycs';
import RNUxcam from 'react-native-ux-cam';
import {getEvents} from 'src/api/event';
import {useMyEvents} from 'src/store/myEvents';

const IO: FC = (): JSX.Element => {
  const EVENTS_LOADING_LIMIT = 4;
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [nameUser, setNameUser] = useState<string>('');
  const [reportedItem, setReportedItem] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});
  const [matchData, setMatchData] = useState<MatchData>({});
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [activeSuperInviteUser, setActiveSuperInviteUser] = useState<any>({});
  const [currentEventCardPosition, setCurrentEventCardPosition] = useState(1);
  const [lastVisible, setLastVisible] = useState(false);
  const [totalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests] = useState<number>(0);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);
  const [visibleModalSuperJoin, setVisibleModalSuperJoin] = useState(false);
  const [currentEventInfo, setCurrentEventInfo] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);

  const {setCounterSuperInvites, decrementCounterSuperInvites, counterSuperInvites} = useCounterSuperEvents();

  const {loadingCardsList, setLoadingCardsList, myEvents, loadingMyEvents, activeEvent, setActiveEvent, setMyEvents} = useMyEvents();

  const {activeEventDate} = useContext(EventsDate);

  const userHost = useUser((i: any) => i?.user);
  const setUser = useUser((i: any) => i?.setUser);

  const setScrollPosition = useScrollPosition((i: any) => i?.setScrollPosition);
  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setRejectModalVisible = useAdminActions((i: any) => i?.setRejectModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);

  const eventsRef = useRef<any[]>();
  const counterSuperInvitesRef = useRef(0);
  const counterWeeklySuperInvitesRef = useRef(0);
  const cardRef = useRef(null);
  const endReachedRef = useRef<boolean>(false);
  const lastVisibleRef = useRef<any>(null);

  const rotationLoader = useSharedValue(0);

  useEffect(() => {
    if (loadingUser) {
      rotationLoader.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
    }

    return () => {
      cancelAnimation(rotationLoader);
    };
  }, [rotationLoader, loadingUser]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotationLoader.value}deg`}],
    };
  });

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
    const handleAppStateChange = async (nextAppState: any) => {
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
            console.warn('IO_useEffect_activeEvent_querySnapshot', querySnapshot);

            // dispatch(setActiveEvent({}));
          }
          const data = querySnapshot.data();
          const prevEventReviewed = activeEvent?.eventReviewed;
          const currentEventReviewed = data?.eventReviewed || false;
          const prevStatusEvent = activeEvent?.statusEvent;
          const currentStatusEvent = data?.statusEvent || false;
          if (prevStatusEvent !== currentStatusEvent || prevEventReviewed !== currentEventReviewed) {
            setActiveEvent({...activeEvent, eventReviewed: currentEventReviewed, statusEvent: currentStatusEvent});
          }
        });
    }
    return () => {
      unsubscribeEvent && unsubscribeEvent();
    };
  }, [activeEvent?.id]);

  useEffect(() => {
    const subscription = onUserProfileChangeSubscription(info => {
      setUserInfo((prev: UserInfo) => ({...prev, ...info}));
      setUser(info);
    });

    return subscription;
  }, []);

  const handleSwipeCardRight = () => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.swipeCardRight();
    }
  };

  const handleSwipeCardLeft = () => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.swipeCardLeft();
    }
  };

  const handleFilterEvent = ({uid, id, withSwipeAnimation}: {uid: string; id: string; withSwipeAnimation: boolean}) => {
    setScrollPosition(0);
    setEvents(prev =>
      prev.filter(i => {
        return isHost ? i?.info?.uid !== uid : i?.info?.id !== id;
      }),
    );
    setTimeout(() => {
      setCurrentEventCardPosition(prev => prev + 1);
    }, 100);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  const handleReject = ({uid, id, withSwipeAnimation}: {uid: string; id: string; withSwipeAnimation: boolean}) => {
    setScrollPosition(0);
    onReject(uid, id);
    setTimeout(() => {
      setCurrentEventCardPosition(prev => prev + 1);
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  const handleInvite = ({
    uid,
    id,
    withSwipeAnimation,
    superInvite,
  }: {
    uid: string;
    id: string;
    withSwipeAnimation: boolean;
    superInvite?: boolean;
  }) => {
    setScrollPosition(0);
    onInvite(uid, id, superInvite);
    setTimeout(() => {
      setCurrentEventCardPosition(prev => prev + 1);
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
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

  useEffect(() => {
    getSuperInvites();
    try {
      analytics().logScreenView({
        screen_name: IOscreen,
      });
    } catch (e) {
      console.error(e);
    }
    RNUxcam.tagScreenName(IOscreen);
  }, []);

  const decrementSuperInvite = async (item: UserInfo, coinAnimationTimer = 0) => {
    try {
      // if (counterSuperInvites > 0) {
      // setTimeout(() => {
      //   rotation.value = withTiming(0, {
      //     duration: 100,
      //     easing: Easing.inOut(Easing.ease),
      //   });
      //   setFlipped(prev => !prev);
      // }, 500);
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
      // }
    } catch (error) {
      console.log('error supert invite', error);
    }
  };

  const handleOpenSuperInvite = (item: UserInfo, coinAnimationTimer: number): void => {
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
    }, [activeEvent?.id]),
  );

  const handleReport = (uid: string, event?: any) => {
    const currEvent = isHost ? activeEvent : event;
    setReportedItem({uid, event: currEvent});
    setModalReport(true);
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
    setLoadingUser(true);
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();

        const userInfoData = userInfoDoc.data() as UserInfo;

        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());

          if (userInfoData.accountReviewed && !userInfoData.accountConfirmed) {
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
        setLoadingUser(false);
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
    setLoadingUser(false);
  };

  const fetchMyEvents = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const querySnapshot = await firestore()
          .collection('Events')
          .where('uid', '==', user.uid)
          .where('isCancelled', '==', false)
          .orderBy('createdAt', 'desc')
          .get();

        if (querySnapshot.empty) {
          setLoadingCardsList(false);
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
        if (!filteredEvents.length) {
          setLoadingCardsList(false);
          return;
        }
        setMyEvents(filteredEvents);
      } catch (error: any) {
        setLoadingCardsList(false);
        console.error(error);

        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const onReject = async (uid: string, eventId: string) => {
    const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;

    const rejectUid = isHost ? uid : userInfo?.uid;
    if (isHost) {
      try {
        analytics().logEvent(`${IOscreen}_reject_${inviteUser}`, {
          hostUid: userHost?.uid,
          guestUid: uid,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        analytics().logEvent(`${IOscreen}_reject_${joinEvent}`, {
          hostUid: eventId,
          guestUid: userInfo?.uid,
        });
      } catch (e) {
        console.error(e);
      }
    }
    try {
      await firestore()
        .collection('Events')
        .doc(activeEventId)
        .update({
          rejectsList: firestore.FieldValue.arrayUnion(rejectUid),
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

  const updateSuperJoinsUser = async () => {
    try {
      const getDoc = await firestore().collection('userInfo').doc(userInfo.uid).get();
      const data = getDoc.data();

      if (data?.weeklySuperInvites && data?.weeklySuperInvites > 0) {
        await firestore()
          .collection('userInfo')
          .doc(userInfo.uid)
          .update({
            weeklySuperInvites: data?.weeklySuperInvites - 1,
          });
      } else {
        if (data?.superInvites && data.superInvites > 0) {
          await firestore()
            .collection('userInfo')
            .doc(userInfo.uid)
            .update({
              superInvites: data?.superInvites - 1,
            });
        }
      }
    } catch (error) {
      console.log('error update guest super joins', error);
    }
  };

  const onInvite = async (forUserUid: string, eventId: string, superInvite?: boolean) => {
    try {
      const guest = await firestore().collection('userInfo').doc(forUserUid).get();

      const guestData = guest.data() as UserInfo;

      const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;

      const eventData = await firestore().collection('Events').doc(activeEventId).get();

      if (!eventData.exists) {
        return;
      }

      const event = eventData.data() as EventData;
      if (!event || event?.statusEvent === false || event?.isCancelled === true) {
        return;
      }

      const userInvited = {
        gender: isHost ? guestData?.gender : userHost?.gender,
        name: isHost ? guestData?.name : userHost?.name,
        status: LIKED,
        superInvite: superInvite ? superInvite : false,
        uid: isHost ? guestData?.uid : userHost?.uid,
        userPhoto: isHost ? guestData?.photos[0]?.image : userHost?.photos[0]?.image,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      const acceptedUsersList = event?.usersList?.filter(i => i?.status === ACCEPTED_STATUS);
      if (isHost) {
        const maxGuests = event?.male + event?.female;

        if (acceptedUsersList?.length >= maxGuests) {
          showToast('inviteMatch', 'You have reached the maximum number of guests', 'Invite');
          setIsVisibleModalFullEvent(true);
          setLoadingCardsList(true);
          setEvents(prev => [...prev]);
          setLoadingCardsList(false);
          return;
        }

        const matchedGuest = event.requestsList?.find(reqUser => reqUser?.uid === forUserUid && reqUser?.status === LIKED);
        let data = {};
        let matchedGuestData: MatchData;
        if (matchedGuest) {
          data = {
            requestsList: firestore.FieldValue.arrayRemove(matchedGuest),
            usersList: firestore.FieldValue.arrayUnion({
              ...userInvited,
              status: INVITE_MATCH_STATUS,
            }),
          };
          matchedGuestData = {
            type: 'match',
            nameHost: event?.hostName,
            nameGuest: matchedGuest?.name,
            imageUri: matchedGuest?.userPhoto,
            uidHost: userHost?.uid,
            uidGuest: matchedGuest?.uid,
            eventId: activeEventId,
            superInvite: superInvite ? superInvite : false,
            userHostImageUri: userHost?.photos[0]?.image,
            joinEvents: guestData.joinEvents,
            location: guestData.location,
            premium: userInfo?.accountPremium,
            dateHost: userInfo?.date,
            dateGuest: guestData.date,
            onlineGuest: guestData.online,
            accountConfirmedHost: guestData.accountConfirmed,
            accountConfirmedGuest: userInfo?.accountConfirmed,
            usersListHost: event.usersList,
            accountTypeHost: userInfo?.accountType,
            accountTypeGuest: guestData.accountType,
            eventImage: event.photos[0].image,
            guestsInvited: event.male + event.female,
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
            analytics().logEvent(`${IOscreen}_${inviteUser}`, {
              hostUid: userHost?.uid,
              guestUid: forUserUid,
            });
            if (matchedGuest && matchedGuestData) {
              await handleCreateChat(matchedGuestData);
              await updateGuestEventsList(activeEventId, forUserUid);
              setMatchData(matchedGuestData);
              setIsVisibleMatch(true);
            }
            if (guestData.notificationSettings?.match || guestData.notificationSettings?.superInvite) {
              await sendNotification(
                forUserUid,
                'New invite request',
                `${userInfo.name} ${superInvite ? 'Super' : 'wants to'} invite you!`,
                'invite',
                'Invite Request'.toUpperCase(),
                userInfo,
                JSON.stringify({path: 'requests'}),
              );
            }
          });
      } else {
        if (acceptedUsersList?.length < event.male + event.female) {
          const matchedGuest = event.usersList?.find(invUser => invUser?.uid === userHost?.uid && invUser?.status === LIKED);
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
              superInvite: superInvite ? superInvite : false,
              userHostImageUri: event?.hostImage,
              joinEvents: userInfo?.joinEvents,
              location: userInfo?.location,
              premium: guestData.accountPremium,
              dateHost: guestData.date,
              dateGuest: userInfo?.date,
              onlineGuest: userInfo?.online,
              accountConfirmedHost: userInfo?.accountConfirmed,
              accountConfirmedGuest: userInfo?.accountConfirmed,
              usersListHost: event.usersList,
              accountTypeHost: guestData.accountType,
              accountTypeGuest: userInfo?.accountType,
              eventImage: event.photos[0].image,
              guestsInvited: event.male + event.female,
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
              analytics().logEvent(`${IOscreen}_${joinEvent}`, {
                hostUid: event?.uid,
                guestUid: userInfo?.uid,
              });
              if (superInvite) {
                await updateSuperJoinsUser();
              }
              if (matchedGuest && matchedGuestData) {
                await handleCreateChat(matchedGuestData);
                setMatchData(matchedGuestData);
                setIsVisibleMatch(true);
              }
              if (guestData.notificationSettings?.match || guestData.notificationSettings?.superJoin) {
                await sendNotification(
                  event.uid,
                  'New join request',
                  `${userInfo.name} wants to join you!`,
                  'invite',
                  'Join Request'.toUpperCase(),
                  userInfo,
                  JSON.stringify({path: 'requests'}),
                );
              }
            });
        } else {
          const matchedGuestData = {
            type: 'match',
            nameHost: event?.hostName,
            nameGuest: userInfo?.name,
            imageUri: userInfo?.photos[0].image,
            uidHost: userInfo?.uid,
            uidGuest: event?.uid,
            eventId: activeEventId,
            superInvite: superInvite ? superInvite : false,
            userHostImageUri: event?.hostImage,
            joinEvents: userInfo?.joinEvents,
            location: userInfo?.location,
            premium: userInfo.accountPremium,
            dateHost: userInfo.date,
            dateGuest: userInfo?.date,
            onlineGuest: userInfo?.online,
            accountConfirmedHost: userInfo?.accountConfirmed,
            accountConfirmedGuest: userInfo?.accountConfirmed,
            usersListHost: event.usersList,
            accountTypeHost: userInfo.accountType,
            accountTypeGuest: userInfo?.accountType,
            eventImage: event.photos[0].image,
            guestsInvited: event.male + event.female,
          };

          showToast('inviteMatch', `Chat with ${event.hostName} to find a solution`, "The event is full: You can't join", {
            ownerPhoto: event.hostImage,
            status: 'FULL',
            path: 'chatCreate',
            params: matchedGuestData,
          });
          setLoadingCardsList(true);
          setEvents(prev => [...prev]);
          setLoadingCardsList(false);
          return;
        }
      }
      setEvents(prev => prev.filter(i => (isHost ? i?.info?.uid !== forUserUid : i?.info?.id !== eventId)));
      setScrollPosition(0);
    } catch (error) {
      console.error(error);
    }
  };

  // const getUserAcceptedEvent = (event: any) => {
  //   if (event) {
  //     const userAccepted = event.usersList.filter(item => item.usersList.status === ACCEPTED_STATUS);
  //     return userAccepted.length;
  //   }
  // };

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

  // const filterEventsByBlockedUsers = async (eventsList: any[]) => {
  //   const user = auth().currentUser;
  //   if (!user) {
  //     return;
  //   }
  //   const blockedUsers = await firestore().collection('report').where('uidSender', '==', user?.uid).get();
  //   const blockedMeUsers = await firestore().collection('report').where('uid', '==', user?.uid).get();

  //   const blockedUsersList = blockedUsers.docs.map(doc => doc.data().uid);
  //   const blockedMeUsersList = blockedMeUsers.docs.map(doc => doc.data().uidSender);
  //   const filteredEvents = eventsList.filter(event => {
  //     if (blockedUsersList.includes(event?.info?.uid) || blockedMeUsersList.includes(event?.info?.uid)) {
  //       return false;
  //     }
  //     return true;
  //   });

  //   return filteredEvents;
  // };

  const customButton = (id: string, uid: string) => {
    return (
      <TouchableOpacity
        onPress={() => handleInvite({uid, id, withSwipeAnimation: true})}
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

  async function enrichElementsWithPhotos(elements) {
    const promises = elements?.map(async element => {
      const docRef = firestore().collection('userInfo').doc(element?.uid);
      const doc = await docRef?.get();

      if (!doc?.exists) {
        return null;
      } else {
        const userData = doc?.data() as UserInfo;
        return {...element, userPhotos: userData?.photos, hostInfo: userData};
      }
    });

    return Promise.all(promises);
  }

  const filterEventByDate = list => {
    if (activeEventDate === ALL) {
      return list;
    }
    if (activeEventDate === THIS_WEEK) {
      return filterEventsByThisWeek(list);
    }
    if (activeEventDate === THIS_MONTH) {
      return filterEventsByThisMonth(list);
    }
    return list;
  };

  const getCardsListForGuest = async (refresh?: boolean) => {
    const user = auth().currentUser;
    if (!user?.uid) {
      return;
    }
    if (!refresh) {
      setLoadingCardsList(true);
    }
    let filteredEvents: any[] = [];

    try {
      const blockedUsers = await firestore().collection('report').where('uidSender', '==', user.uid).get();

      const blockedMeUsers = await firestore().collection('report').where('uid', '==', user.uid).get();

      const blockedUsersList = blockedUsers.docs.map(doc => doc.data().uid);
      const blockedMeUsersList = blockedMeUsers.docs.map(doc => doc.data().uidSender);

      const uniqueBlockedUsers = [...new Set([...blockedUsersList, ...blockedMeUsersList])];
      const eventsQuery = await getEvents({
        limit: EVENTS_LOADING_LIMIT,
        lastVisible: lastVisibleRef.current,
        excludeUids: uniqueBlockedUsers,
      });

      if (!eventsQuery || !('docs' in eventsQuery)) {
        setEvents([]);
        setLoadingCardsList(false);
        endReachedRef.current = true;
        return;
      }

      if (eventsQuery.docs.length > 0) {
        lastVisibleRef.current = eventsQuery.docs[eventsQuery.docs.length - 1];
      }

      if (eventsQuery.docs.length < EVENTS_LOADING_LIMIT) {
        endReachedRef.current = true;
      }

      filteredEvents = eventsQuery?.docs
        ?.map(doc => doc.data() as EventData)
        ?.filter(event => {
          if (event?.requestsList?.find((requestedUser: Event.User) => requestedUser?.uid === user?.uid)) {
            return false;
          }
          if (
            event?.usersList?.find(
              (invitedUser: Event.User) =>
                invitedUser?.uid === user?.uid &&
                (invitedUser?.status === INVITE_MATCH_STATUS ||
                  invitedUser?.status === APPROVED_STATUS ||
                  invitedUser?.status === ACCEPTED_STATUS ||
                  invitedUser?.status === NOT_ACCEPTED_STATUS ||
                  invitedUser?.status === CANCEL_STATUS),
            )
          ) {
            return false;
          }
          if (event?.rejectsList?.find((rejectedUid: string) => rejectedUid === user?.uid)) {
            return false;
          }
          if (event?.date && event?.hour) {
            const adjustedDate = moment(`${event.date}, ${event.hour}`, 'DD.MM.YYYY, HH:mm').add(12, 'hours');
            if (adjustedDate.isBefore(moment())) {
              return false;
            }
          }
          return true;
        });
    } catch (e: any) {
      console.error(e);
      Alert.alert('Error', e.message || 'Something went wrong');
    }

    console.warn('getCardsListForGuest_1', filteredEvents?.length, refresh);

    const enrichedEvents = await enrichElementsWithPhotos(filteredEvents);

    const data: any[] = [];

    const filteredDataEvents = filterEventByDate(enrichedEvents);

    for (const event of filteredDataEvents) {
      const currUserPhotos = event?.userPhotos?.filter(i => i.image !== null).map((photo: any) => photo?.image);
      const eventPhotos = event?.photos?.filter(i => i.image !== null).map((photo: any) => photo?.image);
      const {
        online: userEventOnline,
        accountPremium: userEventAccountPremium,
        photos: userEventPhotos,
        date: userEventDate,
        accountConfirmed: userEventAccountConfirmed,
      } = await getUserData(event?.uid);

      data.push({
        component: (
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              hostInfo={event?.hostInfo}
              userInfo={userInfo}
              placeName={event?.placeName}
              girls={event?.female + event?.femaleFriend}
              activeType={event?.activeType}
              date={event?.date}
              isShowEventPreview={true}
              isShowWantsJoin={false}
              isShowInvitesTooltip={false}
              isShowCardButtons={false}
              eventPhotos={event?.photos}
              photos={currUserPhotos}
              name={event?.name}
              placeName={event?.placeName}
              onReject={() => handleReject({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
              onInvite={() => handleInvite({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
              superJoin={() => handleInvite({uid: event?.uid, id: event?.id, withSwipeAnimation: true, superInvite: true})}
              confirmedEvent={event?.statusEvent}
              uidUserEvent={event?.uid}
              hourEvent={event?.hour}
              usersListLength={event?.usersList.length}
              usersList={event?.usersList}
              accountType={userInfo?.accountType}
              isPreview={false}
              setCurrentEventCardPosition={setCurrentEventCardPosition}
              setScrollPosition={setScrollPosition}
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
                invitingPeople={event?.usersList?.filter((i: Event.User) => i?.status !== NOT_ACCEPTED_STATUS)}
                accountConfirmed={userInfo?.accountConfirmed}
                findAcceptedGuest={event?.usersList?.filter((eventUser: Event.User) => eventUser.status === INVITE_MATCH_STATUS)}
                totalRequestsGuests={event?.requestsList?.length}
                item={event}
                showGuestList={false}
                customButton={customButton(event?.id, event?.uid)}
              />
              <Text style={{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Place name</Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{event?.placeName}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}, {marginTop: 20}]}>
                Event name
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{event?.name}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}, {marginTop: 20}]}>
                Event description
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>
                {event?.description}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <View style={{marginVertical: 20}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Address</Text>
                <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{event?.address}</Text>
              </View>
              <View
                style={{
                  marginBottom: screenHeight / 40,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderTopColor: transparentWhite16Color,
                  paddingTop: screenHeight / 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleReport(event.uid, event.id);
                  }}>
                  <Text style={styles.textHideNadSendReport}>Block and Report</Text>
                </TouchableOpacity>
              </View>
              <View>
                {eventPhotos?.map((image: string) => (
                  <Image source={{uri: image}} style={{width: '100%', height: screenHeight / 4, marginVertical: 10, borderRadius: 20}} />
                ))}
              </View>
              <TouchableOpacity // @ts-ignore
                onPress={() => {
                  navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: event?.uid}});
                }}
                style={styles.wrapperHostProfile}>
                <View style={{flexDirection: 'row'}}>
                  {event?.hostImage && (
                    <View style={{flexDirection: 'row'}}>
                      <FastImage
                        source={{uri: userEventPhotos?.[0]?.image || event?.hostImage}}
                        style={{width: 40, height: 40, borderRadius: 50}}
                      />
                      {userEventOnline && (
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
                      {userEventAccountPremium && (
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
                        {event?.hostName}
                        {userEventDate && ', ' + calculateAge(userEventDate)}
                      </Text>
                      {userEventAccountConfirmed && <CheckStarWhite />}
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
                  onPress={() => handleReject({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
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
                  onPress={() => handleInvite({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
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

    const sortedByInterestsData = sortByInterests(sortByDate(data)?.reverse(), userHost);

    setEvents(prevEvents => {
      if (refresh) {
        const updatedEvents = [...prevEvents.reverse(), ...sortedByInterestsData].reverse();
        eventsRef.current = updatedEvents;
        return updatedEvents;
      } else {
        eventsRef.current = sortedByInterestsData;
        return sortedByInterestsData;
      }
    });
    setLoadingCardsList(false);
  };

  const handleSuperInviteBottom = (item: any, coinAnimationTimer: number) => {
    handleSuperInvite();
    handleOpenSuperInvite(item, coinAnimationTimer);
  };

  const getCardsListForHost = async (refresh?: boolean) => {
    const user = auth().currentUser;
    console.warn(activeEvent?.id);

    if (!user?.uid || !activeEvent?.id || !userInfo?.uid) {
      return;
    }
    if (!refresh) {
      setLoadingCardsList(true);
    }
    let users;
    let getActualDataEvent: EventData | null = null;
    try {
      const eventQuery = await firestore().collection('Events').doc(activeEvent.id).get();
      if (!eventQuery.exists) {
        setLoadingCardsList(false);
        setEvents([]);
        endReachedRef.current = true;
        return;
      }
      getActualDataEvent = eventQuery.data() as EventData;

      const blockedUsers = await firestore().collection('report').where('uidSender', '==', user.uid).get();

      const blockedMeUsers = await firestore().collection('report').where('uid', '==', user.uid).get();

      const blockedUsersList = blockedUsers.docs.map(doc => doc.data().uid);
      const blockedMeUsersList = blockedMeUsers.docs.map(doc => doc.data().uidSender);

      const uniqueUsersListIds = getActualDataEvent?.usersList?.map((j: Event.User) => j?.uid) || [];
      const allUniqueIds = [
        ...new Set([...blockedUsersList, ...blockedMeUsersList, ...getActualDataEvent?.rejectsList, ...uniqueUsersListIds, userInfo?.uid]),
      ];

      users = await getUsersForEvent({
        excludeUids: allUniqueIds,
        male: activeEvent?.male,
        female: activeEvent?.female,
        limit: EVENTS_LOADING_LIMIT,
        lastVisible: lastVisibleRef.current,
      });
    } catch (error) {
      console.error(error);
    }

    if (!users) {
      setLoadingCardsList(false);
      setEvents([]);
      endReachedRef.current = true;
      return;
    }

    if (users?.length > 0) {
      lastVisibleRef.current = users[users.length - 1];
    }

    if (users.length < EVENTS_LOADING_LIMIT) {
      endReachedRef.current = true;
    }

    const data: any[] = [];
    const usersList = users?.map(doc => doc.data());

    usersList?.map((item: UserInfo, index: number): void => {
      const {name, bio, accountType, gender, address, homeAddress, height, alcohol, date, accountConfirmed, uid, accountPremium} = item;

      const findSuperJoin = getActualDataEvent?.requestsList.find((i: Event.User) => {
        if (item.uid === i.uid && i.superInvite) {
          return true;
        }
      });

      setNameUser(name);
      const girlPhotos: string[] = item?.photos
        ?.filter((userPhotos: User.Photo) => userPhotos.image !== null)
        .map((image: User.Photo) => `${image?.image}`);

      const interests = item?.interests?.map((i: User.Interests) => i?.title);
      const smoking = item?.smoke?.title;

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
              onReject={() => handleReject({uid, id: item?.id, withSwipeAnimation: true})}
              onInvite={() => handleInvite({uid, id: item?.id, withSwipeAnimation: true})}
              handleOpenSuperInvite={() => handleOpenSuperInvite(item, uid)}
              photos={girlPhotos}
              accountType={accountType}
              isShowWantsJoin={findSuperJoin}
              isPremium={accountPremium}
              activeEvent={activeEvent}
              location={item.location}
              placeName={item.placeName}
              joinEvents={item.joinEvents}
              online={item.online}
              date={item.date}
              item={item}
              userInfo={userInfo}
              isPreview={false}
            />
            <View style={styles.bioWrapper}>
              <Text style={[styles.titleSection, bio ? styles.mt31 : {}]}>My basics</Text>
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
                    {alcohol}
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
                <View
                  style={{
                    borderTopWidth: 1,
                    borderStyle: 'solid',
                    borderTopColor: transparentWhite16Color,
                    marginTop: screenHeight / 44,
                    paddingTop: screenHeight / 44,
                  }}>
                  <Text style={[styles.titleSection]}>My interests</Text>
                  <View style={styles.wrapperInterestsTags}>
                    {interests.map((interest: string | null, idx: number) => (
                      <View key={idx} style={styles.interestsTags}>
                        <Text style={styles.textTagsInterests}>{interest}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              <View
                style={{
                  borderTopWidth: 1,
                  borderStyle: 'solid',
                  borderTopColor: transparentWhite16Color,
                  paddingTop: screenHeight / 34,
                  marginTop: 10,
                  marginBottom: screenHeight / 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleReport(uid, activeEvent);
                  }}>
                  <Text style={styles.textHideNadSendReport}>Block and Report</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.wrapperImageSectionFaceGirl}>
                {girlPhotos?.map((photo: string, photoIndex: number) => (
                  <Image key={photoIndex} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                ))}
              </View>
              <View style={styles.wrapperButtonsFooter}>
                <TouchableOpacity
                  onPress={() => handleReject({uid, id: item?.id, withSwipeAnimation: true})}
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
                <TouchableWithoutFeedback onPress={() => handleSuperInviteBottom(item, 400)}>
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
                  onPress={() => handleInvite({uid: item?.uid, id: item?.id, withSwipeAnimation: true})}
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
              <TouchableOpacity onPress={() => handleReport(uid, activeEvent)}>
                <Text style={styles.textHideNadSendReport}>Block and Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
        info: item,
      });
    });

    eventsRef.current = data;
    setEvents(prevEvents => {
      if (refresh) {
        const updatedEvents = [...prevEvents.reverse(), ...data].reverse();
        eventsRef.current = updatedEvents;
        return updatedEvents;
      } else {
        eventsRef.current = data;
        return data;
      }
    });
    setLoadingCardsList(false);
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      await fcmHelper();
    }
  };

  const sortByDate = (eventsForSort: {info: EventData}[]) => {
    eventsForSort?.sort((a, b) => {
      let dateA: Date | any = new Date(a?.info?.date.split('.').reverse().join('-'));
      let dateB: Date | any = new Date(b?.info?.date.split('.').reverse().join('-'));

      return dateA - dateB;
    });
    return eventsForSort;
  };

  const sortByInterests = (dataGuest: any, userHost: any) => {
    const filteredGuests = dataGuest.filter(guest => guest?.info?.hostInfo);

    if (!userHost?.interests || userHost?.interests.length === 0) {
      return [];
    }

    const userInterests = userHost?.interests?.map((interest: User.Interests) => interest?.title);

    const matchedGuests = filteredGuests?.sort(guest => {
      if (
        !guest?.info?.hostInfo?.interests ||
        guest?.info?.hostInfo?.interests?.length === 0 ||
        guest?.info?.hostInfo?.chooseGuest !== userHost?.chooseGuest
      ) {
        return false;
      }
      return guest?.info?.hostInfo.interests?.some((interest: User.Interests) => userInterests?.includes(interest.title));
    });
    return matchedGuests;
  };

  const handleGoToEarlyAccess = () => {
    navigation.navigate(commonStackPath, {screen: earlyAccessPath} as never);
  };

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

  const handleScroll = event => {
    const positionY = event.nativeEvent.contentOffset.y;
    setScrollPosition(positionY);
  };

  useFocusEffect(
    useCallback(() => {
      if (isHost && activeEvent?.id) {
        lastVisibleRef.current = null;
        endReachedRef.current = false;
      }
    }, [activeEvent?.id]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!isHost && activeEventDate) {
        console.warn('useFocusEffect_getCardsListForGuest', events?.length, lastVisibleRef.current);

        lastVisibleRef.current = null;
        endReachedRef.current = false;
      }
    }, [activeEventDate]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid) {
        if (isHost && activeEvent?.id && !loadingMyEvents && !lastVisibleRef.current && !endReachedRef.current) {
          getCardsListForHost();
        }
      }
    }, [userInfo?.uid, activeEvent?.id, loadingMyEvents]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid) {
        if (!isHost && activeEventDate && !lastVisibleRef.current && !endReachedRef.current) {
          console.warn('useEffect_getCardsListForGuest', events?.length, lastVisibleRef.current, endReachedRef.current);
          getCardsListForGuest();
        }
      }
    }, [userInfo?.uid, activeEventDate]),
  );

  useEffect(() => {
    if (userInfo?.uid) {
      if (isHost) {
        if (events?.length <= 2 && lastVisibleRef.current && !endReachedRef.current) {
          getCardsListForHost(true);
        }
      }
      if (!isHost) {
        if (events?.length <= 2 && lastVisibleRef.current && !endReachedRef.current) {
          console.warn('getCardsListForGuest', events?.length, lastVisibleRef.current, endReachedRef.current);

          getCardsListForGuest(true);
        }
      }
    }
  }, [events]);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid && isHost) {
        fetchMyEvents();
      }
      fetchUserInfo();
    }, [userInfo?.uid]),
  );

  if ((loadingUser || loadingMyEvents) && !userInfo?.uid && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <Animated.View style={[animatedStyle]}>
          <LoaderIcon />
        </Animated.View>
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && acceptModalVisible) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && rejectModalVisible) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && loadingCardsList && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
    return (
      <>
        <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isHost && !loadingCardsList && !myEvents.length && !isVisibleMatch) {
    return (
      <>
        <View style={{flex: 1, width: '100%', backgroundColor: blackColor}}>
          <View style={{height: 370, marginTop: screenHeight / 26}}>
            <Loading userInfo={userInfo} topPosition={true} />
          </View>
          <View>
            <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(18, 812), fontFamily: Satoshi500}}>
              You don't have any active event.
            </Text>
            <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(18, 812), fontFamily: Satoshi500}}>
              Get started by creating an event to begin inviting guests.
            </Text>
          </View>
          <View style={{paddingHorizontal: 24, marginTop: 'auto', marginBottom: screenHeight / 14}}>
            <Button onPress={goToCreateEvent} title={'Create event'} buttonStyle={{marginTop: 20, marginBottom: 30}} />
          </View>
        </View>
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (
    userInfo?.uid &&
    !loadingCardsList &&
    !events?.length &&
    !isVisibleMatch &&
    !visibleModalSuperJoin &&
    !isVisibleSuperInvite &&
    !acceptModalVisible
  ) {
    return (
      <>
        <View style={{flex: 1, backgroundColor: blackColor, paddingHorizontal: 24}}>
          <Loading topPosition={true} userInfo={userInfo} wrapperText={false} styleInnerContainer={{flex: 0}} styleContainer={{flex: 0}} />
          <View
            style={{
              position: 'absolute',
              top: screenHeight / 2.2,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: whiteColor,
                fontWeight: '700',
                fontSize: RFValue(22, 932),
                letterSpacing: 22,
                fontFamily: Satoshi500,
                textAlign: 'center',
                marginRight: -22,
              }}>
              WELCOME
            </Text>
            <Text
              style={{
                fontFamily: Satoshi700,
                fontSize: RFValue(18, 932),
                color: whiteColor,
                marginTop: screenHeight / 50,
              }}>
              Soon, Everything Changes.
            </Text>
            <Text
              style={{
                fontFamily: Satoshi400,
                fontSize: RFValue(18, 932),
                color: whiteColor,
                textAlign: 'center',
                marginTop: screenHeight / 50,
              }}>
              Be the first to access exclusive offers and VIP events. stay tuned - something extraordinary is coming.
            </Text>
            {userInfo?.accountConfirmed && (
              <TouchableOpacity style={{marginTop: screenHeight / 50}} onPress={handleGoToEarlyAccess}>
                <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(14, 812), textDecorationLine: 'underline'}}>
                  IO Invitations
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
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
                  onSwipedLeft={() => handleReject({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})}
                  onSwipedRight={() => handleInvite({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})}
                  OverlayLabelRight={OverlayRight}
                  OverlayLabelLeft={OverlayLeft}
                  disableBottomSwipe={true}
                  disableTopSwipe={true}
                  cardStyle={styles.card}>
                  <ScrollView
                    onScroll={handleScroll}
                    scrollEventThrottle={20}
                    showsVerticalScrollIndicator={false}
                    style={{borderRadius: 22, height: screenHeight - 250}}>
                    {item.component}
                  </ScrollView>
                </TinderCard>
              </View>
            );
          })}

          <ModalFullEvent
            isVisible={isVisibleModalFullEvent}
            idEvent={activeEvent?.id}
            setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
          />
          {!userInfo?.accountReviewed && (
            <ModalLockAccount haveCode accountType={userInfo?.accountType} isPremium={userInfo?.accountPremium} isVisibleButton={true} />
          )}
          {userInfo?.accountConfirmed && isHost && (
            <ModalEventLocked eventReviewed={activeEvent?.eventReviewed} eventStatus={activeEvent?.statusEvent} />
          )}
          <ModalReport
            handleAutoSwipeLeft={() => handleFilterEvent({uid: reportedItem?.uid, id: reportedItem?.event?.id, withSwipeAnimation: false})}
            modalReport={modalReport}
            setModalReport={setModalReport}
            uidSender={userHost?.uid}
            uid={reportedItem?.uid}
            activeEvent={reportedItem?.event?.id}
          />
          {visibleModalSuperJoin && (
            <SuperJoin
              isVisibleMatch={visibleModalSuperJoin}
              nameEvent={currentEventInfo?.name || currentEventInfo?.placeName}
              imageEvent={currentEventInfo ? currentEventInfo.photos[0]?.image : ''}
            />
          )}
          {isVisibleSuperInvite && (
            <SuperInvite
              isVisibleSuperInvite={isVisibleSuperInvite}
              activeSuperInviteUser={activeSuperInviteUser}
              onCloseSuperInvite={handleCloseSuperInvite}
              setLastVisible={setLastVisible}
            />
          )}
        </View>
      </SafeAreaView>
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default gestureHandlerRootHOC(IO);
