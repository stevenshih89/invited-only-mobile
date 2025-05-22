import React, {FC, JSX, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import components
import useStyles from 'navigator/BottomMenu/styles';
import {whiteColor} from 'constants/colors.ts';
import {IOPath, chatPath, connectPath, joinEventsPath, myEventsPath} from 'constants/pathLocations';

import {TabBarName, TabIcon} from 'navigator/TabBar/TabBar';

import IOStackScreen from 'navigator/AppStackScreens/IOStackScreen/IOStackScreen';
import ChatStackScreen from 'navigator/AppStackScreens/ChatStackScreen/ChatStackScreen';
import ConnectStackScreen from 'navigator/AppStackScreens/ConnectStackScreen/ConnectStackScreen';
import MyEventsStackScreen from 'navigator/AppStackScreens/MyEventsStackScreen/MyEventsStackScreen';
import JoinEventsStackScreen from 'navigator/AppStackScreens/JoinEventsStackScreen/JoinEventsStackScreen';

import useMessaging from 'hooks/useMessaging';

const BottomMenu: FC = (): JSX.Element => {
  const styles = useStyles();
  const Tab = createBottomTabNavigator();
  const {setupNotifications} = useMessaging();
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}: {route: {name: string}}) => ({
        headerShown: false,
        headerTransparent: false,
        tabBarActiveTintColor: whiteColor,
        tabBarStyle: styles.tabNavigator,
        tabBarIcon: ({focused}: {focused: boolean}) => TabIcon(focused, route.name),
        tabBarLabel: ({focused}: {focused: boolean}) => TabBarName(focused, route.name),
      })}
      initialRouteName={IOPath}>
      <Tab.Screen name={myEventsPath} component={MyEventsStackScreen} />
      <Tab.Screen name={joinEventsPath} component={JoinEventsStackScreen} />
      <Tab.Screen name={IOPath} component={IOStackScreen} />
      <Tab.Screen name={connectPath} component={ConnectStackScreen} />
      <Tab.Screen name={chatPath} component={ChatStackScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
