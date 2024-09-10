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
  sortEventsByReport: (uid: string) => void;
  handleAutoSwipeLeft: () => void;
}

const ModalReport: FC<ModalReportProps> = ({modalReport, setModalReport, uidSender, uid, sortEventsByReport, handleAutoSwipeLeft}) => {
  const styles = useStyles();  
  const handleSendReport = async (typeReport: string): Promise<void> => {
    try {
      const infoUserUidDoc = await firestore().collection('userInfo').doc(uid).get();
      const infoUserUidSenderDoc = await firestore().collection('userInfo').doc(uidSender).get();
      const dataUserUid = infoUserUidDoc.data();
      const dataUserUidSender = infoUserUidSenderDoc.data();
  
      if (!dataUserUid || !dataUserUidSender) {
        throw new Error('User data is missing');
      }
  
      const userPhoto = dataUserUid.photos && dataUserUid.photos.length > 0 ? dataUserUid.photos[0].image : null;
      const senderPhoto = dataUserUidSender.photos && dataUserUidSender.photos.length > 0 ? dataUserUidSender.photos[0].image : null;
  
      const userReports = dataUserUid.reports || [];
    
      await firestore().collection('report').add({
        typeReport: typeReport,
        uid: uid,
        uidSender: uidSender,
        name: dataUserUid.name,
        nameSender: dataUserUidSender.name,
        photo: userPhoto,
        photoSender: senderPhoto,
        phone: dataUserUid.phoneNumber,
        phoneSender: dataUserUidSender.phoneNumber,
      });
      await firestore().collection('userInfo').doc(uid).update({
        reports: [...userReports, uidSender],
      });

      showToast('inviteMatch', `${dataUserUid.name} was reported`, 'Thank you!', {ownerPhoto: userPhoto, status: 'SUCCESSFUL'});
      setModalReport(false);

      setTimeout(() => {
        handleAutoSwipeLeft()
      }, 200);

      setTimeout(() => {
        sortEventsByReport(uid);
      }, 1000);
    } catch (e) {
      console.log('error handleSendReport', e);
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
