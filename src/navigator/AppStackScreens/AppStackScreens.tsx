import React, {FC, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//import components
import IO from 'screens/App/IO/IO.tsx';
import BottomMenu from 'navigator/BottomMenu/BottomMenu.tsx';
import Header from 'components/Header/Header.tsx';
import {
  accountRejectedPath,
  accountSettingPath,
  adminChatPath,
  bottomTabsStackPath,
  chatCorrespondencePath,
  chatPath,
  codeVerifiedPath,
  commonStackPath,
  contactAndFAQPath,
  demoEventCreatingPath,
  demoFlowStackPath,
  demoIntroPath,
  demoIOPath,
  earlyAccessPath,
  emailChangePath,
  eventActiveInfoPath,
  eventCreatingStackPath,
  eventEditingPath,
  eventInfoPath,
  invitationCodePath,
  IOPath,
  joinEventsPath,
  manageSubscriptionPath,
  markAttendancePath,
  myEventsPath,
  myProfileViewPath,
  notificationSettingPath,
  notificationsPath,
  notificationsStackPath,
  paymentPath,
  pendingScreenPath,
  phoneChangePath,
  privacyPath,
  securePrivacyPath,
  settingsPath,
  superInvitePayPath,
  userProfilePath,
  verifySocialProfilePath,
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
import AccountSetting from 'screens/App/Profile/screens/Settings/AccountSetting';
import PhoneChange from 'screens/App/Profile/screens/Settings/PhoneChange';
import NotificationSetting from 'screens/App/Profile/screens/Settings/NotificationSetting';
import ContactAndFAQ from 'screens/App/Profile/screens/Settings/ContactAndFAQ';
import SecurePrivacy from 'screens/App/Profile/screens/SecurePrivacy/SecurePrivacy.tsx';
import Payment from 'screens/Auth/Payment/Payment';
import ManageSubscription from 'screens/App/Profile/screens/ManageSubscription';
import SuperInvitePay from 'screens/App/IO/screens/SuperInvitePay/SuperInvitePay';
import VerifySocialProfile from 'screens/Auth/VerifySocialProfile';
import Privacy from 'screens/Auth/Privacy';
import EmailChange from 'screens/App/Profile/screens/Settings/EmailChange';
import EarlyAccess from 'screens/App/IO/screens/EarlyAccess/EarlyAccess';
import DemoIntro from 'screens/App/DemoFlow/screens/DemoIntro/DemoIntro.tsx';
import DemoEventCreatingHeader from 'screens/App/IO/screens/EventCreating/components/DemoEventCreatingHeader';
import MarkAttendance from 'screens/App/MyEvents/MarkAttendance';
import {useUser} from 'src/store/userStore';
import AdminChat from 'screens/App/Chat/screens/AdminChat';
import firestore from '@react-native-firebase/firestore';
import {UserInfo} from 'src/types/userInfo';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const CommonStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const EventCreatingStack = createStackNavigator();
const DemoFlowStack = createStackNavigator();

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
          header: () => <Header badge={true} logoType="logo" headerType="IO-JE" />,
        }}
        name={joinEventsPath}
        key={joinEventsPath}
        component={JoinEvents}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={superInvitePayPath}
        key={superInvitePayPath}
        component={SuperInvitePay}
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
        key={chatCorrespondencePath}
        name={chatCorrespondencePath}
        options={{headerShown: false}}
        component={ChatCorrespondence}
      />
      <CommonStack.Screen key={adminChatPath} name={adminChatPath} options={{headerShown: false}} component={AdminChat} />
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
        key={myProfileViewPath}
        name={myProfileViewPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'User profile',
          headerShown: true,
        }}
        component={MyProfileView}
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
      <CommonStack.Screen
        key={accountSettingPath}
        name={accountSettingPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Account setting',
          headerShown: true,
        }}
        component={AccountSetting}
      />
      <CommonStack.Screen
        key={securePrivacyPath}
        name={securePrivacyPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Secure & Privacy',
          headerShown: true,
        }}
        component={SecurePrivacy}
      />
      <CommonStack.Screen
        key={phoneChangePath}
        name={phoneChangePath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Phone number',
          headerShown: true,
        }}
        component={PhoneChange}
      />
      <CommonStack.Screen
        key={emailChangePath}
        name={emailChangePath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Email',
          headerShown: true,
        }}
        component={EmailChange}
      />
      <CommonStack.Screen
        key={notificationSettingPath}
        name={notificationSettingPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Notification setting',
          headerShown: true,
        }}
        component={NotificationSetting}
      />
      <CommonStack.Screen
        key={contactAndFAQPath}
        name={contactAndFAQPath}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Contact & FAQ',
          headerShown: true,
        }}
        component={ContactAndFAQ}
      />
      <CommonStack.Screen key={earlyAccessPath} name={earlyAccessPath} options={{headerShown: false}} component={EarlyAccess} />
      <CommonStack.Screen key={markAttendancePath} name={markAttendancePath} options={{headerShown: false}} component={MarkAttendance} />
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
          header: () => (
            <Header typeEvents={typeEvents} setTypeEvents={setTypeEvents} headerType="chat" showHeaderTop={true} logoType="logo" badge />
          ),
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
          <MyProfileView
            setModalVisible={setModalVisible}
            isModalVisible={isModalVisible}
            isShowEditButton={false}
            isShowInstagramPhotos={false}
          />
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

const PaymentStackScreen = () => {
  return (
    <EventCreatingStack.Navigator
      initialRouteName={paymentPath}
      screenOptions={{
        headerShown: false,
      }}>
      <EventCreatingStack.Screen key={paymentPath} name={paymentPath} component={Payment} />
    </EventCreatingStack.Navigator>
  );
};

const ManageSubscriptionScreen = () => {
  const styles = useStyles();

  return (
    <EventCreatingStack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
        headerBackTitleVisible: false,
        headerTitle: 'Manage Subscription',
        headerShown: true,
      }}
      initialRouteName={manageSubscriptionPath}>
      <EventCreatingStack.Screen key={manageSubscriptionPath} name={manageSubscriptionPath} component={ManageSubscription} />
    </EventCreatingStack.Navigator>
  );
};

const DemoFlowScreen = () => {
  return (
    <DemoFlowStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={demoIntroPath}>
      <DemoFlowStack.Screen name={demoIntroPath} key={demoIntroPath} component={DemoIntro} />
      <DemoFlowStack.Screen
        name={demoEventCreatingPath}
        key={demoEventCreatingPath}
        options={{
          headerShown: true,
          header: DemoEventCreatingHeader,
        }}
        component={EventCreating}
        initialParams={{isDemo: true}}
      />
      <DemoFlowStack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO" />,
        }}
        name={demoIOPath}
        key={demoIOPath}
        component={IO}
        initialParams={{isDemo: true}}
      />
    </DemoFlowStack.Navigator>
  );
};

const AppStackScreen = () => {
  const {user, setUser} = useUser();

  const initialRouteName =
    user?.uid && user?.accountType === 'host' && user?.accountConfirmed && user?.accountReviewed && !user?.isPassedDemo
      ? demoFlowStackPath
      : bottomTabsStackPath;

  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

  useEffect(() => {
    const currentUser = auth().currentUser;
    let userDataSubscriber: any;
    userDataSubscriber = firestore()
      .collection(apiUserInfoCollection)
      .doc(currentUser?.uid)
      .onSnapshot(doc => {
        const newUserData = doc.data() as UserInfo;
        if (JSON.stringify(user) !== JSON.stringify(newUserData)) {
          setUser(newUserData);
        }
      });

    return () => {
      console.warn('unmount');

      userDataSubscriber();
    };
  }, []);

  return (
    <AppStack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown: false}}>
      <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomTabsStackScreen} />
      <AppStack.Screen key={notificationsStackPath} name={notificationsStackPath} component={NotificationsStackScreen} />
      <AppStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={EventCreatingStackScreen} />
      <AppStack.Screen key={chatCorrespondencePath} name={chatCorrespondencePath} component={ChatCorrespondenceStackScreen} />
      <AppStack.Screen key={userProfilePath} name={userProfilePath} component={UserProfileStackScreen} />
      <AppStack.Screen key={commonStackPath} name={commonStackPath} component={CommonStackScreen} />
      <AppStack.Screen key={demoFlowStackPath} name={demoFlowStackPath} component={DemoFlowScreen} />
      <AppStack.Screen key={paymentPath} name={paymentPath} component={PaymentStackScreen} />
      <AppStack.Screen key={verifySocialProfilePath} name={verifySocialProfilePath} component={VerifySocialProfile} />
      <AppStack.Screen key={manageSubscriptionPath} name={manageSubscriptionPath} component={ManageSubscriptionScreen} />
      <AppStack.Screen key={privacyPath} name={privacyPath} component={Privacy} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
