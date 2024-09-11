import React, {Dispatch, FC, SetStateAction, useCallback, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//import components
import useStyles from 'components/Modal/ModalUserMenu/styles.ts';
import Button from 'components/Button/Button.tsx';
import {black1Color, black2Color, blackColor, errorColor, gray1Color, grayScale700, whiteColor} from 'constants/colors.ts';
import {showToast} from 'helpers/showToast.ts';

//import icons
import CloseIcon from 'assets/images/icons/close-circle-red.svg';
import InfoIcon from 'assets/images/icons/info-circle-white.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import User from 'assets/images/icons/user.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {commonStackPath, myProfileViewPath} from 'constants/pathLocations';
import {screenHeight, screenWidth} from 'constants/common';
import firestore from '@react-native-firebase/firestore';
import {useUser} from 'src/store/userStore';
import {sendNotification} from 'helpers/fcmHelper';

interface ModalUserMenuProps {
  isModalVisible: boolean;
  setModalVisible: boolean | any;
  title: string;
  inviteStatus: string;
  image: any;
  uid: string;
  hostUid: string;
  checkIsFullGuestsFun: () => Promise<boolean>;
  setIsVisibleModalFullEvent: Dispatch<SetStateAction<boolean>>;
}

const BlockAndReportModal = ({blockAndReportState, setBlockAndReportState, reportState, setReportState, setModalVisible}) => {
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
      <View
        style={{
          backgroundColor: black2Color,
          height: '75%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          alignItems: 'center',
          paddingHorizontal: screenWidth / 30,
        }}>
        <View
          style={{
            backgroundColor: whiteColor,
            height: 2,
            width: 40,
            marginTop: screenHeight / 50,
            marginBottom: screenHeight / 48,
            borderRadius: 10,
          }}
        />
        <Text style={{marginTop: screenHeight / 38, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812)}}>Report</Text>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'Fake profile' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('Fake profile');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Fake profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'Rude or abusive behaviator' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('Rude or abusive behaviator');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Rude or abusive behaviator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'Inappropriate content' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('Inappropriate content');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Inappropriate content</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'Scam or commercial' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('Scam or commercial');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Scam or commercial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'Identity-based hate' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('Identity-based hate');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Identity-based hate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'Off IO behaviator' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('Off IO behaviator');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Off IO behaviator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'Underage' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('Underage');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Underage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: reportState === 'I`m just not interested' ? '#313131' : 'transparent',
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 20,
            width: '100%',
          }}
          onPress={() => {
            setReportState('I`m just not interested');
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>I`m just not interested</Text>
        </TouchableOpacity>
        <Button
          title="Send"
          buttonStyle={{width: '100%'}}
          onPress={() => {
            setModalVisible(false);
            setBlockAndReportState(false);
          }}
        />
      </View>
    </Modal>
  );
};

const ModalUserMenu: FC<ModalUserMenuProps> = ({
  isModalVisible,
  setModalVisible,
  title,
  inviteStatus,
  image,
  uid,
  activeEvent,
  hostUid,
  checkIsFullGuestsFun,
  setIsVisibleModalFullEvent,
}) => {
  const [removingState, setRemovingState] = useState<boolean>(false);
  const [blockAndReportState, setBlockAndReportState] = useState<boolean>(false);
  const [cancelInvitationState, setCancelInvitationState] = useState<boolean>(false);
  const [reportState, setReportState] = useState('Fake profile');
  const [usersList, setUserList] = useState([]);
  const [eventData, setEventData] = useState({usersList: []});
  const styles = useStyles();

  const user = useUser((state: any) => state.user);

  const userGuest =
    uid === hostUid
      ? eventData.usersList?.filter((i: any) => i?.uid === user?.uid)[0]
      : eventData.usersList?.filter((i: any) => i?.uid === uid)[0];

  const navigation = useNavigation();

  const goToProfileView = () => {
    setModalVisible(false);
    // @ts-ignore
    navigation.navigate(commonStackPath, {
      screen: myProfileViewPath,
      params: {
        uid: uid,
        isShowEditButton: false,
      },
    });
  };

  const getUsersList = async () => {
    try {
      const eventQuerySnapshot = await firestore().collection('Events').doc(activeEvent).get();
      if (eventQuerySnapshot.exists) {
        const data = eventQuerySnapshot.data();
        setEventData(data);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isModalVisible) {
        getUsersList();
      }
    }, [isModalVisible]),
  );

  const handleApproveGuestFromHost = async () => {
    if (!eventData?.usersList.length) {
      return;
    }
    try {
      const updatedUsersList = eventData?.usersList?.map(user => {
        if (user.uid === uid) {
          return {
            // @ts-ignore
            ...user,
            status: 'approved',
          };
        }
        return user;
      });
      await firestore().collection('Events').doc(activeEvent).update({
        usersList: updatedUsersList,
      });
      showToast('inviteMatch', `Waiting for ${userGuest?.name} to accept your invitation`, 'Almost there!', {
        ownerPhoto: userGuest?.imagePhoto,
        status: 'GUEST APPROVED',
      });
      await sendNotification(uid, 'Request approved', 'Please confirm your attendence', 'Approve', 'Approved'.toUpperCase(), user);
    } catch (e) {
      // console.log(e);
    }
  };
  const handleAcceptGuestFromGuest = async () => {
    const eventQuerySnapshot = await firestore().collection('Events').doc(activeEvent).get();
    const eventDataList = eventQuerySnapshot.data();
    if (!eventDataList?.usersList.length) {
      return;
    }

    try {
      const updatedUsersList = eventDataList?.usersList?.map(userItem => {
        if (userItem.uid === user?.uid) {
          return {
            // @ts-ignore
            ...userItem,
            status: 'accepted',
          };
        }
        return userItem;
      });
      await firestore().collection('Events').doc(activeEvent).update({
        usersList: updatedUsersList,
      });
      await sendNotification(
        eventDataList?.uid,
        'Invitation Accepted!',
        `${user?.name} accepted your invitation`,
        'Accepted',
        'Accepted'.toUpperCase(),
        user,
      );
    } catch (e) {
      // console.log(e);
    }
  };
  const getUserStatusButtonText = () => {
    if (!userGuest?.status) {
      return '';
    }
    if (uid === hostUid && userGuest?.status === 'approved') {
      return 'Accept invitation';
    }
    if (userGuest?.status === 'invite_match') {
      return 'Approve guest';
    } else if (userGuest?.status === 'approved') {
      return 'Waiting for invitation accepted';
    } else if (userGuest?.status === 'accepted') {
      return 'Guest Accepted';
    }
  };

  const getIsDisabledButton = () => {
    if (uid === hostUid && userGuest?.status === 'approved') {
      return false;
    }
    if (userGuest?.status === 'invite_match') {
      return false;
    }
    return true;
  };

  const handleActionPress = async () => {
    const isFull = await checkIsFullGuestsFun();
    if (isFull) {
      setModalVisible(false);
      // setTimeout(() => {
      //   setIsVisibleModalFullEvent(true)
      // }, 300);
    }
    return;
    if (uid === hostUid && userGuest?.status === 'approved') {
      handleAcceptGuestFromGuest();
      setModalVisible && setModalVisible(false);
      return;
    }
    if (userGuest?.status === 'invite_match') {
      handleApproveGuestFromHost();
      setModalVisible && setModalVisible(false);
      return;
    }
  };

  const getButtonStyle = () => {
    if (uid === hostUid && userGuest?.status === 'approved') {
      return {
        backgroundColor: whiteColor,
        borderColor: whiteColor,
      };
    }
    if (userGuest?.status === 'invite_match') {
      return {
        backgroundColor: whiteColor,
        borderColor: whiteColor,
      };
    }
    if (userGuest?.status === 'approved') {
      return {
        backgroundColor: grayScale700,
        borderColor: grayScale700,
      };
    }
    if (userGuest?.status === 'accepted') {
      return {
        backgroundColor: black1Color,
        borderColor: whiteColor,
        borderWidth: 1,
      };
    }
  };

  const getButtonTitleStyle = () => {
    if (uid === hostUid && userGuest?.status === 'approved') {
      return {
        color: blackColor,
      };
    }
    if (userGuest?.status === 'approved') {
      return {
        color: whiteColor,
      };
    }
    if (userGuest?.status === 'invite_match') {
      return {
        color: black1Color,
      };
    }
    if (userGuest?.status === 'accepted') {
      return {
        color: whiteColor,
      };
    }
  };

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
            <Image source={{uri: image}} style={styles.userPhoto} />
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
              showToast('inviteMatch', `${title} was removed!`);
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
            <Image source={{uri: image}} style={styles.userPhoto} />
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
              showToast('inviteMatch', `${title} was removed!`);
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

  const userProfileItemCard = (
    <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
      {image && <Image style={{borderRadius: 100, width: 62, height: 62}} source={{uri: image}} />}
      <View style={{marginLeft: 16, gap: 8}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>{title}</Text>
          {<CheckStarIcon width={12} height={12} style={{marginLeft: 4}} />}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: whiteColor,
              borderRadius: 5,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}>
            <Text style={{textTransform: 'capitalize', color: blackColor, fontFamily: Satoshi700, fontSize: RFValue(9, 812)}}>Guest</Text>
          </View>
        </View>
      </View>
    </View>
  );

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
            {/* UserProfileItem */}
            {userProfileItemCard}
            {/* gap */}
            <View style={{height: 24}} />
            {(userGuest?.status === 'accepted' || userGuest?.status === 'invite_match' || userGuest?.status === 'notAccepted') &&
            uid === hostUid ? null : (
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  disabled={getIsDisabledButton()}
                  activeOpacity={0.7}
                  style={[
                    {height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10},
                    getButtonStyle(),
                  ]}
                  onPress={handleActionPress}>
                  <Text style={[{fontFamily: Satoshi500, fontSize: RFValue(18, 812)}, getButtonTitleStyle()]}>
                    {getUserStatusButtonText()}
                  </Text>
                  {userGuest?.status === 'accepted' && <CheckIcon style={{marginLeft: 10}} />}
                </TouchableOpacity>
              </View>
            )}
            <View style={{height: 24}} />
            <TouchableOpacity onPress={goToProfileView} style={[styles.buttonFooter, {borderTopWidth: 0}]}>
              <User width={20} height={20} />
              <Text style={styles.textButton}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBlockAndReportState(true)}
              style={[styles.buttonFooter, userGuest?.status === 'accepted' && {borderBottomColor: gray1Color, borderBottomWidth: 1}]}>
              <InfoIcon width={20} height={20} />
              <Text style={styles.textButton}>Report</Text>
            </TouchableOpacity>
            {userGuest?.status !== 'accepted' && (
              <TouchableOpacity
                onPress={() => setCancelInvitationState(true)}
                style={[styles.buttonFooter, {borderBottomColor: gray1Color, borderBottomWidth: 1}]}>
                <CloseIcon width={20} height={20} />
                <Text style={[styles.textButton, {color: errorColor}]}>Cancel invitation</Text>
              </TouchableOpacity>
            )}
            <View>
              <RemovingUserModal />
              <BlockAndReportModal
                setBlockAndReportState={setBlockAndReportState}
                blockAndReportState={blockAndReportState}
                reportState={reportState}
                setReportState={setReportState}
                setModalVisible={setModalVisible}
              />
              <CancelInvitationModal />
            </View>
          </View>
        </Modal>
      </SafeAreaProvider>
    </View>
  );
};

export default ModalUserMenu;
