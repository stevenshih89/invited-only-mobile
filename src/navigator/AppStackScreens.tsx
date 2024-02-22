import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//import components
import IO from 'screens/App/IO/IO.tsx';
import BottomMenu from 'navigator/BottomMenu/BottomMenu.tsx';
import {backgroundColor, blackColor, whiteColor} from 'constants/colors.ts';
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
} from 'constants/pathLocations.ts';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Notifications from 'screens/App/Notifications/Notifications';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import InvitationCode from 'screens/Auth/InvitationCode';
import PendingScreen from 'screens/Auth/AcceptedScreen/PendingScreen/PendingScreen';
import AccountRejected from 'screens/Auth/AcceptedScreen/AccountRejected/AccountRejected';
import CodeVerified from 'screens/Auth/AcceptedScreen/CodeVerified/CodeVerified';

const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const CommonStack = createStackNavigator();
const NotificationsStack = createStackNavigator();

export const IOStackNavigation: FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: true,
      headerTransparent: false,
      headerStyle: {
        backgroundColor: blackColor,
        shadowOffset: {
          height: 0,
          width: 0,
        },
      },
    }}>
    <Stack.Screen
      options={{
        headerShown: true,
        header: () => <Header />,
      }}
      name={IOPath}
      key={IOPath}
      component={IO}
    />
  </Stack.Navigator>
);

const BottomTabsStackScreen = () => <BottomMenu />;

const CommonStackScreen = () => (
  <CommonStack.Navigator>
    <CommonStack.Screen key={invitationCodePath} name={invitationCodePath} options={{headerShown: false}} component={InvitationCode} />
    <CommonStack.Screen key={pendingScreenPath} name={pendingScreenPath} options={{headerShown: false}} component={PendingScreen} />
    <CommonStack.Screen key={accountRejectedPath} name={accountRejectedPath} options={{headerShown: false}} component={AccountRejected} />
    <CommonStack.Screen key={codeVerifiedPath} name={codeVerifiedPath} options={{headerShown: false}} component={CodeVerified} />
  </CommonStack.Navigator>
);

const NotificationsStackScreen = () => (
  <NotificationsStack.Navigator
    initialRouteName={notificationsPath}
    screenOptions={{
      headerStyle: {
        backgroundColor: backgroundColor,
        shadowOffset: {
          height: 0,
          width: 0,
        },
      },
      headerTitleStyle: {
        fontFamily: Satoshi400,
        fontSize: RFValue(24, 812),
        color: whiteColor,
      },
      headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
      headerBackTitleVisible: false,
      headerTitle: 'Notifications',
      headerShown: true,
    }}>
    <NotificationsStack.Screen key={notificationsPath} name={notificationsPath} component={Notifications} />
  </NotificationsStack.Navigator>
);

const AppStackScreen = () => {
  return (
    <AppStack.Navigator initialRouteName={bottomTabsStackPath} screenOptions={{headerShown: false}}>
      <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomTabsStackScreen} />
      <AppStack.Screen key={notificationsStackPath} name={notificationsStackPath} component={NotificationsStackScreen} />
      <AppStack.Screen key={commonStackPath} name={commonStackPath} component={CommonStackScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
