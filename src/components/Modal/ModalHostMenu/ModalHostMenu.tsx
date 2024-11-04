import React, {FC, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import components
import useStyles from 'components/Modal/ModalHostMenu/styles.ts';
import ModalCancelOrConfirmInvitation from 'components/Modal/ModalCancelOrConfirmInvitation/ModalCancelOrConfirmInvitation.tsx';

//import icons
import Users from 'assets/images/icons/Users.svg';
import UserIconWhite from 'assets/images/icons/user-white.svg';
import UserIcon from 'assets/images/icons/user.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ChatActiveIcon from 'assets/images/tab-bar/chat-active.svg';
import UserWarnIcon from 'assets/images/icons/user-warn.svg';
import CloseIcon from 'assets/images/icons/close-circle-red.svg';
import CheckIcon from 'assets/images/icons/Check-black.svg';
import LineImage from 'assets/images/app/Line.png';
import {commonStackPath, eventActiveInfoPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {
  blackColor,
  deleteColor,
  gray1Color,
  lightGray18Color,
  lightGray20Color,
  lightGreenColor,
  transparent60Color,
  whiteColor,
} from 'constants/colors.ts';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import firestore from '@react-native-firebase/firestore';
import {color} from '@rneui/base';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {calculateAge} from 'helpers/calculateAge';
import {userProfilePath} from 'constants/pathLocations.ts';
import {formatDate} from 'helpers/formatDate';
import {getUsersListAccepted} from 'helpers/getUsersListAccepted';
import {ACCEPTED_STATUS, APPROVED_STATUS, screenWidth} from 'constants/common';
import {useUser} from 'src/store/userStore';
import {showToast} from 'helpers/showToast';
import {sendNotification} from 'helpers/fcmHelper';

interface HostMenu {
  hostMenu?: boolean;
  setHostMenu?: any;
  image?: any;
  imageBg?: any;
  name?: string;
  date?: string;
  girlInvitation?: number;
  hostUid?: string;
  usersList: [];
  eventId: string;
  hostImage: string;
}

const ModalHostMenu: FC<HostMenu> = ({
  girlInvitation,
  date,
  hostMenu,
  setHostMenu,
  image,
  name,
  imageBg,
  hostUid,
  usersList,
  eventId,
  hostImage,
}) => {
  const [cancelInvitation, setCancelInvitation] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const navigation = useAppNavigation();
  const styles = useStyles();
  const [hostData, setHostData] = useState<any>();
  const [status, setStatus] = useState('');
  const [eventData, setEventData] = useState();

  const user = useUser((i: any) => i?.user);

  useEffect(() => {
    const getEventData = async () => {
      const getDoc = await firestore().collection('Events').doc(eventId).get()
      const data = getDoc.data()
      setEventData(data)
    }
    getEventData()
  },[eventData])

  const getHostData = async () => {
    if (!hostUid) {
      return;
    }
    const hostQuery = await firestore().collection('userInfo').doc(hostUid).get();
    // console.warn('hostQuery', hostQuery.data());

    if (!hostQuery.exists) {
      return;
    }

    // console.warn('hostQuery', hostQuery.data());

    const hostData = hostQuery.data();
    setHostData(hostData);
  };

  const goToEventInfo = () => {    
    setHostMenu(false)
    navigation.navigate(commonStackPath, 
      {screen: eventActiveInfoPath, params: {list: eventData, isGuest: true}} as never)
  }

  const goToProfileView = (currentUid: string) => {
    setHostMenu(false);
    // @ts-ignore
    navigation.navigate(commonStackPath, {
      screen: myProfileViewPath,
      params: {
        uid: currentUid,
        isShowEditButton: false,
      },
    });
  };

  useEffect(() => {
    getHostData();
  }, [hostUid]);

  const getStatus = async () => {
    try {
      const eventQuerySnapshot = await firestore().collection('Events').doc(eventId).get();
      const eventDataList = eventQuerySnapshot.data();

      if (!eventDataList || !eventDataList?.usersList.length) {
        return;
      }

      const findUser = eventDataList.usersList.find(item => item.uid === user?.uid);
      if (findUser) {
        setStatus(findUser?.status);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getStatus();
  }, [hostUid]);

  const changeStatusGuestUsersList = async () => {
    try {
      const eventQuerySnapshot = await firestore().collection('Events').doc(eventId).get();
      const eventDataList = eventQuerySnapshot.data();

      if (!eventDataList?.usersList.length) {
        return;
      }

      const updatedUsersList = eventDataList.usersList.map(userItem => {
        if (userItem.uid === user?.uid) {
          return {
            ...userItem,
            status: ACCEPTED_STATUS,
          };
        }
        return userItem;
      });
      setStatus(ACCEPTED_STATUS);
      await firestore().collection('Events').doc(eventId).update({
        usersList: updatedUsersList,
      });
      getStatus();
      showToast('inviteMatch', `See you at ${date}`, 'You accept to this event!', {
        ownerPhoto: hostImage,
        status: 'Accept'.toUpperCase(),
      });

      if (hostUid) {
        await sendNotification(
          hostUid,
          `${user?.name} accepted your invitation`,
          'Invitation Accepted!',
          'Accepted',
          'Accepted'.toUpperCase(),
          user,
        );
      }
    } catch (e) {}
  };

  const CustomButtonsGuest: FC = () => {
    return (
      <>
        {status !== ACCEPTED_STATUS && status !== APPROVED_STATUS && (
          <View style={{paddingHorizontal: 14}}>
            <TouchableOpacity
              disabled
              style={{
                height: 65,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                backgroundColor: lightGray20Color,
                marginBottom: 15,
              }}>
              <Text
                style={{
                  color: blackColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(16, 812),
                }}>
                Waiting for invitation approval
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {status === ACCEPTED_STATUS && (
          <View style={{paddingHorizontal: 14}}>
            <TouchableOpacity
              disabled
              style={{
                width: '100%',
                paddingVertical: 21,
                marginBottom: 15,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: blackColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CheckIcon width={16} height={16} />
              <Text
                style={{
                  color: blackColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(16, 812),
                  marginLeft: 11,
                }}>
                Attending
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {status === APPROVED_STATUS && (
          <View style={{paddingHorizontal: 14}}>
            <TouchableOpacity
              onPress={() => changeStatusGuestUsersList()}
              style={{
                height: 65,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                backgroundColor: blackColor,
                marginBottom: 15,
              }}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(16, 812),
                }}>
                Accept invitation
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <Modal
      isVisible={hostMenu}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => setHostMenu(false)}
      onSwipeComplete={() => setHostMenu(false)}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <View style={{width: '100%', padding: 9, backgroundColor: whiteColor, borderRadius: 30}}>
          <FastImage
            source={{uri: imageBg}}
            style={{width: '100%', height: 220, borderRadius: 20, padding: 16, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              {hostData?.photos[0].image && (
                <View style={{flexDirection: 'row'}}>
                  <FastImage source={{uri: hostImage}} style={{width: 50, height: 50, borderRadius: 50}} />
                  {hostData?.online && (
                    <View
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 11,
                        backgroundColor: lightGreenColor,
                        borderWidth: 1.25,
                        borderColor: blackColor,
                        position: 'absolute',
                        bottom: 3,
                        right: 0,
                      }}
                    />
                  )}
                </View>
              )}
              <View style={{marginLeft: 13}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      borderRadius: 4,
                      borderColor: whiteColor,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 1.7,
                      backgroundColor: blackColor,
                    }}>
                    <Text style={{color: whiteColor, textTransform: 'capitalize', fontFamily: Satoshi700, fontSize: RFValue(10, 812)}}>
                      {hostData?.accountType}
                    </Text>
                  </View>
                  {hostData?.accountPremium && (
                    <LinearGradient
                      colors={['#977B4A', '#E5D291', '#A28453']}
                      style={{
                        marginLeft: 6,
                        alignSelf: 'flex-start',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 1.7,
                        backgroundColor: blackColor,
                      }}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}>
                      {
                        <Text
                          style={{
                            color: blackColor,
                            fontSize: RFValue(10, 812),
                            fontFamily: Satoshi700,
                          }}>
                          Premium
                        </Text>
                      }
                    </LinearGradient>
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812), marginRight: 6}}>
                    {hostData?.name}, <Text style={{fontSize: RFValue(12, 812)}}>{calculateAge(hostData?.date)}</Text>
                  </Text>
                  {hostData?.accountConfirmed && <CheckStarWhite />}
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 4,
                backgroundColor: lightGreenColor,
                borderRadius: 5,
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(12, 812),
                }}>
                Active
              </Text>
            </View>
          </FastImage>
          <View style={{paddingHorizontal: 17, marginVertical: 22}}>
            <Text
              style={{
                color: lightGray18Color,
                fontFamily: Satoshi500,
                fontSize: RFValue(16, 812),
                marginBottom: 4,
              }}>
              Name
            </Text>
            <Text
              style={{
                color: blackColor,
                fontFamily: Satoshi700,
                fontSize: RFValue(20, 812),
              }}>
              {name}
            </Text>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginBottom: 22, paddingHorizontal: 23}}>
            <Image style={{width: screenWidth - 48 - 48}} source={LineImage} />
          </View>
          <CustomButtonsGuest />
        </View>
        <View style={{width: '100%', marginTop: 34}}>
          <TouchableOpacity onPress={goToEventInfo} style={styles.buttonEvent}>
            <CalendarIcon style={styles.iconButton} width={18} height={18} />
            <Text style={styles.textButton}>Event information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonEvent} onPress={() => goToProfileView(hostUid)}>
            <UserIconWhite style={styles.iconButton} width={18} height={18} />
            <Text style={styles.textButton}>Host profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalReport(true)} style={styles.buttonEvent}>
            <UserWarnIcon style={styles.iconButton} width={18} height={18} />
            <Text style={styles.textButton}>Block & Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCancelInvitation(true)}
            style={[styles.buttonEvent, {borderBottomWidth: 1, borderBottomColor: gray1Color}]}>
            <CloseIcon style={styles.iconButton} width={18} height={18} />
            <Text style={[styles.textButton, {color: deleteColor}]}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalReport modalReport={modalReport} setModalReport={setModalReport} />
      <ModalCancelOrConfirmInvitation
        girlInvitation={girlInvitation}
        data={date}
        imageBg={imageBg}
        name={name}
        typeModal="cancel"
        title={name}
        setCancelInvitation={setCancelInvitation}
        cancelInvitation={cancelInvitation}
        setHostMenu={setHostMenu}
        eventId={eventId}
      />
    </Modal>
  );
};

export default ModalHostMenu;
