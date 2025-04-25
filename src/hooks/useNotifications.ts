/* eslint-disable import/order */
import { useCallback, useState } from 'react';
import { useAppNavigation } from 'hooks/useAppNavigation';
import {
  chatCorrespondencePath,
  commonStackPath,
  eventActiveInfoPath,
  invitationCodePath,
  myEventsPath,
  requestsPath,
} from 'constants/pathLocations';
import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import { showToast } from 'helpers/showToast';
import { useFocusEffect } from '@react-navigation/native';
import useUser from 'hooks/user/useUser';

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

  const { user } = useUser();

  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';


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


  const handleClearNotifications = async () => {
    setNotifications([]);
    await clearNotifications(user?.uid ?? '');
    showToast('inviteMatch', 'Notifications have been read', 'Notifications', { status: 'success', ownerPhoto: user?.photos?.[0]?.image });
  };

  const handleNavigate = async (path: string, data: any) => {
    console.log('data', data);

    switch (path) {
      case 'invitationCode':
        navigation.navigate(commonStackPath, { screen: invitationCodePath });
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
          params: { list: data },
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
