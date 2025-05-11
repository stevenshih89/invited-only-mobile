import React from 'react';
import { FlatList } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import NotificationItem from '../NotificationItem/NotificationItem';
import useDeleteNotification from '../../hooks/useDeleteNotification';
import useGetNotifications from '../../hooks/useGetNotifications';
import NotificationEmptyFallback from '../NotificationEmptyFallback/NotificationEmptyFallback';
import * as S from './MyEventsNotifications.style';
import { useAuthStore } from 'src/store/authStore';




const MyEventsNotifications: React.FC = () => {
    const { data: allNotifications } = useGetNotifications();
    const { userMetadata } = useAuthStore();

    const { handleDeleteNotification } = useDeleteNotification();

    const filteredNotifications = allNotifications?.filter(
        (notification) => notification.hostId === userMetadata?.uid
    );

    const renderItem = ({ item }: { item: components['schemas']['Notification'] }) => (
        <NotificationItem
            notification={item}
            isJoinedEvents={false}
            handleDeleteNotification={handleDeleteNotification}
        />
    );

    if (!filteredNotifications || filteredNotifications.length === 0) {
        return <NotificationEmptyFallback isJoinedEvents={false} />;
    }

    return (
        <S.Container>
            <FlatList
                data={filteredNotifications}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id || index.toString()}
            />
        </S.Container>
    );
};

export default MyEventsNotifications; 