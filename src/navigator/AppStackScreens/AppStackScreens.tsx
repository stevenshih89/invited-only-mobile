import React, {useState} from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import NotificationsStackScreen from './NotificationsStackScreen/NotificationsStackScreen';
import EventRequearHeader from './RequestStackScreen/EventRequearHeader/EventRequearHeader';
import {ProfileStackScreen} from './ProfileStackScreen/ProfileStackScreen';
import DeleteButton from './components/DeleteButton';
import BottomMenu from 'navigator/BottomMenu/BottomMenu';

//import components
import {
    bottomTabsStackPath,
    connectPath,
    eventCreatingStackPath,
    eventRequestStackPath,
    invitationCodePath,
    paymentPath,
    privacyPath,
    profileStackPath,
    shareSocialLinkPath,
    chatWindowPath,
    notificationsStackPath,
    userProfilePreviewPath,
    eventProfilePreviewPath,
    valuesAndGuidelinesPath,
    acceptedUserPath,
} from 'constants/pathLocations.ts';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Privacy from 'screens/Auth/Privacy/Privacy.tsx';
import CreateEventFlow from 'screens/App/Flows/CreateEventFlow/CreateEventFlow.tsx';
import Connect from 'screens/App/Connect/Connect.tsx';
import {blackColor, whiteColor} from 'constants/colors.ts';
import ShareSocialLink from 'screens/App/InvitationCode/screens/ShareSocialLink/ShareSocialLink';
import InvitationCode from 'screens/App/InvitationCode/InvitationCode';
import useUser from 'hooks/user/useUser';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import {useAuthStore} from 'src/store/authStore';
import Payment from 'screens/App/Payment/Payment';
import {ChatWindow} from 'screens/App/Chat/ChatWindow/ChatWindow';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {EventRequestsWrapper} from 'screens/App/MyEvents/Components/EventRequests/EventRequestsWrapper';
import {RootStackParamList} from 'src/typescript/types';
import HeaderBackButton from 'navigator/Components/HeaderBackButton/HeaderBackButton';
import {Satoshi400} from 'constants/fonts';
import UserProfilePreview from 'screens/App/UserProfilePreview/UserProfilePreview';
import EventProfilePreview from 'screens/App/EventProfilePreview/EventProfilePreview';
import WelcomeScreen from 'screens/Auth/WelcomeScreen/WelcomeScreen';
import AcceptedUser from 'screens/App/AcceptedUser/AcceptedUser';
import {selectIsApprovedUserScreenShowed, useFirstTimeShowStore} from 'src/store/firstTimeShowStore';

const AppStack = createStackNavigator<RootStackParamList>();

const EventCreatingStack = createStackNavigator();

const screenOptions = {
    cardOverlayEnabled: true,
    cardStyle: {backgroundColor: blackColor},
    gestureEnabled: false,
} as StackNavigationOptions;

export const DeleteModalContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined);

const EventCreatingStackScreen = ({route}: {route: any}) => {
    const isEditing = route.params?.isEditing;
    const modalState = useState<boolean>(false);
    return (
        <DeleteModalContext.Provider value={modalState}>
            <EventCreatingStack.Navigator
                initialRouteName={eventCreatingStackPath}
                screenOptions={{
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
                    headerBackTitleVisible: false,
                    headerTitle: isEditing ? 'Edit Event' : 'Share Event/Table',
                    headerShown: true,
                    ...(isEditing && {
                        headerRight: () => <DeleteButton />,
                    }),
                    ...screenOptions,
                }}>
                <EventCreatingStack.Screen
                    key={eventCreatingStackPath}
                    name={eventCreatingStackPath}
                    component={CreateEventFlow}
                    initialParams={{isEditing: route.params?.isEditing, event: route.params?.event}}
                />
            </EventCreatingStack.Navigator>
        </DeleteModalContext.Provider>
    );
};

const AppStackScreen = () => {
    const {userMetadata} = useAuthStore();
    const {user, isLoading} = useUser();
    const navigation = useAppNavigation();
    const isApprovedUserScreenShowed = useFirstTimeShowStore(selectIsApprovedUserScreenShowed);

    console.log('isApprovedUserScreenShowed', isApprovedUserScreenShowed);
    if (isLoading) {
        return <AppLoader />;
    }

    const getInitialRoutePath = () => {
        if (user?.accountConfirmed && !isApprovedUserScreenShowed) {
            return acceptedUserPath;
        }
        if (userMetadata?.firstLogin && !user?.accountConfirmed && !user?.accountReviewed) {
            return invitationCodePath;
        }
        return bottomTabsStackPath;
    };

    const initialRoutePath = getInitialRoutePath();

    const eventRequestsScreenOptions: StackNavigationOptions = {
        headerShown: true,
        cardStyle: {backgroundColor: blackColor},
        headerStyle: {backgroundColor: blackColor},
        headerTitle: 'Requests',
        headerTitleStyle: {color: whiteColor},
        headerBackTitleStyle: {color: whiteColor},
        headerTintColor: whiteColor,
        header: () => <EventRequearHeader title="Requests" onBackPress={() => navigation.goBack()} />,
    };

    return (
        <AppStack.Navigator
            initialRouteName={initialRoutePath}
            screenOptions={{headerShown: false, cardOverlayEnabled: true, ...screenOptions, cardStyle: {backgroundColor: blackColor}}}>
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
            <AppStack.Screen key={connectPath} name={connectPath} component={Connect} />
            <AppStack.Screen key={privacyPath} name={privacyPath} component={Privacy} />
            <AppStack.Screen key={valuesAndGuidelinesPath} name={valuesAndGuidelinesPath} component={WelcomeScreen} />
            <AppStack.Screen key={invitationCodePath} name={invitationCodePath} component={InvitationCode} />
            <AppStack.Screen key={notificationsStackPath} name={notificationsStackPath} component={NotificationsStackScreen} />
            <AppStack.Screen key={chatWindowPath} name={chatWindowPath} component={ChatWindow} />
            <AppStack.Screen
                key={userProfilePreviewPath}
                name={userProfilePreviewPath}
                component={UserProfilePreview}
                options={{
                    headerTitle: 'Profile',
                    headerShown: true,
                    headerBackImage: () => <HeaderBackButton />,
                    headerBackTitleVisible: false,
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.headerTitleStyle,
                }}
            />
            <AppStack.Screen
                key={eventProfilePreviewPath}
                name={eventProfilePreviewPath}
                component={EventProfilePreview}
                options={{
                    headerTitle: 'Event',
                    headerShown: true,
                    headerBackImage: () => <HeaderBackButton />,
                    headerBackTitleVisible: false,
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.headerTitleStyle,
                }}
            />
            <AppStack.Screen key={acceptedUserPath} name={acceptedUserPath} component={AcceptedUser} />
        </AppStack.Navigator>
    );
};

export default AppStackScreen;

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: blackColor,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    headerTitleStyle: {
        color: whiteColor,
        fontFamily: Satoshi400,
        fontSize: RFValue(24, 812),
    },
});
