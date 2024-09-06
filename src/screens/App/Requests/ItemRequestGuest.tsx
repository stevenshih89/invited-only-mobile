import {blackColor, lightRed1Color, transparent60Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import moment from 'moment';
import {Animated, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import useStyles from './styles';
import FlashFillBlack from 'assets/images/icons/flash-filled-black.svg';
import User from 'assets/images/icons/user.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import {FC, useEffect, useState} from 'react';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from '@ant-design/react-native';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from '../../../store/userStore';
import LinearGradient from 'react-native-linear-gradient';
import {CLOUD_MESSAGING_SERVER_KEY} from '@env';
import FastImage from 'react-native-fast-image';
import {sendNotification} from 'helpers/fcmHelper';
import {handleCreateChat} from 'helpers/chat';

const ItemRequestGuest: FC = ({list, item, setDataForGuest, handleOpenMatch}: any) => {
  const [hostInfo, setHostInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heightAnim] = useState(new Animated.Value(218));
  const {photos, uid, placeName, meetingSpot, description, hour, date, address, female, femaleFriend, male, maleFriend, name} = list;

  const styles = useStyles();
  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);

  const goToEventInfo = () => {
    navigation.navigate(commonStackPath, {screen: eventInfoPath, params: {list: list}});
  };

  const getHostInfo = async uid => {
    try {
      const host = await firestore().collection('userInfo').doc(uid).get();
      setHostInfo(host.data());
      setLoading(false);
      console.log('host data', host.data());
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

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
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>ACCEPT</Text>
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

  const handleSwipeGuestCardInvite = async (item: any): Promise<void> => {
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(async () => {
      const eventData = await firestore().collection('Events').doc(list?.id).get();
      const event = eventData.data();
      if (!event) {
        return;
      }

      try {
        const updatedUsersList = event.usersList?.map(invUser => {
          if (invUser.uid === item?.uid) {
            return {
              ...invUser,
              status: 'invite_match',
            };
          }
          return invUser;
        });

        const matchedData = {
          type: 'match',
          name: event?.hostName,
          imageUri: item?.userPhoto,
          uidHost: event?.uid,
          uidGuest: item?.uid,
          eventId: event?.id,
          superInvite: false,
          userHostImageUri: event?.hostImage,
        };

        await firestore()
          .collection('Events')
          .doc(list?.id)
          .update({
            usersList: updatedUsersList,
          })
          .then(async () => {
            await handleCreateChat(matchedData);
            handleOpenMatch(matchedData);
            await sendNotification(
              event.uid,
              'New join request',
              `${user.name} wants to join you!`,
              'invite',
              'Join Request'.toUpperCase(),
              user,
            );
            setDataForGuest(prev => prev.filter((i: any) => i.uid !== item?.uid));
          });
      } catch (e) {
        console.log(e);
        showToast('inviteMatch', '', "There's been an error");
      }
    });
  };

  const handleSwipeGuestCardReject = async (item: any): Promise<void> => {
    try {
      await firestore()
        .collection('Events')
        .doc(list?.id)
        .update({
          usersList: firestore.FieldValue.arrayRemove(item),
        });
      showToast('inviteMatch', '', 'You reject invitation');
      await sendNotification(uid, 'Not now.', `${item?.name} reject your invitation.`, 'rejected', 'Rejected'.toUpperCase(), user);
      setDataForGuest(prev => prev.filter((i: any) => i.uid !== item?.uid));
    } catch (e) {
      console.log(e);
      showToast('inviteMatch', '', "There's been an error");
    }
  };

  useEffect(() => {
    getHostInfo(uid);
  }, []);

  // const generateRandomId = (length: number) => {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let result = '';
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // };

  // const getFcmTokenFromUser = async (uid: string) => {
  //   const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
  //   return userInfoDoc.data()?.fcmToken;
  // };

  // const sendNotification = async (forUserUid: string, title: string, body: string, mark: string) => {
  //   const token = await getFcmTokenFromUser(forUserUid);

  //   const response = await fetch('https://fcm.googleapis.com/fcm/send', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       to: token,
  //       notification: {
  //         title: title,
  //         body: body,
  //       },
  //       data: {
  //         status: mark,
  //         image: user.photos[0].image,
  //       },
  //     }),
  //   });

  //   if (!response.ok) {
  //     const error = await response.json();
  //     console.error('error sending notification:', error);
  //   } else {
  //     const data = await response.json();
  //     const userDoc = await firestore().collection('userInfo').doc(forUserUid).get();
  //     const userNotifications = userDoc.data()?.notifications;
  //     const id = generateRandomId(8);
  //     const notification = {
  //       id,
  //       title: title,
  //       body: body,
  //       mark: mark,
  //       uid: user?.uid,
  //     };
  //     try {
  //       await firestore()
  //         .collection('userInfo')
  //         .doc(forUserUid)
  //         .update({
  //           notifications: [...userNotifications, notification],
  //         });
  //     } catch (error) {
  //       console.log('error update notifications', error);
  //     }
  //   }
  // };

  if (item[0]?.uid !== user?.uid) {
    return null;
  }

  return (
    <>
      {loading ? (
        <View style={{flex: 1}}>
          <ActivityIndicator color={whiteColor} size="small" />
        </View>
      ) : (
        <Animated.View style={[styles.itemContainer, {height: heightAnim}]}>
          <TinderCard
            // @ts-ignore
            cardWidth="100%"
            // @ts-ignore
            cardHeight="100%"
            onSwipedRight={() => handleSwipeGuestCardInvite(item[0])}
            onSwipedLeft={() => handleSwipeGuestCardReject(item[0])}
            OverlayLabelRight={OverlayRight}
            OverlayLabelLeft={OverlayLeft}
            disableBottomSwipe={true}
            inputOverlayLabelRightOpacityRange={[0, 40]}
            inputOverlayLabelLeftOpacityRange={[0, -40]}
            translateXRange={[-70, 0, 70]}
            disableTopSwipe={true}
            cardStyle={{height: '100%', borderRadius: 22, zIndex: 999}}>
            <FastImage
              style={styles.imageBackground}
              source={{
                uri: photos[0]?.image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}>
              <View style={[styles.itemContentContainer, {justifyContent: item[0]?.isSuperInvite ? 'space-between' : 'flex-end'}]}>
                {item[0]?.isSuperInvite && (
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
                      <Text style={{color: blackColor, fontSize: 10, fontFamily: Satoshi700, marginLeft: 6}}>Super wants to join you</Text>
                    </View>
                  </View>
                )}
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
                  style={styles.linearGradient}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <TouchableOpacity activeOpacity={0.7} style={[styles.buttonContainer, {marginTop: 'auto'}]} onPress={goToEventInfo}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                      <FastImage
                        style={{width: 25, height: 25, borderRadius: 20}}
                        source={{
                          uri: hostInfo?.photos[0]?.image,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      {/* <Image source={{uri: hostInfo?.photos[0]?.image}} style={{width: 25, height: 25, borderRadius: 20}} /> */}
                      <View style={{marginLeft: 8}}>
                        <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(9, 812)}}>{hostInfo?.name}</Text>
                        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(7, 812), textTransform: 'capitalize'}}>
                          {hostInfo?.accountType}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 6}}>
                      <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(17, 812)}}>{placeName}</Text>
                      {hostInfo?.accountConfirmed && <CheckStarWhite style={{marginLeft: 4}} />}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        marginBottom: 6,
                        backgroundColor: transparent60Color,
                        borderRadius: 50,
                        paddingVertical: 4,
                        paddingHorizontal: 6,
                      }}>
                      <User width={10} height={10} />
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi400,
                          fontSize: RFValue(10, 812),
                          marginLeft: 4,
                        }}>{`${female + femaleFriend} x Women invitation `}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        backgroundColor: transparent60Color,
                        borderRadius: 50,
                        paddingVertical: 4,
                        paddingHorizontal: 6,
                      }}>
                      <Calendar width={10} height={10} />
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi400,
                          fontSize: RFValue(10, 812),
                          marginLeft: 4,
                        }}>
                        {moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD MMMM YYYY')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </FastImage>
            {/* <ImageBackground style={styles.imageBackground} resizeMode="cover" source={{uri: photos[0]?.image}}> */}

            {/* </ImageBackground> */}
          </TinderCard>
        </Animated.View>
      )}
    </>
  );
};

export default ItemRequestGuest;
