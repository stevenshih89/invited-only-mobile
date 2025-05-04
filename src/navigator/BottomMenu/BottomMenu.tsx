import React, { FC, JSX } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import components
import { createStackNavigator } from '@react-navigation/stack';
import useStyles from 'navigator/BottomMenu/styles';
import { IOStackNavigation, MyEventsStackNavigation } from 'navigator/AppStackScreens/AppStackScreens';
import ChatStackScreen from 'navigator/AppStackScreens/ChatStackScreen/ChatStackScreen';
import { whiteColor } from 'constants/colors.ts';
import { IOPath, chatPath, connectPath, joinEventsPath, myEventsPath } from 'constants/pathLocations';

import Header from 'components/Header/Header';
import { TabBarName, TabIcon } from 'navigator/TabBar/TabBar';

import JoinEventsWrapper from 'screens/App/JoinEvents/JoinEventsWrapper';
import ConnectStackScreen from 'navigator/AppStackScreens/ConnectStackScreen/ConnectStackScreen';
import useMessaging from 'hooks/useMessaging';

const JoinEventsStackScreen = () => {
  const JoinEventsStack = createStackNavigator();

  return (
    <JoinEventsStack.Navigator initialRouteName={joinEventsPath}>
      <JoinEventsStack.Screen
        key={joinEventsPath}
        name={joinEventsPath}
        component={JoinEventsWrapper}
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="request" />,
        }}
      />
    </JoinEventsStack.Navigator>
  );
};

const BottomMenu: FC = (): JSX.Element => {
  const styles = useStyles();
  const Tab = createBottomTabNavigator();
  useMessaging();

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        headerTransparent: false,
        tabBarActiveTintColor: whiteColor,
        tabBarStyle: styles.tabNavigator,
        tabBarIcon: ({ focused }: { focused: boolean }) => TabIcon(focused, route.name),
        tabBarLabel: ({ focused }: { focused: boolean }) => TabBarName(focused, route.name),
      })}
      initialRouteName={IOPath}>
      <Tab.Screen name={myEventsPath} component={MyEventsStackNavigation} />
      <Tab.Screen name={joinEventsPath} component={JoinEventsStackScreen} />
      <Tab.Screen name={IOPath} component={IOStackNavigation} />
      <Tab.Screen name={connectPath} component={ConnectStackScreen} />
      <Tab.Screen name={chatPath} component={ChatStackScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
