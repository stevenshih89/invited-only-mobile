import firestore from '@react-native-firebase/firestore';
import {MatchData} from 'screens/App/IO/screens/Match/Match';
import {showToast} from './showToast';
import {INVITE_MATCH_STATUS} from 'constants/common';
import Config from 'react-native-config';

export const handleCreateChat = async (matchedData: MatchData) => {
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const querySnapshot = await firestore().collection(apiEventsCollection).doc(matchedData.eventId).get();
  if (!querySnapshot.exists) {
    return;
  }
  const list = querySnapshot.data();

  try {
    const messageCollection = await firestore().collection(apiMessagesCollection).doc(list?.id).get();

    if (messageCollection?.data()) {
      const prevChats = messageCollection?.data()?.chats;
      const newChats = {
        avatar: matchedData.imageUri,
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
        invitedStatus: INVITE_MATCH_STATUS,
        messages: [],
        name: matchedData.nameGuest,
        superInvite: matchedData?.superInvite,
        uid: matchedData.uidGuest,
        hostUid: matchedData?.uidHost,
      };
      const chatExist = prevChats.find((chat: {uid: string}) => chat.uid === matchedData.uidGuest);
      if (chatExist) {
        return;
      }

      await firestore()
        .collection(apiMessagesCollection)
        .doc(list?.id)
        .update({
          chats: [...prevChats, newChats],
        });
    } else {
      const newChats = {
        avatar: matchedData.imageUri,
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
        invitedStatus: INVITE_MATCH_STATUS,
        messages: [],
        name: matchedData.nameGuest,
        superInvite: matchedData?.superInvite,
        uid: matchedData.uidGuest,
        hostUid: matchedData?.uidHost,
      };

      await firestore()
        .collection(apiMessagesCollection)
        .doc(list?.id)
        .set({
          activeEvent: list?.id,
          avatarGuest: matchedData.imageUri,
          avatarHost: matchedData?.userHostImageUri,
          chats: [newChats],
          inviteStatus: INVITE_MATCH_STATUS,
          nameGuest: matchedData.nameGuest,
          uidGuest: matchedData.uidGuest,
          uidHost: matchedData?.uidHost,
        });
    }
  } catch (e) {
    console.log('error create chat', e);
    showToast('inviteMatch', '', 'Error!');
  }
};
