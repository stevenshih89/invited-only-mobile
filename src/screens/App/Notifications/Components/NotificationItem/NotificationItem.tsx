import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { formatDistance } from 'date-fns';
import { components } from '@invited-only/invited-only-api';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import * as S from './NotificationItem.style';
import useSwipeToDelete from './hooks/useSwipeToDelete';
import useGetUserById from 'hooks/useGetUserById';
import useHostConnectionActions from 'hooks/connections/useHostConnectionActions';
import useGuestConnectionActions from 'hooks/connections/useGuestConnectionActions';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { whiteColor } from 'constants/colors';

export interface Notification {
    id: string;
    title: string;
    body: string;
    image?: string;
    mark?: string;
    createdAt: string;
}

interface NotificationItemProps {
    notification: components['schemas']['Notification'];
    onPress?: (notification: components['schemas']['Notification']) => void;
    isJoinedEvents: boolean;
    handleDeleteNotification: (notificationId: string, shouldShowToast?: boolean) => void;
}

const NotificationItem = ({ notification, onPress, isJoinedEvents, handleDeleteNotification }: NotificationItemProps) => {
    const navigation = useAppNavigation();
    const { data: user } = useGetUserById(notification.guestId || '');

    const notificationType = notification.type;
    const { handleHostConfirmEvent, handleHostRejectEvent, isUpdatingEventAttendee } = useHostConnectionActions({
        hostId: notification.hostId || '',
        guestId: notification.guestId || '',
        eventId: notification.eventId || '',
        onSuccess: () => {
            handleDeleteNotification(notification.id || '', false);
        }
    });
    const { handleGuestConfirmEvent, isUpdatingEventAttendee: isUpdatingEventAttendeeGuest } = useGuestConnectionActions({
        hostId: notification.hostId || '',
        guestId: notification.guestId || '',
        eventId: notification.eventId || '',
        onSuccess: () => {
            handleDeleteNotification(notification.id || '', false);
        }
    });



    const { panGesture, animatedStyle } = useSwipeToDelete({
        onDelete: handleDeleteNotification,
        itemId: notification.id || '',
    });

    const handlePress = () => {
        if (onPress) {
            onPress(notification);
        }
    };

    const handleAction = (action: string, isJoinedEvents: boolean) => {
        if (isJoinedEvents) {
            if (action === 'invite') {
                handleGuestConfirmEvent();
            } else if (action === 'chat') {
                navigation.navigate('/bottom-tabs-stack', {
                    screen: '/chat',

                })
            }
        } else {
            if (action === 'approve') {
                handleHostConfirmEvent();
            } else if (action === 'reject') {
                handleHostRejectEvent();
            }
        }
    };

    const timeAgo = notification.createdAt
        ? formatDistance(new Date(notification.createdAt), new Date(), { addSuffix: true })
        : '';

    return (
        <GestureDetector gesture={panGesture}>

            <S.SwipeContainer>
                <S.SwipeDeleteView>
                    <S.SwipeDeleteText>Delete</S.SwipeDeleteText>
                </S.SwipeDeleteView>
                <Animated.View style={animatedStyle}>
                    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
                        {isUpdatingEventAttendee || isUpdatingEventAttendeeGuest ? (
                            <ActivityIndicator size="small" color={whiteColor} />
                        ) : (
                            <S.Container>
                                {user?.photos?.[0] && (
                                    <S.NarrowLeftContainer>
                                        <S.AvatarContainer>
                                            <S.AvatarImage source={{ uri: user.photos?.[0].image }} />
                                        </S.AvatarContainer>
                                    </S.NarrowLeftContainer>
                                )}
                                <S.WideRightContainer>
                                    <S.TitleAndTimestampContainer>
                                        <S.TitleText numberOfLines={1}>{notification.title}</S.TitleText>
                                        {timeAgo && <S.TimestampText>{timeAgo}</S.TimestampText>}
                                    </S.TitleAndTimestampContainer>
                                    <S.BodyText numberOfLines={2}>{notification.message}</S.BodyText>
                                    {notification.readAt === 'unread' && <S.UnreadIndicator />}
                                    {notificationType === 'connection' && (
                                        <S.ActionButtonContainer>
                                            <S.ActionButtonPrimary onPress={() => handleAction('approve', isJoinedEvents)}>
                                                <S.ActionButtonTextPrimary>{!isJoinedEvents ? 'Invite' : 'Approve'}</S.ActionButtonTextPrimary>
                                            </S.ActionButtonPrimary>
                                            <S.ActionButtonSecondary onPress={() => handleAction(!isJoinedEvents ? 'reject' : 'chat', isJoinedEvents)}>
                                                <S.ActionButtonTextSecondary>{!isJoinedEvents ? 'Reject' : 'Chat'}</S.ActionButtonTextSecondary>
                                            </S.ActionButtonSecondary>
                                        </S.ActionButtonContainer>
                                    )}
                                </S.WideRightContainer>
                            </S.Container>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </S.SwipeContainer>

        </GestureDetector>
    );
};

export default NotificationItem; 