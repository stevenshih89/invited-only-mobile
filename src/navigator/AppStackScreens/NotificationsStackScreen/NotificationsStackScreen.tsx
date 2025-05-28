import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor} from 'constants/colors';
import Notifications from 'screens/App/Notifications/Notifications';
import {Satoshi400} from 'constants/fonts';
import HeaderBackButton from 'navigator/Components/HeaderBackButton/HeaderBackButton';

const NotificationStack = createStackNavigator();

const NotificationsStackScreen = ({route}: {route: any}) => {
  const defaultOptions = {
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerBackTitleVisible: false,
    headerShown: true,
    headerBackImage: () => <HeaderBackButton />,
  };
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        key="tempNotificationsScreen"
        name="tempNotificationsScreen"
        component={Notifications}
        initialParams={{initialTab: route.params.initialTab}}
        options={{
          ...defaultOptions,
          headerTitle: 'Notifications',
        }}
      />
    </NotificationStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: blackColor,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerTitleStyle: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(24, 812),
  },
});

export default NotificationsStackScreen;
