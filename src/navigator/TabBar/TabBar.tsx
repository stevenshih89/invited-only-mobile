import React, {ReactElement} from 'react';
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
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi700 } from 'constants/fonts';
import { useUser } from 'src/store/userStore';

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

  const userHost = useUser((i: any) => i?.user);
  
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
      {(route === '/chat' || route === '/my-events') && <View style={{
        backgroundColor: lightRedColor, 
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 4.5,
        paddingVertical: 1,
        borderRadius: 33,
        borderWidth: 1,
        borderColor: blackColor,
        right: -8
        }}>
        <Text style={{
          fontSize: RFValue(10, 812),
          fontFamily: Satoshi700,
          color: whiteColor,
        }}>{userHost?.eventsList?.length}</Text>
      </View>}
    </View>
  )
  
};
