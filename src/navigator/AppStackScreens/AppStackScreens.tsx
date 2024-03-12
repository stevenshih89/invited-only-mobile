import React, {FC, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//import components
import IO from 'screens/App/IO/IO.tsx';
import BottomMenu from 'navigator/BottomMenu/BottomMenu.tsx';
import Header from 'components/Header/Header.tsx';
import {
  IOPath,
  accountRejectedPath,
  bottomTabsStackPath,
  codeVerifiedPath,
  commonStackPath,
  invitationCodePath,
  notificationsPath,
  notificationsStackPath,
  pendingScreenPath,
  eventCreatingStackPath,
  myEventsPath,
  chatPath,
  chatCorrespondencePath,
  joinEventsPath,
  myProfileViewPath,
  userProfilePath,
  eventInfoPath,
  eventActiveInfoPath,
  settingsPath,
  eventEditingPath,
} from 'constants/pathLocations.ts';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Notifications from 'screens/App/IO/screens/Notifications/Notifications.tsx';
import InvitationCode from 'screens/Auth/InvitationCode';
import PendingScreen from 'screens/Auth/AcceptedScreen/PendingScreen/PendingScreen';
import AccountRejected from 'screens/Auth/AcceptedScreen/AccountRejected/AccountRejected';
import CodeVerified from 'screens/Auth/AcceptedScreen/CodeVerified/CodeVerified';
import useStyles from 'navigator/AppStackScreens/styles.ts';
import EventCreating from 'screens/App/IO/screens/EventCreating/EventCreating.tsx';
import MyEvents from 'screens/App/MyEvents/MyEvents.tsx';
import Chat from 'screens/App/Chat/Chat.tsx';
import ChatCorrespondence from 'screens/App/Chat/screens/ChatCorrespondence/ChatCorrespondence.tsx';
import JoinEvents from 'screens/App/IO/screens/JoinEvents/JoinEvents.tsx';
import MyProfileView from 'screens/App/Profile/screens/MyProfileView/MyProfileView.tsx';
import {TouchableOpacity} from 'react-native';
import ThreeDotsIcon from 'assets/images/icons/more-white.svg';
import EventInfo from 'screens/App/Requests/EventInfo/EventInfo';
import EventActiveInfo from 'screens/App/Requests/EventActiveInfo/EventActiveInfo';
import Settings from 'screens/App/Profile/screens/Settings/Settings';

const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const CommonStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const EventCreatingStack = createStackNavigator();

export const IOStackNavigation: FC = () => {
  const styles = useStyles();

  return (
    <Stack.Navigator
      initialRouteName={IOPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
      }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO" />,
        }}
        name={IOPath}
        key={IOPath}
        component={IO}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO" />,
        }}
        name={joinEventsPath}
        key={joinEventsPath}
        component={JoinEvents}
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
          header: () => <Header logoType="logo" headerType="myEvents" />,
        }}
        name={myEventsPath}
        key={myEventsPath}
        component={MyEvents}
      />
    </Stack.Navigator>
  );
};

const BottomTabsStackScreen = () => <BottomMenu />;

const CommonStackScreen = () => {
  const styles = useStyles();
  return (
    <CommonStack.Navigator>
      <CommonStack.Screen key={invitationCodePath} name={invitationCodePath} options={{headerShown: false}} component={InvitationCode} />
      <CommonStack.Screen key={pendingScreenPath} name={pendingScreenPath} options={{headerShown: false}} component={PendingScreen} />
      <CommonStack.Screen key={accountRejectedPath} name={accountRejectedPath} options={{headerShown: false}} component={AccountRejected} />
      <CommonStack.Screen key={codeVerifiedPath} name={codeVerifiedPath} options={{headerShown: false}} component={CodeVerified} />
      <CommonStack.Screen
        key={eventInfoPath}
        name={eventInfoPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Event info',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7}>
              <ThreeDotsIcon style={{marginHorizontal: 20, marginVertical: 10}} />
            </TouchableOpacity>
          ),
        }}
        component={EventInfo}
      />
      <CommonStack.Screen
        key={eventActiveInfoPath}
        name={eventActiveInfoPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Event info',
          headerShown: true,
        }}
        component={EventActiveInfo}
      />
      <CommonStack.Screen
        key={settingsPath}
        name={settingsPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Settings',
          headerShown: true,
        }}
        component={Settings}
      />
      <CommonStack.Screen
        key={eventEditingPath}
        name={eventEditingPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Event editing',
          headerShown: true,
        }}
        component={EventCreating}
      />
    </CommonStack.Navigator>
  );
};

const NotificationsStackScreen = () => {
  const styles = useStyles();

  return (
    <NotificationsStack.Navigator
      initialRouteName={notificationsPath}
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
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
      initialRouteName={myEventsPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
      }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header typeEvents={typeEvents} setTypeEvents={setTypeEvents} headerType="chat" showHeaderTop={false} />,
        }}
        name={chatPath}
        key={chatPath}>
        {() => <Chat typeEvents={typeEvents} />}
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
        headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
        headerBackTitleVisible: false,
        headerTitle: 'Create new event',
        headerShown: true,
      }}>
      <EventCreatingStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={EventCreating} />
    </EventCreatingStack.Navigator>
  );
};

const ChatCorrespondenceStackScreen = () => {
  return (
    <EventCreatingStack.Navigator
      initialRouteName={chatCorrespondencePath}
      screenOptions={{
        headerShown: false,
      }}>
      <EventCreatingStack.Screen key={chatCorrespondencePath} name={chatCorrespondencePath} component={ChatCorrespondence} />
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
        component={() => (
          <MyProfileView setModalVisible={setModalVisible} isModalVisible={isModalVisible} isShowEditButton={false} isShowInstagramPhotos={false} />
        )}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7}>
              <ThreeDotsIcon style={{marginHorizontal: 20, marginVertical: 10}} />
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
    <AppStack.Navigator initialRouteName={bottomTabsStackPath} screenOptions={{headerShown: false}}>
      <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomTabsStackScreen} />
      <AppStack.Screen key={notificationsStackPath} name={notificationsStackPath} component={NotificationsStackScreen} />
      <AppStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={EventCreatingStackScreen} />
      <AppStack.Screen key={chatCorrespondencePath} name={chatCorrespondencePath} component={ChatCorrespondenceStackScreen} />
      <AppStack.Screen key={userProfilePath} name={userProfilePath} component={UserProfileStackScreen} />
      <AppStack.Screen key={commonStackPath} name={commonStackPath} component={CommonStackScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
