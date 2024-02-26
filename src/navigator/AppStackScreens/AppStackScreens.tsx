import {FC} from 'react';
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
          header: () => <Header headerType="IO" />,
        }}
        name={IOPath}
        key={IOPath}
        component={IO}
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
          header: () => <Header headerType="myEvents" />,
        }}
        name={myEventsPath}
        key={myEventsPath}
        component={MyEvents}
      />
    </Stack.Navigator>
  );
};

const BottomTabsStackScreen = () => <BottomMenu />;

const CommonStackScreen = () => (
  <CommonStack.Navigator>
    <CommonStack.Screen key={invitationCodePath} name={invitationCodePath} options={{headerShown: false}} component={InvitationCode} />
    <CommonStack.Screen key={pendingScreenPath} name={pendingScreenPath} options={{headerShown: false}} component={PendingScreen} />
    <CommonStack.Screen key={accountRejectedPath} name={accountRejectedPath} options={{headerShown: false}} component={AccountRejected} />
    <CommonStack.Screen key={codeVerifiedPath} name={codeVerifiedPath} options={{headerShown: false}} component={CodeVerified} />
  </CommonStack.Navigator>
);

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

const AppStackScreen = () => {
  return (
    <AppStack.Navigator initialRouteName={bottomTabsStackPath} screenOptions={{headerShown: false}}>
      <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomTabsStackScreen} />
      <AppStack.Screen key={notificationsStackPath} name={notificationsStackPath} component={NotificationsStackScreen} />
      <AppStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={EventCreatingStackScreen} />
      <AppStack.Screen key={commonStackPath} name={commonStackPath} component={CommonStackScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
