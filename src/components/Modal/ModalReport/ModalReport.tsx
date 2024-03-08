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

interface ModalReportProps {
  modalReport?: boolean;
  setModalReport?: any;
}

const ModalReport: FC<ModalReportProps> = ({modalReport, setModalReport}) => {
  const styles = useStyles();
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
        <TouchableOpacity style={styles.firstButton}>
          <ProfileDeleteIcon style={styles.icon} />
          <Text style={styles.textFirstInReportButton}>Fake profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <BulyIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Rude or abusive behaviator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <SaveMinus style={styles.icon} />
          <Text style={styles.textInReportButton}>Inappropriate content</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <ScamIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Scam or commercial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <IndentityBasedIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Identity-based hate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MoreCircle style={styles.icon} />
          <Text style={styles.textInReportButton}>Off IO behaviator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <EightPlusIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>Underage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <EmojiSadIcon style={styles.icon} />
          <Text style={styles.textInReportButton}>I`m just not interested</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalReport;
