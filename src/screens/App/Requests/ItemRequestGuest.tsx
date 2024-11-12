import {black4Color, blackColor, grayColor, lightGreenColor, lightRed1Color, transparent60Color, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import useStyles from './styles';
import FlashFillBlack from 'assets/images/icons/flash-filled-black.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import {FC, useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from '@ant-design/react-native';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from '../../../store/userStore';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {sendNotification} from 'helpers/fcmHelper';
import {handleCreateChat} from 'helpers/chat';
import {INVITE_MATCH_STATUS, screenHeight} from 'constants/common';
import {calculateAge} from 'helpers/calculateAge';
import {convertToPmAmFormat} from 'helpers/convertToPmAmFormat';
import Button from 'components/Button/Button';
import {updateGuestEventsList} from 'helpers/updateGuestEventsList';
import {Event} from 'src/types/event';
import analytics from '@react-native-firebase/analytics';
import { joinEvent } from 'constants/analitycs';
import { requestsScreen } from 'constants/analitycs';

const eventTypes = [
  {id: 0, label: 'Vip Tables'},
  {id: 1, label: 'Custom'},
  {id: 2, label: 'Table'},
  {id: 3, label: 'Concerts'},
  {id: 4, label: 'Exclusive'},
  {id: 5, label: 'Yacht Party'},
  {id: 6, label: 'Pool Party'},
  {id: 7, label: 'Private'},
  {id: 8, label: 'Birthday Party'},
  {id: 9, label: 'Restaurants'},
];

const ItemRequestGuest: FC = ({list, item, setDataForGuest, handleOpenMatch, index}: any) => {
  const [hostInfo, setHostInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heightAnim] = useState(new Animated.Value(screenHeight * 0.4));
  const cardRef = useRef(null);
  const {photos, uid, hour, date, female, male, name, usersList, activeType} = list;

  const styles = useStyles();
  const user = useUser((i: any) => i?.user);

  const getHostInfo = async uid => {
    try {
      const host = await firestore().collection('userInfo').doc(uid).get();
      setHostInfo(host.data());
      setLoading(false);
      // console.log('host data', host.data());
    } catch (e) {
      setLoading(false);
      // console.log(e);
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

  const onInvite = async (userItem: Event.User): Promise<void> => {
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
          if (invUser.uid === userItem?.uid) {
            return {
              ...invUser,
              status: INVITE_MATCH_STATUS,
            };
          }
          return invUser;
        });

        const matchedData = {
          type: 'match',
          name: event?.hostName,
          imageUri: userItem?.userPhoto,
          uidHost: event?.uid,
          uidGuest: userItem?.uid,
          nameGuest: userItem?.name,
          nameHost: hostInfo?.name,
          eventId: event?.id,
          superInvite: false,
          userHostImageUri: event?.hostImage,
          joinEvents: user?.joinEvents,
          location: user?.location,
          premium: hostInfo?.accountPremium,
          dateHost: hostInfo?.date,
          dateGuest: user?.date,
          onlineGuest: user?.online,
          accountConfirmedHost: hostInfo?.accountConfirmed,
          accountConfirmedGuest: user?.accountConfirmed,
          usersListHost: usersList,
          accountTypeHost: hostInfo?.accountType,
          accountTypeGuest: user?.accountType,
          eventImage: photos[0].image,
          guestsInvited: male + female,
        };

        await firestore()
          .collection('Events')
          .doc(list?.id)
          .update({
            usersList: updatedUsersList,
          })
          .then(async () => {
            analytics().logEvent(`${requestsScreen}_${joinEvent}`, {
              eventId: list?.id,
            });
            await handleCreateChat(matchedData);
            await updateGuestEventsList(event?.id, user?.uid);
            handleOpenMatch(matchedData);
            const getDoc = await firestore().collection('userInfo').doc(event.uid).get();
            const docData = getDoc.data();
            if (docData?.notificationSettings.joinedEvent) {
              await sendNotification(
                event.uid,
                'New join request',
                `${user.name} wants to join you!`,
                'invite',
                'Join Request'.toUpperCase(),
                user,
              );
            }
          });
        await updateJoinEvents();
      } catch (e) {
        // console.log(e);
        showToast('inviteMatch', '', "There's been an error");
      }
    });
  };

  const updateJoinEvents = async () => {
    try {
      const doc = firestore().collection('userInfo').doc(user.uid);
      const data = (await doc.get()).data();
      if (data?.joinEvents) {
        doc.update({
          joinEvents: data?.joinEvents + 1,
        });
      } else {
        doc.update({
          joinEvents: 1,
        });
      }
    } catch (error) {
      console.log('error joinEvents update', error);
    }
  };

  const onReject = async (userItem: Event.User): Promise<void> => {
    try {
      await firestore()
        .collection('Events')
        .doc(list?.id)
        .update({
          usersList: firestore.FieldValue.arrayRemove(userItem),
          rejectsList: firestore.FieldValue.arrayUnion({uid: userItem.uid}),
        });
      analytics().logEvent(`${requestsScreen}_reject_${joinEvent}`, {
        eventId: list?.id,
      });
      showToast('inviteMatch', '', 'You reject invitation');
      const getDoc = await firestore().collection('userInfo').doc(uid).get();
      const docData = getDoc.data();
      if (docData?.notificationSettings.myEvents) {
        await sendNotification(uid, 'Not now.', `${userItem?.name} reject your invitation.`, 'rejected', 'Rejected'.toUpperCase(), user);
      }
    } catch (e) {
      console.error(e);
      showToast('inviteMatch', '', "There's been an error");
    }
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

  useEffect(() => {
    getHostInfo(uid);
  }, []);

  function getMonth() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [day, month, year] = date.split('.');
    const monthName = months[parseInt(month) - 1];
    return `${monthName}`;
  }

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
        <Animated.View style={[styles.itemContainer, {height: heightAnim, marginTop: index ? 30 : 0}]}>
          <TinderCard
            ref={cardRef}
            // @ts-ignore
            cardWidth="100%"
            // @ts-ignore
            cardHeight="100%"
            onSwipedRight={() => handleInvite({userItem: item[0], withSwipeAnimation: false})}
            onSwipedLeft={() => handleReject({userItem: item[0], withSwipeAnimation: false})}
            OverlayLabelRight={OverlayRight}
            OverlayLabelLeft={OverlayLeft}
            disableBottomSwipe={true}
            disableVerticalSwipe={true}
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
                  <View
                    style={{
                      zIndex: 1000,
                      position: 'absolute',
                      top: screenHeight * 0.2 - 40,
                      left: 17,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: whiteColor,
                        borderRadius: 5,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        marginBottom: 'auto',
                      }}>
                      <FlashFillBlack />
                      <Text style={{color: blackColor, fontSize: 10, fontFamily: Satoshi700, marginLeft: 6}}>Super invite you</Text>
                    </View>
                  </View>
                )}
                <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={styles.linearGradient}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{alignSelf: 'flex-start'}}>
                        <FastImage style={{width: 50, height: 50, borderRadius: 50}} source={{uri: hostInfo?.photos?.[0]?.image || ''}} />
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 2,
                            right: 0,
                            width: 12,
                            height: 12,
                            borderRadius: 12,
                            borderWidth: 1.25,
                            borderColor: blackColor,
                            backgroundColor: lightGreenColor,
                          }}
                        />
                      </View>
                      <View style={{marginLeft: 10, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: blackColor,
                              borderRadius: 5,
                              paddingHorizontal: 12,
                              paddingVertical: 2,
                              alignSelf: 'flex-start',
                              borderWidth: 1,
                              borderColor: whiteColor,
                            }}>
                            {hostInfo?.accountType === 'guest' && (
                              <Text
                                style={{
                                  color: whiteColor,
                                  fontSize: RFValue(10, 812),
                                  fontFamily: Satoshi700,
                                  textTransform: 'capitalize',
                                }}>
                                Guest
                              </Text>
                            )}
                            {hostInfo?.accountType === 'host' && (
                              <Text
                                style={{
                                  color: whiteColor,
                                  fontSize: RFValue(10, 812),
                                  fontFamily: Satoshi700,
                                  textTransform: 'capitalize',
                                }}>
                                Host
                              </Text>
                            )}
                          </View>
                          {hostInfo?.accountPremium && (
                            <LinearGradient
                              colors={['#977B4A', '#E5D291', '#A28453']}
                              style={{
                                marginLeft: 6,
                                alignSelf: 'flex-start',
                                borderRadius: 4,
                                paddingHorizontal: 12,
                                paddingVertical: 2,
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
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: whiteColor,
                              fontFamily: Satoshi700,
                              fontSize: RFValue(16, 812),
                              marginTop: 4,
                            }}>
                            {hostInfo?.name}
                            {hostInfo?.showAge ? <Text>,</Text> : null}
                          </Text>
                          {hostInfo?.showAge && (
                            <Text
                              style={{
                                color: whiteColor,
                                fontFamily: Satoshi700,
                                fontSize: RFValue(13, 812),
                                marginTop: 5,
                              }}>
                              {' '}
                              {calculateAge(hostInfo?.date)}
                            </Text>
                          )}
                          <View style={{marginLeft: 8}}>{hostInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} />}</View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleReject({userItem: item[0], withSwipeAnimation: true})}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: transparent60Color,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5000,
                      }}>
                      <CloseIcon width={27} height={27} />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
                <View
                  style={{
                    backgroundColor: whiteColor,
                    height: screenHeight * 0.18,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: 54,
                        height: 54,
                        borderWidth: 1,
                        borderColor: blackColor,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: blackColor,
                          fontSize: RFValue(22, 812),
                          fontFamily: Satoshi700,
                        }}>
                        {date.split('.')[0]}
                      </Text>
                      <Text
                        style={{
                          color: blackColor,
                          fontSize: RFValue(10, 812),
                          fontFamily: Satoshi500,
                        }}>
                        {getMonth()}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 27,
                      }}>
                      <Text
                        style={{
                          color: black4Color,
                          fontSize: RFValue(16, 812),
                          fontFamily: Satoshi700,
                        }}>
                        {name} - {eventTypes[activeType].label}
                      </Text>
                      {hour && (
                        <Text
                          style={{
                            color: grayColor,
                            fontSize: RFValue(16, 812),
                            fontFamily: Satoshi500,
                            marginVertical: 4,
                          }}>
                          {date.split('.')[0]} {getMonth()} - {convertToPmAmFormat(hour)}{' '}
                        </Text>
                      )}
                      <Text
                        style={{
                          color: black4Color,
                          fontSize: RFValue(14, 812),
                          fontFamily: Satoshi500,
                        }}>
                        Guest Invitation : {usersList.length}
                      </Text>
                    </View>
                  </View>
                  <Button
                    onPress={() => handleInvite({userItem: item[0], withSwipeAnimation: true})}
                    title="Join"
                    buttonStyle={{backgroundColor: blackColor}}
                    buttonTitleStyle={{color: whiteColor}}
                  />
                </View>
              </View>
            </FastImage>
          </TinderCard>
        </Animated.View>
      )}
    </>
  );
};

export default ItemRequestGuest;
