import React, {ReactElement, useState} from 'react';
import {View, Text} from 'react-native';
import {Label, IconWrapper} from './styles';
import Connect from 'assets/images/tab-bar/connect.svg';
import ConnectActive from 'assets/images/tab-bar/connect-active.svg';

import MyEvents from 'assets/images/tab-bar/my-events.svg';
import MyEventsActive from 'assets/images/tab-bar/my-events-active.svg';
import Chat from 'assets/images/tab-bar/chat.svg';
import ChatActive from 'assets/images/tab-bar/chat-active.svg';
import JoinEventActive from 'assets/images/tab-bar/join-events-active.svg';
import JoinEvents from 'assets/images/tab-bar/joint-events.svg';
import IO from 'assets/images/tab-bar/io.svg';
import IOActive from 'assets/images/tab-bar/io-active.svg';
import {IOPath, chatPath, connectPath, joinEventsPath, myEventsPath} from 'constants/pathLocations';
import {blackColor, grayColor, lightRedColor, whiteColor} from 'constants/colors';
import {RootStackParamList} from 'typescript/types';

import {Satoshi700} from 'constants/fonts';
import useUser from 'hooks/user/useUser';

export const TabBarName = (focused: boolean, route: string) => {
    const getLabel = (): string =>
        ({
            [connectPath]: 'Invites',
            [joinEventsPath]: 'Join Events',
            [myEventsPath]: 'Events',
            [chatPath]: 'Chats',
            [IOPath]: 'Invites',
        })[route as keyof RootStackParamList];

    return <Label style={{color: focused ? whiteColor : grayColor}}>{getLabel()}</Label>;
};

export const TabIcon = (focused: boolean, route: string): ReactElement => {
    const {user} = useUser();
    const [eventsCount, setEventsCount] = useState(0);
    const [eventsCountHost, setEventsCountHost] = useState(0);
    const [newMessage, setNewMessages] = useState(0);

    const getIcon = (): ReactElement =>
        ({
            [connectPath]: focused ? <ConnectActive /> : <Connect />,
            [joinEventsPath]: focused ? <JoinEventActive /> : <JoinEvents />,
            [IOPath]: focused ? <IOActive /> : <IO />,
            [myEventsPath]: focused ? <MyEventsActive /> : <MyEvents />,
            [chatPath]: focused ? <ChatActive /> : <Chat />,
        })[route as keyof RootStackParamList];

    return (
        <IconWrapper style={{borderTopColor: focused ? whiteColor : 'transparent'}}>
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
                            fontFamily: Satoshi700,
                            color: whiteColor,
                        }}>
                        {route === '/my-events' ? (user?.accountType === 'host' ? eventsCountHost : eventsCount) : newMessage}
                    </Text>
                </View>
            )}
        </IconWrapper>
    );
};
