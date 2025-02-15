import {SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert, TouchableWithoutFeedback, AppState} from 'react-native';
import React, {FC, useState, useEffect, useContext, useCallback, useRef} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect, useRoute} from '@react-navigation/native';
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
  THIS_MONTH,
  THIS_WEEK,
  screenHeight,
} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {
  earlyAccessPath,
  commonStackPath,
  eventCreatingStackPath,
  myProfileViewPath,
  paymentPath,
  userProfilePath,
  demoFlowStackPath,
  demoIOPath,
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
import {filterEventsByThisWeek} from 'helpers/filterEventsByThisWeek';
import {filterEventsByThisMonth} from 'helpers/filterEventsByThisMonth';
import {updateGuestEventsList} from 'helpers/updateGuestEventsList';
import {getUserData} from 'helpers/getUserData';
import analytics from '@react-native-firebase/analytics';
import {inviteUser, IOscreen, joinEvent} from 'constants/analitycs';
import {useMyEvents} from 'src/store/myEvents';
import Config from 'react-native-config';
import {useDemoFlowStore} from '../../../store/demoFlowStore';
import HintCard from 'components/HintCard';
import {hostHintSteps} from 'constants/hints.ts';
import ModalLimitedAccess from 'components/Modal/ModalLimitedAccess/ModalLimitedAccess';
import CardsFakeState from 'components/CardsFakeState';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';
import firebase from '@react-native-firebase/app';

const IO: FC = (): JSX.Element => {
  const CARDS_LOADING_LIMIT = 6;
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [nameUser, setNameUser] = useState<string>('');
  const [reportedItem, setReportedItem] = useState<string>('');
  // const [userInfo, setUserInfo] = useState<any>({});
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [swipedCardsCount, setSwipedCardsCount] = useState(0);
  const [isOpenModalLimitedAccess, setIsOpenModalLimitedAccess] = useState(false);
  const [swipedCardUids, setSwipedCardUids] = useState<string[]>([]);
  const [isFocusedScreen, setIsFocusedScreen] = useState(false);

  const {setCounterSuperInvites, decrementCounterSuperInvites, counterSuperInvites} = useCounterSuperEvents();

  const {loadingCardsList, setLoadingCardsList, myEvents, loadingMyEvents, activeEvent, setActiveEvent} = useMyEvents();

  const {user: userInfo} = useUser();
  const {activeEventDate} = useContext(EventsDate);
  const {setHintStep, hintStep, setIsVisibleSwipeGuide} = useDemoFlowStore();
  const route = useRoute();
  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;

  const setScrollPosition = useScrollPosition((i: any) => i?.setScrollPosition);
  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const changeAccountTypeModalVisible = useAdminActions((i: any) => i?.changeAccountTypeModalVisible);
  const setRejectModalVisible = useAdminActions((i: any) => i?.setRejectModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);
  const setChangeAccountModalVisible = useAdminActions((i: any) => i?.setChangeAccountModalVisible);

  const eventsRef = useRef<any[]>();
  const counterSuperInvitesRef = useRef(0);
  const counterWeeklySuperInvitesRef = useRef(0);
  const cardRef = useRef(null);
  const endReachedRef = useRef<boolean>(false);
  const lastVisibleRef = useRef<any>(null);

  const rotationLoader = useSharedValue(0);

  const isHost = userInfo?.accountType === 'host';

  useFocusEffect(
    useCallback(() => {
      if (loadingCardsList || loadingMyEvents) {
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
    }, [rotationLoader, loadingCardsList, loadingMyEvents]),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotationLoader.value}deg`}],
    };
  });

  const handleSuperInvite = () => {
    if (!userInfo?.uid) {
      return;
    }
    if (userInfo?.superInvites > 0 || userInfo?.weeklySuperInvites > 0) {
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
            .collection(apiUserInfoCollection)
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

  useFocusEffect(
    useCallback(() => {
      let unsubscribeEvent: any;
      if (!isDemo && activeEvent?.id) {
        unsubscribeEvent = firestore()
          .collection(apiEventsCollection)
          .doc(activeEvent?.id)
          .onSnapshot(querySnapshot => {
            if (!querySnapshot.exists) {
              // dispatch(setActiveEvent({}));
              return;
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
    }, [activeEvent?.id]),
  );

  useFocusEffect(
    useCallback(() => {
      setIsFocusedScreen(true);
      return () => {
        setIsFocusedScreen(false);
      };
    }, []),
  );

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

  const handleAddSwipeCardUid = (uid: string) => {
    setSwipedCardUids(prev => {
      if (prev.length >= 70) {
        return [...prev.slice(30, prev.length), uid];
      } else {
        return [...prev, uid];
      }
    });
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
    handleAddSwipeCardUid(uid);
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
    handleAddSwipeCardUid(uid);
    onInvite(uid, id, superInvite);
    setTimeout(() => {
      setCurrentEventCardPosition(prev => prev + 1);
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
    }
  };

  const setRejectVisible = () => {
    setAcceptModalVisible(false);
    setRejectModalVisible(true);
  };

  const setAcceptVisible = () => {
    setRejectModalVisible(false);
    setAcceptModalVisible(true);
  };

  useEffect(() => {
    if (userInfo?.uid && userInfo?.showModalAccept) {
      setAcceptModalVisible(true);
    }
    if (userInfo?.uid && userInfo?.showModalChangeAccountType) {
      setChangeAccountModalVisible(true);
    }
    if (userInfo?.uid && userInfo?.accountReviewed && !userInfo?.accountConfirmed) {
      setRejectModalVisible(true);
    }
  }, [userInfo]);

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  );

  const getSuperInvites = async () => {
    if (!userInfo?.uid) {
      return;
    }
    const currentSuperInvites = userInfo?.superInvites;
    const currentWeeklySuperInvites = userInfo?.weeklySuperInvites;
    setCounterSuperInvites(currentSuperInvites + currentWeeklySuperInvites);
  };

  useEffect(() => {
    getSuperInvites();
  }, [userInfo?.uid, userInfo?.superInvites, userInfo?.weeklySuperInvites]);

  const decrementSuperInvite = async (item: UserInfo, coinAnimationTimer = 0) => {
    try {
      if (userInfo?.accountType === 'host') {
        setTimeout(() => {
          setIsVisibleSuperInvite(true);
        }, coinAnimationTimer);
        await onInvite(item?.uid, item?.id, true);
      } else {
        handleSuperJoin();
        await onInvite(item?.uid, item?.id, true);
      }
      if (userInfo?.weeklySuperInvites > 0) {
        firestore()
          .collection(apiUserInfoCollection)
          .doc(userInfo.uid)
          .update({
            weeklySuperInvites: userInfo?.weeklySuperInvites - 1,
          });
      } else if (userInfo?.superInvites > 0) {
        firestore()
          .collection(apiUserInfoCollection)
          .doc(userInfo.uid)
          .update({
            superInvites: userInfo?.superInvites - 1,
          });
      }
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

  const handleDemoSwipeCardRight = ({uid, withSwipeAnimation}: {uid: string; withSwipeAnimation: boolean}) => {
    console.warn('handleDemoSwipeCardRight', uid, withSwipeAnimation);
    setTimeout(() => {
      setSwipedCardsCount(prev => prev + 1);
      setEvents(prev =>
        prev.filter(i => {
          return i?.info?.uid !== uid;
        }),
      );
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
    }
  };

  const handleDemoSwipeCardLeft = ({uid, withSwipeAnimation}: {uid: string; withSwipeAnimation: boolean}) => {
    console.warn('handleDemoSwipeCardLeft', uid, withSwipeAnimation);

    setTimeout(() => {
      setSwipedCardsCount(prev => prev + 1);
      setEvents(prev =>
        prev.filter(i => {
          return i?.info?.uid !== uid;
        }),
      );
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  useEffect(() => {
    if (userInfo?.uid && !userInfo?.accountReviewed) {
      showToast('inviteMatch', 'have a code? click here', 'Your account is under review', {
        ownerPhoto: userInfo?.photos[0].image,
        status: 'ON REVIEW',
        path: 'invitationCode',
      });
    }
  }, [userInfo?.uid]);

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

  const handleSetWeeklySuperInvites = async () => {
    if (!userInfo?.uid) {
      return;
    }
    const isWeekPassed = (lastUpdate: number) => {
      const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
      const currentTime = Date.now();
      return currentTime - lastUpdate >= oneWeekInMilliseconds;
    };

    const isWeek = isWeekPassed(userInfo?.lastUpdateSuperInvite);
    if (isWeek) {
      await firestore().collection(apiUserInfoCollection).doc(userInfo?.uid).update({
        lastUpdateSuperInvite: Date.now(),
        weeklySuperInvites: 5,
      });
    }
  };

  useEffect(() => {
    handleSetWeeklySuperInvites();
  }, [userInfo?.uid]);

  const onReject = async (uid: string, eventId: string) => {
    const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;

    const rejectUid = isHost ? uid : userInfo?.uid;
    if (isHost) {
      try {
        analytics().logEvent(`${IOscreen}_reject_${inviteUser}`, {
          hostUid: userInfo?.uid,
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
      const isEventOwner = userInfo?.uid === activeEvent?.uid;

      const data = isEventOwner
        ? {
            rejectsList: firestore.FieldValue.arrayUnion({uid: rejectUid}),
          }
        : {
            rejectsByGuestsList: firestore.FieldValue.arrayUnion({uid: rejectUid}),
          };

      firestore().collection(apiEventsCollection).doc(activeEventId).update(data);

      setTimeout(() => {
        setEvents(prev =>
          prev.filter(i => {
            return isHost ? i?.info?.uid !== uid : i?.info?.id !== eventId;
          }),
        );
      }, 100);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSuperJoinsUser = async () => {
    try {
      const getDoc = await firestore().collection(apiUserInfoCollection).doc(userInfo.uid).get();
      const data = getDoc.data();

      if (data?.weeklySuperInvites && data?.weeklySuperInvites > 0) {
        await firestore()
          .collection(apiUserInfoCollection)
          .doc(userInfo.uid)
          .update({
            weeklySuperInvites: data?.weeklySuperInvites - 1,
          });
      } else {
        if (data?.superInvites && data.superInvites > 0) {
          await firestore()
            .collection(apiUserInfoCollection)
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
      const guestQuery = await firestore().collection(apiUserInfoCollection).doc(forUserUid).get();
      if (!guestQuery.exists) {
        return;
      }
      const guestData = guestQuery.data() as UserInfo;

      const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;

      const eventQuery = await firestore().collection(apiEventsCollection).doc(activeEventId).get();

      if (!eventQuery.exists) {
        return;
      }

      const event = eventQuery.data() as EventData;
      if (!event || event?.statusEvent === false || event?.isCancelled === true) {
        return;
      }

      const userInvited = {
        gender: isHost ? guestData?.gender : userInfo?.gender,
        name: isHost ? guestData?.name : userInfo?.name,
        status: LIKED,
        superInvite: superInvite ? superInvite : false,
        uid: isHost ? guestData?.uid : userInfo?.uid,
        userPhoto: isHost ? guestData?.photos[0]?.image : userInfo?.photos[0]?.image,
        createdAt: moment().format('YYYY-MM-DD'),
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
            uidHost: userInfo?.uid,
            uidGuest: matchedGuest?.uid,
            eventId: activeEventId,
            superInvite: superInvite ? superInvite : false,
            userHostImageUri: userInfo?.photos[0]?.image,
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
          .collection(apiEventsCollection)
          .doc(activeEventId)
          .update(data)
          .then(async () => {
            analytics().logEvent(`${IOscreen}_${inviteUser}`, {
              hostUid: userInfo?.uid,
              guestUid: forUserUid,
            });
            if (matchedGuest && matchedGuestData) {
              await handleCreateChat(matchedGuestData);
              await updateGuestEventsList(activeEventId, forUserUid);
              setMatchData(matchedGuestData);
              setIsVisibleMatch(true);
            }
            if ((guestData.notificationSettings?.match || guestData.notificationSettings?.superInvite) && !isDemo) {
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
          const matchedGuest = event.usersList?.find(invUser => invUser?.uid === userInfo?.uid && invUser?.status === LIKED);
          let data = {};
          let matchedGuestData: MatchData;
          if (matchedGuest) {
            const updatedUsersList = event?.usersList?.map(invUser => {
              if (invUser?.uid === userInfo?.uid) {
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
            .collection(apiEventsCollection)
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
              if ((guestData.notificationSettings?.match || guestData.notificationSettings?.superJoin) && !isDemo) {
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

  const handleSuperJoin = () => {
    if (userInfo?.superInvites > 0 || userInfo?.weeklySuperInvites > 0) {
      setVisibleModalSuperJoin(true);
      setTimeout(() => {
        setVisibleModalSuperJoin(false);
      }, 4000);
    } else {
      showToast('inviteMatch', "You don't have Super Joins", 'Super Join');
    }
  };

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

  async function enrichElementsWithPhotos(elements: any[]) {
    const promises = elements?.map(async element => {
      const docRef = firestore().collection(apiUserInfoCollection).doc(element?.uid);
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

  const filterEventByDate = (list: any[]) => {
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
    if (refresh && !events?.length) {
      setIsRefreshing(true);
    }
    let filteredEvents: any[] = [];

    try {
      const getGenderFilter = () => {
        if (userInfo?.gender === 'man') {
          return 'male';
        }
        if (userInfo?.gender === 'woman') {
          return 'female';
        }
        return null;
      };

      const genderFilter = getGenderFilter();
      const start = new Date().getTime();
      const cloudFunctionName = Config.CLOUD_FUNCTION_GET_EVENTS_FOR_USER || 'getEventsForUser';
      const getEventsForUserCloudFunction = firebase.app().functions('europe-west3').httpsCallable(cloudFunctionName);
      const eventsQuery = await getEventsForUserCloudFunction({
        uid: user.uid,
        limit: CARDS_LOADING_LIMIT,
        lastDoc: lastVisibleRef.current ? JSON.stringify(lastVisibleRef.current) : null,
        genderFilter,
      });
      const end = new Date().getTime();
      console.warn('time', end - start);

      if (!('events' in eventsQuery?.data) || !('lastDoc' in eventsQuery?.data)) {
        setEvents([]);
        setLoadingCardsList(false);
        endReachedRef.current = true;
        return;
      }

      const eventsData = eventsQuery?.data?.events;
      const lastDoc = eventsQuery?.data?.lastDoc ? JSON.parse(eventsQuery.data.lastDoc) : null;

      if ('lastDoc' in eventsQuery?.data) {
        lastVisibleRef.current = lastDoc;
      }

      if ('endReached' in eventsQuery?.data) {
        endReachedRef.current = eventsQuery?.data?.endReached;
      }

      filteredEvents = eventsData?.filter(event => {
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
        if (event?.rejectsByGuestsList?.find((rejectedUid: Event.RejectUser) => rejectedUid.uid === user?.uid)) {
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

    const filteredDataEvents = filterEventByDate(filteredEvents);

    const data: any[] = [];

    for (const event of filteredDataEvents) {
      const currUserPhotos = [event?.hostImage];
      const eventPhotos = event?.photos?.filter(i => i.image !== null).map((photo: any) => photo?.image);

      const hostInfoData = {
        accountPremium: true,
        accountType: 'host',
        name: event?.hostName,
        photo: event?.hostImage,
      };

      data.push({
        component: (
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              hostInfo={hostInfoData}
              userInfo={userInfo}
              placeName={event?.placeName}
              girls={event?.female + event?.femaleFriend}
              female={event?.female}
              male={event?.male}
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
              superJoin={() =>
                handleInvite({
                  uid: event?.uid,
                  id: event?.id,
                  withSwipeAnimation: true,
                  superInvite: true,
                })
              }
              confirmedEvent={event?.statusEvent}
              uidUserEvent={event?.uid}
              hourEvent={event?.hour}
              usersListLength={event?.usersList.length}
              usersList={event?.usersList}
              accountType={userInfo?.accountType || ''}
              isPreview={false}
              setCurrentEventCardPosition={setCurrentEventCardPosition}
              setScrollPosition={setScrollPosition}
            />
            <View style={styles.bioWrapper}>
              <Text style={[styles.titleSection]}>Event details</Text>
              <MyEventsCard
                imageBg={event?.photos}
                list={event}
                statusEvent={true}
                eventReviewed={true}
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
              <Text
                style={{
                  marginTop: 6,
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(16, 812),
                }}>
                {event?.placeName}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <Text
                style={[
                  {
                    marginTop: 14,
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(16, 812),
                  },
                  {marginTop: 20},
                ]}>
                Event name
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(16, 812),
                }}>
                {event?.name}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <Text
                style={[
                  {
                    marginTop: 14,
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(16, 812),
                  },
                  {marginTop: 20},
                ]}>
                Event description
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>
                {event?.description}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <View style={{marginVertical: 20}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Address</Text>
                <Text
                  style={{
                    marginTop: 6,
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                  }}>
                  {event?.address}
                </Text>
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
                  <FastImage
                    source={{uri: image}}
                    style={{width: '100%', height: screenHeight / 4, marginVertical: 10, borderRadius: 20}}
                  />
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
                        source={{uri: currUserPhotos?.[0]?.image || event?.hostImage}}
                        style={{width: 40, height: 40, borderRadius: 50}}
                      />
                      {true && (
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
                        <Text
                          style={{
                            color: whiteColor,
                            textTransform: 'capitalize',
                            fontFamily: Satoshi700,
                            fontSize: RFValue(10, 812),
                          }}>
                          {hostInfoData?.accountType}
                        </Text>
                      </View>
                      {true && (
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
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi700,
                          fontSize: RFValue(14, 812),
                          marginRight: 6,
                        }}>
                        {event?.hostName}
                        {hostInfoData?.date && ', ' + calculateAge(hostInfoData?.date)}
                      </Text>
                      {true && <CheckStarWhite />}
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
                      <Text
                        style={{
                          color: whiteColor,
                          fontSize: 24,
                          fontWeight: '500',
                          transform: [{rotateY: '180deg'}],
                        }}>
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
    // const sortedByInterestsData = sortByDate(data)?.reverse();
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
    if (refresh) {
      setIsRefreshing(false);
    }
    setLoadingCardsList(false);
  };

  const handleSuperInviteBottom = (item: any, coinAnimationTimer: number) => {
    handleSuperInvite();
    handleOpenSuperInvite(item, coinAnimationTimer);
  };

  const getCardsListForHost = async (refresh?: boolean) => {
    if (!userInfo?.uid || !activeEvent?.id || !userInfo?.uid) {
      return;
    }

    console.warn(
      refresh,
      events?.map((i: any) => i?.info?.uid),
    );

    if (!refresh) {
      setLoadingCardsList(true);
    }
    if (refresh && !events?.length) {
      setIsRefreshing(true);
    }
    let users;
    try {
      let listOfUsers = [];

      const isDevEvents = apiEventsCollection === 'devEvents';

      if (isDemo) {
        const demoUsersUidsList = isDevEvents
          ? [
              '5E45SWY8PPh6XG6TKosh7KoNGS23',
              'IVIt8krtaqPNgSWR3c2SqYVxNYG2',
              'gkzR767ZUpa2stWJUzw6I8rcGea2',
              'KZ4K7Ptm5ORvDKcOHbTjY9k4n872',
              'bjKkDs5nmgbN8Q4ArsFskwmJo5h2',
              'gMp0lX0rPcfFe6vkV9EhfTu5OU93',
              'qONEe70GvYepjeSgzeAtLqfzNIo1',
            ]
          : [
              'ztlc8qmO09dM9sWXGja8EVHWLIr2',
              '5E7tfk5edaQ9blfBUr6C0w4aBZT2',
              'Bku02o6thxSqNQWqyjowog4600y1',
              'VKXvBdFky3amCw26vxwNkflKQeO2',
              'KdKWeJQ0PSQDlPmmY8C5nJg3QRx1',
              'xQOx2tzTzTVx0fjXqgzCFKyP3IY2',
              'SjZXcwnVpjUvBDLiHOwP10ZbFvv1',
              'x4cIov0QQqQIeJDVpeO7n5GGhnz2',
              'PA4DDwLdH4a70zNNACS0pe8SbTC2',
              'CCfqT1CeRUPkxCyQQxn8FYHXh3w2',
              'jVj6cOgnZRfi3MkkXLRg0ePsNr93',
              'jxqkE8xzKoaMCfC3rqI4HxII9Xj1',
              'iYB5oM8705RyJoo5qFhfa10ZS1K3',
              'JgpDnDZAM0OsKJVb5yz2eoAMJB03',
              '9i7JMq9kQBTKW5jsrTd6RPd9Ie83',
            ];

        for (const uid of demoUsersUidsList) {
          try {
            const userQuery = await firestore().collection(apiUserInfoCollection).doc(uid).get();
            if (userQuery.exists) {
              const data = userQuery.data() as UserInfo;
              listOfUsers.push(data);
            }
          } catch (err) {
            console.error('error_getCardsListForHost 3', err);
          }
        }
      }

      let listOfUsersResponse: any;
      if (!isDemo && userInfo?.accountPremium) {
        const start = new Date().getTime();
        console.warn('start', start);

        const cloudFunctionName = Config.CLOUD_FUNCTION_GET_USERS_FOR_EVENT || 'getUsersForEvent_v2';
        const getUsersForEventCloudFunction = firebase.app().functions('europe-west3').httpsCallable(cloudFunctionName);
        listOfUsersResponse = await getUsersForEventCloudFunction({
          limit: CARDS_LOADING_LIMIT,
          lastDoc: lastVisibleRef.current ? JSON.stringify(lastVisibleRef.current) : null,
          eventId: activeEvent?.id,
        });

        const lastDoc = listOfUsersResponse?.data?.lastDoc ? JSON.parse(listOfUsersResponse.data.lastDoc) : null;

        if ('lastDoc' in listOfUsersResponse?.data) {
          lastVisibleRef.current = lastDoc;
        }

        if ('endReached' in listOfUsersResponse?.data) {
          endReachedRef.current = listOfUsersResponse?.data?.endReached;
        }

        console.warn('end', new Date().getTime());

        console.warn('execution time', new Date().getTime() - start);
      }

      if (isDemo) {
        users = listOfUsers;
      } else {
        users = listOfUsersResponse?.data?.users as UserInfo[];
      }

      console.warn(users?.map((i: any) => i?.uid));

      if (!users || !Array.isArray(users)) {
        setLoadingCardsList(false);
        endReachedRef.current = true;
        return;
      }

      const data: any[] = [];

      users?.map((item: UserInfo, index: number): void => {
        const {
          name,
          bio,
          accountType,
          gender,
          address,
          homeAddress,
          height,
          alcohol,
          date,
          accountConfirmed,
          uid,
          accountPremium,
          isSuperInvite,
        } = item;

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
                onReject={() =>
                  isDemo
                    ? handleDemoSwipeCardLeft({uid, withSwipeAnimation: true})
                    : handleReject({uid, id: item?.id, withSwipeAnimation: true})
                }
                onInvite={() =>
                  isDemo
                    ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true})
                    : handleInvite({uid, id: item?.id, withSwipeAnimation: true})
                }
                handleOpenSuperInvite={() =>
                  isDemo ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true}) : handleOpenSuperInvite(item, uid)
                }
                photos={girlPhotos}
                accountType={accountType}
                isShowWantsJoin={isSuperInvite}
                isPremium={accountPremium}
                activeEvent={activeEvent}
                location={item.location}
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
                {!isDemo && (
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
                )}
                <View style={styles.wrapperImageSectionFaceGirl}>
                  {girlPhotos?.map((photo: string, photoIndex: number) => (
                    <FastImage key={photoIndex} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                  ))}
                </View>
                <View style={styles.wrapperButtonsFooter}>
                  <TouchableOpacity
                    onPress={() =>
                      isDemo
                        ? handleDemoSwipeCardLeft({uid, withSwipeAnimation: true})
                        : handleReject({uid, id: item?.id, withSwipeAnimation: true})
                    }
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
                    onPress={() =>
                      isDemo ? handleDemoSwipeCardLeft({uid, withSwipeAnimation: true}) : handleSuperInviteBottom(item, 400)
                    }>
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
                        <Text
                          style={{
                            color: whiteColor,
                            fontSize: 24,
                            fontWeight: '500',
                            transform: [{rotateY: '180deg'}],
                          }}>
                          {counterSuperInvites}
                        </Text>
                      </Animated.View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableOpacity
                    onPress={() =>
                      isDemo
                        ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true})
                        : handleInvite({uid: item?.uid, id: item?.id, withSwipeAnimation: true})
                    }
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
                {!isDemo && (
                  <TouchableOpacity onPress={() => handleReport(uid, activeEvent)}>
                    <Text style={styles.textHideNadSendReport}>Block and Report</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ),
          info: item,
        });
      });

      eventsRef.current = data;
      setEvents(prevEvents => {
        if (refresh) {
          const filteredData = data.filter(event => {
            if (prevEvents.some(prevEvent => prevEvent.info.uid === event.info.uid) || swipedCardUids.includes(event.info.uid)) {
              return false;
            }
            return true;
          });
          const updatedEvents = [...filteredData, ...[...prevEvents].reverse()].reverse();
          eventsRef.current = updatedEvents;
          return updatedEvents;
        } else {
          eventsRef.current = data;
          return data;
        }
      });

      if (refresh && data?.length) {
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error('error_getCardsListForHost', error);
      endReachedRef.current = true;
      setEvents([]);
      setIsRefreshing(false);
    } finally {
      setLoadingCardsList(false);
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

  const handleGoToEarlyAccess = () => {
    navigation.navigate(commonStackPath, {screen: earlyAccessPath} as never);
  };

  const goToCreateEvent = (): void => {
    if (!userInfo?.accountConfirmed) {
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

  const handleSkipHints = () => {
    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
    setHintStep(8);
    setIsVisibleSwipeGuide(true);
  };

  const handleSwipeFakeCard = () => {
    setIsOpenModalLimitedAccess(true);
  };

  useEffect(() => {
    if (isHost && activeEvent?.id) {
      lastVisibleRef.current = null;
      endReachedRef.current = false;
      if (events?.length) {
        setIsRefreshing(true);
        getCardsListForHost();
      }
    }
  }, [activeEvent?.id, isHost]);

  useFocusEffect(
    useCallback(() => {
      if (!isHost && activeEventDate) {
        lastVisibleRef.current = null;
        endReachedRef.current = false;
      }
    }, [activeEventDate, isHost]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid && isHost && activeEvent?.id && !events?.length && !loadingCardsList) {
        console.warn('useEffect_getCardsListForHost', events?.length, lastVisibleRef.current, endReachedRef.current);
        getCardsListForHost();
      }
    }, [userInfo?.uid, activeEvent?.id, loadingMyEvents, loadingCardsList]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid && !isHost && activeEventDate && !lastVisibleRef.current && !endReachedRef.current) {
        console.warn('useEffect_getCardsListForGuest', events?.length, lastVisibleRef.current, endReachedRef.current);
        getCardsListForGuest();
      }
    }, [userInfo?.uid, activeEventDate]),
  );

  useEffect(() => {
    if (userInfo?.uid) {
      if (isHost) {
        if (events?.length <= 2 && lastVisibleRef.current && !endReachedRef.current) {
          console.warn('getCardsListForHost', events?.length, lastVisibleRef.current, endReachedRef.current);
          setIsRefreshing(true);
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

  const cardsList = isHost ? [...events].reverse() : events;

  if (!isFocusedScreen) {
    return (
      <>
        <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isDemo && isHost && hintStep === 7) {
    return (
      <>
        <View style={styles.overlayContainer} />
        <View style={styles.stepHintContainer}>
          <HintCard
            currentStep={hintStep}
            description={hostHintSteps[hintStep - 1]?.description}
            onSkipAction={handleSkipHints}
            onStepChange={setHintStep}
            onNextAction={() => {
              setIsVisibleSwipeGuide(true);
            }}
            totalSteps={hostHintSteps.length}
            title={hostHintSteps[hintStep - 1]?.title}
            directionHorizontal={'center'}
          />
        </View>
        <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isDemo && isHost) {
    return (
      <>
        {loadingCardsList ? (
          <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        ) : (
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
              {cardsList?.map((item, index) => {
                return (
                  <View style={styles.cardContainer} pointerEvents="box-none" key={index.toString()}>
                    <TinderCard
                      ref={cardRef}
                      // @ts-ignore
                      cardWidth="100%"
                      // @ts-ignore
                      cardHeight="100%"
                      onSwipedLeft={() =>
                        isDemo
                          ? handleDemoSwipeCardLeft({uid: item?.info?.uid, withSwipeAnimation: false})
                          : handleReject({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})
                      }
                      onSwipedRight={() =>
                        isDemo
                          ? handleDemoSwipeCardRight({uid: item?.info?.uid, withSwipeAnimation: false})
                          : handleInvite({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})
                      }
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
            </View>
          </SafeAreaView>
        )}
        {swipedCardsCount >= (apiEventsCollection === 'devEvents' ? 5 : 12) && <ModalLimitedAccess />}
      </>
    );
  }

  if (loadingMyEvents && isHost && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
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

  if (userInfo?.uid && changeAccountTypeModalVisible) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <ModalChangeAccountType isVisible={changeAccountTypeModalVisible} userInfo={userInfo} setIsVisible={setChangeAccountModalVisible} />
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && rejectModalVisible && userInfo?.photos?.[0].image) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && isRefreshing && !cardsList.length && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
    return (
      <>
        <Loading
          wrapperText={false}
          textStyle={{
            opacity: 0.8,
          }}
          text={`Finding ${isHost ? 'guests' : 'events'} near you ...`}
          userInfo={userInfo}
        />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isHost && !userInfo?.accountReviewed && !userInfo?.accountConfirmed) {
    return (
      <>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <CardsFakeState handleSwipeFakeCard={handleSwipeFakeCard} OverlayRight={OverlayRight} OverlayLeft={OverlayLeft} />
          </View>
        </SafeAreaView>
        <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
      </>
    );
  }

  if (userInfo?.uid && isHost && userInfo?.accountReviewed && userInfo?.accountConfirmed && !userInfo?.accountPremium) {
    return (
      <>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <CardsFakeState handleSwipeFakeCard={handleSwipeFakeCard} OverlayRight={OverlayRight} OverlayLeft={OverlayLeft} />
          </View>
        </SafeAreaView>
        {isOpenModalLimitedAccess && <ModalLimitedAccess showNotNow={false} showCloseIcon={false} />}
      </>
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

  if (userInfo?.uid && isHost && !loadingCardsList && !loadingMyEvents && !myEvents.length && !isVisibleMatch && !isDemo) {
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
    !acceptModalVisible &&
    !isDemo &&
    !changeAccountTypeModalVisible
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
          {cardsList?.map((item, index) => {
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
          {userInfo?.accountConfirmed && isHost && activeEvent?.id && !isDemo && (
            <ModalEventLocked eventReviewed={activeEvent?.eventReviewed} eventStatus={activeEvent?.statusEvent} />
          )}
          <ModalReport
            handleAutoSwipeLeft={() =>
              handleFilterEvent({
                uid: reportedItem?.uid,
                id: reportedItem?.event?.id,
                withSwipeAnimation: false,
              })
            }
            modalReport={modalReport}
            setModalReport={setModalReport}
            uidSender={userInfo?.uid}
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
