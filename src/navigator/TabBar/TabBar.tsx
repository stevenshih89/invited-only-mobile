import React, {ReactElement, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Profile from 'assets/images/tab-bar/profile.svg';
import ProfileActive from 'assets/images/tab-bar/profile-active.svg';
import Requests from 'assets/images/tab-bar/requests.svg';
import RequestsActive from 'assets/images/tab-bar/requests-active.svg';
import MyEvents from 'assets/images/tab-bar/my-events.svg';
import MyEventsActive from 'assets/images/tab-bar/my-events-active.svg';
import Chat from 'assets/images/tab-bar/direct-inbox.svg';
import ChatActive from 'assets/images/tab-bar/direct-inbox-active.svg';
import IO from 'assets/images/tab-bar/io.svg';
import {IOPath, chatPath, myEventsPath, profilePath, requestsPath} from 'constants/pathLocations';
import {blackColor, grayColor, lightRedColor, whiteColor} from 'constants/colors';
import {RootStackParamList} from 'typescript/types';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi700} from 'constants/fonts';
import {useUser} from 'src/store/userStore';
import firestore from '@react-native-firebase/firestore';

import {getEventsIJoining} from 'helpers/getEventsIJoining';
import Config from 'react-native-config';
export const tabBarName = (focused: boolean, route: string): ReactElement => {
  const getLabel = (): string =>
    ({
      [profilePath]: 'Profile',
      [requestsPath]: 'Requests',
      [myEventsPath]: 'My Events',
      [chatPath]: 'Inbox',
    }[route as keyof RootStackParamList]);

  return <Text style={[styles.label, {color: focused ? whiteColor : grayColor}]}>{getLabel()}</Text>;
};

export const tabIcon = (focused: boolean, route: string): ReactElement => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
  const userHost = useUser((i: any) => i?.user);
  const [eventsCount, setEventsCount] = useState(0);
  const [eventsCountHost, setEventsCountHost] = useState(0);
  const [newMessage, setNewMessages] = useState(0);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(apiEventsCollection)
      .onSnapshot(async querySnapshot => {
        const count = await getEventsIJoining(querySnapshot, userHost?.uid);
        setEventsCount(count);
      });

    return () => unsubscribe();
  }, [userHost]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(apiMessagesCollection)
      .onSnapshot(async documentSnapshot => {
        if (documentSnapshot.empty) {
          setNewMessages(0);
          return;
        }

        let newMessages = 0;

        const chatData = documentSnapshot.docs.map(i => i.data());
        const filteredChats = chatData.filter(chatDataItem => {
          return userHost?.accountType === 'host' ? chatDataItem?.uidHost === userHost?.uid : chatDataItem?.uidGuest === userHost?.uid;
        });
        for (const item of filteredChats) {
          for (const messages of item.chats) {
            if (userHost?.accountType === 'host') {
              newMessages += messages.newMessagesGuest ? messages.newMessagesGuest : 0;
            } else {
              newMessages += messages.newMessagesHost ? messages.newMessagesHost : 0;
            }
          }
        }
        setNewMessages(newMessages);
      });

    return () => unsubscribe();
  }, [userHost]);

  useEffect(() => {
    if (userHost?.uid) {
      firestore()
        .collection(apiEventsCollection)
        .where('uid', '==', `${userHost?.uid}`)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.empty) {
            return;
          }
          const data = querySnapshot?.docs?.map(i => i?.data());
          const filterEvents = data.filter(item => !item.isCancelled);
          setEventsCountHost(filterEvents.length);
        });
    }
  }, []);

  const getIcon = (): ReactElement =>
    ({
      [profilePath]: focused ? <ProfileActive /> : <Profile />,
      [requestsPath]: focused ? <RequestsActive /> : <Requests />,
      [IOPath]: <IO />,
      [myEventsPath]: focused ? <MyEventsActive /> : <MyEvents />,
      [chatPath]: focused ? <ChatActive /> : <Chat />,
    }[route as keyof RootStackParamList]);

  return (
    <View style={[styles.iconWr, {borderTopColor: focused ? whiteColor : 'transparent'}]}>
      {getIcon()}
      {((route === '/chat' && newMessage > 0) || (eventsCount > 0 && route === '/my-events')) && (
        <View
          style={{
            backgroundColor: lightRedColor,
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 4.5,
            paddingVertical: 1,
            borderRadius: 33,
            borderWidth: 1,
            borderColor: blackColor,
            right: -8,
          }}>
          <Text
            style={{
              fontSize: RFValue(10, 812),
              fontFamily: Satoshi700,
              color: whiteColor,
            }}>
            {route === '/my-events' ? (userHost?.accountType === 'host' ? eventsCountHost : eventsCount) : newMessage}
          </Text>
        </View>
      )}
    </View>
  );
};
