import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { blackColor, whiteColor } from 'constants/colors';
import Notifications from 'screens/App/Notifications/Notifications';

const NotificationStack = createStackNavigator();

const NotificationsStackScreen = () => {
    const stackNavigationOptions: StackNavigationOptions = {
        cardStyle: {
            backgroundColor: blackColor,
        },
        headerStyle: {
            backgroundColor: blackColor,
        },
        headerTitle: 'Notifications', // Changed title
        headerTitleStyle: {
            color: whiteColor,
        },
        headerBackTitleStyle: {
            color: whiteColor,
        },
        headerTintColor: whiteColor,
        // header: () => <NotificationHeader title="Notifications" onBackPress={() => navigation.goBack()} />, // Using the new header
    };

    return (
        <NotificationStack.Navigator screenOptions={stackNavigationOptions}>
            <NotificationStack.Screen
                key="tempNotificationsScreen"
                name="tempNotificationsScreen"
                component={Notifications}
            />
        </NotificationStack.Navigator>
    );
};

export default NotificationsStackScreen; 