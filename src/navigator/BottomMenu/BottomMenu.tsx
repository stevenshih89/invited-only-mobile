import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import components
import useStyles from 'navigator/BottomMenu/styles.ts';
import {IOStackNavigation, MyEventsStackNavigation, ChatStackScreen} from 'navigator/AppStackScreens/AppStackScreens.tsx';
import {whiteColor} from 'constants/colors.ts';
import {createStackNavigator} from '@react-navigation/stack';
import {
  IOPath,
  chatPath,
  joinEventsPathRequest,
  myEventsPath,
  myProfileViewPath,
  profileEditingPath,
  profilePath,
  requestsPath,
} from 'constants/pathLocations';
import Requests from 'screens/App/Requests/Requests';
import Header from 'components/Header/Header';
import {tabBarName, tabIcon} from 'navigator/TabBar/TabBar';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Edit from 'assets/images/icons/edit.svg';
import Profile from 'screens/App/Profile/Profile';
import MyProfileView from 'screens/App/Profile/screens/MyProfileView/MyProfileView';
import ProfileEditing from 'screens/App/Profile/screens/ProfileEditing/ProfileEditing';
import {TouchableOpacity} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import JoinEvents from 'screens/App/Requests/JoinEvents/JoinEvents';

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
      <RequestsStack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO-JE" />,
        }}
        name={joinEventsPathRequest}
        key={joinEventsPathRequest}
        component={JoinEvents}
      />
    </RequestsStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  const ProfileStack = createStackNavigator();
  const styles = useStyles();

  const navigation = useAppNavigation();

  const goToProfileEditing = (): void => {
    navigation.navigate(profileEditingPath as never);
  };

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
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={goToProfileEditing}>
              <Edit style={{marginHorizontal: 12, marginVertical: 10}} />
            </TouchableOpacity>
          ),
          headerTitle: 'User profile',
          headerShown: true,
        }}
      />
      <ProfileStack.Screen
        key={profileEditingPath}
        name={profileEditingPath}
        component={ProfileEditing}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Profile editing',
          headerShown: true,
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
