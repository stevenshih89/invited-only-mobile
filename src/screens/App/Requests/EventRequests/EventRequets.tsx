import {Image, View} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import Calendar from 'assets/images/icons/calendar-white.svg';
import User from 'assets/images/icons/user.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import FlashFillBlack from 'assets/images/icons/flash-filled-black.svg';
import useStyles from './styles';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightGray11Color, lightRed1Color, transparent60Color, whiteColor} from 'constants/colors';

import {showToast} from 'helpers/showToast.ts';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import {formatDate} from 'helpers/formatDate';
import {ACCEPTED_STATUS, LIKED} from 'constants/common';
import Config from 'react-native-config';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

const EventRequets = ({item, list}: any) => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const styles = useStyles();
  const [userInfo, setUserInfo] = useState({accountType: ''});
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
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>JOIN</Text>
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
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightRed1Color}}>NOPE</Text>
        </View>
      </View>
    );
  };

  const handleSwipeHostCardInvite = async (item: any): Promise<void> => {
    const allPeople = list?.female + list?.femaleFriend + list?.male + list?.maleFriend;
    const eventIsFull = list?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length === allPeople;
    if (eventIsFull) {
      return showToast('cancel', 'Go to my events', `Event Full: ${allPeople}/${allPeople} guests invited`);
    }
    const userAccepted = {
      gender: item?.gender,
      name: item?.name,
      status: LIKED,
      superInvite: false,
      uid: item?.uid,
      userPhoto: item?.userPhoto,
    };
    try {
      const updateUsersList: any = [...list?.usersList, userAccepted];
      const updateRequestsList: any = list?.requestsList?.filter((i: any) => i?.uid !== item?.uid);
      await firestore().collection(apiEventsCollection).doc(list?.id).update({
        usersList: updateUsersList,
        requestsList: updateRequestsList,
      });
      showToast('inviteMatch', '', 'The request has been confirmed');
    } catch (e) {
      // console.log(e);
      showToast('inviteMatch', '', "There's been an error");
      logErrorToSentry(e);
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
      await firestore().collection(apiEventsCollection).doc(list?.id).update({
        requestsList: updateRequestsList,
      });
    } catch (e) {
      logErrorToSentry(e);
      // console.log(e);
    }
  };

  const fetchItemUserInfo = async () => {
    const currentUserUid = auth?.()?.currentUser?.uid;
    if (item.uid) {
      try {
        const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(item.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
        const currentUserInfo = await firestore().collection(apiUserInfoCollection).doc(currentUserUid).get();
        setCurrentUserName(currentUserInfo.data()?.name);
      } catch (error: any) {
        showToast('inviteMatch', 'Failed to load user information. Please try again.', 'Error');
        logErrorToSentry(error);
        // Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    fetchItemUserInfo();
  }, [item]);

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
            uri: item.photos[0].image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <View style={[styles.itemContentContainer, {justifyContent: item?.superInvite ? 'space-between' : 'flex-end'}]}>
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
                    marginHorizontal: 6,
                  }}>
                  <FlashFillBlack />
                  <Text style={{color: blackColor, fontSize: 10, fontFamily: Satoshi700, marginLeft: 6}}>Super invite you</Text>
                </View>
              </View>
            )}
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image style={{width: 26, height: 26, borderRadius: 26}} source={{uri: item.hostImage}} />
                <View
                  style={{
                    marginLeft: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(10, 812),
                      fontFamily: Satoshi500,
                      color: whiteColor,
                      marginBottom: 2,
                    }}>
                    {item.hostName}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(8, 812),
                      fontFamily: Satoshi400,
                      color: lightGray11Color,
                    }}>
                    Host
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontSize: RFValue(20, 812),
                    fontFamily: Satoshi700,
                  }}>
                  {item.placeName}
                </Text>
                <CheckStarWhite width={14} height={14} style={{marginLeft: 4}} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  backgroundColor: transparent60Color,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 100,
                  marginTop: 10,
                }}>
                <User width={10} height={10} />
                <Text
                  style={{
                    fontFamily: Satoshi400,
                    color: whiteColor,
                    fontSize: RFValue(10, 812),
                    marginLeft: 6.5,
                  }}>
                  {item.female}x Women invitation
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  backgroundColor: transparent60Color,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 100,
                  marginTop: 2,
                }}>
                <Calendar width={10} height={10} />
                <Text
                  style={{
                    fontFamily: Satoshi400,
                    color: whiteColor,
                    fontSize: RFValue(10, 812),
                    marginLeft: 6.5,
                  }}>
                  {formatDate(item.date)}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </FastImage>
      </TinderCard>
    </View>
  );
};

export default EventRequets;
