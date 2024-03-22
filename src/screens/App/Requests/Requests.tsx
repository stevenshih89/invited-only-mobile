import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {FC, ReactElement, useCallback, useContext, useEffect, useState} from 'react';

//import images
import ManFace from 'assets/images/auth/man-face.png';
import RequestPlace1 from 'assets/images/app/requst-place-1.png';
import RequestPlace2 from 'assets/images/app/requst-place-2.png';
import ManFace2 from 'assets/images/app/request-man.png';

//import components
import useStyles from './styles';
import {whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import ItemRequestGuest from './ItemRequestGuest';
import ItemRequestHost from './ItemRequestHost';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {profilePath} from 'constants/pathLocations';
import {EventContext} from 'contexts/EventContext';

const Requests: FC = (): ReactElement => {
  const POSITIVE = 'positive';
  const NEGATIVE = 'negative';
  const styles = useStyles();

  const navigation = useAppNavigation();

  const {setMyEvents, setActiveEvent, activeEvent} = useContext(EventContext);

  const listOfHosts = [
    {id: 0, name: 'Simon', image: ManFace},
    {id: 1, name: 'Frank', image: ManFace2},
  ];

  const [requestsForHost, setRequestsForHost] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(false);

  // const fetchRequests = async () => {
  //   const user = auth().currentUser;
  //   try {
  //     const querySnapshot = await firestore().collection('requestsForHost').where('forUserUid', '==', user?.uid).get();

  //     const requests = querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setRequestsForHost(requests);
  //     return requests;
  //   } catch (error: any) {
  //     Alert.alert('Error', error.message || 'Something went wrong');
  //   }
  // };

  const fetchHostRequests = async () => {
    const user = auth().currentUser;
    if (user && activeEvent) {
      try {
        const querySnapshot = await firestore().collection('Events').doc(activeEvent.id).get();
        if (querySnapshot.exists) {
          setRequestsForHost(querySnapshot.data()?.requestsList);
        } else {
          setRequestsForHost([]);
        }
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

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHostRequests();
    }, [activeEvent]),
  );

  const [dataForGuest, setDataForGuest] = useState([
    {
      id: 0,
      host: listOfHosts[0],
      location: 'Nammos Dubai',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 3,
      },
      isSuperInvite: true,
      name: 'Simon1',
      image: RequestPlace1,
    },
    {
      id: 1,
      host: listOfHosts[1],
      location: 'Test text',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 2,
      },
      name: 'Simon2',
      image: RequestPlace2,
    },
    {
      id: 2,
      host: listOfHosts[0],
      location: 'Nammos Dubai',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 3,
      },
      isSuperInvite: true,
      name: 'Simon3',
      image: RequestPlace1,
    },
    {
      id: 3,
      host: listOfHosts[1],
      location: 'Test text',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 2,
      },
      name: 'Simon4',
      image: RequestPlace2,
    },
    {
      id: 4,
      host: listOfHosts[1],
      location: 'Test text',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 2,
      },
      name: 'Simon5',
      image: RequestPlace2,
    },
  ]);

  const isHost = userInfo?.accountType?.toLowerCase() === 'host';

  const handleSwipeGuestCard = (id: number, status: typeof POSITIVE | typeof NEGATIVE) => {
    const toastText = status === POSITIVE ? 'You accepted invitation' : 'You rejected invitation';
    Toast.show({
      type: 'success',
      text1: toastText,
    });
    const newData = dataForGuest.filter(item => item.id !== id);
    setDataForGuest(newData);
  };

  const list = isHost ? requestsForHost : dataForGuest;

  if (loading && !list.length) {
    return <ActivityIndicator style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      {list?.length ? (
        <FlatList
          // @ts-ignore
          data={list}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={({uid, name}) => `${uid}${name}`}
          contentContainerStyle={styles.listContentContainer}
          extraData={list}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({item}) =>
            isHost ? (
              <ItemRequestHost item={item} handleSwipeHostCard={() => {}} />
            ) : (
              // @ts-ignore
              <ItemRequestGuest item={item} handleSwipeGuestCard={handleSwipeGuestCard} />
            )
          }
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 70}}>
          <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(30, 812), marginBottom: 18}}>
            You don't have any requests
          </Text>
          <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
            Add more information for yourself
          </Text>
          <Button title="See my profile" onPress={() => navigation.navigate(profilePath as never)} />
        </View>
      )}
    </View>
  );
};

export default Requests;
