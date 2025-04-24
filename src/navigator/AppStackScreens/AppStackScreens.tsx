import React, { FC, useState } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

//import components
import { TouchableOpacity } from 'react-native';
import EventRequestsStackScreen from './RequestStackScreen/RequestStackScreen';
import { ProfileStackScreen } from './ProfileStackScreen/ProfileStackScreen';
import BottomMenu from 'src/Navigator/BottomMenu/BottomMenu';
import Header from 'components/Header/Header.tsx';
import {
  bottomTabsStackPath,
  chatCorrespondencePath,
  chatPath,
  connectPath,
  eventCreatingStackPath,
  eventRequestStackPath,
  invitationCodePath,
  IOPath,
  joinEventsPath,
  myEventsPath,
  myProfileViewPath,
  notificationsPath,
  notificationsStackPath,
  privacyPath,
  profileStackPath,

  userProfilePath,
} from 'constants/pathLocations.ts';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Notifications from 'screens/App/IO/screens/Notifications/Notifications.tsx';
import InvitationCode from 'screens/Auth/InvitationCode/InvitationCode.tsx';
import useStyles from 'src/Navigator/AppStackScreens/styles.ts';
import MyProfileView from 'screens/App/Profile/screens/MyProfileView/MyProfileView.tsx';
import ThreeDotsIcon from 'assets/images/icons/more-white.svg';
import Privacy from 'screens/Auth/Privacy/Privacy.tsx';
import CreateEventFlow from 'screens/App/Flows/CreateEventFlow/CreateEventFlow.tsx';
import IOWrapper from 'screens/App/IO/IOWrapper.tsx';
import JoinEventsWrapper from 'screens/App/JoinEvents/JoinEventsWrapper.tsx';
import Events from 'screens/App/MyEvents/Events.tsx';
import Connect from 'screens/App/Connect/Connect.tsx';
import { blackColor } from 'constants/colors.ts';
import Chat from 'screens/App/Chat/Chat';

const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const EventCreatingStack = createStackNavigator();

const screenOptions = {
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: blackColor },
} as StackNavigationOptions;

export const IOStackNavigation: FC = () => {
  const styles = useStyles();

  return (
    <Stack.Navigator
      initialRouteName={IOPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
        ...screenOptions,
      }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO" />,
        }}
        name={IOPath}
        key={IOPath}
        component={IOWrapper}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO-JE" />,
        }}
        name={joinEventsPath}
        key={joinEventsPath}
        component={JoinEventsWrapper}
      />
    </Stack.Navigator>
  );
};

export const MyEventsStackNavigation: FC = () => {
  const styles = useStyles();
  return (
    <Stack.Navigator
      initialRouteName={myEventsPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
      }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header logoType="logo" headerType="myEvents" badge />,
        }}
        name={myEventsPath}
        key={myEventsPath}
        component={Events}
      />
    </Stack.Navigator>
  );
};

const BottomTabsStackScreen = () => <BottomMenu />;



const NotificationsStackScreen = () => {
  const styles = useStyles();

  return (
    <NotificationsStack.Navigator
      initialRouteName={notificationsPath}
      screenOptions={{
        backgroundColor: blackColor,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackImage: () => <ArrowLeft style={{ marginHorizontal: 12, marginVertical: 10 }} />,
        headerBackTitleVisible: false,
        headerTitle: 'Notifications',
        headerShown: true,
      }}>
      <NotificationsStack.Screen key={notificationsPath} name={notificationsPath} component={Notifications} />
    </NotificationsStack.Navigator>
  );
};

export const ChatStackScreen = () => {
  const [typeEvents, setTypeEvents] = useState<boolean>(false);

  const styles = useStyles();
  return (
    <Stack.Navigator
      initialRouteName={chatPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
      }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Header typeEvents={typeEvents} setTypeEvents={setTypeEvents} headerType="chat" showHeaderTop={true} logoType="logo" badge />
          ),
        }}
        name={chatPath}
        key={chatPath}>
        {() => <Chat />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const EventCreatingStackScreen = () => {
  const styles = useStyles();

  return (
    <EventCreatingStack.Navigator
      initialRouteName={eventCreatingStackPath}
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackImage: () => <ArrowLeft style={{ marginHorizontal: 12, marginVertical: 10 }} />,
        headerBackTitleVisible: false,
        headerTitle: 'Create new event',
        headerShown: true,
        ...screenOptions,
      }}>
      <EventCreatingStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={CreateEventFlow} />
    </EventCreatingStack.Navigator>
  );
};



const UserProfileStackScreen = () => {
  const styles = useStyles();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <EventCreatingStack.Navigator
      initialRouteName={chatCorrespondencePath}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        key={myProfileViewPath}
        name={myProfileViewPath}
        component={() => <MyProfileView setModalVisible={setModalVisible} isModalVisible={isModalVisible} />}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{ marginHorizontal: 12, marginVertical: 10 }} />,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7}>
              <ThreeDotsIcon style={{ marginHorizontal: 20, marginVertical: 10 }} />
            </TouchableOpacity>
          ),
          headerTitle: 'User profile',
          headerShown: true,
        }}
      />
    </EventCreatingStack.Navigator>
  );
};

const AppStackScreen = () => {

  return (
    <AppStack.Navigator
      initialRouteName={bottomTabsStackPath}
      screenOptions={{ headerShown: false, cardOverlayEnabled: true, ...screenOptions, cardStyle: { backgroundColor: blackColor } }}>
      <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomTabsStackScreen} />
      <AppStack.Screen
        key={notificationsStackPath}
        name={notificationsStackPath}
        component={NotificationsStackScreen}
        screenOptions={screenOptions}
      />
      <AppStack.Screen key={profileStackPath} name={profileStackPath} component={ProfileStackScreen} />
      <AppStack.Screen key={invitationCodePath} name={invitationCodePath} component={InvitationCode} />
      <AppStack.Screen key={eventRequestStackPath} name={eventRequestStackPath} component={EventRequestsStackScreen} />
      <AppStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={EventCreatingStackScreen} />
      <AppStack.Screen key={userProfilePath} name={userProfilePath} component={UserProfileStackScreen} screenOptions={{ cardStyle: { backgroundColor: blackColor } }} />
      <AppStack.Screen key={connectPath} name={connectPath} component={Connect} />
      <AppStack.Screen key={privacyPath} name={privacyPath} component={Privacy} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
