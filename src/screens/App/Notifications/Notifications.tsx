import React, { useEffect } from 'react';
import { components } from '@invited-only/invited-only-api';
import { FlatList } from 'react-native';
import * as S from './Notifications.style';

import useGetNotifications from './hooks/useGetNotifications';
import useDeleteNotification from './hooks/useDeleteNotification';
import NotificationItem from './Components/NotificationItem/NotificationItem';
import NotificationEmptyFallback from './Components/NotificationEmptyFallback/NotificationEmptyFallback';
import { useAuthStore } from 'src/store/authStore';

export type Notification = components['schemas']['Notification'] & {
  isJoinedEvents: boolean;
};

const Notifications = () => {
  const { markAllAsReadHandler, data: allNotifications } = useGetNotifications();
  const { userMetadata } = useAuthStore();

  const { handleDeleteNotification } = useDeleteNotification();

  const myEventsNotifications =
    allNotifications?.reduce((acc: Notification[], notification) => {
      if (notification?.hostId === userMetadata?.uid) {
        return [...acc, { ...notification, isJoinedEvents: false }];
      }
      return acc;
    }, []) || [];

  const joinedEventsNotifications =
    allNotifications?.reduce((acc: Notification[], notification) => {
      if (notification?.guestId === userMetadata?.uid) {
        return [...acc, { ...notification, isJoinedEvents: true }];
      }
      return acc;
    }, []) || [];


  const allNotificationsList = [...myEventsNotifications, ...joinedEventsNotifications].sort((a, b) => {
    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
  });

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationItem notification={item} isJoinedEvents={item.isJoinedEvents} handleDeleteNotification={handleDeleteNotification} />
  );

  useEffect(() => {
    markAllAsReadHandler();
  }, []);

  if (!allNotificationsList || allNotificationsList.length === 0) {
    return <NotificationEmptyFallback isJoinedEvents={false} />;
  }

  return (
    <S.Container>
      <FlatList data={allNotificationsList} renderItem={renderItem} keyExtractor={(item, index) => item.id || index.toString()} />
    </S.Container>
  );
};

export default Notifications;
