import React, {FC, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//import components
import useStyles from 'components/Modal/ModalUserMenu/styles.ts';
import {screenHeight} from 'constants/common.ts';
import Button from 'components/Button/Button.tsx';
import {gray1Color, lightGray12Color} from 'constants/colors.ts';
import {showToast} from 'helpers/showToast.ts';

//import icons
import CloseIcon from 'assets/images/icons/close-circle.svg';
import InfoCircle from 'assets/images/icons/info-circle-fill.svg';
import Arrow from 'assets/images/icons/arrow-3.svg';
import FlashIcon from 'assets/images/icons/flash.svg';

interface ModalUserMenuProps {
  isModalVisible: boolean;
  setModalVisible: boolean | any;
  title: string;
  approve: boolean;
  image: any;
}

const ModalUserMenu: FC<ModalUserMenuProps> = ({isModalVisible, setModalVisible, title, approve, image}) => {
  const [removingState, setRemovingState] = useState<boolean>(false);
  const [blockAndReportState, setBlockAndReportState] = useState<boolean>(false);
  const [cancelInvitationState, setCancelInvitationState] = useState<boolean>(false);
  const styles = useStyles();

  const RemovingUserModal = () => {
    return (
      <Modal
        isVisible={removingState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setRemovingState(false)}
        onSwipeComplete={() => setRemovingState(false)}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          zIndex: 999,
        }}
        swipeDirection={['down']}>
        <View style={styles.wrapper}>
          <View style={styles.whiteLine} />

          <View>
            <Image source={image} style={styles.userPhoto} />
            {/*{online && <View style={styles.greenCircle} />}*/}
            <View style={styles.greenCircle} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={styles.title}>{title}</Text>
            <FlashIcon width={19} height={19} />
          </View>
          <Text style={styles.textAreYouSure}>Are you sure you want to remove {title}?</Text>
          <Button
            onPress={() => {
              showToast('pending', `${title} was removed!`);
              setRemovingState(false);
              setModalVisible(false);
            }}
            title="Remove"
            buttonStyle={{width: '100%', marginTop: 37, marginBottom: 6}}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setRemovingState(false);
            }}
            title="Cancel"
            buttonStyle={{width: '100%'}}
          />
        </View>
      </Modal>
    );
  };

  const CancelInvitationModal = () => {
    return (
      <Modal
        isVisible={cancelInvitationState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setCancelInvitationState(false)}
        onSwipeComplete={() => setCancelInvitationState(false)}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          zIndex: 999,
        }}
        swipeDirection={['down']}>
        <View style={styles.wrapperModal}>
          <View style={styles.whiteLine} />

          <View>
            <Image source={image} style={styles.userPhoto} />
            {/*{online && <View style={styles.greenCircle} />}*/}
            <View style={styles.greenCircle} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={styles.title}>{title}</Text>
            <FlashIcon width={19} height={19} />
          </View>
          <Text style={styles.textAreYouSure}>Are you sure you want to cancel invitation?</Text>
          <Button
            onPress={() => {
              showToast('pending', `${title} was removed!`);
              setCancelInvitationState(false);
              setModalVisible(false);
            }}
            title="Yes, cancel invitation"
            buttonStyle={{width: '100%', marginTop: 37, marginBottom: 6}}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setCancelInvitationState(false);
            }}
            title="Cancel"
            buttonStyle={{width: '100%'}}
          />
        </View>
      </Modal>
    );
  };

  const BlockAndReportModal = () => {
    return (
      <Modal
        isVisible={blockAndReportState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setBlockAndReportState(false)}
        onSwipeComplete={() => setBlockAndReportState(false)}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          zIndex: 999,
        }}
        swipeDirection={['down']}>
        <View style={styles.wrapperBlockAndReport}>
          <View style={styles.whiteLine} />

          <Text style={styles.textBlockAndReport}>Block and report</Text>
          <Button
            variant="default"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'Fake profile'}
            buttonStyle={{width: '100%', marginTop: 34, alignItems: 'flex-start'}}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'Rude or abusive behaviator'}
            buttonStyle={styles.transparentButton}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'Inappropriate content'}
            buttonStyle={styles.transparentButton}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'Scam or commercial'}
            buttonStyle={styles.transparentButton}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'Identity-based hate'}
            buttonStyle={styles.transparentButton}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'Off IO behaviator'}
            buttonStyle={styles.transparentButton}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'Underage'}
            buttonStyle={styles.transparentButton}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setBlockAndReportState(false);
              setModalVisible(false);
            }}
            title={'I`m just not interested'}
            buttonStyle={styles.transparentButton}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <SafeAreaProvider>
        <Modal
          isVisible={isModalVisible}
          useNativeDriver={false}
          propagateSwipe={true}
          backdropColor={'rgba(0, 0, 0, 0.94)'}
          testID={'bottom-half-modal-open-button'}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
          swipeDirection={['down']}>
          <View style={styles.wrapper}>
            <View style={styles.whiteLine} />

            <View>
              <Image source={image} style={styles.userPhoto} />
              {/*{online && <View style={styles.greenCircle} />}*/}
              <View style={styles.greenCircle} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: screenHeight / 80}}>
              <Text style={styles.title}>{title}</Text>
              <FlashIcon width={19} height={19} />
            </View>
            {!approve && (
              <View style={{backgroundColor: lightGray12Color, borderRadius: 4, marginTop: screenHeight / 80, marginBottom: 34}}>
                <Text style={styles.textPending}>Pending</Text>
              </View>
            )}
            {approve && (
              <Button
                onPress={() => {
                  showToast('pending', 'Invitation approved!');
                  setModalVisible(false);
                }}
                title="Approve invitation"
                buttonStyle={{width: '100%', marginTop: 37, marginBottom: 34}}
              />
            )}
            <TouchableOpacity onPress={() => setRemovingState(true)} style={styles.buttonFooter}>
              <Arrow width={14} height={14} />
              <Text style={styles.textButton}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBlockAndReportState(true)}
              style={[styles.buttonFooter, approve && {borderBottomColor: gray1Color, borderBottomWidth: 1}]}>
              <InfoCircle width={14} height={14} />
              <Text style={styles.textButton}>Report</Text>
            </TouchableOpacity>
            {!approve && (
              <TouchableOpacity
                onPress={() => setCancelInvitationState(true)}
                style={[styles.buttonFooter, {borderBottomColor: gray1Color, borderBottomWidth: 1}]}>
                <CloseIcon width={14} height={14} />
                <Text style={styles.textButton}>Cancel invitation</Text>
              </TouchableOpacity>
            )}
            <RemovingUserModal />
            <BlockAndReportModal />
            <CancelInvitationModal />
          </View>
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserMenu;
