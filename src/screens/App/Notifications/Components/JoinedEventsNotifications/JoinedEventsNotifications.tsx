import React from 'react';
import { FlatList } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import NotificationItem from '../NotificationItem/NotificationItem';
import useGetNotifications from '../../hooks/useGetNotifications';
import useDeleteNotification from '../../hooks/useDeleteNotification';
import NotificationEmptyFallback from '../NotificationEmptyFallback/NotificationEmptyFallback';
import * as S from './JoinedEventsNotifications.style';
import { useAuthStore } from 'src/store/authStore';

const JoinedEventsNotifications: React.FC = () => {
    const { userMetadata } = useAuthStore();
    const { data: allNotifications } = useGetNotifications();
    const { handleDeleteNotification } = useDeleteNotification();

    const filteredNotifications = allNotifications?.filter(
        (notification) => notification.guestId === userMetadata?.uid
    );

    const renderItem = ({ item }: { item: components['schemas']['Notification'] }) => (
        <NotificationItem
            notification={item}
            isJoinedEvents={true}
            handleDeleteNotification={handleDeleteNotification}
        />
    );

    if (!filteredNotifications || filteredNotifications.length === 0) {
        return <NotificationEmptyFallback isJoinedEvents={true} />;
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

export default JoinedEventsNotifications; 