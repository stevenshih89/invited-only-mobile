import React, {Dispatch, FC, SetStateAction} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

//import components
import Modal from 'react-native-modal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useStyles from 'components/Modal/ModalUserProfile/styles.ts';
import {screenHeight} from 'constants/common.ts';
import FlashIcon from 'assets/images/icons/flash.svg';
import InfoIcon from 'assets/images/icons/block_and_report.svg';

interface ModalUserProfileProps {
  isModalVisible?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
  image?: any;
  title?: string;
}

const ModalUserProfile: FC<ModalUserProfileProps> = ({title, image, isModalVisible, setModalVisible}) => {
  const styles = useStyles();
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
              <View style={styles.greenCircle} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: screenHeight / 80}}>
              <Text style={styles.title}>{title}</Text>
              <FlashIcon width={19} height={19} />
            </View>
            <TouchableOpacity onPress={() => setModalVisible && setModalVisible(false)} style={styles.buttonFooter}>
              <InfoIcon width={14} height={14} />
              <Text style={styles.textButton}>Block & Report</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserProfile;
