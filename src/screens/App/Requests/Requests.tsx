import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {FC, ReactElement, useCallback, useContext, useEffect, useState} from 'react';

//import components
import useStyles from './styles';
import {whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import ItemRequestGuest from './ItemRequestGuest';
import ItemRequestHost from './ItemRequestHost';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {profilePath} from 'constants/pathLocations';
import {EventContext} from 'contexts/EventContext';
import {useUser} from '../../../store/userStore';
import {useRequest} from '../../../store/requestsStore';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);
  const requestFilter = useRequest((i: any) => i?.requestFilter);

  const {activeEvent} = useContext(EventContext);

  const [requestsForHost, setRequestsForHost] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [dataForGuest, setDataForGuest] = useState([]);  

  const [loading, setLoading] = useState<boolean>(false);

  const fetchHostRequests = async () => {
    const user = auth().currentUser;
    if (user && activeEvent !== 'host') {
      try {
        const querySnapshot = await firestore().collection('Events').doc(activeEvent.id).get();
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
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
    setLoading(false);
  };

  const isHost = activeEvent === 'host' ? false : userInfo?.accountType?.toLowerCase() === 'host';

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      isHost ? fetchHostRequests() : fetchGuestRequests();
    }, [activeEvent, requestFilter]),
  );

  const list = isHost ? requestsForHost : dataForGuest;


  if (loading && !list) {
    return <ActivityIndicator style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      {list.lenght ? (
        <FlatList
          // @ts-ignore
          data={isHost ? list?.requestsList : list}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={({uid, name}) => `${uid}${name}`}
          contentContainerStyle={styles.listContentContainer}
          extraData={isHost ? list?.requestsList : list}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({item}) =>
            isHost ? (
              <ItemRequestHost list={list} item={item} />
            ) : (
              // @ts-ignore
              <ItemRequestGuest list={item} item={item?.requestsList?.filter(i => i?.uid === user?.uid)} />
            )
          }
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 70}}>
          <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(30, 812), marginBottom: 18}}>
            You don't have any events
          </Text>
          <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
            You don't have any active event.
          </Text>
          <Button title="Create event" onPress={() => navigation.navigate(profilePath as never)} />
        </View>
      )}
    </View>
  );
};

export default Requests;

