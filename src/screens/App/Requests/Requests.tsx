import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {FC, ReactElement, useCallback, useContext, useState} from 'react';
//import components
import useStyles from './styles';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
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

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);

  const {activeEvent} = useContext(EventContext);

  const [requestsForHost, setRequestsForHost] = useState<any>([]);
  const [userInfo, setUserInfoData] = useState<any>([]);
  const [dataForGuest, setDataForGuest] = useState([]);
  const [myEventsList, setMyEventsList] = useState([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchHostRequests = async () => {
    const user = auth().currentUser;

    console.warn('activeEvent', activeEvent);

    if (user && activeEvent !== 'host') {
      try {
        const querySnapshot = await firestore().collection('Events').doc(activeEvent.id).get();
        const myEventsQuery = await firestore().collection('Events').where('uid', '==', user.uid).get();
        console.warn('querySnapshot', querySnapshot.data());

        if (!myEventsQuery.empty) {
          const eventList = myEventsQuery?.docs.map(i => i?.data());
          setMyEventsList(eventList);
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
      if (Array?.isArray(item?.requestsList)) {
        return item?.requestsList?.some(request => request?.uid === uid);
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
        // console.log('filter', filterByUid(data, user?.uid));
        const filterUid = filterByUid(data, user?.uid);
        // console.log('filterUid', filterUid);
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
        console.log('Error', error.message || 'Something went wrong');
        setLoading(false);
      }
    }
  };

  const isHost = user?.accountType?.toLowerCase() === 'host';

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      isHost ? fetchHostRequests() : fetchGuestRequests();
    }, [activeEvent, isHost]),
  );

  const list = isHost ? requestsForHost : dataForGuest;

  const expressionForHost = isHost && !!requestsForHost?.requestsList?.length;
  const expressionForGuest = !isHost && !!dataForGuest.length;

  if (loading && !list) {
    return <ActivityIndicator style={styles.container} />;
  }

  if (!loading && (isHost ? !requestsForHost?.requestsList?.length : !dataForGuest?.length)) {
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

  function isDateTimePassed(dateString: string, timeString: string) {
    if (typeof dateString !== 'string' || typeof timeString !== 'string') {
      return false;
    }

    const [day, month, year] = dateString.split('.').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);

    const inputDate = new Date(year, month - 1, day, hours, minutes);
    const currentDate = new Date();

    return inputDate < currentDate;
  }

  return (
    <View style={styles.container}>
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
              <ItemRequestHost list={list} item={item} />
            ) : (
              // @ts-ignore
              <ItemRequestGuest list={item} item={item?.usersList?.filter(i => i?.uid === user?.uid)} />
            );
          }}
        />
      ) : (
        <>
          {!!userInfo?.accountConfirmed && userInfo?.accountType === 'host' && !myEventsList?.length && !loading &&(
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
          {!!userInfo?.accountConfirmed && userInfo?.accountType === 'host' && !list.eventReviewed && !!myEventsList?.length && (
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
          )}
        </>
      )}
      <>{!userInfo?.accountConfirmed && !loading && <ModalLockAccount isVisibleButton isPremium={userInfo?.accountPremium} />}</>
    </View>
  );
};

export default Requests;
