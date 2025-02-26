import { useDemoFlowStore } from "src/store/demoFlowStore";
import {updateGuestEventsList} from 'helpers/updateGuestEventsList';
import analytics from '@react-native-firebase/analytics';
import {inviteUser, IOscreen, joinEvent} from 'constants/analitycs';
import {useMyEvents} from 'src/store/myEvents';
import {useScrollPosition} from 'src/store/scrollPosition';
import {EventData} from 'src/types/event';
import {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import Config from "react-native-config";
import {useAdminActions} from 'src/store/adminActions';
// import {useCounterSuperEvents} from 'src/store/counterSuperInvites';
import {handleCreateChat} from 'helpers/chat';
import {EventsDate} from 'contexts/EventsDate.tsx';
import {MatchData} from "screens/App/IO/screens/Match/Match";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {onMatchNotificationSubscription, sendNotification} from 'helpers/fcmHelper.ts';
import {useAppNavigation} from "./useAppNavigation";
import {showToast} from 'helpers/showToast.ts';
import { AppState } from "react-native";
import { useCounterSuperEvents } from "src/store/counterSuperInvites";
import { useUser } from "src/store/userStore";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { logErrorToSentry } from "helpers/logErrorsToSentry";
import { UserInfo } from "typescript/interfaces";
import { ACCEPTED_STATUS, ALL, INVITE_MATCH_STATUS, LIKED, THIS_MONTH, THIS_WEEK } from "constants/common";
import moment from "moment";
import { filterEventsByThisWeek } from "helpers/filterEventsByThisWeek";
import { filterEventsByThisMonth } from "helpers/filterEventsByThisMonth";

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

export const useIO = () => {
    const navigation = useAppNavigation();
    const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
    const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
    const [events, setEvents] = useState<any[]>([]);
    const [nameUser, setNameUser] = useState<string>('');
    const [currentEventCardPosition, setCurrentEventCardPosition] = useState(1);
    const [reportedItem, setReportedItem] = useState<string>('');
    const [matchData, setMatchData] = useState<MatchData>({});
    const [modalReport, setModalReport] = useState<boolean>(false);
    const [activeSuperInviteUser, setActiveSuperInviteUser] = useState<any>({});
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
    const [lastVisible, setLastVisible] = useState(false);
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
        logErrorToSentry(error);
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
        try {
        if (!isDemo && activeEvent?.id) {
            unsubscribeEvent = firestore()
            .collection(apiEventsCollection)
            .doc(activeEvent?.id)
            .onSnapshot(querySnapshot => {
                if (!querySnapshot.exists) {
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
        } catch (error) {
        logErrorToSentry(error)
        }
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
        logErrorToSentry(error)
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
        await firestore().collection(apiUserInfoCollection).doc(userInfo?.uid).update({
            lastUpdateSuperInvite: Date.now(),
            weeklySuperInvites: 5,
        });
        } catch (error) {
        logErrorToSentry(error);
        }
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
        logErrorToSentry(error)
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
        logErrorToSentry(error);
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
        logErrorToSentry(error)
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
        setLastVisible
    }
}