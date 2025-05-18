import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

//import components
import Modal from 'react-native-modal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import Config from 'react-native-config';

import useStyles from './styles.ts';
import UserIcon from 'assets/images/icons/user.svg';
import ChatIcon from 'assets/images/icons/messages.svg';
import ReportIcon from 'assets/images/icons/block_and_report.svg';
import CloseIcon from 'assets/images/icons/close-circle-red.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import CheckWhite from 'assets/images/icons/check.svg';
import { black1Color, grayScale700, whiteColor } from 'constants/colors.ts';
import { chatCorrespondencePath, commonStackPath, myProfileViewPath } from 'constants/pathLocations.ts';
import { useAppNavigation } from 'hooks/useAppNavigation.tsx';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import { showToast } from 'helpers/showToast.ts';
import { Satoshi500, Satoshi700 } from 'constants/fonts.ts';
import { calculateAge } from 'helpers/calculateAge.ts';
import { sendNotification } from 'helpers/fcmHelper.ts';
import { ACCEPTED_STATUS, APPROVED_STATUS, CANCEL_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS } from 'constants/common.ts';
import { Event } from 'src/types/event.ts';
import useUser from 'hooks/user/useUser.ts';
import { logErrorToSentry } from 'helpers/logErrorsToSentry.ts';

interface ModalUserProfileEventProps {
  isModalVisible?: boolean;
  modalReport?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
  setModalReport?: Dispatch<SetStateAction<boolean>>;
  image?: any;
  title?: string;
  uid?: string;
  list?: any;
  usersList?: any;
  checkIsFullGuestsFun?: any;
  setUsersListsData?: Dispatch<SetStateAction<any[]>>;
  setIsVisibleModalFullEvent: Dispatch<SetStateAction<boolean>>;
}

const ModalUserProfileEvent: FC<ModalUserProfileEventProps> = ({
  usersList,
  list,
  uid,
  title,
  image,
  isModalVisible,
  setModalVisible,
  modalReport,
  setModalReport,
  setUsersListsData,
  checkIsFullGuestsFun,
  setIsVisibleModalFullEvent,
}) => {
  const styles = useStyles();

  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);
  const [userInfo, setUserInfo] = useState<any>({});
  const [userGuest, setUserGuest] = useState<any>(usersList?.filter((i: any) => i?.uid === uid)[0]);

  useEffect(() => {
    setUserGuest(usersList?.filter((i: any) => i?.uid === uid)[0]);
  }, [uid, usersList]);

  const goToProfileView = () => {
    if (setModalVisible) {
      setModalVisible(false);
      navigation.navigate(commonStackPath, {
        screen: myProfileViewPath,
        params: {
          uid: uid,
          isShowEditButton: false,
        },
      });
    }
  };
  const getUserInfo = async () => {
    try {
      const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      if (userInfoDoc.exists) {
        setUserInfo(userInfoDoc.data());
      }
    } catch (error) {
      showToast('inviteMatch', 'An error occurred while fetching user information. Please try again later.', 'Error');
      logErrorToSentry(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [uid]),
  );

  const changeStatusGuestUsersList = async ({
    status,
    id,
    uidHost,
    placeName,
    date,
    hostPhoto,
  }: {
    status: string;
    id: string;
    uidHost: string;
    placeName: string;
    date?: string;
    hostPhoto: string;
  }) => {
    const eventQuerySnapshot = await firestore().collection(apiEventsCollection).doc(id).get();
    const eventDataList = eventQuerySnapshot.data();
    if (!eventDataList?.usersList.length) {
      return;
    }

    try {
      const currentUid = userInfo?.uid === list?.hostUid ? uid : userInfo?.uid;

      const updatedUsersList = eventDataList?.usersList?.map((userItem: Event.User) => {
        if (userItem.uid === currentUid) {
          return {
            ...userItem,
            status,
          };
        }
        return userItem;
      });
      await firestore().collection(apiEventsCollection).doc(id).update({
        usersList: updatedUsersList,
      });
      switch (status) {
        case ACCEPTED_STATUS:
          showToast('inviteMatch', `See you at ${date}`, 'You accept to this event!', {
            ownerPhoto: hostPhoto,
            status: 'Accept'.toUpperCase(),
          });
          await sendNotification(
            uidHost,
            `${userInfo?.name} accepted your invitation`,
            'Invitation Accepted!',
            'Accepted',
            'Accepted'.toUpperCase(),
            userInfo,
          );
          break;
        case NOT_ACCEPTED_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
          await sendNotification(
            uidHost,
            `${userInfo?.name} rejected your invitation`,
            'Not now.',
            'Rejected',
            'Rejected'.toUpperCase(),
            userInfo,
          );
          break;
        case CANCEL_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
          await sendNotification(
            uidHost,
            `${userInfo?.name} rejected your invitation`,
            'Not now.',
            'Rejected',
            'Rejected'.toUpperCase(),
            userInfo,
          );
          break;
        default:
          break;
      }
    } catch (e) {
      console.log('error update status guest', e);
      showToast('inviteMatch', 'An error occurred while updating the guest status. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

  const handleCancelInvitation = async () => {
    changeStatusGuestUsersList({
      status: CANCEL_STATUS,
      id: list?.id,
      uidHost: list?.uid,
      placeName: list?.placeName,
      hostPhoto: image,
    });
    setModalVisible && setModalVisible(false);
  };

  const handleCreateChat = async () => {
    try {
      const user = usersList?.filter((i: any) => i?.uid === uid)[0];
      const messageCollection = await firestore().collection(apiMessagesCollection).doc(list?.id).get();
      const chatCheck = messageCollection?.data()?.chats?.find(i => i?.uid === uid);
      const activeEvent = messageCollection?.data()?.activeEvent;

      if (chatCheck) {
        await navigation.navigate(commonStackPath, {
          screen: chatCorrespondencePath,
          params: {
            image: chatCheck?.avatar,
            title: chatCheck?.name,
            online: false,
            messages: chatCheck?.messages,
            activeEvent: activeEvent,
            id: chatCheck?.id,
            superInvite: chatCheck?.superInvite,
            invitedStatus: chatCheck?.invitedStatus,
            uid: chatCheck?.uid,
          },
        });
        setModalVisible && setModalVisible(false);
      } else {
        if (messageCollection?.data()) {
          const prevChats = messageCollection?.data()?.chats;
          const newChats = {
            avatar: user?.userPhoto,
            id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
            invitedStatus: user?.status,
            messages: [],
            name: user?.name,
            superInvite: user?.superInvite,
            uid: user?.uid,
            hostUid: userHost?.uid,
          };
          await firestore()
            .collection(apiMessagesCollection)
            .doc(list?.id)
            .update({
              chats: [...prevChats, newChats],
            });

          await navigation.navigate(commonStackPath, {
            screen: chatCorrespondencePath,
            params: {
              image: newChats?.avatar,
              title: newChats?.name,
              online: false,
              messages: [],
              activeEvent: activeEvent,
              id: newChats?.id,
              superInvite: newChats?.superInvite,
              invitedStatus: newChats?.invitedStatus,
              uid: newChats?.uid,
            },
          });

          setModalVisible && setModalVisible(false);
        } else {
          const id = list?.id;

          await firestore().collection(apiMessagesCollection).doc(id).set({
            activeEvent: id,
            avatarGuest: user?.userPhoto,
            avatarHost: userHost?.photos[0]?.image,
            chats: [],
            inviteStatus: user?.status,
            nameGuest: user?.name,
            uidGuest: user?.uid,
            uidHost: userHost?.uid,
          });

          const newChats = {
            avatar: user?.userPhoto,
            id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
            invitedStatus: user?.status,
            messages: [],
            name: user?.name,
            superInvite: user?.superInvite,
            uid: user?.uid,
            hostUid: userHost?.uid,
          };

          await firestore()
            .collection(apiMessagesCollection)
            .doc(id)
            .update({
              chats: [newChats],
            });

          await navigation.navigate(commonStackPath, {
            screen: chatCorrespondencePath,
            params: {
              image: newChats?.avatar,
              title: newChats?.name,
              online: false,
              messages: [],
              activeEvent: id,
              id: newChats?.id,
              superInvite: newChats?.superInvite,
              invitedStatus: newChats?.invitedStatus,
              uid: newChats?.uid,
            },
          });

          setModalVisible && setModalVisible(false);
        }
      }
    } catch (e) {
      showToast('inviteMatch', 'An error occurred while creating the chat. Please try again later.', 'Error!');
      logErrorToSentry(e);
    }
  };

  const updateChatDocument = async () => {
    try {
      const chatQuery = await firestore().collection(apiMessagesCollection).doc(list?.id).get();
      if (!chatQuery.exists) {
        return;
      }
      const chatData = chatQuery?.data();
      const chatList = chatData?.chats;
      const updatedChatList = chatList?.map((chat: any) => {
        if (chat.uid === uid) {
          return {
            ...chat,
            invitedStatus: APPROVED_STATUS,
          };
        }
        return chat;
      });
      await firestore().collection(apiMessagesCollection).doc(list?.id).update({
        chats: updatedChatList,
      });
    } catch (error) {
      showToast('inviteMatch', 'An error occurred while updating the chat. Please try again later.', 'Error');
      logErrorToSentry(error);
    }
  };

  const updateEventDocument = async () => {
    try {
      const eventQuery = await firestore().collection(apiEventsCollection).doc(list?.id).get();
      if (!eventQuery.exists) {
        return;
      }
      const usersListData = eventQuery?.data()?.usersList;
      const updatedUsersList = usersListData?.map((user: any) => {
        if (user.uid === uid) {
          return {
            ...user,
            status: APPROVED_STATUS,
          };
        }
        return user;
      });

      await firestore().collection(apiEventsCollection).doc(list?.id).update({
        usersList: updatedUsersList,
      });
    } catch (error) {
      showToast('inviteMatch', 'An error occurred while updating the event. Please try again later.', 'Error');
    }
  };

  const handleApproveGuestFromHost = async () => {
    try {
      if (uid) {
        const getDate = await firestore().collection(apiUserInfoCollection).doc(uid).get();
        const docData = getDate.data();
        await updateChatDocument();
        await updateEventDocument();
        if (docData?.notificationSettings.requests) {
          await sendNotification(
            uid,
            'Please confirm your attendence',
            'Request approved',
            'Approve',
            'Approved'.toUpperCase(),
            userInfo,
            JSON.stringify({ path: 'myEvents' }),
          );
        }
        showToast('inviteMatch', `Waiting for ${userGuest?.name} to accept your invitation`, 'Almost there!', {
          ownerPhoto: userGuest?.userPhoto,
          status: 'GUEST APPROVED',
        });
      }
    } catch (e) {
      showToast('inviteMatch', 'An error occurred while approving the guest', 'Error');
      logErrorToSentry(e);
    }
  };

  const getUserStatusButtonText = () => {
    if (!userGuest?.status) {
      return '';
    }
    if (userGuest?.status === INVITE_MATCH_STATUS) {
      return 'Approve guest';
    } else if (userGuest?.status === APPROVED_STATUS) {
      return 'Waiting for invitation accepted';
    } else if (userGuest?.status === ACCEPTED_STATUS) {
      return 'Guest Accepted';
    }
  };

  const getIsDisabledButton = () => {
    if (userGuest?.status === INVITE_MATCH_STATUS) {
      return false;
    }
    return true;
  };

  const handleActionPress = async () => {
    const isFull = await checkIsFullGuestsFun();
    if (isFull) {
      setModalVisible && setModalVisible(false);
      setTimeout(() => {
        setIsVisibleModalFullEvent(true);
      }, 300);
      return;
    }
    if (userGuest?.status === INVITE_MATCH_STATUS) {
      handleApproveGuestFromHost();
      const newArray = usersList.map((i: any) => (i.uid === uid ? { ...i, status: APPROVED_STATUS } : i));

      setUsersListsData && setUsersListsData(newArray);
      setUserGuest({ ...userGuest, status: APPROVED_STATUS });
      setModalVisible && setModalVisible(false);
    }
  };

  const getButtonStyle = () => {
    if (userGuest?.status === INVITE_MATCH_STATUS) {
      return {
        backgroundColor: whiteColor,
        borderColor: whiteColor,
      };
    }
    if (userGuest?.status === APPROVED_STATUS) {
      return {
        backgroundColor: grayScale700,
        borderColor: grayScale700,
      };
    }
    if (userGuest?.status === ACCEPTED_STATUS) {
      return {
        backgroundColor: black1Color,
        borderColor: whiteColor,
        borderWidth: 1,
      };
    }
    return {
      height: 0,
    };
  };

  const getButtonTitleStyle = () => {
    if (userGuest?.status === APPROVED_STATUS) {
      return {
        color: whiteColor,
      };
    }
    if (userGuest?.status === INVITE_MATCH_STATUS) {
      return {
        color: black1Color,
      };
    }
    if (userGuest?.status === ACCEPTED_STATUS) {
      return {
        color: whiteColor,
      };
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <Modal
          isVisible={isModalVisible}
          useNativeDriver={false}
          propagateSwipe={true}
          backdropColor={'rgba(0, 0, 0, 0.94)'}
          testID={'bottom-half-modal-open-button'}
          onBackdropPress={() => setModalVisible && setModalVisible(false)}
          onSwipeComplete={() => setModalVisible && setModalVisible(false)}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
          swipeDirection={['down']}>
          <View style={styles.wrapper}>
            <View style={styles.whiteLine} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginBottom: 20 }}>
              {image && <Image style={{ borderRadius: 100, width: 40, height: 40 }} source={{ uri: image }} />}
              <View style={{ marginLeft: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor }}>
                    {title}
                    {userInfo?.date && `, ${calculateAge(userInfo.date)}`}
                  </Text>
                  {userInfo?.accountConfirmed && <CheckStarIcon width={12} height={12} style={{ marginLeft: 4 }} />}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {userInfo?.accountType && (
                    <View
                      style={{
                        borderColor: whiteColor,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderRadius: 5,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}>
                      <Text style={{ textTransform: 'capitalize', color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(9, 812) }}>
                        {userInfo.accountType}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={{ width: '100%', marginBottom: 20 }}>
              <TouchableOpacity
                disabled={getIsDisabledButton()}
                activeOpacity={0.7}
                style={[
                  { height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
                  getButtonStyle(),
                ]}
                onPress={handleActionPress}>
                <Text style={[{ fontFamily: Satoshi500, fontSize: RFValue(18, 812) }, getButtonTitleStyle()]}>
                  {getUserStatusButtonText()}
                </Text>
                {userGuest?.status === ACCEPTED_STATUS && <CheckWhite style={{ marginLeft: 10 }} />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => goToProfileView()} style={[styles.buttonFooter, { borderTopColor: 'transparent' }]}>
              <UserIcon width={14} height={14} />
              <Text style={styles.textButton}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCreateChat()} style={styles.buttonFooter}>
              <ChatIcon width={14} height={14} />
              <Text style={styles.textButton}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalReport && setModalReport(true);
              }}
              style={styles.buttonFooter}>
              <ReportIcon width={14} height={14} />
              <Text style={styles.textButton}>Block & Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCancelInvitation()} style={styles.buttonFooter}>
              <CloseIcon width={14} height={14} />
              <Text style={[styles.textButton, { color: 'rgb(206, 38, 38)' }]}>Cancel invitation</Text>
            </TouchableOpacity>
          </View>
          <ModalReport
            setModalReport={setModalReport}
            uidSender={userHost?.user?.uid || ''}
            uid={uid}
            handleAutoSwipeLeft={() => setModalVisible && setModalVisible(false)}
          />
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserProfileEvent;
