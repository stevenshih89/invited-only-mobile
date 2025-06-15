import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {useAppNavigation} from './useAppNavigation';
import useUser from 'src/hooks/user/useUser';
import {chatCorrespondencePath, commonStackPath} from 'constants/pathLocations';
import {showToast} from 'helpers/showToast';
import {sendNotification} from 'helpers/fcmHelper';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {APPROVED_STATUS, INVITE_MATCH_STATUS} from 'constants/common';
import {FirebaseCollectionsContext} from 'src/contexts/FirebaseCollectionNamesContext';

export const useMatch = (onCloseMatch: () => void, matchData: any) => {
  const {user: userHost, isLoading, error} = useUser();
  const navigation = useAppNavigation();
  const {
    events: apiEventsCollection,
    messages: apiMessagesCollection,
    userInfo: apiUserInfoCollection,
  } = useContext(FirebaseCollectionsContext);

  const handleCloseMatch = async () => {
    onCloseMatch();
    try {
      const messageCollection = await firestore().collection(apiMessagesCollection).doc(matchData?.eventId).get();
      const chatCheck = messageCollection?.data()?.chats?.find((i: any) => i?.uid === matchData.uidGuest);
      const chatDataHost = {
        image: chatCheck?.avatar,
        title: matchData.nameGuest,
        online: false,
        messages: chatCheck?.messages,
        activeEvent: matchData.eventId,
        id: chatCheck?.id,
        superInvite: chatCheck?.superInvite,
        invitedStatus: chatCheck?.invitedStatus,
        uid: chatCheck?.uid,
        hostUid: matchData.uidHost,
        path: 'chat',
      };

      const chatDataGuest = {
        image: matchData.userHostImageUri,
        title: matchData.nameHost,
        online: false,
        messages: chatCheck?.messages,
        activeEvent: matchData.eventId,
        id: chatCheck?.id,
        superInvite: chatCheck?.superInvite,
        invitedStatus: chatCheck?.invitedStatus,
        uid: matchData.uidHost,
        hostUid: matchData.uidHost,
        path: 'chat',
      };
      const isEventHost = userHost?.uid === matchData?.uidHost;
      const uidForNotification = isEventHost ? matchData?.uidGuest : matchData?.uidHost;
      const ownerPhoto = isEventHost ? matchData?.imageUri : matchData?.userHostImageUri;
      if (uidForNotification) {
        const getDoc = await firestore().collection(apiUserInfoCollection).doc(uidForNotification).get();
        const docData = getDoc.data();
        if (docData?.notificationSettings?.match) {
          await sendNotification(
            uidForNotification,
            'Say, Hi! 👋',
            'New connection!',
            'Connection',
            'Connection'.toUpperCase(),
            userHost,
            JSON.stringify({path: 'chat', data: isEventHost ? chatDataGuest : chatDataHost}),
          );
        }
      }
      showToast('inviteMatch', 'Say, Hi! 👋', 'New connection!', {
        ownerPhoto: ownerPhoto,
        status: 'CONNECTION',
        path: 'chat',
        params: isEventHost ? chatDataHost : chatDataGuest,
      });
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  const handleCreateChat = async () => {
    const querySnapshot = await firestore().collection(apiEventsCollection).doc(matchData.eventId).get();
    if (!querySnapshot.exists) {
      return;
    }
    const list = querySnapshot.data();

    try {
      const messageCollection = await firestore().collection(apiMessagesCollection).doc(list?.id).get();

      const chatCheck = messageCollection?.data()?.chats?.filter((i: any) => i?.uid === matchData.uidGuest)?.[0];

      const userHostQuery = await firestore().collection(apiUserInfoCollection).doc(matchData.uidHost).get();
      const userHostData = userHostQuery?.data();

      const activeEvent = messageCollection?.data()?.activeEvent;

      if (chatCheck) {
        const name = userHost?.accountType === 'host' ? matchData?.nameGuest : userHostData?.name;
        const image = userHost?.accountType === 'host' ? matchData?.imageUri : userHostData?.photos[0]?.image;
        const uid = userHost?.accountType === 'host' ? matchData?.uidGuest : userHostData?.uid;
        navigation.navigate(commonStackPath, {
          screen: chatCorrespondencePath,
          params: {
            image: image,
            title: name,
            online: false,
            messages: chatCheck?.messages,
            activeEvent: activeEvent,
            id: chatCheck?.id,
            superInvite: chatCheck?.superInvite,
            invitedStatus: chatCheck?.invitedStatus,
            hostUid: userHostData?.uid,
            uid: uid,
          },
        });
        handleCloseMatch();
      } else {
        if (messageCollection?.data()) {
          const prevChats = messageCollection?.data()?.chats;
          const newChats = {
            avatar: matchData.imageUri,
            id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
            invitedStatus: INVITE_MATCH_STATUS,
            messages: [],
            name: matchData.nameGuest,
            superInvite: matchData?.superInvite,
            uid: matchData.uidGuest,
            hostUid: userHost?.uid,
          };
          await firestore()
            .collection(apiMessagesCollection)
            .doc(list?.id)
            .update({
              chats: [...prevChats, newChats],
            });

          const name = userHost?.accountType === 'host' ? matchData?.nameGuest : userHostData?.name;
          const image = userHost?.accountType === 'host' ? matchData?.imageUri : userHostData?.photos[0]?.image;
          const uid = userHost?.accountType === 'host' ? matchData?.uidGuest : userHostData?.uid;
          navigation.navigate(commonStackPath, {
            screen: chatCorrespondencePath,
            params: {
              image: image,
              title: name,
              online: false,
              messages: [],
              activeEvent: activeEvent,
              id: newChats?.id,
              superInvite: newChats?.superInvite,
              invitedStatus: newChats?.invitedStatus,
              hostUid: userHostData?.uid,
              uid: uid,
            },
          });

          handleCloseMatch();
        } else {
          const id = list?.id;

          await firestore().collection(apiMessagesCollection).doc(id).set({
            activeEvent: id,
            avatarGuest: matchData.imageUri,
            avatarHost: userHost?.photos?.[0]?.image,
            chats: [],
            inviteStatus: INVITE_MATCH_STATUS,
            nameGuest: matchData.nameGuest,
            uidGuest: matchData.uidGuest,
            uidHost: userHost?.uid,
          });

          const newChats = {
            avatar: matchData.imageUri,
            id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
            invitedStatus: INVITE_MATCH_STATUS,
            messages: [],
            name: matchData.nameGuest,
            superInvite: matchData?.superInvite === 'true' ? true : false,
            uid: matchData.uidGuest,
            hostUid: userHost?.uid,
          };

          await firestore()
            .collection(apiMessagesCollection)
            .doc(id)
            .update({
              chats: [newChats],
            });

          const name = userHost?.accountType === 'host' ? matchData?.nameGuest : userHostData?.name;
          const image = userHost?.accountType === 'host' ? matchData?.imageUri : userHostData?.photos?.[0]?.image;
          const uid = userHost?.accountType === 'host' ? matchData?.uidGuest : userHostData?.uid;

          navigation.navigate(commonStackPath, {
            screen: chatCorrespondencePath,
            params: {
              image: image,
              title: name,
              online: false,
              messages: [],
              activeEvent: id,
              id: newChats?.id,
              superInvite: newChats?.superInvite,
              invitedStatus: newChats?.invitedStatus,
              hostUid: userHostData?.uid,
              uid: uid,
            },
          });

          handleCloseMatch();
        }
      }
    } catch (e) {
      // console.log(e);
      showToast('basic', 'There was an issue creating the chat. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

  const handleApproveGuestFromHost = async () => {
    try {
      if (!userHost || !userHost.uid || !userHost.name || !userHost.gender || !userHost.photos) {
        console.warn('handleApproveGuestFromHost: User data incomplete.');
        return;
      }

      const user = {
        gender: userHost.gender,
        name: userHost.name,
        status: APPROVED_STATUS,
        superInvite: false,
        uid: userHost.uid,
        userPhoto: userHost.photos[0]?.image,
      };

      const eventQuerySnapshot = await firestore().collection(apiEventsCollection).doc(matchData.eventId).get();
      if (eventQuerySnapshot.exists) {
        const usersList = eventQuerySnapshot.data()?.usersList || [];
        const updatedUsersList = usersList.map((item: any) => {
          if (item.uid === matchData.uidGuest) {
            return {...item, status: APPROVED_STATUS};
          }
          return item;
        });

        await firestore().collection(apiEventsCollection).doc(matchData.eventId).update({
          usersList: updatedUsersList,
        });

        const guestData = (await firestore().collection(apiUserInfoCollection).doc(matchData.uidGuest).get()).data();
        if (guestData?.notificationSettings?.requests) {
          await sendNotification(
            matchData.uidGuest,
            "You're in!",
            'Your host approved your request.',
            'request',
            'Request approved'.toUpperCase(),
            user,
          );
        }
        onCloseMatch();
      }
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  return {
    handleCloseMatch,
    userHost,
    handleApproveGuestFromHost,
    handleCreateChat,
  };
};
