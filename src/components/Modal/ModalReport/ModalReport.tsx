import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

//import components
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
import firestore from '@react-native-firebase/firestore';

interface ModalReportProps {
  modalReport?: boolean;
  setModalReport?: any;
  uidSender?: string;
  uid?: string;
  activeEvent?: string;
  handleAutoSwipeLeft?: () => void;
}

const ModalReport: FC<ModalReportProps> = ({modalReport, setModalReport, uidSender, uid, activeEvent, handleAutoSwipeLeft}) => {
  const styles = useStyles();

  // const deleteChat = async (uidItem: string) => {
  //   try {
  //     const chat = await firestore().collection('messages').doc(activeEvent).get();

  //     const chatsList = chat.data()?.chats;

  //     const updatedChats = chatsList.filter((chatItem: {uid: string}) => chatItem.uid !== uidItem);

  //     firestore().collection('messages').doc(activeEvent).update({
  //       chats: updatedChats,
  //     });
  //   } catch (error) {
  //     console.log('error delete messages', error);
  //   }
  // };

  const handleSendReport = async (typeReport: string): Promise<void> => {
    const infoUserUidDoc = await firestore().collection('userInfo').doc(uid).get();
    const infoUserUidSenderDoc = await firestore().collection('userInfo').doc(uidSender).get();

    if (!infoUserUidDoc.exists || !infoUserUidSenderDoc.exists || !uid || !activeEvent) {
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

      const isHost = dataUserUidSender?.accountType?.toLowerCase() === 'host';
      if (isHost) {
        const eventsList = await firestore().collection('Events').where('uid', '==', uidSender).get();
        if (!eventsList.empty) {
          const eventsListData = eventsList.docs.map(doc => doc.data());

          const filteredEvents =
            eventsListData.filter(event => {
              if (event.usersList.some(userItem => userItem.uid === uid) || event.requestsList.some(userItem => userItem.uid === uid)) {
                return true;
              }
              return false;
            }) || [];

          for (const event of filteredEvents) {
            const userInUsersList = event.usersList.find(userItem => userItem.uid === uid);
            const userInRequestsList = event.requestsList.find(userItem => userItem.uid === uid);

            const data = {
              usersList: userInUsersList ? firestore.FieldValue.arrayRemove(userInUsersList) : event.usersList,
              requestsList: userInRequestsList ? firestore.FieldValue.arrayRemove(userInRequestsList) : event.requestsList,
            };

            await firestore().collection('Events').doc(event.id).update(data);
          }
        }
        const chatsList = await firestore().collection('messages').where('uidHost', '==', uidSender).get();
        if (!chatsList.empty) {
          const chatsListData = chatsList.docs.map(doc => ({id: doc.id, ...doc.data()}));
          const filteredChats =
            chatsListData.filter(chat => {
              if (chat.chats.some(chatItem => chatItem.uid === uid)) {
                return true;
              }
              return false;
            }) || [];

          for (const chat of filteredChats) {
            const removedChat = chat.chats.filter(chatItem => chatItem.uid !== uid);

            await firestore().collection('messages').doc(chat.id).update({
              chats: removedChat,
            });
          }
        }
      } else {
      }

      handleAutoSwipeLeft && handleAutoSwipeLeft();

      showToast('inviteMatch', `${dataUserUid?.name} was reported`, 'Thank you!', {
        ownerPhoto: dataUserUid?.photos[0].image,
        status: 'SUCCESSFUL',
      });
      setModalReport(false);
    } catch (e) {
      showToast('inviteMatch', '', 'Error!');
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
