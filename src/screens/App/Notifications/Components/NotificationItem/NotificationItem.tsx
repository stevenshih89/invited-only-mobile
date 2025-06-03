import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {formatDistance} from 'date-fns';
import {components} from '@invited-only/invited-only-api';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import * as S from './NotificationItem.style';
import useSwipeToDelete from './hooks/useSwipeToDelete';
import useGetUserById from 'hooks/useGetUserById';
import useHostConnectionActions from 'hooks/connections/useHostConnectionActions';
import useGuestConnectionActions from 'hooks/connections/useGuestConnectionActions';
import useNavigateToChat from 'screens/App/Chat/hooks/useNavigateToChat';
import useGetEvent from 'screens/App/Chat/EventChats/hooks/useGetEvent';
import {whiteColor} from 'constants/colors';

interface NotificationItemProps {
  notification: components['schemas']['Notification'];
  onPress?: (notification: components['schemas']['Notification']) => void;
  isJoinedEvents: boolean;
  handleDeleteNotification: (notificationId: string, shouldShowToast?: boolean) => void;
}

const NotificationItem = ({notification, onPress, isJoinedEvents, handleDeleteNotification}: NotificationItemProps) => {
  const {navigateToChat} = useNavigateToChat({
    eventId: notification.eventId || '',
    hostId: notification.hostId || '',
    guestId: notification.guestId || '',
    asGuest: isJoinedEvents ? true : false,
  });
  const {data: user} = useGetUserById(notification.guestId || '');
  const {data: event} = useGetEvent(notification.eventId || '');

  const notificationType = notification.type;
  const {handleHostConfirmEvent, handleHostRejectEvent, isUpdatingEventAttendee} = useHostConnectionActions({
    hostId: notification.hostId || '',
    guestId: notification.guestId || '',
    eventId: notification.eventId || '',
    onSuccess: () => {
      handleDeleteNotification(notification.id || '', false);
    },
  });
  const {handleGuestConfirmEvent, isUpdatingEventAttendee: isUpdatingEventAttendeeGuest} = useGuestConnectionActions({
    hostId: notification.hostId || '',
    guestId: notification.guestId || '',
    eventId: notification.eventId || '',
    onSuccess: () => {
      handleDeleteNotification(notification.id || '', false);
    },
  });

  const {panGesture, animatedStyle} = useSwipeToDelete({
    onDelete: handleDeleteNotification,
    itemId: notification.id || '',
  });

  const handlePress = () => {
    if (onPress) {
      onPress(notification);
    }
  };
  const timeAgo = notification.createdAt ? formatDistance(new Date(notification.createdAt), new Date(), {addSuffix: true}) : '';
  const isLoading = isUpdatingEventAttendee || isUpdatingEventAttendeeGuest;
  return (
    <GestureDetector gesture={panGesture}>
      <S.SwipeContainer>
        <S.SwipeDeleteView>
          <S.SwipeDeleteText>Delete</S.SwipeDeleteText>
        </S.SwipeDeleteView>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity activeOpacity={1} onPress={handlePress} style={{backgroundColor: 'transparent'}}>
            <S.Container>
              {user?.photos?.[0] && (
                <S.NarrowLeftContainer>
                  <S.AvatarContainer>
                    <S.AvatarImage source={{uri: isJoinedEvents ? event?.photos?.[0].image : user.photos?.[0].image}} />
                  </S.AvatarContainer>
                </S.NarrowLeftContainer>
              )}
              <S.WideRightContainer>
                <S.TitleAndTimestampContainer>
                  <S.TitleText numberOfLines={1}>{notification.title}</S.TitleText>
                  {timeAgo && <S.TimestampText>{timeAgo}</S.TimestampText>}
                </S.TitleAndTimestampContainer>
                <S.BodyText numberOfLines={2}>{notification.message}</S.BodyText>
                {isLoading ? (
                  <S.LoaderContainer>
                    <ActivityIndicator size="large" color={whiteColor} />
                  </S.LoaderContainer>
                ) : (
                  notificationType === 'connection' && (
                    <S.ActionButtonContainer>
                      <S.ActionButtonPrimary
                        disabled={isLoading}
                        onPress={!isJoinedEvents ? handleHostConfirmEvent : handleGuestConfirmEvent}>
                        <S.ActionButtonTextPrimary>{!isJoinedEvents ? 'Invite' : 'Approve'}</S.ActionButtonTextPrimary>
                      </S.ActionButtonPrimary>
                      <S.ActionButtonSecondary
                        disabled={isLoading}
                        onPress={
                          !isJoinedEvents
                            ? handleHostRejectEvent
                            : () => {
                                navigateToChat();
                              }
                        }>
                        <S.ActionButtonTextSecondary>{!isJoinedEvents ? 'Reject' : 'Chat'}</S.ActionButtonTextSecondary>
                      </S.ActionButtonSecondary>
                    </S.ActionButtonContainer>
                  )
                )}
              </S.WideRightContainer>
            </S.Container>
          </TouchableOpacity>
        </Animated.View>
      </S.SwipeContainer>
    </GestureDetector>
  );
};

export default NotificationItem;
