import React, { FC, useState } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';

import NotificationsStackScreen from './NotificationsStackScreen/NotificationsStackScreen';
import EventRequearHeader from './RequestStackScreen/EventRequearHeader/EventRequearHeader';
import { ProfileStackScreen } from './ProfileStackScreen/ProfileStackScreen';
import DeleteButton from './components/DeleteButton';
import BottomMenu from 'navigator/BottomMenu/BottomMenu';

//import components
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
  manageEventPath,
  myEventsPath,
  myProfileViewPath,
  paymentPath,
  privacyPath,
  profileStackPath,
  shareSocialLinkPath,
  userProfilePath,
  chatWindowPath,
  notificationsStackPath
} from 'constants/pathLocations.ts';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import useStyles from 'navigator/AppStackScreens/styles.ts';
import MyProfileView from 'screens/App/Profile/screens/MyProfileView/MyProfileView.tsx';
import ThreeDotsIcon from 'assets/images/icons/more-white.svg';
import Privacy from 'screens/Auth/Privacy/Privacy.tsx';
import CreateEventFlow from 'screens/App/Flows/CreateEventFlow/CreateEventFlow.tsx';
import IOWrapper from 'screens/App/IO/IOWrapper.tsx';
import JoinEventsWrapper from 'screens/App/JoinEvents/JoinEventsWrapper.tsx';
import Events from 'screens/App/MyEvents/Events.tsx';
import Connect from 'screens/App/Connect/Connect.tsx';
import { blackColor, whiteColor } from 'constants/colors.ts';
import Chat from 'screens/App/Chat/Chat';
import ShareSocialLink from 'screens/App/InvitationCode/screens/ShareSocialLink/ShareSocialLink';
import InvitationCode from 'screens/App/InvitationCode/InvitationCode';
import useUser from 'hooks/user/useUser';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import { useAuthStore } from 'src/store/authStore';
import { ManageEvent } from 'screens/App/MyEvents/Components/ManageEvent/ManageEvent';
import Payment from 'screens/App/Payment/Payment';
import { ChatWindow } from 'screens/App/Chat/ChatWindow/ChatWindow';
import { useAppNavigation, useRoute } from 'hooks/useAppNavigation';
import { EventRequestsWrapper } from 'screens/App/MyEvents/Components/EventRequests/EventRequestsWrapper';
import { RootStackParamList } from 'src/typescript/types';

const Stack = createStackNavigator();
const AppStack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header logoType="logo" headerType="myEvents" badge />,
        }}
        name={manageEventPath}
        key={manageEventPath}
        component={ManageEvent}
      />
    </Stack.Navigator>
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

export const DeleteModalContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined);

const EventCreatingStackScreen = ({ route }: { route: any }) => {
  const styles = useStyles();
  const isEditing = route.params?.isEditing;
  const modalState = useState<boolean>(false);
  return (
    <DeleteModalContext.Provider value={modalState}>
      <EventCreatingStack.Navigator
        initialRouteName={eventCreatingStackPath}
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerBackImage: () => <ArrowLeft style={{ marginHorizontal: 12, marginVertical: 10 }} />,
          headerBackTitleVisible: false,
          headerTitle: isEditing ? 'Edit Event' : 'Create new event',
          headerShown: true,
          ...(isEditing && {
            headerRight: () => <DeleteButton />
          }),
          ...screenOptions,
        }}>
        <EventCreatingStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={CreateEventFlow} initialParams={{ isEditing: route.params?.isEditing, event: route.params?.event }} />
      </EventCreatingStack.Navigator>
    </DeleteModalContext.Provider>
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
  const { userMetadata } = useAuthStore();
  const { user, isLoading } = useUser();
  const navigation = useAppNavigation();

  if (isLoading) {
    return <AppLoader />;
  }
  const initialRouteName = userMetadata?.firstLogin && !user?.accountConfirmed ? invitationCodePath : bottomTabsStackPath;

  const eventRequestsScreenOptions: StackNavigationOptions = {
    headerShown: true,
    cardStyle: { backgroundColor: blackColor },
    headerStyle: { backgroundColor: blackColor },
    headerTitle: 'Requests',
    headerTitleStyle: { color: whiteColor },
    headerBackTitleStyle: { color: whiteColor },
    headerTintColor: whiteColor,
    header: () => <EventRequearHeader title="Requests" onBackPress={() => navigation.goBack()} />,
  };

  return (
    <AppStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false, cardOverlayEnabled: true, ...screenOptions, cardStyle: { backgroundColor: blackColor } }}>
      <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomMenu} />
      <AppStack.Screen key={profileStackPath} name={profileStackPath} component={ProfileStackScreen} />
      <AppStack.Screen key={shareSocialLinkPath} name={shareSocialLinkPath} component={ShareSocialLink} />
      <AppStack.Screen
        key={eventRequestStackPath}
        name={eventRequestStackPath}
        component={EventRequestsWrapper}
        options={eventRequestsScreenOptions}
      />
      <AppStack.Screen key={eventCreatingStackPath} name={eventCreatingStackPath} component={EventCreatingStackScreen} />
      <AppStack.Screen key={paymentPath} name={paymentPath} component={Payment} />
      <AppStack.Screen
        key={userProfilePath}
        name={userProfilePath}
        component={UserProfileStackScreen}
      />
      <AppStack.Screen key={connectPath} name={connectPath} component={Connect} />
      <AppStack.Screen key={privacyPath} name={privacyPath} component={Privacy} />
      <AppStack.Screen key={invitationCodePath} name={invitationCodePath} component={InvitationCode} />
      <AppStack.Screen key={notificationsStackPath} name={notificationsStackPath} component={NotificationsStackScreen} />
      <AppStack.Screen key={chatWindowPath} name={chatWindowPath} component={ChatWindow} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
