import React, { FC, JSX } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import components
import { createStackNavigator } from '@react-navigation/stack';
import useStyles from 'src/Navigator/BottomMenu/styles';
import { IOStackNavigation, MyEventsStackNavigation } from 'src/Navigator/AppStackScreens/AppStackScreens';
import ChatStackScreen from 'src/Navigator/AppStackScreens/ChatStackScreen/ChatStackScreen';
import { whiteColor } from 'constants/colors.ts';
import { IOPath, chatPath, connectPath, joinEventsPath, myEventsPath } from 'constants/pathLocations';

import Header from 'components/Header/Header';
import { TabBarName, TabIcon } from 'src/Navigator/TabBar/TabBar';

import { useUser } from 'src/store/userStore';
import JoinEventsWrapper from 'screens/App/JoinEvents/JoinEventsWrapper';
import ConnectStackScreen from 'src/Navigator/AppStackScreens/ConnectStackScreen/ConnectStackScreen';

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

  const { user } = useUser();

  const isInvitedOnlyAdmin = user?.isInvitedOnlyAdmin;

  const initialRouteName = isInvitedOnlyAdmin ? chatPath : IOPath;

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
      initialRouteName={initialRouteName}>
      <Tab.Screen name={myEventsPath} component={MyEventsStackNavigation} />
      {!isInvitedOnlyAdmin && <Tab.Screen name={joinEventsPath} component={JoinEventsStackScreen} />}
      {!isInvitedOnlyAdmin && <Tab.Screen name={IOPath} component={IOStackNavigation} />}
      {!isInvitedOnlyAdmin && <Tab.Screen name={connectPath} component={ConnectStackScreen} />}
      <Tab.Screen name={chatPath} component={ChatStackScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
