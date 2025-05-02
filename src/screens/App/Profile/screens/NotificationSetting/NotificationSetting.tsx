import { FC } from 'react';
import * as S from './NotificationSetting.style';
import { blackColor, whiteColor } from 'constants/colors';
import { useNotificationSetting } from 'screens/App/Profile/screens/NotificationSetting/hooks/useNotificationSetting';
import ModalDefault from 'components/Modal/ModalDefault/ModalDefault';
import useUser from 'hooks/user/useUser';

interface NotificationSettingProps {
  route: any;
}

const NotificationSetting: FC<NotificationSettingProps> = ({ route }) => {
  const {
    allNotification,
    handleChangeAllNotification,
    myEvents,
    setMyEvents,
    requests,
    setRequests,
    chat,
    setChat,
    superInvite,
    setSuperInvite,
    match,
    setMatch,
    isVisibleTurnOffNotificationsModal,
    handleConfirmTurnOffNotifications,
    setIsVisibleTurnOffNotificationsModal,
  } = useNotificationSetting(route);
  const { user: userData } = useUser();
  return (
    <S.SafeArea>
      <S.Container>
        <S.ScrollContainer>
          <S.FirstSectionContainer>
            <S.SwitchRow>
              <S.SectionTitle>All notifications</S.SectionTitle>
              <S.StyledSwitch
                testID="all-notifications-switch"
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={allNotification ? blackColor : whiteColor}
                value={allNotification}
                onValueChange={handleChangeAllNotification}
              />
            </S.SwitchRow>
            <S.SectionDescription>Stay updated on all activity</S.SectionDescription>
          </S.FirstSectionContainer>
          <S.SectionContainer>
            <S.SwitchRow>
              <S.SectionTitle>My events</S.SectionTitle>
              <S.StyledSwitch
                testID="my-events-switch"
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={myEvents ? blackColor : whiteColor}
                value={myEvents}
                onValueChange={setMyEvents}
              />
            </S.SwitchRow>
            <S.SectionDescription>Updates related to your hosted events</S.SectionDescription>
          </S.SectionContainer>
          <S.SectionContainer>
            <S.SwitchRow>
              <S.SectionTitle>Requests</S.SectionTitle>
              <S.StyledSwitch
                testID="requests-switch"
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={requests ? blackColor : whiteColor}
                value={requests}
                onValueChange={setRequests}
              />
            </S.SwitchRow>
            <S.SectionDescription>Alerts for new requests</S.SectionDescription>
          </S.SectionContainer>
          <S.SectionContainer>
            <S.SwitchRow>
              <S.SectionTitle>Chat</S.SectionTitle>
              <S.StyledSwitch
                testID="chat-switch"
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={chat ? blackColor : whiteColor}
                value={chat}
                onValueChange={setChat}
              />
            </S.SwitchRow>
            <S.SectionDescription>Notifications for new messages</S.SectionDescription>
          </S.SectionContainer>
          <S.SectionContainer>
            <S.SwitchRow>
              <S.SectionTitle>Super {userData?.accountType === 'host' ? 'invite' : 'join'}</S.SectionTitle>
              <S.StyledSwitch
                testID="super-invite-switch"
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={superInvite ? blackColor : whiteColor}
                value={superInvite}
                onValueChange={setSuperInvite}
              />
            </S.SwitchRow>
            <S.SectionDescription>Status updates on boosted {userData?.accountType === 'host' ? 'invites' : 'joins'}</S.SectionDescription>
          </S.SectionContainer>
          <S.SectionContainer>
            <S.SwitchRow>
              <S.SectionTitle>New Connection</S.SectionTitle>
              <S.StyledSwitch
                testID="new-connection-switch"
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={match ? blackColor : whiteColor}
                value={match}
                onValueChange={setMatch}
              />
            </S.SwitchRow>
            <S.SectionDescription>Notifications for new connections</S.SectionDescription>
          </S.SectionContainer>
        </S.ScrollContainer>
      </S.Container>
      <ModalDefault
        isVisible={isVisibleTurnOffNotificationsModal}
        onConfirm={handleConfirmTurnOffNotifications}
        onClose={() => setIsVisibleTurnOffNotificationsModal(false)}
        confirmText="Turn Off"
        cancelText="Cancel"
        title="Are You Sure You Want Turn Off All Notifications"
        description="You will not receive any notifications"
      />
    </S.SafeArea>
  );
};

export default NotificationSetting;
