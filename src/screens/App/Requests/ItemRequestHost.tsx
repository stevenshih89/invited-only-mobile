import {Alert, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import Home from 'assets/images/icons/home.svg';
import Location from 'assets/images/icons/location.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import FlashFillBlack from 'assets/images/icons/flash-filled-black.svg';
import useStyles from './styles';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightRed1Color, whiteColor} from 'constants/colors';
import {calculateAge} from 'helpers/calculateAge';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {commonStackPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {showToast} from 'helpers/showToast.ts';
import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import {useUser} from 'src/store/userStore';
import {sendNotification} from 'helpers/fcmHelper';
import {handleCreateChat} from 'helpers/chat';
import {getFontSize} from 'helpers/getFontSize';
import {ACCEPTED_STATUS, INVITE_MATCH_STATUS} from 'constants/common';
import {EventContext} from 'contexts/EventContext';

const ItemRequestHost = ({
  item,
  list,
  setRequestsForHost,
  handleOpenMatch,
  checkIsFullGuestsFun,
  setIsVisibleModalFullEvent,
  fetchHostRequests,
}: any) => {
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [userInfo, setUserInfo] = useState({accountType: '', usersList: []});

  const user = useUser((state: any) => state.user);
  const [currentUserName, setCurrentUserName] = useState();

  const OverlayRight = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: whiteColor}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>INVITE</Text>
        </View>
      </View>
    );
  };

  const OverlayLeft = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          left: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: lightRed1Color}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightRed1Color}}>REJECT</Text>
        </View>
      </View>
    );
  };

  const {activeEvent} = useContext(EventContext);

  const handleSwipeHostCardInvite = async (item: any): Promise<void> => {
    const eventQuery = await firestore().collection('Events').doc(list?.id).get();
    if (!eventQuery.exists) {
      return;
    }

    const eventData = eventQuery.data();
    const allPeople = eventData?.female + eventData?.male;
    const eventIsFull = eventData?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length === allPeople;

    if (eventIsFull) {
      setIsVisibleModalFullEvent();
      fetchHostRequests();
      showToast('cancel', 'Go to my events', `Event Full: ${allPeople}/${allPeople} guests invited`);
      return;
    }

    const getDoc = await firestore().collection('userInfo').doc(item.uid).get();
    const guest = getDoc.data();

    try {
      const userAccepted = {
        gender: item?.gender,
        name: item?.name,
        status: INVITE_MATCH_STATUS,
        superInvite: false,
        uid: item?.uid,
        userPhoto: item?.userPhoto,
      };

      const matchedData = {
        type: 'match',
        name: item?.name,
        imageUri: item?.userPhoto,
        uidHost: user?.uid,
        uidGuest: item?.uid,
        nameGuest: item?.name,
        nameHost: currentUserName,
        eventId: list?.id,
        superInvite: false,
        userHostImageUri: user?.photos[0]?.image,
        joinEvents: guest?.joinEvents,
        location: guest?.location,
        premium: user?.accountPremium,
        dateHost: user?.date,
        dateGuest: guest?.date,
        onlineGuest: guest?.online,
        accountConfirmedHost: guest?.accountConfirmed,
        accountConfirmedGuest: user?.accountConfirmed,
        usersListHost: activeEvent?.usersList,
        accountTypeHost: userInfo?.accountType,
        accountTypeGuest: guest?.accountType,
        eventImage: activeEvent?.photos[0].image,
        guestsInvited: activeEvent.usersList.length,
      };

      await firestore()
        .collection('Events')
        .doc(list?.id)
        .update({
          requestsList: firestore.FieldValue.arrayRemove(item),
          usersList: firestore.FieldValue.arrayUnion(userAccepted),
        })
        .then(async () => {
          await handleCreateChat(matchedData);
          handleOpenMatch(matchedData);
          const getDoc = await firestore().collection('userInfo').doc(item?.uid).get()
          const docData = getDoc.data()
          if(docData?.notificationSettings.requests) {
            await sendNotification(
              item?.uid,
              'New invite request',
              `${userInfo?.name} wants to invite you!`,
              'invite',
              'Invite Request'.toUpperCase(),
              userInfo,
            );
          }
          setRequestsForHost(prev => ({
            ...prev,
            requestsList: prev.requestsList.filter((i: any) => i?.uid !== item?.uid),
          }));
        });
      checkIsFullGuestsFun();
    } catch (e) {
      // console.log(e);
      showToast('inviteMatch', '', "There's been an error");
    }
  };

  const handleSwipeHostCardReject = async (item: any): Promise<void> => {
    try {
      const allPeople = list?.female + list?.femaleFriend + list?.male + list?.maleFriend;
      const eventIsFull = list?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length === allPeople;

      if (eventIsFull) {
        return showToast('warning', 'Go to my events', `Event Full: ${eventIsFull}/${eventIsFull} guests invited`);
      }

      const updateRequestsList: any = list?.requestsList?.filter((i: any) => i?.uid !== item?.uid);
      await firestore().collection('Events').doc(list?.id).update({
        requestsList: updateRequestsList,
      });
      setRequestsForHost(prev => ({
        ...prev,
        requestsList: prev.requestsList.filter((i: any) => i?.uid !== item?.uid),
      }));
    } catch (e) {
      // console.log(e);
    }
  };

  const fetchItemUserInfo = async () => {
    const currentUserUid = auth()?.currentUser?.uid;
    if (item.uid) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(item.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
        const currentUserInfo = await firestore().collection('userInfo').doc(currentUserUid).get();
        setCurrentUserName(currentUserInfo.data()?.name);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    fetchItemUserInfo();
  }, [item]);

  const goToProfileView = () => {
    navigation.navigate(commonStackPath, {
      screen: myProfileViewPath,
      params: {
        uid: item?.uid,
        isShowEditButton: false,
      },
    });
  };

  const generateRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const getFcmTokenFromUser = async (uid: string) => {
    const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
    return userInfoDoc.data()?.fcmToken;
  };

  return (
    <View style={styles.itemContainer}>
      <TinderCard
        // @ts-ignore
        cardWidth="100%"
        // @ts-ignore
        cardHeight="100%"
        onSwipedRight={() => handleSwipeHostCardInvite(item)}
        onSwipedLeft={() => handleSwipeHostCardReject(item)}
        OverlayLabelRight={OverlayRight}
        OverlayLabelLeft={OverlayLeft}
        disableBottomSwipe={true}
        inputOverlayLabelRightOpacityRange={[0, 40]}
        inputOverlayLabelLeftOpacityRange={[0, -40]}
        translateXRange={[-70, 0, 70]}
        disableTopSwipe={true}
        cardStyle={{height: '100%', width: '100%', borderRadius: 22, zIndex: 999}}>
        <FastImage
          style={styles.imageBackground}
          source={{
            uri: item.userPhoto,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <View style={[styles.itemContentContainer, {justifyContent: item?.superInvite ? 'space-between' : 'flex-end'}]}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.8)']}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              locations={[0.3, 0.8, 1]}>
              {item?.superInvite && (
                <View style={{alignItems: 'flex-start'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: whiteColor,
                      borderRadius: 5,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      marginBottom: 'auto',
                      marginTop: 10,
                    }}>
                    <FlashFillBlack />
                    <Text style={{color: blackColor, fontSize: 10, fontFamily: Satoshi700, marginLeft: 6}}>Super wants to join you</Text>
                  </View>
                </View>
              )}
              <View style={{marginTop: 'auto'}}>
                {userInfo.accountType && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        marginTop: 'auto',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        backgroundColor: userInfo.accountType === 'host' ? blackColor : whiteColor,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          textTransform: 'capitalize',
                          fontFamily: Satoshi700,
                          fontSize: RFValue(10, 812),
                          color: userInfo.accountType === 'host' ? whiteColor : blackColor,
                        }}>
                        {userInfo.accountType}
                      </Text>
                    </View>
                    {userInfo?.accountPremium && (
                      <LinearGradient
                        colors={['#977B4A', '#E5D291', '#A28453']}
                        style={styles.accountTypeWrapperPremium}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text style={styles.accountTypePremium}>Premium</Text>
                      </LinearGradient>
                    )}
                  </View>
                )}
                <TouchableOpacity onPress={() => goToProfileView()} activeOpacity={0.7} style={styles.buttonContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={[styles.nameText, {fontSize: getFontSize(item?.name)}]}>
                      {item?.name}
                      {`${userInfo?.date ? `, ${calculateAge(userInfo?.date)}` : ''}`}
                    </Text>
                    {userInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} style={{marginLeft: 4}} />}
                  </View>
                </TouchableOpacity>
                {userInfo?.homeAddress && (
                  <View style={styles.locationContainer}>
                    <View style={styles.locationRow}>
                      <Home height={12} />
                      <Text style={styles.locationText}>From {item?.homeAddress}</Text>
                    </View>
                  </View>
                )}
              </View>
            </LinearGradient>
          </View>
          <View
            style={{
              backgroundColor: whiteColor,
              height: 72,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 17,
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSwipeHostCardInvite(item);
              }}
              style={{
                backgroundColor: blackColor,
                paddingVertical: 12,
                borderRadius: 8,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: whiteColor, fontSize: RFValue(12, 812), fontFamily: Satoshi500}}>Invite</Text>
            </TouchableOpacity>
          </View>
        </FastImage>
      </TinderCard>
    </View>
  );
};

export default ItemRequestHost;
