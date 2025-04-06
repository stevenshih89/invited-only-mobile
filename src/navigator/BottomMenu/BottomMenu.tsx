import React, {FC, JSX} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import components
import useStyles from 'navigator/BottomMenu/styles.ts';
import {IOStackNavigation, MyEventsStackNavigation, ChatStackScreen} from 'navigator/AppStackScreens/AppStackScreens.tsx';
import {whiteColor} from 'constants/colors.ts';
import {createStackNavigator} from '@react-navigation/stack';
import {
  IOPath,
  chatPath,
  connectPath,
  joinEventsPath,
  myEventsPath,
  myProfileViewPath,
  profileEditingPath,
  profilePath,
} from 'constants/pathLocations';

import Header from 'components/Header/Header';
import {TabBarName, TabIcon} from 'navigator/TabBar/TabBar';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Edit from 'assets/images/icons/edit.svg';
import Profile from 'screens/App/Profile/Profile';
import MyProfileView from 'screens/App/Profile/screens/MyProfileView/MyProfileView';
import ProfileEditing from 'screens/App/Profile/screens/ProfileEditing/ProfileEditing';
import {TouchableOpacity} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation';

import {useUser} from 'src/store/userStore';
import JoinEventsWrapper from 'screens/App/JoinEvents/JoinEventsWrapper';
import ConnectStackScreen from 'navigator/AppStackScreens/ConnectStackScreen/ConnectStackScreen';

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

  const {user} = useUser();

  const isInvitedOnlyAdmin = user?.isInvitedOnlyAdmin;

  const initialRouteName = isInvitedOnlyAdmin ? chatPath : IOPath;

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
