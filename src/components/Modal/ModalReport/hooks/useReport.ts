import Config from 'react-native-config';
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {showToast} from 'helpers/showToast';
import {components} from 'src/api/v1';

interface UseReportProps {
  uidSender?: string;
  uid?: string;
  handleAutoSwipeLeft?: () => void;
  setModalReport?: (value: boolean) => void;
}

export const useReport = ({uidSender, uid, handleAutoSwipeLeft, setModalReport}: UseReportProps) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';

  const [activeReport, setActiveReport] = useState<string>('');

  const handleSendReport = async (typeReport: string): Promise<void> => {
    const infoUserUidDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
    const infoUserUidSenderDoc = await firestore().collection(apiUserInfoCollection).doc(uidSender).get();

    if (!infoUserUidDoc.exists || !infoUserUidSenderDoc.exists || !uid) {
      return;
    }
    const dataUserUid = infoUserUidDoc.data();
    const dataUserUidSender = infoUserUidSenderDoc.data();
    try {
      await firestore().collection('report').add({
        typeReport: typeReport,
        uid: uid,
        uidSender: uidSender,
        name: dataUserUid?.name,
        nameSender: dataUserUidSender?.name,
        photo: dataUserUid?.photos[0].image,
        photoSender: dataUserUidSender?.photos[0].image,
        phone: dataUserUid?.phoneNumber,
        phoneSender: dataUserUidSender?.phoneNumber,
      });

      analytics().logEvent('report_user', {
        typeReport: typeReport,
        uid: uid,
        uidSender: uidSender,
      });

      const isHost = dataUserUidSender?.accountType?.toLowerCase() === 'host';

      const currSenderUid = isHost ? uidSender : uid;
      const currUid = isHost ? uid : uidSender;

      const eventsList = await firestore().collection(apiEventsCollection).where('uid', '==', currSenderUid).get();
      if (!eventsList.empty) {
        const eventsListData = eventsList.docs.map(doc => doc.data());

        const filteredEvents =
          eventsListData.filter(event => {
            if (
              event.usersList.some((userItem: components['schemas']['EventUser']) => userItem.uid === currUid) ||
              event.requestsList.some((userItem: components['schemas']['EventUser']) => userItem.uid === currUid)
            ) {
              return true;
            }
            return false;
          }) || [];

        for (const event of filteredEvents) {
          const userInUsersList = event.usersList.find((userItem: components['schemas']['EventUser']) => userItem.uid === currUid);
          const userInRequestsList = event.requestsList.find((userItem: components['schemas']['EventUser']) => userItem.uid === currUid);

          const data = {
            usersList: userInUsersList ? firestore.FieldValue.arrayRemove(userInUsersList) : event.usersList,
            requestsList: userInRequestsList ? firestore.FieldValue.arrayRemove(userInRequestsList) : event.requestsList,
          };

          await firestore().collection(apiEventsCollection).doc(event.id).update(data);
        }
      }
      const chatsList = await firestore().collection(apiMessagesCollection).where('uidHost', '==', currSenderUid).get();
      if (!chatsList.empty) {
        const chatsListData = chatsList.docs.map((doc: {id: string; data: () => any}) => ({id: doc.id, ...doc.data()}));
        const filteredChats =
          chatsListData.filter(chat => {
            if (chat.chats.some((chatItem: {uid: string}) => chatItem.uid === currUid)) {
              return true;
            }
            return false;
          }) || [];

        for (const chat of filteredChats) {
          const removedChat = chat.chats.filter((chatItem: {uid: string}) => chatItem.uid !== currUid);

          await firestore().collection(apiMessagesCollection).doc(chat.id).update({
            chats: removedChat,
          });
        }
      }

      handleAutoSwipeLeft && handleAutoSwipeLeft();

      showToast('inviteMatch', `${dataUserUid?.name} was reported`, 'Thank you!', {
        ownerPhoto: dataUserUid?.photos[0].image,
        status: 'SUCCESSFUL',
      });
      setModalReport && setModalReport(false);
    } catch (e) {
      showToast('inviteMatch', 'Something went wrong while processing your report. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

  const handleChangeReport = (report: string) => {
    setActiveReport(report);
  };

  return {
    activeReport,
    handleChangeReport,
    handleSendReport,
  };
};
