import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import components
import useStyles from 'navigator/BottomMenu/styles.ts';
import {IOStackNavigation, MyEventsStackNavigation, ChatStackScreen} from 'navigator/AppStackScreens/AppStackScreens.tsx';
import {whiteColor} from 'constants/colors.ts';
import {createStackNavigator} from '@react-navigation/stack';
import {IOPath, chatPath, myEventsPath, myProfileViewPath, profilePath, requestsPath} from 'constants/pathLocations';
import Requests from 'screens/App/Requests/Requests';
import Header from 'components/Header/Header';
import {tabBarName, tabIcon} from 'navigator/TabBar/TabBar';
import Profile from 'screens/App/Profile/Profile';
import MyProfileView from 'screens/App/Profile/screens/MyProfileView/MyProfileView';

const RequestsStackScreen = () => {
  const RequestsStack = createStackNavigator();

  return (
    <RequestsStack.Navigator initialRouteName={requestsPath}>
      <RequestsStack.Screen
        key={requestsPath}
        name={requestsPath}
        component={Requests}
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="request" />,
        }}
      />
    </RequestsStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  const ProfileStack = createStackNavigator();

  return (
    <ProfileStack.Navigator initialRouteName={profilePath}>
      <ProfileStack.Screen
        key={profilePath}
        name={profilePath}
        component={Profile}
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="profile" />,
        }}
      />
      <ProfileStack.Screen
        key={myProfileViewPath}
        name={myProfileViewPath}
        component={MyProfileView}
        options={{
          headerShown: true,
          // header: () => <Header badge={true} logoType="logo" headerType="profile" />,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const BottomMenu: FC = (): JSX.Element => {
  const styles = useStyles();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        headerTransparent: false,
        tabBarActiveTintColor: whiteColor,
        tabBarStyle: styles.tabNavigator,
        tabBarIcon: ({focused}: {focused: boolean}) => tabIcon(focused, route.name),
        tabBarLabel: ({focused}: {focused: boolean}) => tabBarName(focused, route.name),
      })}
      initialRouteName={IOPath}>
      <Tab.Screen name={profilePath} component={ProfileStackScreen} />
      <Tab.Screen name={requestsPath} component={RequestsStackScreen} />
      <Tab.Screen name={IOPath} component={IOStackNavigation} />
      <Tab.Screen name={myEventsPath} component={MyEventsStackNavigation} />
      <Tab.Screen name={chatPath} component={ChatStackScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
