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
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg'
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ChatActiveIcon from 'assets/images/tab-bar/chat-active.svg';
import InfoIcon from 'assets/images/icons/info-circle-outline.svg';
import CloseIcon from 'assets/images/icons/close-circle-red.svg';
import {chatCorrespondencePath, commonStackPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {blackColor, deleteColor, gray1Color, lightGreenColor, transparent60Color, whiteColor} from 'constants/colors.ts';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import firestore from '@react-native-firebase/firestore';
import { color } from '@rneui/base';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';
import { calculateAge } from 'helpers/calculateAge';
import {userProfilePath} from 'constants/pathLocations.ts';
import { formatDate } from 'helpers/formatDate';
import { getUsersListAccepted } from 'helpers/getUsersListAccepted';

interface HostMenu {
  hostMenu?: boolean;
  setHostMenu?: any;
  image?: any;
  imageBg?: any;
  name?: string;
  data?: string;
  girlInvitation?: number;
  hostUid?: string;
  usersList: [];
  eventId: string;
}

const ModalHostMenu: FC<HostMenu> = ({girlInvitation, data, hostMenu, setHostMenu, image, name, imageBg, hostUid, usersList, eventId}) => {
  const [cancelInvitation, setCancelInvitation] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const navigation = useAppNavigation();
  const styles = useStyles();
  const [hostData, setHostData] = useState<any>();

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
        <FastImage
          source={{uri: imageBg}}
          style={{width: '100%', height: 220, borderRadius: 20, padding: 14, justifyContent: 'space-between'}}>
          <TouchableOpacity // @ts-ignore
            onPress={() => {
              navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: hostUid}});
              setHostMenu(false);
            }}
            style={{
              backgroundColor: transparent60Color,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 20,
              marginTop: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              {hostData?.photos[0].image && (
                <View style={{flexDirection: 'row'}}>
                  <FastImage source={{uri: image}} style={{width: 40, height: 40, borderRadius: 50}} />
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
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812), marginRight: 6}}>
                    {hostData?.name}, {calculateAge(hostData?.date)}
                  </Text>
                  {hostData?.accountConfirmed && <CheckStarWhite />}
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(16, 812),
                }}>
                <ArrowRightIcon width={14} height={14} />
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  backgroundColor: lightGreenColor,
                  borderRadius: 5,
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
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(20, 812),
                  marginHorizontal: 8,
                }}>
                {name}
              </Text>
              <CheckStarWhite />
            </View>
            <View style={{width: '100%'}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: transparent60Color, borderRadius: 100}}>
                  <UserIcon width={12} height={12} />
                  <Text style={{color: 'white', fontSize: RFValue(11, 812), fontFamily: Satoshi400}}> {girlInvitation}x Women invitation</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: transparent60Color, borderRadius: 100}}>
                  <CalendarIcon width={12} height={12} />
                  <Text style={{color: 'white',fontSize: RFValue(11, 812), fontFamily: Satoshi400}}> {formatDate(data)}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: transparent60Color, borderRadius: 100}}>
                  <Users width={12} height={12}/>
                  <Text style={{color: 'white', fontSize: RFValue(11, 812), fontFamily: Satoshi400}}> {getUsersListAccepted(usersList)}/{usersList?.length}</Text>
                </View>
              </View>
            </View>
          </View>
        </FastImage>
        <View style={{width: '100%', marginTop: 34}}>
          <TouchableOpacity style={styles.buttonEvent}>
            <CalendarIcon style={styles.iconButton} width={18} height={18} />
            <Text style={styles.textButton}>Event information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonEvent} onPress={() => goToProfileView(hostUid)}>
            <UserIconWhite style={styles.iconButton} width={18} height={18} />
            <Text style={styles.textButton}>Host profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalReport(true)} style={styles.buttonEvent}>
            <InfoIcon style={styles.iconButton} width={18} height={18} />
            <Text style={styles.textButton}>Report</Text>
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
        data={data}
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
