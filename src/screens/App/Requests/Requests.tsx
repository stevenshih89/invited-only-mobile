import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {FC, ReactElement, useCallback, useContext, useEffect, useState} from 'react';
//import components
import useStyles from './styles';
import {blackColor, lightGray10Color, transparentGray70Color, whiteColor} from 'constants/colors';
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
import Loading from 'components/Loading/Loading';
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
import {ACCEPTED_STATUS, LIKED, screenHeight} from 'constants/common';
import {Event, EventData} from 'src/types/event';
import {UserInfo} from 'src/types/userInfo';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);

  const {activeEvent} = useContext(EventContext);

  const [requestsForHost, setRequestsForHost] = useState<any>([]);
  const [userInfo, setUserInfoData] = useState<UserInfo>({});
  const [dataForGuest, setDataForGuest] = useState<EventData[]>([]);
  const [myEventsList, setMyEventsList] = useState<EventData[]>([]);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<MatchData>({});
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);

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

  const fetchHostRequests = async () => {
    const currentUser = auth().currentUser;

    if (!currentUser || !activeEvent?.id) {
      setMyEventsList([]);
      setRequestsForHost([]);
      return;
    }
    if (currentUser && activeEvent !== 'host' && activeEvent?.id) {
      try {
        const querySnapshot = await firestore().collection('Events').doc(activeEvent.id).get();
        const myEventsQuery = await firestore()
          .collection('Events')
          .where('uid', '==', currentUser.uid)
          .where('isCancelled', '==', false)
          .get();

        if (!myEventsQuery.empty) {
          const eventList = myEventsQuery?.docs.map(i => i?.data()) as EventData[];
          setMyEventsList(eventList);
        } else {
          setMyEventsList([]);
        }

        if (querySnapshot.exists) {
          setRequestsForHost(querySnapshot.data());
        } else {
          setRequestsForHost([]);
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    } else if (currentUser && activeEvent === 'host') {
      try {
        const querySnapshot = await firestore()
          .collection('Events')
          .where('statusEvent', '==', true)
          .where('isCancelled', '==', false)
          .get();
        const data = querySnapshot?.docs?.map(i => i?.data());
        if (data) {
          setRequestsForHost(data);
        } else {
          setRequestsForHost([]);
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const filterByUid = (array: EventData[], uid: string) => {
    return array?.filter((item: EventData) => {
      if (Array?.isArray(item?.usersList)) {
        return item?.usersList?.some((request: Event.User) => request?.uid === uid && request?.status === LIKED);
      } else {
        return false;
      }
    });
  };

  const fetchGuestRequests = async () => {
    const currentUser = auth().currentUser;
    if (currentUser && activeEvent) {
      try {
        const querySnapshot = await firestore()
          .collection('Events')
          .where('statusEvent', '==', true)
          .where('isCancelled', '==', false)
          .get();
        if (querySnapshot.empty) {
          return;
        }
        const data = querySnapshot?.docs?.map(i => i?.data()) as EventData[];
        // // console.log('filter', filterByUid(data, currentUser?.uid));
        const filterUid = filterByUid(data, currentUser?.uid);

        // // console.log('filterUid', filterUid);
        setDataForGuest(filterUid);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    const currentUser = auth()?.currentUser;
    if (currentUser) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(currentUser.uid).get();
        if (!userInfoDoc.exists) {
          return;
        }
        const data = userInfoDoc.data() as UserInfo;
        setUserInfoData(data);
        setLoading(false);
      } catch (error: any) {
        // console.log('Error', error.message || 'Something went wrong');
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
    const {allGuests, findAcceptedGuest, totalRequestsGuests} = await checkIsFullGuests(activeEvent?.id);
    if (findAcceptedGuest >= allGuests) {
      setTotalQuantityGuests(allGuests);
    }
    setTotalRequestsGuests(totalRequestsGuests);
    setAcceptQuantityGuest(findAcceptedGuest);
    return findAcceptedGuest >= allGuests;
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

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
      checkIsFullGuestsFun();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      isHost ? fetchHostRequests() : fetchGuestRequests();
    }, [activeEvent, isHost]),
  );

  const expressionForHost = isHost && !!requestsForHost?.requestsList?.length;
  const expressionForGuest = !isHost && !!dataForGuest.length;

  function isDateTimePassed(dateString: string, timeString: string) {
    if (typeof dateString !== 'string' || typeof timeString !== 'string') {
      return false;
    }

    const [day, month, year] = dateString.split('.').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);

    const dateTime = moment(`${year}-${month}-${day} ${hours}:${minutes}`, 'YYYY-MM-DD HH:mm');

    const dateTimeWithAddedHours = dateTime.add(12, 'hours');
    const isExpired = moment().isAfter(dateTimeWithAddedHours);

    return isExpired;
  }

  if (loading && !list && !isVisibleMatch) {
    return <ActivityIndicator style={styles.container} />;
  }

  if (!userInfo?.accountConfirmed && !loading && !rejectModalVisible && !acceptModalVisible) {
    return (
      <View style={styles.container}>
        <ModalLockAccount isVisibleButton isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} />
      </View>
    );
  }


  if (
    isDateTimePassed(list?.date, list?.hour) &&
    !!userInfo?.accountConfirmed &&
    isHost &&
    list.eventReviewed &&
    list.statusEvent &&
    !!myEventsList?.length &&
    !isVisibleMatch
  ) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: '100%', backgroundColor: blackColor, paddingHorizontal: 24}}>
          {
            <Loading
              userInfo={list}
              topPosition={false}
              wrapperText={false}
              text={isDateTimePassed(list?.date, list?.hour) ? `Event Expired: ${list.date}` : `Event Start: ${list.date}`}
            />
          }
        </View>
      </View>
    );
  }

  if (
    !loading &&
    userInfo?.accountConfirmed &&
    requestsForHost.eventReviewed &&
    !!myEventsList?.length &&
    (isHost ? !requestsForHost?.requestsList?.length : !dataForGuest?.length) &&
    !isVisibleMatch
  ) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 70}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
            You don't have any requests
          </Text>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
            Get started by swiping to {isHost ? 'invite guests' : 'join events and begin receiving event requests.'}
          </Text>
          <Button title="Start swiping" onPress={() => navigation.navigate(IOPath as never)} />
        </View>
      </View>
    );
  }

  const getUsersListAccepted = () => {
    const filteredUsers = activeEvent?.usersList?.filter((item: Event.User) => item.status === ACCEPTED_STATUS) || [];
    return filteredUsers.length;
  };

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
        {!userInfo?.accountConfirmed && !loading && <ModalLockAccount isVisibleButton isPremium={userInfo?.accountPremium} />}
        {userInfo?.accountType === 'host' && (
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
                Join Requests: {activeEvent?.requestsList?.length}
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
                    {getUsersListAccepted()}/{activeEvent?.male + activeEvent?.female}
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
        {isHost && !requestsForHost.eventReviewed && !!myEventsList?.length && (
          <View style={styles.container}>
            <View style={{paddingHorizontal: 30, marginTop: 7}}>
              <FastImage
                style={{
                  width: '100%',
                  height: screenHeight * 0.22,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}
                source={{uri: activeEvent?.photos[0].image}}>
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
        )}
        {expressionForHost || expressionForGuest ? (
          <FlatList
            // @ts-ignore
            data={isHost ? list?.requestsList : list}
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={({uid, name}) => `${uid}${name}`}
            contentContainerStyle={styles.listContentContainer}
            extraData={isHost ? list?.requestsList : list}
            // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({item, index}) => {
              return isHost ? (
                <ItemRequestHost
                  list={list}
                  item={item}
                  setRequestsForHost={setRequestsForHost}
                  handleOpenMatch={handleOpenMatch}
                  checkIsFullGuestsFun={checkIsFullGuestsFun}
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
          />
        ) : (
          <>
            {!!userInfo?.accountConfirmed && userInfo?.accountType === 'host' && !myEventsList?.length && !loading && (
              <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 70}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                  Let’s create an event
                </Text>
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
                  Get started by creating an event to begin inviting guests.
                </Text>
                <Button title="Create event" onPress={goToCreateEvent} />
              </View>
            )}
          </>
        )}
      </View>
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default Requests;

