import {useAppNavigation} from 'hooks/useAppNavigation';
import {
  chatCorrespondencePath,
  commonStackPath,
  eventActiveInfoPath,
  invitationCodePath,
  myEventsPath,
  requestsPath,
} from 'constants/pathLocations';
import {useCallback, useState} from 'react';
import {useUser} from 'src/store/userStore';
import Config from 'react-native-config';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast';
import {useFocusEffect} from '@react-navigation/native';
import {Timestamp} from '@firebase/firestore';

export interface Notifications {
  id: string;
  title: string;
  body: string;
  image: string;
  path?: string;
  data?: any;
  mark: string;
  createdAt: Timestamp;
  docId: string;
}

const DEFAULT_NOTIFICATIONS_LIMIT = 20;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const navigation = useAppNavigation();
  const [limitNotifications, setLimitNotifications] = useState<number>(DEFAULT_NOTIFICATIONS_LIMIT);
  const [loading, setLoading] = useState<boolean>(true);

  const user = useUser((i: any) => i?.user);

  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const fetchImage = async (uid: string): Promise<string> => {
    try {
      const dataDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      const photoUri = dataDoc?.data()?.photos?.[0]?.image || '';
      return photoUri;
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  const fetchNotifications = async (uid: string): Promise<Notifications[]> => {
    try {
      const notificationsQuery = await firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .collection('notifications')
        .limit(limitNotifications)
        .get();

      const notificationsWithImages = await Promise.all(
        notificationsQuery.docs.map(async doc => {
          const notification = doc.data() as Notifications;
          const photoUri = await fetchImage(notification.uid);
          return {
            ...notification,
            docId: doc.id,
            image: photoUri,
          };
        }),
      );
      return notificationsWithImages;
    } catch (error) {
      logErrorToSentry(error);
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
    return [];
  };

  const clearNotifications = async (uid: string): Promise<void> => {
    try {
      await firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .collection('notifications')
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            doc.ref.delete();
          });
        });
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  const getNotifications = async () => {
    const notification = await fetchNotifications(user?.uid ?? '');
    setNotifications(notification);
  };

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [limitNotifications]),
  );

  const handleClearNotifications = async () => {
    setNotifications([]);
    await clearNotifications(user?.uid);
    showToast('inviteMatch', 'Notifications have been read', 'Notifications', {status: 'success', ownerPhoto: user?.photos[0].image});
  };

  const handleNavigate = async (path: string, data: any) => {
    console.log('data', data);

    switch (path) {
      case 'invitationCode':
        navigation.navigate(commonStackPath, {screen: invitationCodePath});
        break;
      case 'requests':
        // @ts-ignore
        navigation.navigate(requestsPath, {
          screen: requestsPath,
        });
        break;
      case 'myEvents':
        // @ts-ignore
        navigation.navigate(myEventsPath, {
          screen: myEventsPath,
        });
        break;
      case 'guestsList':
        // @ts-ignore
        navigation.navigate(commonStackPath, {
          screen: eventActiveInfoPath,
          params: {list: data},
        } as never);
        break;
      case 'chat':
        // @ts-ignore
        navigation.navigate(chatCorrespondencePath, {
          screen: chatCorrespondencePath,
          params: data,
        });
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await firestore().collection(apiUserInfoCollection).doc(user?.uid).collection('notifications').doc(id).delete();
      setNotifications(notifications.filter(notification => notification.docId !== id));
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  return {
    loading,
    notifications,
    handleClearNotifications,
    setLimitNotifications,
    handleNavigate,
    handleDelete,
  };
};
