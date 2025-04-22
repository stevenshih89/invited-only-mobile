import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

//import components
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import useStyles from 'components/Modal/ModalReport/styles.ts';

//import icons
import BulyIcon from 'assets/images/icons/buly.svg';
import ProfileDeleteIcon from 'assets/images/icons/profile-delete.svg';
import SaveMinus from 'assets/images/icons/save-minus.svg';
import ScamIcon from 'assets/images/icons/scam.svg';
import IndentityBasedIcon from 'assets/images/icons/identity-based.svg';
import MoreCircle from 'assets/images/icons/more-circle.svg';
import EightPlusIcon from 'assets/images/icons/18+.svg';
import EmojiSadIcon from 'assets/images/icons/emoji-sad.svg';
import {showToast} from 'helpers/showToast.ts';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

interface ModalReportProps {
  modalReport?: boolean;
  setModalReport?: any;
  uidSender?: string;
  uid?: string;
  handleAutoSwipeLeft?: () => void;
}

const ModalReport: FC<ModalReportProps> = ({modalReport, setModalReport, uidSender, uid, handleAutoSwipeLeft, handleCloseReport}) => {
  const styles = useStyles();
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';

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
              event.usersList.some(userItem => userItem.uid === currUid) ||
              event.requestsList.some(userItem => userItem.uid === currUid)
            ) {
              return true;
            }
            return false;
          }) || [];

        for (const event of filteredEvents) {
          const userInUsersList = event.usersList.find(userItem => userItem.uid === currUid);
          const userInRequestsList = event.requestsList.find(userItem => userItem.uid === currUid);

          const data = {
            usersList: userInUsersList ? firestore.FieldValue.arrayRemove(userInUsersList) : event.usersList,
            requestsList: userInRequestsList ? firestore.FieldValue.arrayRemove(userInRequestsList) : event.requestsList,
          };

          await firestore().collection(apiEventsCollection).doc(event.id).update(data);
        }
      }
      const chatsList = await firestore().collection(apiMessagesCollection).where('uidHost', '==', currSenderUid).get();
      if (!chatsList.empty) {
        const chatsListData = chatsList.docs.map(doc => ({id: doc.id, ...doc.data()}));
        const filteredChats =
          chatsListData.filter(chat => {
            if (chat.chats.some(chatItem => chatItem.uid === currUid)) {
              return true;
            }
            return false;
          }) || [];

        for (const chat of filteredChats) {
          const removedChat = chat.chats.filter(chatItem => chatItem.uid !== currUid);

          await firestore().collection(apiMessagesCollection).doc(chat.id).update({
            chats: removedChat,
          });
        }
      }

      handleAutoSwipeLeft && handleAutoSwipeLeft();

      handleCloseReport && handleCloseReport();

      showToast('inviteMatch', `${dataUserUid?.name} was reported`, 'Thank you!', {
        ownerPhoto: dataUserUid?.photos[0].image,
        status: 'SUCCESSFUL',
      });
      setModalReport(false);
    } catch (e) {
      showToast('inviteMatch', 'Something went wrong while processing your report. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

  return (
    <Modal
      isVisible={modalReport}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => setModalReport(false)}
      onSwipeComplete={() => setModalReport(false)}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <Text style={styles.textReport}>Report</Text>
        <TouchableOpacity onPress={() => handleSendReport('Fake profile')} style={styles.firstButton}>
          <ProfileDeleteIcon style={styles.icon} />
          <Text style={styles.textFirstInReportButton}>Fake profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendReport('Rude or abusive behaviator')} style={styles.button}>
          <BulyIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Rude or abusive behaviator</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendReport('Inappropriate content')} style={styles.button}>
          <SaveMinus style={styles.icon} />
          <Text style={styles.textInReportButton}>Inappropriate content</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendReport('Scam or commercial')} style={styles.button}>
          <ScamIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Scam or commercial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendReport('Identity-based hate')} style={styles.button}>
          <IndentityBasedIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Identity-based hate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendReport('Off IO behaviator')} style={styles.button}>
          <MoreCircle style={styles.icon} />
          <Text style={styles.textInReportButton}>Off IO behaviator</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendReport('Underage')} style={styles.button}>
          <EightPlusIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Underage</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendReport('I`m just not interested')} style={styles.button}>
          <EmojiSadIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>I`m just not interested</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalReport;
