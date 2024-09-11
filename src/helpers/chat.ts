import firestore from '@react-native-firebase/firestore';
import {MatchData} from 'screens/App/IO/screens/Match/Match';
import {showToast} from './showToast';

export const handleCreateChat = async (matchedData: MatchData) => {
  const querySnapshot = await firestore().collection('Events').doc(matchedData.eventId).get();
  if (!querySnapshot.exists) {
    return;
  }
  const list = querySnapshot.data();

  try {
    const messageCollection = await firestore().collection('messages').doc(list?.id).get();

    if (messageCollection?.data()) {
      const prevChats = messageCollection?.data()?.chats;
      const newChats = {
        avatar: matchedData.imageUri,
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
        invitedStatus: 'invite_match',
        messages: [],
        name: matchedData.name,
        superInvite: matchedData?.superInvite,
        uid: matchedData.uidGuest,
        hostUid: matchedData?.uidHost,
      };
      await firestore()
        .collection('messages')
        .doc(list?.id)
        .update({
          chats: [...prevChats, newChats],
        });
    } else {
      const newChats = {
        avatar: matchedData.imageUri,
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
        invitedStatus: 'invite_match',
        messages: [],
        name: matchedData.name,
        superInvite: matchedData?.superInvite,
        uid: matchedData.uidGuest,
        hostUid: matchedData?.uidHost,
      };

      await firestore()
        .collection('messages')
        .doc(list?.id)
        .set({
          activeEvent: list?.id,
          avatarGuest: matchedData.imageUri,
          avatarHost: matchedData?.userHostImageUri,
          chats: [newChats],
          inviteStatus: 'invite_match',
          nameGuest: matchedData.name,
          uidGuest: matchedData.uidGuest,
          uidHost: matchedData?.uidHost,
        });
    }
  } catch (e) {
    // console.log(e);
    showToast('inviteMatch', '', 'Error!');
  }
};
