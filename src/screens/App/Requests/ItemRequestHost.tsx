import {Alert, ImageBackground, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import Home from 'assets/images/icons/home.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import FlashFilled from 'assets/images/icons/flash-filled.svg';
import FlashFillBlack from 'assets/images/icons/flash-filled-black.svg';
import useStyles from './styles';
import {Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightRed1Color, whiteColor} from 'constants/colors';
import {calculateAge} from 'helpers/calculateAge';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {commonStackPath, myProfileViewPath} from 'constants/pathLocations.ts';
import {showToast} from 'helpers/showToast.ts';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useId, useState} from 'react';
import {CLOUD_MESSAGING_SERVER_KEY} from '@env';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

const ItemRequestHost = ({item, list}: any) => {
  const styles = useStyles();
  const navigation = useAppNavigation();
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

  const handleSwipeHostCardInvite = async (item: any): Promise<void> => {   

    const allPeople = list?.female + list?.femaleFriend + list?.male + list?.maleFriend;
    const eventIsFull = list?.usersList?.filter(i => i?.status === 'accepted')?.length === allPeople;

    if (eventIsFull) {
      return showToast('cancel', 'Go to my events', `Event Full: ${allPeople}/${allPeople} guests invited`);
    }

    const userAccepted = {
      gender: item?.gender,
      name: item?.name,
      status: 'liked',
      superInvite: false,
      uid: item?.uid,
      userPhoto: item?.userPhoto,
    };

    try {
      const updateUsersList: any = [...list?.usersList, userAccepted];
      const updateRequestsList: any = list?.requestsList?.filter((i: any) => i?.uid !== item?.uid);

      await firestore().collection('Events').doc(list?.id).update({
        usersList: updateUsersList,
        requestsList: updateRequestsList,
      });
      showToast('inviteMatch', '', 'The request has been confirmed');
      sendNotification(item.uid, 'Invited Only', `${currentUserName} approved you as a guest!`, 'invite')
    } catch (e) {
      console.log(e);
      showToast('inviteMatch', '', "There's been an error");
    }
  };

  const handleSwipeHostCardReject = async (item: any): Promise<void> => {
    try {
      const allPeople = list?.female + list?.femaleFriend + list?.male + list?.maleFriend;
      const eventIsFull = list?.usersList?.filter(i => i?.status === 'accepted')?.length === allPeople;

      if (eventIsFull) {
        return showToast('warning', 'Go to my events', `Event Full: ${eventIsFull}/${eventIsFull} guests invited`);
      }

      const updateRequestsList: any = list?.requestsList?.filter((i: any) => i?.uid !== item?.uid);
      await firestore().collection('Events').doc(list?.id).update({
        requestsList: updateRequestsList,
      });
    } catch (e) {
      console.log(e);
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
      },
    });
  };

  const generateRandomId = (length: number) =>  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const getFcmTokenFromUser = async (uid: string) => {
    const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
    return userInfoDoc.data()?.fcmToken;
  };
  
  const sendNotification = async (forUserUid: string, title: string, body: string, mark: string) => {
        
    const token = await getFcmTokenFromUser(forUserUid)
    
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title: title,
          body: body,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('error sending notification:', error);
    } else {
      const data = await response.json();
      const userDoc = await firestore().collection('userInfo').doc(forUserUid).get()
      const userNotifications = userDoc.data()?.notifications
      const id = generateRandomId
      const notification = {
          id,
          title: title,
          body: body,
          mark: mark,
          uid: userInfo?.uid
      }      
      
      try {
        await firestore().collection('userInfo').doc(forUserUid).update({
          notifications: [...userNotifications, notification]
        })
      } catch (error) {
        console.log('error update notifications', error);
      }
    }
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
              {userInfo.accountType && (
                <View
                  style={{
                    marginTop: 'auto',
                    marginLeft: 8,
                    marginBottom: 2,
                    alignSelf: 'flex-start',
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    backgroundColor: userInfo.accountType === 'host' ? blackColor : whiteColor,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: userInfo.accountType === 'host' ? whiteColor : blackColor,
                  }}>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      fontFamily: Satoshi700,
                      fontSize: 10,
                      color: userInfo.accountType === 'host' ? whiteColor : blackColor,
                    }}>
                    {userInfo.accountType}
                  </Text>
                </View>
              )}
              <TouchableOpacity onPress={() => goToProfileView()} activeOpacity={0.7} style={styles.buttonContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>
                    {item?.name} {`${userInfo?.date ? `, ${calculateAge(userInfo?.date)}` : ''}`}
                  </Text>
                  {userInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} style={{marginLeft: 4}} />}
                </View>
                {userInfo?.address && (
                  <View style={styles.locationContainer}>
                    <View style={styles.locationRow}>
                      <Home height={12} />
                      <Text style={styles.locationText}>From {item?.address}</Text>
                    </View>
                    <ArrowRight height={12} />
                  </View>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </FastImage>
        {/* <ImageBackground style={styles.imageBackground} resizeMode="cover" source={{uri: item.userPhoto}}>
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
              {userInfo.accountType && (
                <View
                  style={{
                    marginTop: 'auto',
                    marginLeft: 8,
                    marginBottom: 2,
                    alignSelf: 'flex-start',
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    backgroundColor: userInfo.accountType === 'host' ? blackColor : whiteColor,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: userInfo.accountType === 'host' ? whiteColor : blackColor,
                  }}>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      fontFamily: Satoshi700,
                      fontSize: 10,
                      color: userInfo.accountType === 'host' ? whiteColor : blackColor,
                    }}>
                    {userInfo.accountType}
                  </Text>
                </View>
              )}
              <TouchableOpacity onPress={() => goToProfileView()} activeOpacity={0.7} style={styles.buttonContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>
                    {item?.name} {`${userInfo?.date ? `, ${calculateAge(userInfo?.date)}` : ''}`}
                  </Text>
                  {userInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} style={{marginLeft: 4}} />}
                </View>
                {userInfo?.address && (
                  <View style={styles.locationContainer}>
                    <View style={styles.locationRow}>
                      <Home height={12} />
                      <Text style={styles.locationText}>From {item?.address}</Text>
                    </View>
                    <ArrowRight height={12} />
                  </View>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground> */}
      </TinderCard>
    </View>
  );
};

export default ItemRequestHost;
