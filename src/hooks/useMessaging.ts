/* eslint-disable no-console */
import { useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';

import useUser from './user/useUser';
import { showToast } from 'helpers/showToast';
import { useNavigationStore } from 'src/store/navigationStore';
import { BackendApiContext } from 'contexts/BackendApiContex';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const useMessaging = () => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { mutate: sendToken } = invitedOnlyBackendApi?.useMutation('post', '/auth/messaging/token') ?? { mutate: async () => { } };
  const { user } = useUser();
  const { isChatScreen } = useNavigationStore();

  const sendTokenToServer = async (token: string) => {
    console.log('Sending FCM token to server:', token);
    sendToken({
      body: {
        token: token,
        uid: user?.uid ?? '',
      },
    });
  };

  async function setupNotifications() {
    let enabled = false;
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log('iOS Authorization status:', authStatus);

        if (authStatus === messaging.AuthorizationStatus.DENIED) {
          return new Promise(resolve => {
            Alert.alert(
              'Notification Permission Required',
              'Please allow notifications to receive important updates. You can change this in your device settings.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => resolve(false),
                },
                {
                  text: 'Open Settings',
                  onPress: () => {
                    Linking.openSettings();
                    resolve(false);
                  },
                },
              ],
            );
          });
        }
      } else if (Platform.OS === 'android') {
        const alreadyGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (alreadyGranted) {
          enabled = true;
        } else {
          const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
          enabled = status === PermissionsAndroid.RESULTS.GRANTED;

          if (status === PermissionsAndroid.RESULTS.DENIED) {
            return new Promise(resolve => {
              Alert.alert(
                'Notification Permission Required',
                'Please allow notifications to receive important updates. You can change this in your device settings.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => resolve(false),
                  },
                  {
                    text: 'Open Settings',
                    onPress: () => {
                      Linking.openSettings();
                      resolve(false);
                    },
                  },
                ],
              );
            });
          }
        }
        console.log('Android Authorization status:', enabled ? 'Granted' : 'Denied');
      }

      if (enabled) {
        console.log('Notification permission granted.');
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        await sendTokenToServer(token);
        return true;
      } else {
        console.log('Notification permission denied.');
        return false;
      }
    } catch (error) {
      console.error('Error requesting permission or getting token:', error);
      return false;
    }
  }

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async message => {
      console.log('Message received:', message);

      const title = message.notification?.title ?? 'New Message';
      const body = message.notification?.body ?? '';

      let toastBody = body;
      let shouldShow = true;

      if (message.data) {
        const messageType = message.data.type as string | undefined;
        const chatId = message.data.chatId as string | undefined;

        console.log('messageType', messageType);
        console.log('chatId', chatId);
        if (messageType === 'newMessage' && chatId) {
          toastBody = `New message received`;

          if (isChatScreen) {
            shouldShow = false;
            console.log('[useMessaging] Chat screen active, hiding toast.');
          } else {
            toastBody = `New message in chat ${chatId}`;
            console.log('[useMessaging] Chat screen inactive, showing toast.');
          }
        }
      }

      if (shouldShow) {
        showToast('basic', toastBody, title);
      }
    });

    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(async newToken => {
      console.log('FCM Token refreshed:', newToken);
      await sendTokenToServer(newToken);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnTokenRefresh();
    };
  }, []);

  return {
    setupNotifications,
  };
};

export default useMessaging;
