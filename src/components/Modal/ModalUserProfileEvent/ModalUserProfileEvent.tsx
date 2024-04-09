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
import {commonStackPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import {useUser} from '../../../store/userStore';

interface ModalUserProfileEventProps {
  isModalVisible?: boolean;
  modalReport?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
  setModalReport?: Dispatch<SetStateAction<boolean>>;
  image?: any;
  title?: string;
  uid?: string;
}

const ModalUserProfileEvent: FC<ModalUserProfileEventProps> = ({uid, title, image, isModalVisible, setModalVisible, modalReport, setModalReport}) => {
  const styles = useStyles();

  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);

  const goToProfileView = () => {
    if (setModalVisible) {
      setModalVisible(false);
      navigation.navigate(commonStackPath, {
        screen: myProfileViewPath,
        params: {
          uid: uid,
        },
      });
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
            <TouchableOpacity onPress={() => setModalVisible && setModalVisible(false)} style={styles.buttonFooter}>
              <ChatIcon width={14} height={14} />
              <Text style={styles.textButton}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalReport(true);
              }}
              style={styles.buttonFooter}>
              <ReportIcon width={14} height={14} />
              <Text style={styles.textButton}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible && setModalVisible(false)} style={styles.buttonFooter}>
              <CloseIcon width={14} height={14} />
              <Text style={styles.textButton}>Cancel invitation</Text>
            </TouchableOpacity>
          </View>
          <ModalReport modalReport={modalReport} setModalReport={setModalReport} uidSender={user?.uid} uid={uid} />
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserProfileEvent;
