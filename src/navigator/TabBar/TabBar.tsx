import React, {ReactElement} from 'react';
import {View, Text} from 'react-native';
import Profile from 'assets/images/tab-bar/profile.svg';
import ProfileActive from 'assets/images/tab-bar/profile-active.svg';
import Requests from 'assets/images/tab-bar/requests.svg';
import RequestsActive from 'assets/images/tab-bar/requests-active.svg';
import MyEvents from 'assets/images/tab-bar/my-events.svg';
import MyEventsActive from 'assets/images/tab-bar/my-events-active.svg';
import Chat from 'assets/images/tab-bar/chat.svg';
import ChatActive from 'assets/images/tab-bar/chat-active.svg';
import IO from 'assets/images/tab-bar/io.svg';
import {IOPath, chatPath, myEventsPath, profilePath, requestsPath} from 'constants/pathLocations';
import {grayColor, whiteColor} from 'constants/colors';
import {RootStackParamList} from 'typescript/types';
import styles from './styles';

export const tabBarName = (focused: boolean, route: string): ReactElement => {
  const getLabel = (): string =>
    ({
      [profilePath]: 'Profile',
      [requestsPath]: 'Requests',
      [myEventsPath]: 'My Events',
      [chatPath]: 'Chat',
    }[route as keyof RootStackParamList]);

  return <Text style={[styles.label, {color: focused ? whiteColor : grayColor}]}>{getLabel()}</Text>;
};

export const tabIcon = (focused: boolean, route: string): ReactElement => {
  const getIcon = (): ReactElement =>
    ({
      [profilePath]: focused ? <ProfileActive /> : <Profile />,
      [requestsPath]: focused ? <RequestsActive /> : <Requests />,
      [IOPath]: <IO />,
      [myEventsPath]: focused ? <MyEventsActive /> : <MyEvents />,
      [chatPath]: focused ? <ChatActive /> : <Chat />,
    }[route as keyof RootStackParamList]);

  return <View style={[styles.iconWr, {borderTopColor: focused ? whiteColor : 'transparent'}]}>{getIcon()}</View>;
};
