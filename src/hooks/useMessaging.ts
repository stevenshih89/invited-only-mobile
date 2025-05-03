/* eslint-disable no-console */
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform } from "react-native";
import useUser from "./user/useUser";
import invitedOnlyBackendApi from "src/api/backend-api";
import { showToast } from "helpers/showToast";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
});

const useMessaging = () => {
    const { mutate: sendToken } = invitedOnlyBackendApi.useMutation('post', '/auth/messaging/token')
    const { user } = useUser()
    const sendTokenToServer = async (token: string) => {
        console.log("Sending FCM token to server:", token);
        sendToken({
            body: {
                token: token,
                uid: user?.uid ?? ''
            }
        })
    };

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
            console.log('Foreground message received:', message);
            const title = message.notification?.title ?? 'New Message';
            const body = message.notification?.body ?? '';

            let toastBody = body;
            if (message.data) {
                const messageType = message.data.type;
                const chatId = message.data.chatId;

                if (messageType === 'newMessage' && chatId) {
                    toastBody = `New message in chat ${chatId}`;
                }
            }

            showToast('success', toastBody, title);
        });

        const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
            console.log('FCM Token refreshed:', newToken);
            await sendTokenToServer(newToken);
        });

        return () => {
            unsubscribeOnMessage();
            unsubscribeOnTokenRefresh();
        };
    }, []);

    return {
        setupNotifications
    };
};

export default useMessaging;