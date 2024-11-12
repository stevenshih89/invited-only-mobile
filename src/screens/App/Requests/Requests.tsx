import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {FC, ReactElement, useCallback, useContext, useEffect, useState} from 'react';
//import components
import useStyles from './styles';
import {blackColor, transparentGray70Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import PersoneIcon from 'assets/images/icons/Users.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import ItemRequestGuest from './ItemRequestGuest';
import ItemRequestHost from './ItemRequestHost';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {eventCreatingStackPath, IOPath, paymentPath} from 'constants/pathLocations';
import {EventContext} from 'contexts/EventContext';
import {useUser} from '../../../store/userStore';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import moment from 'moment';
import Match, {MatchData} from '../IO/screens/Match/Match';
import FullEvent from 'components/FullEvent';
import {checkIsFullGuests} from 'helpers/checkIsFullGuests';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {useUserProfileChangeSubscription} from 'helpers/userProfile';
import {useAdminActions} from 'src/store/adminActions';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import FastImage from 'react-native-fast-image';
import {ALL, LIKED, screenHeight, THIS_MONTH, THIS_WEEK} from 'constants/common';
import {Event, EventData} from 'src/types/event';
import {UserInfo} from 'src/types/userInfo';
import {EventsDate} from 'contexts/EventsDate';
import {filterEventsByThisMonth} from 'helpers/filterEventsByThisMonth';
import {filterEventsByThisWeek} from 'helpers/filterEventsByThisWeek';
import {getUserData} from 'helpers/getUserData';
import analytics from '@react-native-firebase/analytics';
import {requestsScreen} from 'constants/analitycs';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);

  const {activeEvent, myEvents, setMyEvents, setActiveEvent} = useContext(EventContext);
  const {activeEventDate} = useContext(EventsDate);

  const [requestsForHost, setRequestsForHost] = useState<any>([]);
  const [userInfo, setUserInfoData] = useState<UserInfo>({});
  const [dataForGuest, setDataForGuest] = useState<EventData[]>([]);

  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<MatchData>({});
  const [loadingMyEvents, setLoadingMyEvents] = useState<boolean>(true);
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);
  const currentUser = auth().currentUser;

  const [loading, setLoading] = useState<boolean>(false);

  const {accountConfirmed} = useUserProfileChangeSubscription();
  useEffect(() => {
    if (!Object.keys(userInfo)?.length) {
      return;
    }

    setUserInfoData((prev: UserInfo) => ({...prev, accountConfirmed}));
  }, [accountConfirmed]);

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
  };

  const fetchHostRequests = async querySnapshot => {
    if (!querySnapshot.exists) {
      setRequestsForHost([]);
      return;
    }
    const data = querySnapshot.data();
    if (!data?.requestsList?.length) {
      setRequestsForHost([]);
      return;
    }

    const sortedRequests = data?.requestsList?.sort((a: Event.User, b: Event.User) => {
      return moment(a?.createdAt, 'YYYY-MM-DD HH:mm:ss').isAfter(moment(b?.createdAt, 'YYYY-MM-DD HH:mm:ss')) ? 1 : -1;
    });

    const mappedRequests = [];
    for (const request of sortedRequests) {
      if (!request?.uid) {
        continue;
      }
      const {photos} = await getUserData(request.uid);
      mappedRequests.push({
        ...request,
        userPhoto: photos?.[0]?.image || request?.userPhoto,
      });
    }

    setRequestsForHost(mappedRequests);
  };

  const filterByUid = (array: EventData[], uid: string) => {
    return array?.filter((item: EventData) => {
      if (Array?.isArray(item?.usersList)) {
        return item?.usersList?.some((userItem: Event.User) => userItem?.uid === uid && userItem?.status === LIKED);
      } else {
        return false;
      }
    });
  };

  const fetchGuestRequests = async querySnapshot => {
    if (querySnapshot.empty) {
      setDataForGuest([]);
      return;
    }
    const data = querySnapshot?.docs?.map(i => i?.data()) as EventData[];
    const filteredRequestsByUid = filterByUid(data, currentUser?.uid);

    const filterEventByDate = () => {
      if (activeEventDate === ALL) {
        return filteredRequestsByUid;
      }
      if (activeEventDate === THIS_WEEK) {
        return filterEventsByThisWeek(filteredRequestsByUid);
      }
      if (activeEventDate === THIS_MONTH) {
        return filterEventsByThisMonth(filteredRequestsByUid);
      }
      return filteredRequestsByUid;
    };

    const filteredRequestsByDate = filterEventByDate();

    setDataForGuest(filteredRequestsByDate);
  };

  const fetchUserInfo = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(currentUser.uid).get();
        if (!userInfoDoc.exists) {
          return;
        }
        const data = userInfoDoc.data() as UserInfo;
        setUserInfoData(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    }
  };

  const isHost = user?.accountType?.toLowerCase() === 'host';
  const list = isHost ? requestsForHost : dataForGuest;

  const handleOpenMatch = (data: MatchData) => {
    setMatchData(data);
    setIsVisibleMatch(true);
  };

  const checkIsFullGuestsFun = async () => {
    const {allGuests, findAcceptedGuest, totalRequestsGuests: requeststCount} = await checkIsFullGuests(activeEvent?.id);
    setTotalQuantityGuests(allGuests);
    setTotalRequestsGuests(requeststCount);
    setAcceptQuantityGuest(findAcceptedGuest);
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
          setMyEvents([]);
          setActiveEvent({});
          setLoadingMyEvents(false);
          return;
        }

        const data = querySnapshot.docs.map(doc => doc.data() as EventData);
        const filteredData = data.filter((event: EventData) => {
          if (event?.date && event?.hour) {
            const adjustedDate = moment(`${event.date}, ${event.hour}`, 'DD.MM.YYYY, HH:mm').add(12, 'hours');
            if (adjustedDate.isBefore(moment())) {
              return false;
            }
          }
          return true;
        });
        if (!filteredData.length) {
          setMyEvents([]);
          setActiveEvent({});
          setLoadingMyEvents(false);
          return;
        }
        setMyEvents(filteredData);
        if (!myEvents.length && !activeEvent?.id) {
          setActiveEvent(filteredData[0]);
        }
        setLoadingMyEvents(false);
      } catch (error: any) {
        setMyEvents([]);
        setActiveEvent({});
        setLoadingMyEvents(false);
        console.error(error);

        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
      fetchMyEvents();
      analytics().logScreenView({
        screen_name: `${requestsScreen}`,
      });
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let subcribeHostRequests: any;
      let subcribeGuestRequests: any;
      if (!currentUser) {
        return;
      }
      if (isHost) {
        if (!activeEvent?.id) {
          setRequestsForHost([]);
          return;
        }
        subcribeHostRequests = firestore()
          .collection('Events')
          .doc(activeEvent?.id)
          .onSnapshot(querySnapshot => {
            fetchHostRequests(querySnapshot);
            checkIsFullGuestsFun();
          });
      }
      if (!isHost) {
        subcribeGuestRequests = firestore()
          .collection('Events')
          .where('statusEvent', '==', true)
          .where('isCancelled', '==', false)
          .onSnapshot(querySnapshot => {
            fetchGuestRequests(querySnapshot);
          });
      }

      return () => {
        subcribeHostRequests && subcribeHostRequests();
        subcribeGuestRequests && subcribeGuestRequests();
      };
    }, [activeEvent?.id, isHost, activeEventDate]),
  );

  const getEventListItem = () => {
    switch (isHost) {
      case true:
        return (
          <FlatList
            // @ts-ignore
            data={list}
            numColumns={2}
            key={'2'}
            showsVerticalScrollIndicator={false}
            keyExtractor={({uid, name}) => `${uid}${name}`}
            contentContainerStyle={styles.listContentContainer}
            extraData={list}
            style={{
              width: '100%',
            }}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({item, index}) => {
              return isHost ? (
                <ItemRequestHost
                  item={item}
                  setRequestsForHost={setRequestsForHost}
                  handleOpenMatch={handleOpenMatch}
                  setIsVisibleModalFullEvent={() => setIsVisibleModalFullEvent(true)}
                  fetchHostRequests={fetchHostRequests}
                />
              ) : (
                // @ts-ignore
                <ItemRequestGuest
                  list={item}
                  item={item?.usersList?.filter((i: Event.User) => i?.uid === user?.uid)}
                  setDataForGuest={setDataForGuest}
                  handleOpenMatch={handleOpenMatch}
                  index={index}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 16, marginTop: screenHeight / 10}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 932), marginBottom: 18}}>
                    You don't have any requests
                  </Text>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 932), marginBottom: 34}}>
                    Get started by swiping to {isHost ? 'invite guests' : 'join events and begin receiving event requests.'}
                  </Text>
                  <Button title="Start swiping" onPress={() => navigation.navigate(IOPath as never)} />
                </View>
              );
            }}
          />
        );
      case false:
        return (
          <FlatList
            // @ts-ignore
            data={list}
            numColumns={1}
            key={'1'}
            showsVerticalScrollIndicator={false}
            keyExtractor={({uid, name}) => `${uid}${name}`}
            contentContainerStyle={styles.listContentContainer}
            extraData={list}
            style={{
              width: '100%',
            }}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({item, index}) => {
              return isHost ? (
                <ItemRequestHost
                  item={item}
                  setRequestsForHost={setRequestsForHost}
                  handleOpenMatch={handleOpenMatch}
                  setIsVisibleModalFullEvent={() => setIsVisibleModalFullEvent(true)}
                  fetchHostRequests={fetchHostRequests}
                />
              ) : (
                // @ts-ignore
                <ItemRequestGuest
                  list={item}
                  item={item?.usersList?.filter((i: Event.User) => i?.uid === user?.uid)}
                  setDataForGuest={setDataForGuest}
                  handleOpenMatch={handleOpenMatch}
                  index={index}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 16, marginTop: screenHeight / 10}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 932), marginBottom: 18}}>
                    You don't have any requests
                  </Text>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 932), marginBottom: 34}}>
                    Get started by swiping to {isHost ? 'invite guests' : 'join events and begin receiving event requests.'}
                  </Text>
                  <Button title="Start swiping" onPress={() => navigation.navigate(IOPath as never)} />
                </View>
              );
            }}
          />
        );
    }
  };

  if ((loading || loadingMyEvents) && !list.length && !isVisibleMatch) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: blackColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (userInfo?.uid && !userInfo?.accountConfirmed && !loading && !rejectModalVisible && !acceptModalVisible) {
    return (
      <View style={styles.container}>
        <ModalLockAccount isVisibleButton isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} />
      </View>
    );
  }

  if (!!userInfo?.accountConfirmed && isHost && !myEvents?.length && !loading && !loadingMyEvents) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 70}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
            Let’s create an event
          </Text>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
            Get started by creating an event to begin inviting guests.
          </Text>
          <Button title="Create event" onPress={goToCreateEvent} />
        </View>
      </View>
    );
  }

  const headerInfoEvent = () => {
    return (
      <>
        {userInfo?.accountType === 'host' && !!activeEvent?.id && (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 24,
            }}>
            <View
              style={{
                height: 65,
                // width: '100%',
                borderWidth: 1,
                borderColor: whiteColor,
                borderRadius: 12,
                marginBottom: 18,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: RFValue(16, 812), color: whiteColor, fontFamily: Satoshi500}}>
                Join Requests: {totalRequestsGuests}
              </Text>
              <View>
                <View style={{width: 1.25, height: 6, borderRadius: 2, backgroundColor: whiteColor}} />
                <View style={{width: 1.25, height: 10, borderRadius: 2, backgroundColor: whiteColor, marginTop: 5}} />
                <View style={{width: 1.25, height: 10, borderRadius: 2, backgroundColor: whiteColor, marginTop: 5}} />
                <View style={{width: 1.25, height: 6, borderRadius: 2, backgroundColor: whiteColor, marginTop: 4}} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  source={{uri: activeEvent?.photos?.[0].image}}
                  style={{width: 39, height: 39, borderRadius: 39, borderWidth: 1, borderColor: whiteColor, alignSelf: 'center'}}
                />
                <View style={{marginLeft: 10, alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(26, 812),
                      color: whiteColor,
                      fontFamily: Satoshi700,
                    }}>
                    {acceptQuantityGuest}/{totalQuantityGuests}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(12, 812),
                      color: whiteColor,
                      fontFamily: Satoshi500,
                    }}>
                    Guest List
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </>
    )
  }

  if (isHost && !activeEvent?.eventReviewed && myEvents?.length && !loadingMyEvents) {
    return (
      <View style={styles.container}>
        {headerInfoEvent()}
        <View style={{paddingHorizontal: 30}}>
          <FastImage
            style={{
              width: '100%',
              height: screenHeight * 0.22,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            source={{uri: activeEvent?.photos?.[0].image}}>
            <View style={{width: '100%', height: '100%', backgroundColor: transparentGray70Color, position: 'absolute'}} />
            <View style={{flexDirection: 'row'}}>
              <Clock width={32} height={32} />
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(26, 812),
                  marginLeft: 10,
                }}>
                Event in review
              </Text>
            </View>
          </FastImage>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {userInfo?.photos?.length && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo?.photos?.[0].image} />}
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
        <ModalFullEvent
          isVisible={isVisibleModalFullEvent}
          idEvent={activeEvent.id}
          setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
        />
        {headerInfoEvent()}
        {isHost && activeEvent?.id && acceptQuantityGuest >= totalQuantityGuests && (
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
        {getEventListItem()}
      </View>
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default Requests;
