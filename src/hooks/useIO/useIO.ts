import {useDemoFlowStore} from 'src/store/demoFlowStore';
import {useMyEvents} from 'src/store/myEvents';
import {useScrollPosition} from 'src/store/scrollPosition';
import {EventData} from 'src/types/event';
import {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import Config from 'react-native-config';
import {useAdminActions} from 'src/store/adminActions';
import {EventsDate} from 'contexts/EventsDate.tsx';
import {MatchData} from 'screens/App/IO/screens/Match/Match';
import {useContext, useEffect, useRef, useState} from 'react';
import {useAppNavigation} from '../useAppNavigation';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites';
import {useUser} from 'src/store/userStore';
import {useRoute} from '@react-navigation/native';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {ALL, THIS_MONTH, THIS_WEEK} from 'constants/common';
import {filterEventsByThisWeek} from 'helpers/filterEventsByThisWeek';
import {filterEventsByThisMonth} from 'helpers/filterEventsByThisMonth';
import {EventMutations} from 'src/apiv2/mutations/eventMutations';
import {UserMutations} from 'src/apiv2/mutations/userMutations';
import {useRotationLoader} from '../useRotationLoader';
import {useAppStateListener} from '../useAppStateListener';
import {useUpdateActiveEvent} from '../useUpdateActiveEvent';
import {useScreenFocus} from '../useScreenFocus';
import {useAccountModals} from '../useAccountModals';
import useMatchNotification from '../useMatchNotification';
import {useAccountReviewNotification} from '../useAccountReviewNotification';
import {useResetEventCardPosition} from '../useResetEventCardPosition';
import {useGetSuperInvites} from '../useGetSuperInvites';
import {useHandleSetWeeklySuperInvites} from '../useHandleSetWeeklySuperInvites';
import {useInvite} from './useInvite';
import {useReject} from './useReject';
import {useDemoSwipe} from './useDemoSwipe';
import {useSuperInvite} from './useSuperInvite';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

export const useIO = () => {
  const {mutate: useUpdateUserStatusOnline} = UserMutations.useUpdateUserStatusOnline();
  const updateWeeklySuperInvites = EventMutations.useUpdateWeeklySuperInvites();

  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<{info: EventData; component: JSX.Element}[]>([]);
  const [_nameUser, setNameUser] = useState<string>('');
  const [_currentEventCardPosition, setCurrentEventCardPosition] = useState(1);
  const [reportedItem, setReportedItem] = useState<{uid: string; event: EventData | null}>({uid: '', event: null});
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [activeSuperInviteUser, setActiveSuperInviteUser] = useState<any>({});
  const [totalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests] = useState<number>(0);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);
  const [visibleModalSuperJoin, setVisibleModalSuperJoin] = useState<boolean>(false);
  const [currentEventInfo, setCurrentEventInfo] = useState<EventData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [swipedCardsCount, setSwipedCardsCount] = useState<number>(0);
  const [isOpenModalLimitedAccess, setIsOpenModalLimitedAccess] = useState<boolean>(false);
  const [swipedCardUids, setSwipedCardUids] = useState<string[]>([]);
  const [_, setLastVisible] = useState<boolean>(false);
  const {setCounterSuperInvites, counterSuperInvites} = useCounterSuperEvents();
  const {loadingCardsList, setLoadingCardsList, myEvents, loadingMyEvents, activeEvent, setActiveEvent} = useMyEvents();

  const [flipped, setFlipped] = useState<boolean>(false);

  const {user: userInfo} = useUser();
  const {activeEventDate} = useContext(EventsDate);
  const {setHintStep, hintStep, setIsVisibleSwipeGuide} = useDemoFlowStore();
  const route = useRoute();
  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;

  const setScrollPosition = useScrollPosition((i: any) => i?.setScrollPosition);
  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const changeAccountTypeModalVisible = useAdminActions((i: any) => i?.changeAccountTypeModalVisible);
  const rotation = useSharedValue(0);

  const eventsRef = useRef<any[]>();
  const cardRef = useRef(null);
  const endReachedRef = useRef<boolean>(false);
  const lastVisibleRef = useRef<any>(null);

  const rotationLoader = useSharedValue(0);

  const isHost = userInfo?.accountType === 'host';

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

  const {onInvite, handleInvite} = useInvite({
    setEvents,
    setIsVisibleMatch,
    setIsVisibleModalFullEvent,
    setMatchData,
    handleAddSwipeCardUid,
    handleSwipeCardRight,
    setCurrentEventCardPosition,
  });
  const {handleReject} = useReject({
    setEvents,
    setScrollPosition,
    handleAddSwipeCardUid,
    setCurrentEventCardPosition,
    handleSwipeCardLeft,
  });
  const {handleDemoSwipeCardRight, handleDemoSwipeCardLeft} = useDemoSwipe({
    setSwipedCardsCount,
    setEvents,
    handleSwipeCardRight,
    handleSwipeCardLeft,
  });
  const {handleOpenSuperInvite} = useSuperInvite({
    onInvite,
    setIsVisibleSuperInvite,
    setActiveSuperInviteUser,
    setVisibleModalSuperJoin,
  });

  useRotationLoader({
    rotationLoader,
    loadingCardsList,
    loadingMyEvents,
  });

  const {} = useAppStateListener(userInfo, useUpdateUserStatusOnline);

  useUpdateActiveEvent(activeEvent, setActiveEvent, isDemo);

  const isFocusedScreen = useScreenFocus();

  const {setAcceptModalVisible, setChangeAccountModalVisible, setRejectVisible, setAcceptVisible} = useAccountModals(userInfo);

  useMatchNotification(setMatchData, setIsVisibleMatch, setRejectVisible, setAcceptVisible);

  useAccountReviewNotification(userInfo);

  useResetEventCardPosition(setCurrentEventCardPosition, activeEvent?.id);

  const getSuperInvites = async () => {
    if (!userInfo?.uid) {
      return;
    }
    const currentSuperInvites = userInfo?.superInvites;
    const currentWeeklySuperInvites = userInfo?.weeklySuperInvites;
    setCounterSuperInvites(currentSuperInvites + currentWeeklySuperInvites);
  };

  useGetSuperInvites(userInfo, getSuperInvites);

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
      try {
        updateWeeklySuperInvites.mutate({uid: userInfo?.uid});
      } catch (error) {
        logErrorToSentry(error);
      }
    }
  };

  useHandleSetWeeklySuperInvites(userInfo, handleSetWeeklySuperInvites);

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

  const handleCloseSuperInvite = (): void => {
    setIsVisibleSuperInvite(false);
  };

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
  };

  const handleReport = (uid: string, event?: any) => {
    const currEvent = isHost ? activeEvent : event;
    setReportedItem({uid, event: currEvent});
    setModalReport(true);
  };

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

  return {
    isHost,
    handleInvite,
    setLoadingCardsList,
    setIsRefreshing,
    events,
    userInfo,
    lastVisibleRef,
    setEvents,
    endReachedRef,
    filterEventByDate,
    handleReject,
    setScrollPosition,
    handleReport,
    navigation,
    setCurrentEventInfo,
    frontAnimatedStyle,
    backAnimatedStyle,
    counterSuperInvites,
    eventsRef,
    handleSuperInvite,
    handleOpenSuperInvite,
    activeEvent,
    apiEventsCollection,
    isDemo,
    apiUserInfoCollection,
    setNameUser,
    handleDemoSwipeCardLeft,
    handleDemoSwipeCardRight,
    swipedCardUids,
    setHintStep,
    setIsVisibleSwipeGuide,
    setIsOpenModalLimitedAccess,
    activeEventDate,
    loadingMyEvents,
    loadingCardsList,
    isFocusedScreen,
    hintStep,
    swipedCardsCount,
    isVisibleMatch,
    visibleModalSuperJoin,
    isVisibleSuperInvite,
    animatedStyle,
    acceptModalVisible,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    rejectModalVisible,
    isRefreshing,
    isOpenModalLimitedAccess,
    totalQuantityGuests,
    acceptQuantityGuest,
    totalRequestsGuests,
    cardRef,
    isVisibleModalFullEvent,
    setIsVisibleModalFullEvent,
    handleFilterEvent,
    reportedItem,
    modalReport,
    setModalReport,
    currentEventInfo,
    activeSuperInviteUser,
    handleCloseSuperInvite,
    matchData,
    handleCloseMatch,
    setCurrentEventCardPosition,
    myEvents,
    setLastVisible,
  };
};
