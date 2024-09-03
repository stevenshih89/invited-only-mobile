import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showToast} from './showToast';

export const fcmHelper = async () => {
  const userUid = auth().currentUser?.uid;

  try {
    // const oldToken = await messaging().getToken();
    // await messaging().deleteToken(String('422527028413'), '*');
    const newToken = await messaging().getToken();

    // if (oldToken === newToken) {
    //   console.log('not refresh');
    // } else {
    try {
      await firestore().collection('userInfo').doc(userUid).update({
        fcmToken: newToken,
      });
    } catch (error) {
      console.log('error update token', error);
    }
    await AsyncStorage.setItem('fcmToken', JSON.stringify(newToken));
    // }
    // console.log('frc token', newToken);
    return newToken;
    // const fcmToken = await messaging().getToken();
    // await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken));
    // console.log('fcmToken', fcmToken);
  } catch (e) {
    console.log('error fcm token', e);
  }
};

//method was called to get FCM tiken for notification
export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
    console.warn('getFcmToken-->', token);
  } catch (error) {
    console.log('getFcmToken Device Token error ', error);
  }
  return token;
};

//method was called on  user register with firebase FCM for notification
export async function registerAppWithFCM() {
  // console.log('registerAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log('registerDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('registerDeviceForRemoteMessages error ', error);
      });
  }
}

//method was called on un register the user from firebase for stoping receiving notifications
export async function unRegisterAppWithFCM() {
  // console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);

  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .then(status => {
        console.log('unregisterDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('unregisterDeviceForRemoteMessages error ', error);
      });
  }
  await messaging().deleteToken();
  // console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
}

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {
      // console.log('POST_NOTIFICATIONS status:', result);
    })
    .catch(error => {
      console.log('POST_NOTIFICATIONS error ', error);
    });
};

//method was called to listener events from firebase for notification triger
export function registerListenerWithFCM() {
  console.warn('registerListenerWithFCM');

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.warn('onMessage Received : ', JSON.stringify(remoteMessage));
    if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
      onDisplayNotification(remoteMessage.notification?.title, remoteMessage.notification?.body, remoteMessage?.data);
    }
  });
  notifee.onForegroundEvent(({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('onNotificationOpenedApp Received', JSON.stringify(remoteMessage));
    // if (remoteMessage?.data?.clickAction) {
    //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
    // }
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      }
    });

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification: ', data);
  showToast('inviteMatch', title, body, {status: data.status, ownerPhoto: data.image});
  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  // await notifee.displayNotification({
  //   title: title,
  //   body: body,
  //   data: data,
  //   android: {
  //     channelId,
  //     // pressAction is needed if you want the notification to open the app when pressed
  //     pressAction: {
  //       id: 'default',
  //     },
  //   },
  // });
}

// it would be called when the app in foreground state
export function onMatchNotificationSubscription(handler: (message: FirebaseMessagingTypes.RemoteMessage) => void) {
  return messaging().onMessage(async remoteMessage => {
    await notifee.requestPermission();

    if (remoteMessage.data?.type === 'match') {
      handler(remoteMessage);
    }
  });
}
