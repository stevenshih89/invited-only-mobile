import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

//import components
import useStyles from './styles.ts';
import Modal from 'react-native-modal';
import UserIcon from 'assets/images/icons/user.svg';
import ChatIcon from 'assets/images/icons/messages.svg';
import ReportIcon from 'assets/images/icons/info-circle.svg';
import CloseIcon from 'assets/images/icons/close-circle-red.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CheckWhite from 'assets/images/icons/check.svg';
import {black1Color, grayScale700, whiteColor} from 'constants/colors.ts';
import {chatCorrespondencePath, commonStackPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import {useUser} from '../../../store/userStore';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {calculateAge} from 'helpers/calculateAge.ts';
import {useFocusEffect} from '@react-navigation/native';
import {sendNotification} from 'helpers/fcmHelper.ts';
import ModalFullEvent from '../ModalFullEvent/index.tsx';

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
  setIsVisibleModalFullEvent
}) => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);
  const [userInfo, setUserInfo] = useState<any>({});
  const [userGuest, setUserGuest] = useState<any>(usersList?.filter((i: any) => i?.uid === uid)[0]);

  console.warn('userGuest', userGuest, usersList, uid);

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
    const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
    if (userInfoDoc.exists) {
      setUserInfo(userInfoDoc.data());
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [uid]),
  );

  const handleCancelInvitation = async () => {
    try {
      const eventQuery = await firestore().collection('Events').doc(list?.id).get();
      if (!eventQuery.exists || !uid) {
        return;
      }
      const usersListData = [...eventQuery?.data()?.usersList];
      const requestListData = [...eventQuery?.data()?.requestsList];
      const updateUsersList: any = usersListData ? usersListData?.filter((i: any) => i?.uid !== uid) : [];
      const updateRequestsList: any = requestListData ? requestListData?.filter((i: any) => i?.uid !== uid) : [];
      const filterUsersList = usersList?.filter((i: any) => i?.uid !== uid);
      setUsersListsData && setUsersListsData(filterUsersList);

      await firestore().collection('Events').doc(list?.id).update({
        usersList: updateUsersList,
        requestsList: updateRequestsList,
      });
      console.warn('usersListData', usersListData);
      const rejectedUser = usersListData.find((i: any) => i?.uid === uid);
      if (rejectedUser?.status !== 'notAccepted') {
        await sendNotification(uid, `${userHost?.name} rejected your request`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), userHost);
      }
      showToast('inviteMatch', `You rejected ${rejectedUser?.name}`, 'Not now', {
        ownerPhoto: rejectedUser?.userPhoto,
        status: 'REJECTED'.toUpperCase(),
      });
      setModalVisible && setModalVisible(false);
    } catch (e) {
      showToast('inviteMatch', '', 'Error!');
      console.log(e);
    }
  };

  const handleCreateChat = async () => {
    try {
      const user = usersList?.filter((i: any) => i?.uid === uid)[0];
      const messageCollection = await firestore().collection('messages').doc(list?.id).get();
      const chatCheck = messageCollection?.data()?.chats?.filter(i => i?.uid === uid)[0];
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
            .collection('messages')
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

          await firestore().collection('messages').doc(id).set({
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
            .collection('messages')
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
      console.log(e);
      showToast('inviteMatch', '', 'Error!');
    }
  };

  const updateChatDocument = async () => {
    const chatQuery = await firestore().collection('messages').doc(list?.id).get();
    if (!chatQuery.exists) {
      return;
    }
    const chatData = chatQuery?.data();
    const chatList = chatData?.chats;
    const updatedChatList = chatList?.map((chat: any) => {
      if (chat.uid === uid) {
        return {
          ...chat,
          invitedStatus: 'approved',
        };
      }
      return chat;
    });
    await firestore().collection('messages').doc(list?.id).update({
      chats: updatedChatList,
    });
  };

  const updateEventDocument = async () => {
    const eventQuery = await firestore().collection('Events').doc(list?.id).get();
    if (!eventQuery.exists) {
      return;
    }
    const usersListData = eventQuery?.data()?.usersList;
    const updatedUsersList = usersListData?.map((user: any) => {
      if (user.uid === uid) {
        return {
          ...user,
          status: 'approved',
        };
      }
      return user;
    });

    await firestore().collection('Events').doc(list?.id).update({
      usersList: updatedUsersList,
    });
  };

  const handleApproveGuestFromHost = async () => {
    try {
      if (uid) {
        await updateChatDocument();
        await updateEventDocument();
        await sendNotification(uid, 'Please confirm your attendence', 'Request approved', 'Approve', 'Approved'.toUpperCase(), userInfo);
        showToast('inviteMatch', `Waiting for ${userGuest?.name} to accept your invitation`, 'Almost there!', {
          ownerPhoto: userGuest?.userPhoto,
          status: 'GUEST APPROVED',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserStatusButtonText = () => {
    if (!userGuest?.status) {
      return '';
    }
    if (userGuest?.status === 'invite_match') {
      return 'Approve guest';
    } else if (userGuest?.status === 'approved') {
      return 'Waiting for invitation accepted';
    } else if (userGuest?.status === 'accepted') {
      return 'Guest Accepted';
    }
  };

  const getIsDisabledButton = () => {
    if (userGuest?.status === 'invite_match') {
      return false;
    }
    return true;
  };

  const handleActionPress = async () => {
    const isFull = await checkIsFullGuestsFun()
    if(isFull) {
      setModalVisible(false)
      setTimeout(() => {
        setIsVisibleModalFullEvent(true)
      }, 300);
      return
    }
    if (userGuest?.status === 'invite_match') {
      handleApproveGuestFromHost();
      const newArray = usersList.map((i: any) => (i.uid === uid ? {...i, status: 'approved'} : i));

      setUsersListsData && setUsersListsData(newArray);
      setUserGuest({...userGuest, status: 'approved'});
      setModalVisible && setModalVisible(false);
    }
  };

  const getButtonStyle = () => {
    if (userGuest?.status === 'invite_match') {
      return {
        backgroundColor: whiteColor,
        borderColor: whiteColor,
      };
    }
    if (userGuest?.status === 'approved') {
      return {
        backgroundColor: grayScale700,
        borderColor: grayScale700,
      };
    }
    if (userGuest?.status === 'accepted') {
      return {
        backgroundColor: black1Color,
        borderColor: whiteColor,
        borderWidth: 1,
      };
    }
  };

  const getButtonTitleStyle = () => {
    if (userGuest?.status === 'approved') {
      return {
        color: whiteColor,
      };
    }
    if (userGuest?.status === 'invite_match') {
      return {
        color: black1Color,
      };
    }
    if (userGuest?.status === 'accepted') {
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
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginBottom: 20}}>
              {image && <Image style={{borderRadius: 100, width: 40, height: 40}} source={{uri: image}} />}
              <View style={{marginLeft: 6}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>
                    {title}
                    {userInfo?.date && `, ${calculateAge(userInfo.date)}`}
                  </Text>
                  {userInfo?.accountConfirmed && <CheckStarIcon width={12} height={12} style={{marginLeft: 4}} />}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      <Text style={{textTransform: 'capitalize', color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(9, 812)}}>
                        {userInfo.accountType}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={{width: '100%', marginBottom: 20}}>
              <TouchableOpacity
                disabled={getIsDisabledButton()}
                activeOpacity={0.7}
                style={[
                  {height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10},
                  getButtonStyle(),
                ]}
                onPress={handleActionPress}>
                <Text style={[{fontFamily: Satoshi500, fontSize: RFValue(18, 812)}, getButtonTitleStyle()]}>
                  {getUserStatusButtonText()}
                </Text>
                {userGuest?.status === 'accepted' && <CheckWhite style={{marginLeft: 10}} />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => goToProfileView()} style={[styles.buttonFooter, {borderTopColor: 'transparent'}]}>
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
              <Text style={styles.textButton}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCancelInvitation()} style={styles.buttonFooter}>
              <CloseIcon width={14} height={14} />
              <Text style={[styles.textButton, {color: 'rgb(206, 38, 38)'}]}>Cancel invitation</Text>
            </TouchableOpacity>
          </View>
          <ModalReport modalReport={modalReport} setModalReport={setModalReport} uidSender={userHost?.uid} uid={uid} />
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserProfileEvent;
