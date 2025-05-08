/* eslint-disable no-console */
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform } from "react-native";
import { useNavigationState } from "@react-navigation/native";

import useUser from "./user/useUser";
import invitedOnlyBackendApi from "src/api/backend-api";
import { showToast } from "helpers/showToast";
import useGetNotifications from "screens/App/Notifications/hooks/useGetNotifications";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
});

const useMessaging = () => {
    const { mutate: sendToken } = invitedOnlyBackendApi.useMutation('post', '/auth/messaging/token')
    const { user } = useUser()
    const { refetch } = useGetNotifications();

    const getCurrentRouteName = (state: any): string | undefined => {
        if (!state) return undefined;
        const route = state.routes[state.index];
        if (route.state) {
            return getCurrentRouteName(route.state);
        }
        return route.name;
    };

    const sendTokenToServer = async (token: string) => {
        console.log("Sending FCM token to server:", token);
        sendToken({
            body: {
                token: token,
                uid: user?.uid ?? ''
            }
        })
    };

    const navigationState = useNavigationState(state => state);

    async function setupNotifications() {
        let enabled = false;
        try {
            if (Platform.OS === 'ios') {
                const authStatus = await messaging().requestPermission();
                enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                console.log('iOS Authorization status:', authStatus);
            } else if (Platform.OS === 'android') {
                const alreadyGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                if (alreadyGranted) {
                    enabled = true;
                } else {
                    const status = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    );
                    enabled = status === PermissionsAndroid.RESULTS.GRANTED;
                }
                console.log('Android Authorization status:', enabled ? 'Granted' : 'Denied');
            }

            if (enabled) {
                console.log('Notification permission granted.');
                const token = await messaging().getToken();
                console.log('FCM Token:', token);
                await sendTokenToServer(token);
            } else {
                console.log('Notification permission denied.');
            }
        } catch (error) {
            console.error("Error requesting permission or getting token:", error);
        }
    }

    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async (message) => {
            refetch();
            console.log('Message received:', message);

            const currentRouteName = getCurrentRouteName(navigationState);
            console.log('[useMessaging onMessage] Current Route Name:', currentRouteName);

            const title = message.notification?.title ?? 'New Message';
            const body = message.notification?.body ?? '';

            let toastBody = body;
            let shouldShow = true;

            if (message.data) {
                const messageType = message.data.type as string | undefined;
                const chatId = message.data.chatId as string | undefined;

                if (messageType === 'newMessage' && chatId) {
                    toastBody = `New message received`;
                    const isChatScreenActive = currentRouteName?.toLowerCase().includes('chat');

                    if (isChatScreenActive) {
                        shouldShow = false;
                        console.log('[useMessaging] Chat screen active, hiding toast.');
                    } else {
                        toastBody = `New message in chat ${chatId}`;
                        console.log('[useMessaging] Chat screen inactive, showing toast.');
                    }
                }
            }

            if (shouldShow) {
                showToast('success', toastBody, title);
            }
        });

        const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
            console.log('FCM Token refreshed:', newToken);
            await sendTokenToServer(newToken);
        });

        return () => {
            unsubscribeOnMessage();
            unsubscribeOnTokenRefresh();
        };
    }, [navigationState]);

    return {
        setupNotifications
    };
};

export default useMessaging;