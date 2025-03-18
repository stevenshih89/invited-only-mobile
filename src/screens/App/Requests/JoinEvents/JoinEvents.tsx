import {FlatList, Text, View} from 'react-native';
import {FC, ReactElement, useCallback, useState} from 'react';

//import components
import useStyles from '../styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import EventsRequest from '../EventRequests/EventRequets';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import Button from 'components/Button/Button';
import {screenHeight} from 'constants/common';
import Config from 'react-native-config';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

const JoinEvents: FC = (): ReactElement => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const styles = useStyles();

  const [requestsForHost, setRequestsForHost] = useState<any>([]);

  const fetchHostRequests = async () => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }

    try {
      const getData = await firestore().collection(apiEventsCollection).get();

      const matchingDocs = [];

      getData.forEach(doc => {
        const usersList = doc.data().usersList || [];
        const userExists = usersList.some(userObj => userObj.uid === user.uid);
        if (userExists) {
          matchingDocs.push(doc);
          // console.log('found', doc.data());
        }
      });

      setRequestsForHost(matchingDocs);
    } catch (error) {
      logErrorToSentry(error);
      // console.error("error finding documents:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHostRequests();
    }, []),
  );

  return (
    <View style={styles.container}>
      {requestsForHost.length > 0 ? (
        <FlatList
          testID="join-events-list"
          // @ts-ignore
          data={requestsForHost}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={({uid, name}) => `${uid}${name}`}
          contentContainerStyle={styles.listContentContainer}
          extraData={requestsForHost}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({item}) => {
            return <EventsRequest list={requestsForHost} item={item.data()} />;
          }}
        />
      ) : (
        <View
          testID="join-events-empty"
          style={{
            paddingHorizontal: 24,
            justifyContent: 'center',
            height: screenHeight - (32 + 108 + 17 + 17 + 80),
          }}>
          <Text
            style={{
              color: whiteColor,
              fontSize: RFValue(48, 812),
              fontFamily: Satoshi500,
            }}>
            You don't have any requests
          </Text>
          <Text
            style={{
              color: whiteColor,
              fontSize: RFValue(18, 812),
              fontFamily: Satoshi400,
              marginBottom: 40,
              marginTop: 20,
            }}>
            Get started to join events and begin receiving event requests.
          </Text>
          <Button title="Join events" />
        </View>
      )}
    </View>
  );
};

export default JoinEvents;
