import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { components } from '@invited-only/invited-only-api';
import * as S from './Notifications.style';

import JoinedEventsNotifications from './Components/JoinedEventsNotifications/JoinedEventsNotifications';
import MyEventsNotifications from './Components/MyEventsNotifications/MyEventsNotifications';
import useGetNotifications from './hooks/useGetNotifications';
import { whiteColor } from 'constants/colors';


export type NotificationsTabParamList = {
    JoinedEvents: { allNotifications: components['schemas']['Notification'][] };
    MyEvents: { allNotifications: components['schemas']['Notification'][] };
};



const Tab = createMaterialTopTabNavigator<NotificationsTabParamList>();


const Notifications = ({ route }: { route: any }) => {
    const { markAllAsReadHandler } = useGetNotifications();
    useEffect(() => {
        markAllAsReadHandler();
    }, []);
    const { initialTab } = route.params;
    return (
        <S.Container>
            <Tab.Navigator
                initialRouteName={initialTab}
                screenOptions={{
                    tabBarIndicatorStyle: { backgroundColor: whiteColor, height: 2 },
                }}
            >
                <Tab.Screen
                    name="JoinedEvents"
                    component={JoinedEventsNotifications}
                    options={{ tabBarLabel: 'Joined Events' }}
                />
                <Tab.Screen
                    name="MyEvents"
                    component={MyEventsNotifications}
                    options={{ tabBarLabel: 'My Events' }}
                />
            </Tab.Navigator>
        </S.Container>
    );
};

export default Notifications; 