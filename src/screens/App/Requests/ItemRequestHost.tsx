import {Alert, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import Home from 'assets/images/icons/home.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import FlashFilledWhiteIcon from 'assets/images/icons/flash-filled.svg';
import useStyles from './styles';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightRed1Color, whiteColor} from 'constants/colors';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {commonStackPath, myProfileViewPath, userProfilePath} from 'constants/pathLocations.ts';
import {showToast} from 'helpers/showToast.ts';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import {useUser} from 'src/store/userStore';
import {sendNotification} from 'helpers/fcmHelper';
import {handleCreateChat} from 'helpers/chat';
import {getFontSize} from 'helpers/getFontSize';
import {ACCEPTED_STATUS, INVITE_MATCH_STATUS, screenHeight} from 'constants/common';
import {updateGuestEventsList} from 'helpers/updateGuestEventsList';
import {Event} from 'src/types/event';
import {User} from 'src/types/userInfo';
import {MatchData} from '../IO/screens/Match/Match';
import analytics from '@react-native-firebase/analytics';
import {inviteUser, requestsScreen} from 'constants/analitycs';
import {useMyEvents} from 'src/store/myEvents';
import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const ItemRequestHost = ({item, handleOpenMatch, setIsVisibleModalFullEvent, fetchHostRequests}: any) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [userInfo, setUserInfo] = useState<Partial<User.Info>>({accountType: 'host'});
  const user = useUser((state: any) => state.user);
  const [currentUserName, setCurrentUserName] = useState();
  const {activeEvent} = useMyEvents();
  const cardRef = useRef(null);

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

  const handleSwipeCardRight = () => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.swipeCardRight();
    }
  };

  const handleSwipeCardLeft = () => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current?.swipeCardLeft();
    }
  };

  const handleInvite = ({userItem, withSwipeAnimation}: {userItem: Event.User; withSwipeAnimation: boolean}) => {
    onInvite(userItem);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
    }
  };

  const handleReject = ({userItem, withSwipeAnimation}: {userItem: Event.User; withSwipeAnimation: boolean}) => {
    onReject(userItem);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  const onInvite = async (userItem: Event.User): Promise<void> => {
    const eventQuery = await firestore().collection(apiEventsCollection).doc(activeEvent?.id).get();
    if (!eventQuery.exists) {
      return;
    }

    const eventData = eventQuery.data();
    const allPeople = eventData?.female + eventData?.male;
    const eventIsFull = eventData?.usersList?.filter((i: Event.User) => i?.status === ACCEPTED_STATUS)?.length === allPeople;

    if (eventIsFull) {
      setIsVisibleModalFullEvent();
      fetchHostRequests();
      showToast('cancel', 'Go to my events', `Event Full: ${allPeople}/${allPeople} guests invited`);
      return;
    }

    const getDoc = await firestore().collection(apiUserInfoCollection).doc(userItem.uid).get();
    const guest = getDoc.data();
    if (!guest) {
      return;
    }
    try {
      const userAccepted = {
        gender: userItem?.gender,
        name: userItem?.name,
        status: INVITE_MATCH_STATUS,
        superInvite: false,
        uid: userItem?.uid,
        userPhoto: userItem?.userPhoto,
      };

      const matchedData = {
        type: 'match',
        name: userItem?.name,
        imageUri: userItem?.userPhoto,
        uidHost: user?.uid,
        uidGuest: userItem?.uid,
        nameGuest: userItem?.name,
        nameHost: currentUserName,
        eventId: activeEvent?.id,
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
        guestsInvited: activeEvent?.male + activeEvent?.female,
      };

      await firestore()
        .collection(apiEventsCollection)
        .doc(activeEvent?.id)
        .update({
          requestsList: firestore.FieldValue.arrayRemove(userItem),
          usersList: firestore.FieldValue.arrayUnion(userAccepted),
        })
        .then(async () => {
          analytics().logEvent(`${requestsScreen}_${inviteUser}`, {
            eventId: activeEvent?.id,
          });
          await handleCreateChat(matchedData as MatchData);
          await updateGuestEventsList(activeEvent?.id, guest?.uid);
          handleOpenMatch(matchedData);
          const getDoc = await firestore().collection(apiUserInfoCollection).doc(userItem?.uid).get();
          const docData = getDoc.data();
          if (docData?.notificationSettings.requests) {
            await sendNotification(
              userItem?.uid,
              'New invite request',
              `${user?.name} wants to invite you!`,
              'invite',
              'Invite Request'.toUpperCase(),
              user,
            );
          }
        });
    } catch (e) {
      console.error('error invite', e);
      showToast('inviteMatch', '', "There's been an error");
      logErrorToSentry(e)
    }
  };

  const onReject = async (userItem: Event.User): Promise<void> => {
    try {
      console.warn(userItem, activeEvent?.id);

      await firestore()
        .collection(apiEventsCollection)
        .doc(activeEvent?.id)
        .update({
          requestsList: firestore.FieldValue.arrayRemove(userItem),
          rejectsList: firestore.FieldValue.arrayUnion({uid: userItem?.uid}),
        });
      analytics().logEvent(`${requestsScreen}_reject_${inviteUser}`, {
        eventId: activeEvent?.id,
      });
    } catch (e) {
      console.error(e);
      showToast('inviteMatch', '', "There's been an error");
      logErrorToSentry(e);
    }
  };

  const fetchItemUserInfo = async () => {
    const currentUserUid = auth()?.currentUser?.uid;
    if (item.uid) {
      try {
        const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(item.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data() as User.Info);
        }
        const currentUserInfo = await firestore().collection(apiUserInfoCollection).doc(currentUserUid).get();
        setCurrentUserName(currentUserInfo.data()?.name);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  // useEffect(() => {
  //   fetchItemUserInfo();
  // }, [item]);

  const goToProfileView = () => {
    navigation.navigate(commonStackPath, {
      screen: myProfileViewPath,
      params: {
        uid: item?.uid,
        isShowEditButton: false,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: item.uid}})}
      style={{
        paddingHorizontal: 7,
        borderRadius: 12,
        width: '50%',
        height: screenHeight / 3.7,
      }}>
      <TinderCard
        ref={cardRef}
        // @ts-ignore
        cardWidth="100%"
        // @ts-ignore
        cardHeight="100%"
        onSwipedRight={() => handleInvite({userItem: item, withSwipeAnimation: false})}
        onSwipedLeft={() => handleReject({userItem: item, withSwipeAnimation: false})}
        OverlayLabelRight={OverlayRight}
        OverlayLabelLeft={OverlayLeft}
        disableBottomSwipe={true}
        disableVerticalSwipe={true}
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: blackColor,
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}>
                  <FlashFilledWhiteIcon width={8} />
                  <Text style={{marginLeft: 4, fontFamily: Satoshi700, fontSize: RFValue(8, 812), color: whiteColor}}>
                    Super wants to join you
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  handleReject({userItem: item, withSwipeAnimation: true});
                }}
                style={{
                  width: 32,
                  position: 'absolute',
                  right: 4,
                  top: 10,
                  height: 32,
                  backgroundColor: blackColor,
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CloseIcon />
              </TouchableOpacity>
              <View style={{marginTop: 'auto'}}>
                <View
                  style={{
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    backgroundColor: whiteColor,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      fontFamily: Satoshi700,
                      fontSize: RFValue(10, 812),
                      color: blackColor,
                    }}>
                    Guest
                  </Text>
                </View>
                {/* {userInfo.accountType && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        marginTop: 'auto',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 8,
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
                )} */}
                <TouchableOpacity onPress={() => goToProfileView()} activeOpacity={0.7} style={styles.buttonContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={[styles.nameText, {fontSize: getFontSize(item?.name)}]}>{item?.name}</Text>
                    <CheckStarWhite width={15} height={17} style={{marginLeft: 8, marginTop: 4}} />
                  </View>
                </TouchableOpacity>
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
                handleInvite({userItem: item, withSwipeAnimation: true});
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
    </TouchableOpacity>
  );
};

export default ItemRequestHost;
