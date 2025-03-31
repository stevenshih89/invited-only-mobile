import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showToast} from './showToast';
import functions from '@react-native-firebase/functions';
import Config from 'react-native-config';
import {logErrorToSentry} from './logErrorsToSentry';
import {FirebaseCollectionsResponse} from 'src/apiv2/queries/appSettingsQueries';

export const fcmHelper = async ({apiUserInfoCollection}: {apiUserInfoCollection: keyof FirebaseCollectionsResponse}) => {
  const userUid = auth().currentUser?.uid;

  try {
    const newToken = await messaging().getToken();

    try {
      await firestore().collection(apiUserInfoCollection).doc(userUid).update({
        fcmToken: newToken,
      });
    } catch (error) {
      console.error('error update token', error);
    }
    await AsyncStorage.setItem('fcmToken', JSON.stringify(newToken));

    return newToken;
  } catch (e) {
    console.error('error fcm token', e);
    logErrorToSentry(e);
  }
};

export const getFcmToken = async ({apiUserInfoCollection}: {apiUserInfoCollection: keyof FirebaseCollectionsResponse}) => {
  let token = null;
  await checkApplicationNotificationPermission({apiUserInfoCollection});
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
  } catch (error) {
    logErrorToSentry(error);
  }
  return token;
};

//method was called on  user register with firebase FCM for notification
export async function registerAppWithFCM() {
  // // console.log('registerAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log('registerDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.error('registerDeviceForRemoteMessages error ', error);
      });
  }
}

//method was called on un register the user from firebase for stoping receiving notifications
export async function unRegisterAppWithFCM() {
  // // console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);

  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .then(status => {
        console.log('unregisterDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.error('unregisterDeviceForRemoteMessages error ', error);
      });
  }
  await messaging().deleteToken();
  // // console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
}

export const checkApplicationNotificationPermission = async ({
  apiUserInfoCollection,
}: {
  apiUserInfoCollection: keyof FirebaseCollectionsResponse;
}) => {
  const authStatus = await messaging().requestPermission();

  // console.warn('Authorization status1:', authStatus);

  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await fcmHelper({apiUserInfoCollection});
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {
      console.log('POST_NOTIFICATIONS status:', result);
    })
    .catch(error => {
      console.error('POST_NOTIFICATIONS error ', error);
    });
};

//method was called to listener events from firebase for notification triger
export function registerListenerWithFCM() {
  // console.warn('registerListenerWithFCM');
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    // console.warn('onMessage Received : ', JSON.stringify(remoteMessage));
    if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
        () => {
          console.log('Not implemented?');
        },
        () => {
          console.log('Not implemented?');
        },
      );
    }
  });
  notifee.onForegroundEvent(({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        // console.log('User pressed notification', detail.notification);
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
        // console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      }
    });

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(
  title: string,
  body: string,
  data: any,
  setRejectVisible: () => void,
  setAcceptModalVisible: () => void,
) {
  try {
    let paramsParse = {};
    if (data.params && typeof data.params === 'string') {
      try {
        paramsParse = JSON.parse(data.params);
      } catch (error) {
        paramsParse = {};
      }
    }
    const path = paramsParse.path || null;

    showToast('inviteMatch', title, body, {status: data.status, ownerPhoto: data.image, path, params: paramsParse.data});
    if (title === 'Your Account is Not Approved') {
      setRejectVisible();
    }
    if (title === 'Your account has been approved') {
      setAcceptModalVisible();
    }
    // Request permissions (required for iOS)
    await notifee.requestPermission();
  } catch (error) {
    console.log('error onDisplayNotification', error);
  }
}

// it would be called when the app in foreground state
export function onMatchNotificationSubscription(
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => void,
  setRejectVisible: () => void,
  setAcceptModalVisible: () => void,
) {
  return messaging().onMessage(async remoteMessage => {
    // console.warn('onMessage Received : ', JSON.stringify(remoteMessage));

    // await notifee.requestPermission();
    if (remoteMessage.data?.type === 'match') {
      handler(remoteMessage);
    }
    onDisplayNotification(
      remoteMessage.notification?.title,
      remoteMessage.notification?.body,
      remoteMessage?.data,
      setRejectVisible,
      setAcceptModalVisible,
    );
  });
}

export const sendNotification = async (
  forUserUid: string,
  title: string,
  body: string,
  mark: string,
  status: string,
  userInfo: any,
  params?: any,
) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

  const isDevEnvironment = Config.API_USERINFO_COLLECTION === 'devUserInfo';

  const generateRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const getFcmTokenFromUser = async (uid: string) => {
    try {
      const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      return userInfoDoc.data()?.fcmToken;
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  const token = await getFcmTokenFromUser(forUserUid);

  const notificationData = {
    token: token,
    priority: 'high',
    notification: {
      title,
      body,
    },
    data: {
      status,
      image: userInfo?.photos[0].image,
    },
  };
  if (params) {
    notificationData.data.params = params;
  }

  if (!isDevEnvironment) {
    try {
      const result = await functions().httpsCallable('sendNotification')(notificationData);
      if (result.data.success) {
        console.warn('Notification sent successfully', result.data.data);
      } else {
        console.error('Error sending notification:', result.data.error);
      }
    } catch (error) {
      console.error('Error calling Firebase Function:', error);
    }
  }

  let paramsParse;
  if (typeof notificationData.data.params === 'string') {
    try {
      paramsParse = JSON.parse(notificationData.data.params);
    } catch (error) {
      console.error('error parsing params:', error);
      paramsParse = {};
    }
  } else {
    paramsParse = notificationData.data.params || {};
  }

  const id = generateRandomId(8);
  const notification = {
    id,
    title: title,
    body: body,
    mark: mark,
    uid: userInfo?.uid,
    path: paramsParse.path ? paramsParse.path : null,
    data: paramsParse.data ? paramsParse.data : null,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };
  // console.log('notification', notification);

  try {
    await firestore().collection(apiUserInfoCollection).doc(forUserUid).collection('notifications').add(notification);
  } catch (error) {
    console.error('error add notification', error);
    logErrorToSentry(error);
  }
};
