import React, {Dispatch, FC, SetStateAction} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

//import components
import useStyles from './styles.ts';
import Modal from 'react-native-modal';
import {screenHeight} from 'constants/common.ts';
import FlashIcon from 'assets/images/icons/flash.svg';
import UserIcon from 'assets/images/icons/user.svg';
import ChatIcon from 'assets/images/icons/messages.svg';
import ReportIcon from 'assets/images/icons/info-circle.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {gray1Color} from 'constants/colors.ts';
import {chatCorrespondencePath, commonStackPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import {useUser} from '../../../store/userStore';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';

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
  setUsersListsData?: Dispatch<SetStateAction<boolean>>;
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
}) => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);

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

  const handleCancelInvitation = async () => {
    try {
      const updateUsersList: any = list?.usersList ? list?.usersList?.filter((i: any) => i?.uid !== uid) : [];
      const updateRequestsList: any = list?.requestsList ? list?.requestsList?.filter((i: any) => i?.uid !== uid) : [];
      const filterUsersList = usersList?.filter((i: any) => i?.uid !== uid);
      setUsersListsData && setUsersListsData(filterUsersList);

      await firestore().collection('Events').doc(list?.id).update({
        usersList: updateUsersList,
        requestsList: updateRequestsList,
      });
      showToast('success', '', 'The invitation has been successfully withdrawn!');
      setModalVisible && setModalVisible(false);
    } catch (e) {
      showToast('cancel', '', 'Error!');
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
            },
          });

          setModalVisible && setModalVisible(false);
        }
      }
    } catch (e) {
      console.log(e);
      showToast('cancel', '', 'Error!');
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
            <View>
              <Image source={{uri: image}} style={styles.userPhoto} />
              {/*{online && <View style={styles.greenCircle} />}*/}
              {/*<View style={styles.greenCircle} />*/}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: screenHeight / 80, marginBottom: 34}}>
              <Text style={styles.title}>{title}</Text>
              <FlashIcon width={19} height={19} />
            </View>
            <TouchableOpacity onPress={() => goToProfileView()} style={[styles.buttonFooter, {borderTopColor: gray1Color}]}>
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
              <Text style={styles.textButton}>Cancel invitation</Text>
            </TouchableOpacity>
          </View>
          <ModalReport modalReport={modalReport} setModalReport={setModalReport} uidSender={userHost?.uid} uid={uid} />
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserProfileEvent;
