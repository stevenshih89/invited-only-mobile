import React, { Dispatch, FC, SetStateAction, useCallback, useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//import components
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ModalReport from '../ModalReport/ModalReport';
import useStyles from 'components/Modal/ModalUserMenu/styles.ts';
import Button from 'components/Button/Button.tsx';
import { black1Color, blackColor, errorColor, gray1Color, grayScale700, whiteColor } from 'constants/colors.ts';
import { showToast } from 'helpers/showToast.ts';

//import icons
import CloseIcon from 'assets/images/icons/close-circle-red.svg';
import InfoIcon from 'assets/images/icons/block_and_report.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import User from 'assets/images/icons/user.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import { Satoshi500, Satoshi700 } from 'constants/fonts';
import { commonStackPath, myProfileViewPath } from 'constants/pathLocations';
import useUser from 'hooks/user/useUser';
import { sendNotification } from 'helpers/fcmHelper';
import { ACCEPTED_STATUS, APPROVED_STATUS, CANCEL_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS } from 'constants/common';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { User as UserType } from 'src/types/userInfo';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';

interface ModalUserMenuProps {
  isModalVisible: boolean;
  setModalVisible: boolean | any;
  title: string;
  inviteStatus: string;
  image: any;
  uid: string;
  hostUid: string;
  activeEvent: string;
  checkIsFullGuestsFun: () => Promise<boolean>;
  setIsVisibleModalFullEvent: Dispatch<SetStateAction<boolean>>;
}

const ModalUserMenu: FC<ModalUserMenuProps> = ({
  isModalVisible,
  setModalVisible,
  title,
  image,
  uid,
  activeEvent,
  hostUid,
  checkIsFullGuestsFun,
  setIsVisibleModalFullEvent,
}) => {
  const [removingState, setRemovingState] = useState<boolean>(false);
  const [blockAndReportState, setBlockAndReportState] = useState<boolean>(false);
  const [cancelInvitationState, setCancelInvitationState] = useState<boolean>(false);
  const [deleteChatState, setDeleteChatState] = useState<boolean>(false);
  const [eventData, setEventData] = useState({ usersList: [] });
  const {
    events: apiEventsCollection,
    userInfo: apiUserInfoCollection,
    messages: apiMessagesCollection,
  } = useContext(FirebaseCollectionsContext);
  const styles = useStyles();

  const { user } = useUser();

  const userGuest =
    uid === hostUid
      ? eventData.usersList?.filter((i: UserType.Info) => i?.uid === user?.uid)[0]
      : eventData.usersList?.filter((i: UserType.Info) => i?.uid === uid)[0];

  const navigation = useNavigation();

  const goToProfileView = () => {
    setModalVisible(false);
    // @ts-ignore
    navigation.navigate(commonStackPath, {
      screen: myProfileViewPath,
      params: {
        uid: uid,
        isShowEditButton: false,
      },
    });
  };

  const getUsersList = async () => {
    try {
      const eventQuerySnapshot = await firestore().collection(apiEventsCollection).doc(activeEvent).get();
      if (eventQuerySnapshot.exists) {
        const data = eventQuerySnapshot.data();
        setEventData(data);
      }
    } catch (e) {
      showToast('inviteMatch', 'An error occurred while fetching the event data. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isModalVisible) {
        getUsersList();
      }
    }, [isModalVisible]),
  );

  const handleApproveGuestFromHost = async () => {
    if (!eventData?.usersList.length) {
      return;
    }
    const { allGuests, findAcceptedGuest } = await checkIsFullGuestsFun();

    if (findAcceptedGuest >= allGuests) {
      setModalVisible(false);
      setIsVisibleModalFullEvent(true);
      showToast('inviteMatch', 'You have reached the maximum number of guests', `${eventData?.placeName}`);
      return;
    }

    const getDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
    const uidData = getDoc.data();

    try {
      const updatedUsersList = eventData?.usersList?.map(user => {
        if (user.uid === uid) {
          return {
            // @ts-ignore
            ...user,
            status: APPROVED_STATUS,
          };
        }
        return user;
      });
      await firestore().collection(apiEventsCollection).doc(activeEvent).update({
        usersList: updatedUsersList,
      });

      showToast('inviteMatch', `Waiting for ${userGuest?.name} to accept your invitation`, 'Almost there!', {
        ownerPhoto: userGuest?.userPhoto,
        status: 'GUEST APPROVED',
      });
      if (uidData?.notificationSettings?.requests || uidData?.notificationSettings?.joinedEvent) {
        await sendNotification(uid, 'Request approved', 'Please confirm your attendence', 'Approve', 'Approved'.toUpperCase(), user);
      }
    } catch (e) {
      showToast('inviteMatch', 'An error occurred while approving the guest. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

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
      const currentUid = user?.uid === hostUid ? uid : user?.uid;

      const updatedUsersList = eventDataList?.usersList?.map(userItem => {
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
            `${user?.name} accepted your invitation`,
            'Invitation Accepted!',
            'Accepted',
            'Accepted'.toUpperCase(),
            user,
          );
          break;
        case NOT_ACCEPTED_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
          await sendNotification(uidHost, `${user?.name} rejected your invitation`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), user);
          break;
        case CANCEL_STATUS:
          showToast('inviteMatch', `You rejected ${placeName} event`, 'Not now', {
            ownerPhoto: hostPhoto,
            status: 'REJECTED'.toUpperCase(),
          });
          await sendNotification(uidHost, `${user?.name} rejected your invitation`, 'Not now.', 'Rejected', 'Rejected'.toUpperCase(), user);
        default:
          break;
      }
    } catch (e) {
      console.log('error update status guest', e);
      showToast('inviteMatch', 'An error occurred while updating the guest status. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

  const handleDeleteChat = async () => {
    try {
      const messageCollection = await firestore().collection(apiMessagesCollection).doc(activeEvent).get();
      const data = messageCollection.data();
      const currentUid = user?.uid === hostUid ? uid : user?.uid;
      const updatedChats = data?.chats?.filter((i: any) => i?.uid !== currentUid);
      await firestore().collection(apiMessagesCollection).doc(activeEvent).update({
        chats: updatedChats,
      });
      showToast('inviteMatch', `${title} was removed!`);
      navigation.goBack();
    } catch (e) {
      showToast('inviteMatch', 'An error occurred while deleting the chat. Please try again later.', 'Error');
      logErrorToSentry(e);
      console.error('error delete chat', e);
    }
  };

  const handleAcceptGuestFromGuest = async () => {
    const eventQuerySnapshot = await firestore().collection(apiEventsCollection).doc(activeEvent).get();
    const eventDataList = eventQuerySnapshot.data();
    if (!eventDataList?.usersList.length) {
      return;
    }

    const { allGuests, findAcceptedGuest } = await checkIsFullGuestsFun();

    if (findAcceptedGuest >= allGuests) {
      showToast('inviteMatch', 'Event is full', `${eventData?.placeName}`);
      return;
    }

    const getDoc = await firestore().collection(apiUserInfoCollection).doc(eventDataList?.uid).get();
    const docData = getDoc.data();

    try {
      const updatedUsersList = eventDataList?.usersList?.map(userItem => {
        if (userItem.uid === user?.uid) {
          return {
            // @ts-ignore
            ...userItem,
            status: ACCEPTED_STATUS,
          };
        }
        return userItem;
      });
      await firestore().collection(apiEventsCollection).doc(activeEvent).update({
        usersList: updatedUsersList,
      });
      showToast('inviteMatch', 'You succesfully accepted invitation', 'Invitation accepted!', {
        ownerPhoto: image,
        status: 'ACCEPTED',
      });
      if (docData?.notificationSettings?.joinedEvent) {
        await sendNotification(
          eventDataList?.uid,
          'Invitation Accepted!',
          `${user?.name} accepted your invitation`,
          'Accepted',
          'Accepted'.toUpperCase(),
          user,
        );
      }
    } catch (e) {
      showToast('inviteMatch', 'An error occurred while accepting the invitation. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };
  const getUserStatusButtonText = () => {
    if (!userGuest?.status) {
      return '';
    }
    if (uid === hostUid && userGuest?.status === INVITE_MATCH_STATUS) {
      return 'Waiting for invitation approved';
    }
    if (uid === hostUid && userGuest?.status === APPROVED_STATUS) {
      return 'Accept invitation';
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
    if (uid === hostUid && userGuest?.status === INVITE_MATCH_STATUS) {
      return true;
    }
    if (uid === hostUid && userGuest?.status === APPROVED_STATUS) {
      return false;
    }
    if (userGuest?.status === INVITE_MATCH_STATUS) {
      return false;
    }
    return true;
  };

  const handleActionPress = async () => {
    if (uid === hostUid && userGuest?.status === APPROVED_STATUS) {
      handleAcceptGuestFromGuest();
      setModalVisible && setModalVisible(false);
      return;
    }
    if (userGuest?.status === INVITE_MATCH_STATUS) {
      handleApproveGuestFromHost();
      setModalVisible && setModalVisible(false);
      return;
    }
  };

  const getButtonStyle = () => {
    if (uid === hostUid && userGuest?.status === APPROVED_STATUS) {
      return {
        backgroundColor: whiteColor,
        borderColor: whiteColor,
      };
    }
    if (uid === hostUid && userGuest?.status === INVITE_MATCH_STATUS) {
      return {
        backgroundColor: black1Color,
        borderColor: whiteColor,
        borderWidth: 1,
      };
    }
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
    if (uid === hostUid && userGuest?.status === APPROVED_STATUS) {
      return {
        color: blackColor,
      };
    }
    if (uid === hostUid && userGuest?.status === INVITE_MATCH_STATUS) {
      return {
        color: whiteColor,
      };
    }
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

  const RemovingUserModal = () => {
    return (
      <Modal
        isVisible={removingState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setRemovingState(false)}
        onSwipeComplete={() => setRemovingState(false)}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          zIndex: 999,
        }}
        swipeDirection={['down']}>
        <View style={styles.wrapper}>
          <View style={styles.whiteLine} />
          <View>
            <Image source={{ uri: image }} style={styles.userPhoto} />
            {/*{online && <View style={styles.greenCircle} />}*/}
            <View style={styles.greenCircle} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={styles.title}>{title}</Text>
            <FlashIcon width={19} height={19} />
          </View>
          <Text style={styles.textAreYouSure}>Are you sure you want to remove {title}?</Text>
          <Button
            onPress={() => {
              showToast('inviteMatch', `${title} was removed!`);
              setRemovingState(false);
              setModalVisible(false);
            }}
            title="Remove"
            buttonStyle={{ width: '100%', marginTop: 37, marginBottom: 6 }}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setRemovingState(false);
            }}
            title="Cancel"
            buttonStyle={{ width: '100%' }}
          />
        </View>
      </Modal>
    );
  };

  const CancelInvitationModal = () => {
    return (
      <Modal
        isVisible={cancelInvitationState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setCancelInvitationState(false)}
        onSwipeComplete={() => setCancelInvitationState(false)}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          zIndex: 999,
        }}
        swipeDirection={['down']}>
        <View style={styles.wrapperModal}>
          <View style={styles.whiteLine} />

          <View>
            <Image source={{ uri: image }} style={styles.userPhoto} />
            {/*{online && <View style={styles.greenCircle} />}*/}
            <View style={styles.greenCircle} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={styles.title}>{title}</Text>
            <FlashIcon width={19} height={19} />
          </View>
          <Text style={styles.textAreYouSure}>Are you sure you want to cancel invitation?</Text>
          <Button
            onPress={() => {
              showToast('inviteMatch', `${title} was removed!`);
              changeStatusGuestUsersList({
                status: CANCEL_STATUS,
                id: activeEvent,
                uidHost: uid,
                placeName: eventData?.placeName,
                hostPhoto: image,
              });
            }}
            title="Yes, cancel invitation"
            buttonStyle={{ width: '100%', marginTop: 37, marginBottom: 6 }}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setCancelInvitationState(false);
            }}
            title="Cancel"
            buttonStyle={{ width: '100%' }}
          />
        </View>
      </Modal>
    );
  };

  const DeleteChatModal = () => {
    return (
      <Modal
        isVisible={deleteChatState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setDeleteChatState(false)}
        onSwipeComplete={() => setDeleteChatState(false)}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          zIndex: 999,
        }}
        swipeDirection={['down']}>
        <View style={styles.wrapperModal}>
          <View style={styles.whiteLine} />

          <View>
            <Image source={{ uri: image }} style={styles.userPhoto} />
            {/*{online && <View style={styles.greenCircle} />}*/}
            <View style={styles.greenCircle} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={styles.title}>{title}</Text>
            <FlashIcon width={19} height={19} />
          </View>
          <Text style={styles.textAreYouSure}>Are you sure you want to delete chat?</Text>
          <Button
            onPress={() => {
              handleDeleteChat();
              setDeleteChatState(false);
              showToast('inviteMatch', `${title} was removed!`);
            }}
            title="Yes, delete chat"
            buttonStyle={{ width: '100%', marginTop: 37, marginBottom: 6 }}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setDeleteChatState(false);
            }}
            title="Cancel"
            buttonStyle={{ width: '100%' }}
          />
        </View>
      </Modal>
    );
  };

  const userProfileItemCard = (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      {image && <Image style={{ borderRadius: 100, width: 62, height: 62 }} source={{ uri: image }} />}
      <View style={{ marginLeft: 16, gap: 8, marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: Satoshi700, fontSize: RFValue(24, 812), color: whiteColor }}>{title}</Text>
          {<CheckStarIcon width={18} height={18} style={{ marginLeft: 4 }} />}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: whiteColor,
              borderRadius: 5,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}>
            <Text style={{ textTransform: 'capitalize', color: blackColor, fontFamily: Satoshi700, fontSize: RFValue(9, 812) }}>Guest</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <SafeAreaProvider>
        <Modal
          isVisible={isModalVisible}
          useNativeDriver={false}
          propagateSwipe={true}
          backdropColor={'rgba(0, 0, 0, 0.94)'}
          testID={'bottom-half-modal-open-button'}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
          swipeDirection={['down']}>
          <View style={styles.wrapper}>
            <View style={styles.whiteLine} />
            {/* UserProfileItem */}
            {userProfileItemCard}
            {/* gap */}
            <View style={{ height: 24 }} />
            {(userGuest?.status === ACCEPTED_STATUS || userGuest?.status === NOT_ACCEPTED_STATUS) && uid === hostUid ? null : (
              <View style={{ width: '100%' }}>
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
                  {userGuest?.status === ACCEPTED_STATUS && <CheckIcon style={{ marginLeft: 10 }} />}
                </TouchableOpacity>
              </View>
            )}
            <View style={{ height: 24 }} />
            <TouchableOpacity onPress={goToProfileView} style={[styles.buttonFooter, { borderTopWidth: 0 }]}>
              <User width={20} height={20} />
              <Text style={styles.textButton}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBlockAndReportState(true)}
              style={[styles.buttonFooter, userGuest?.status === ACCEPTED_STATUS && { borderBottomColor: gray1Color, borderBottomWidth: 1 }]}>
              <InfoIcon width={20} height={20} />
              <Text style={styles.textButton}>Block & Report</Text>
            </TouchableOpacity>
            {userGuest?.status !== NOT_ACCEPTED_STATUS && userGuest?.status !== CANCEL_STATUS && (
              <TouchableOpacity
                onPress={() => setCancelInvitationState(true)}
                style={[styles.buttonFooter, { borderBottomColor: gray1Color, borderBottomWidth: 1 }]}>
                <CloseIcon width={20} height={20} />
                <Text style={[styles.textButton, { color: errorColor }]}>Cancel invitation</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => setDeleteChatState(true)}
              style={[styles.buttonFooter, { borderBottomColor: gray1Color, borderBottomWidth: 1 }]}>
              <CloseIcon width={20} height={20} />
              <Text style={[styles.textButton, { color: errorColor }]}>Delete chat</Text>
            </TouchableOpacity>
            <View>
              <RemovingUserModal />
              <ModalReport
                handleCloseReport={handleCloseReport}
                modalReport={blockAndReportState}
                setModalReport={setBlockAndReportState}
                uidSender={user.uid}
                uid={uid}
                activeEvent={activeEvent}
              />
              <CancelInvitationModal />
              <DeleteChatModal />
            </View>
          </View>
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserMenu;
