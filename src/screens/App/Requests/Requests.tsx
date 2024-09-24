import {ActivityIndicator, Alert, FlatList, Text, View, Image} from 'react-native';
import {FC, ReactElement, useCallback, useContext, useEffect, useState} from 'react';
//import components
import useStyles from './styles';
import {blackColor, lightGray10Color, orangeClose, transparentWhite30Color, whiteColor} from 'constants/colors';
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
import {eventCreatingStackPath, IOPath} from 'constants/pathLocations';
import {EventContext} from 'contexts/EventContext';
import {useUser} from '../../../store/userStore';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import Loading from 'components/Loading/Loading';
import moment from 'moment';
import Match, {MatchData} from '../IO/screens/Match/Match';
import {showToast} from 'helpers/showToast';
import FullEvent from 'components/FullEvent';
import {checkIsFullGuests} from 'helpers/checkIsFullGuests';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {AccountInfoFlyWeight, useUserProfileChangeSubscription} from 'helpers/userProfile';
import {useAdminActions} from 'src/store/adminActions';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);

  const {activeEvent} = useContext(EventContext);

  const [requestsForHost, setRequestsForHost] = useState<any>([]);
  const [userInfo, setUserInfoData] = useState<any>([]);
  const [dataForGuest, setDataForGuest] = useState([]);
  const [myEventsList, setMyEventsList] = useState([]);
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
    if (!Object.keys(userInfo).length) {
      return;
    }

    setUserInfoData((prev: Partial<AccountInfoFlyWeight>) => ({...prev, accountConfirmed}));
  }, [accountConfirmed]);

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
  };

  const fetchHostRequests = async () => {
    const user = auth().currentUser;
    if (user && activeEvent !== 'host') {
      try {
        const querySnapshot = await firestore().collection('Events').doc(activeEvent.id).get();
        const myEventsQuery = await firestore().collection('Events').where('uid', '==', user.uid).get();

        if (!myEventsQuery.empty) {
          const eventList = myEventsQuery?.docs.map(i => i?.data());
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
    } else if (user && activeEvent === 'host') {
      try {
        const querySnapshot = await firestore().collection('Events').get();
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

  const filterByUid = (array, uid) => {
    return array?.filter(item => {
      if (Array?.isArray(item?.usersList)) {
        return item?.usersList?.some(request => request?.uid === uid && request?.status === 'liked');
      } else {
        return false;
      }
    });
  };

  const fetchGuestRequests = async () => {
    const user = auth().currentUser;
    if (user && activeEvent) {
      try {
        const querySnapshot = await firestore().collection('Events').get();
        const data = querySnapshot?.docs?.map(i => i?.data());
        // // console.log('filter', filterByUid(data, user?.uid));
        const filterUid = filterByUid(data, user?.uid);

        // // console.log('filterUid', filterUid);
        setDataForGuest(filterUid);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    const user = auth()?.currentUser;
    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();
        if (!userInfoDoc.exists) {
          return;
        }
        const data = userInfoDoc.data();
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

  if (isHost && !requestsForHost.eventReviewed && myEventsList?.length) {
    const totalGuests = requestsForHost.female + requestsForHost.male;
    const acceptedGuests = 0;

    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop: 18,
            marginHorizontal: 23,
            backgroundColor: lightGray10Color,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Clock width={32} height={32} />
            <Text
              style={{
                marginLeft: 6,
                color: whiteColor,
                fontFamily: Satoshi700,
                fontSize: RFValue(12, 812),
              }}>
              Event under review
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PersoneIcon width={16} height={16} />
            <Text
              style={{
                fontFamily: Satoshi500,
                fontSize: RFValue(12, 812),
                color: whiteColor,
                marginLeft: 2,
              }}>{`${acceptedGuests}/${totalGuests}`}</Text>
          </View>
        </View>
      </View>
    );
  }

  if (
    isDateTimePassed(list?.date, list?.hour) &&
    !!userInfo?.accountConfirmed &&
    userInfo?.accountType === 'host' &&
    list.eventReviewed &&
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

  return (
    <>
      <View style={styles.container}>
        {userInfo?.photos?.length > 0 && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />}
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
        <ModalFullEvent
          isVisible={isVisibleModalFullEvent}
          idEvent={activeEvent.id}
          setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
        />
        {!userInfo?.accountConfirmed && !loading && <ModalLockAccount isVisibleButton isPremium={userInfo?.accountPremium} />}
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
        {expressionForHost || expressionForGuest ? (
          <FlatList
            // @ts-ignore
            data={isHost ? list?.requestsList : list}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={({uid, name}) => `${uid}${name}`}
            contentContainerStyle={styles.listContentContainer}
            extraData={isHost ? list?.requestsList : list}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({item}) => {
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
                  item={item?.usersList?.filter(i => i?.uid === user?.uid)}
                  setDataForGuest={setDataForGuest}
                  handleOpenMatch={handleOpenMatch}
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
                <Button title="Create event" onPress={() => navigation.navigate(eventCreatingStackPath as never)} />
              </View>
            )}
            {/* {!!userInfo?.accountConfirmed && userInfo?.accountType === 'host' && !list.eventReviewed && !!myEventsList?.length && (
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
              )} */}
          </>
        )}
      </View>
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default Requests;
