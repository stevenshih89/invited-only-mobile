import React, {FC, useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/Chat/styles.ts';

import {chatCorrespondencePath, IOPath} from 'constants/pathLocations.ts';
import ModalHostMenu from 'components/Modal/ModalHostMenu/ModalHostMenu.tsx';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import {useAdminActions} from 'src/store/adminActions';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';

//import icons
import FlashField from 'assets/images/icons/flash.svg';
import ThreeDoths from 'assets/images/icons/more-white.svg';
import ChatIcon from 'assets/images/tab-bar/chat-active.svg';
import Button from 'components/Button/Button.tsx';
import {blackColor, grayScale700, whiteColor} from 'constants/colors';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import {useFocusEffect} from '@react-navigation/native';
import {useUser} from 'src/store/userStore';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {AccountInfoFlyWeight, useUserProfileChangeSubscription} from 'helpers/userProfile';
import {ACCEPTED_STATUS, ALL, APPROVED_STATUS, CANCEL_STATUS, INVITE_MATCH_STATUS, THIS_MONTH, THIS_WEEK} from 'constants/common';
import FastImage from 'react-native-fast-image';
import {getUsersListAccepted} from 'helpers/getUsersListAccepted';
import {filterEventsByThisMonth} from 'helpers/filterEventsByThisMonth';
import {filterEventsByThisWeek} from 'helpers/filterEventsByThisWeek';
import {EventsDate} from 'contexts/EventsDate';
import {getUserData} from 'helpers/getUserData';
import analytics from '@react-native-firebase/analytics';
import {chatsScreen} from 'constants/analitycs';
import {useMyEvents} from 'src/store/myEvents';
import {EventData} from 'src/types/event';
import Config from 'react-native-config';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';

type ItemProps = {
  title: string;
  id: string | number;
  message: string;
  messages: any;
  image: any;
  online: boolean;
  story: boolean;
  inviteStatus: string;
  superInvite: boolean;
  invitedStatus: string;
  uid: string;
  hostUid: string;
  newMessages: number;
};

type ItemEventsJoiningProps = {
  chats: [{id: string; image: any; name: string; lastMessage: string}] | any;
  girlInvitation: number;
  date: string;
  maleInvitation: number;
  status: string;
  image: any;
  title: string;
  activeEvent: string;
  hostUid: string;
  usersList: [];
  newMessages: number;
  hostImage: string;
  statusEvent: string;
};

interface ChatProps {
  typeEvents?: boolean;
}

const Chat: FC<ChatProps> = ({typeEvents}) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
  const [hostMenu, setHostMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState([]);
  const [DATAEventsJoining, setDATAEventsJoining] = useState([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [eventData, setEventData] = useState<EventData>();

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);
  const changeAccountTypeModalVisible = useAdminActions((i: any) => i?.changeAccountTypeModalVisible);
  const setChangeAccountModalVisible = useAdminActions((i: any) => i?.setChangeAccountModalVisible);

  const {activeEventDate} = useContext(EventsDate);

  const styles = useStyles();
  const navigation = useAppNavigation();

  // const {activeEvent} = useContext(EventContext);
  const {activeEvent} = useMyEvents();
  const user = useUser((i: any) => i?.user);

  const isHost = user?.accountType?.toLowerCase() === 'host';

  const {accountConfirmed} = useUserProfileChangeSubscription();
  useEffect(() => {
    if (!Object.keys(userInfo).length) {
      return;
    }

    setUserInfo((prev: Partial<AccountInfoFlyWeight>) => ({...prev, accountConfirmed}));
  }, [accountConfirmed]);

  const fetchUserInfo = async () => {
    setLoading(true);
    const userData = auth().currentUser;

    if (userData) {
      try {
        const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(userData.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {}
    }
    setLoading(false);
  };

  const fetchEventData = async () => {
    setLoading(true);
    const eventDataDoc = await firestore().collection(apiEventsCollection).doc(activeEvent?.id).get();
    if (eventDataDoc.exists) {
      const data = eventDataDoc.data();
      setEventData(data);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEventData();
    }, [activeEvent?.id]),
  );

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
      try {
        analytics().logScreenView({
          screen_name: chatsScreen,
        });
      } catch (e) {
        console.error(e);
      }
    }, []),
  );

  const Item = ({
    title,
    message,
    image,
    online,
    story,
    messages: messagesItem,
    id,
    superInvite,
    invitedStatus,
    uid,
    hostUid,
    newMessages,
  }: ItemProps) => {
    const userStatus = eventData?.usersList?.find(i => i?.uid === uid)?.status;

    return (
      <View style={styles.item}>
        <View style={{flexDirection: 'row', height: 75, width: '100%', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate(chatCorrespondencePath, {
                screen: chatCorrespondencePath,
                params: {
                  image: image,
                  title: title,
                  online: false,
                  messages: messagesItem,
                  activeEvent: activeEvent?.id,
                  id: id,
                  superInvite: superInvite,
                  invitedStatus: invitedStatus,
                  uid: uid,
                  hostUid: hostUid,
                },
              });
            }}
            style={styles.wrapperItem}>
            <View>
              <FastImage resizeMode="cover" style={[styles.imageUser, story && styles.story]} source={{uri: image}} />
              {online && <View style={styles.greenCircle} />}
            </View>
            <View style={styles.wrapperItemElements}>
              <View style={styles.rowTextNameAndStatus}>
                <Text style={styles.textName}>
                  {title} {superInvite && <FlashField width={13} height={13} />}
                </Text>
              </View>
              <Text numberOfLines={1} style={styles.textMessage}>
                {message}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.wrapperThreeDotsAndBadge}>
            <View style={[handleCheckTypeInvitedStyles(userStatus), {marginTop: 4}]}>
              <Text style={[styles.textStatusInvite, {color: userStatus === ACCEPTED_STATUS ? blackColor : whiteColor}]}>
                {handleCheckTypeInvitedText(userStatus)}
              </Text>
            </View>
            <View style={[styles.wrapperTextMessage, {flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between'}]}>
              {!!newMessages && (
                <View style={styles.newMessage}>
                  <Text style={styles.textCountNewMessages}>{newMessages}</Text>
                </View>
              )}
            </View>
            {/* <TouchableOpacity>
            <ThreeDoths />
          </TouchableOpacity> */}
            {/*<Badge value={22} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />*/}
          </View>
        </View>
      </View>
    );
  };

  const ItemEventsJoining = ({
    title,
    chats,
    girlInvitation,
    maleInvitation,
    image,
    status,
    date,
    activeEvent,
    hostUid,
    usersList,
    newMessages,
    hostImage,
    statusEvent,
  }: ItemEventsJoiningProps) => {
    const statusColor = handleCheckStatusStyles(status);

    const checkIsFullEvent = () => {
      const acceptEvent = usersList.filter(item => item?.status === ACCEPTED_STATUS);
      return acceptEvent.length >= girlInvitation + maleInvitation;
    };

    return (
      <View style={styles.itemEventsJoining}>
        <View style={styles.wrapperItemEventsJoining}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              backgroundColor: whiteColor,
              borderRadius: 5,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}>
            <Text style={{fontSize: RFValue(12, 812), fontFamily: Satoshi700, color: blackColor}}>
              {statusEvent && !checkIsFullEvent() ? 'ACTIVE' : 'FULL'}
            </Text>
          </View>
          <TouchableOpacity style={styles.fdrAiC}>
            <FastImage resizeMode="cover" source={{uri: image}} style={{width: 50, height: 50, borderRadius: 50}} />
            <View style={{marginLeft: 15}}>
              <View style={styles.fdrAiC}>
                <Text style={styles.title}>{title}</Text>
                <View style={{backgroundColor: statusColor, borderRadius: 4}}>
                  <View style={[handleCheckTypeInvitedStyles(status)]}>
                    <Text style={styles.textStatusInvite}>{handleCheckTypeInvitedText(status)}</Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={styles.fdrAiC}>
                  <Text style={styles.textDescriptionUnderTitle}>Guest invitation {girlInvitation + maleInvitation}</Text>
                </View>
                <View style={{width: 1, height: '100%', backgroundColor: grayScale700, marginHorizontal: 12}} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', right: 0, bottom: -5}} onPress={() => setHostMenu(true)}>
            <ThreeDoths />
          </TouchableOpacity>
        </View>
        <ModalHostMenu
          girlInvitation={girlInvitation}
          date={date}
          image={image}
          imageBg={image}
          name={title}
          setHostMenu={setHostMenu}
          hostMenu={hostMenu}
          hostUid={hostUid}
          usersList={usersList}
          hostImage={hostImage}
          eventId={activeEvent}
        />
        {chats?.map((i: any) => (
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate(chatCorrespondencePath, {
                screen: chatCorrespondencePath,
                params: {
                  image: i?.avatar,
                  title: i?.name,
                  online: true,
                  messages: i?.messages,
                  activeEvent: activeEvent,
                  id: i?.id,
                  superInvite: i?.superInvite,
                  invitedStatus: i?.invitedStatus,
                  uid: hostUid,
                  hostUid: hostUid,
                },
              });
            }}
            key={i?.id}
            style={styles.chatItem}>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FastImage source={{uri: i?.avatar}} style={{width: 50, height: 50, borderRadius: 50}} />
                <View style={{marginLeft: 12}}>
                  <Text style={styles.textNameChat}>{i?.name}</Text>
                  <Text style={styles.textDescription}>
                    {i?.messages[i?.messages.length - 1] && i?.messages[i?.messages.length - 1]?.message}
                  </Text>
                </View>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <ChatIcon width={18} height={18} style={{marginTop: 5}} />
                {!!newMessages && (
                  <View style={styles.newMessage}>
                    <Text style={styles.textCountNewMessages}>{newMessages}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleCheckTypeInvitedText = (type: string) => {
    switch (type) {
      case APPROVED_STATUS:
        return 'Approved'.toUpperCase();
      case INVITE_MATCH_STATUS:
        return 'New Connection'.toUpperCase();
      case ACCEPTED_STATUS:
        return 'Accepted'.toUpperCase();
      case CANCEL_STATUS:
        return 'Cancelled'.toUpperCase();
      case 'admin':
        return 'Admin'.toUpperCase();
      default:
        return null;
    }
  };

  const handleCheckTypeInvitedStyles = (type: string) => {
    switch (type) {
      case APPROVED_STATUS:
        return styles.textStatusPending;
      case INVITE_MATCH_STATUS:
        return styles.textStatusInviteMatch;
      case CANCEL_STATUS:
        return styles.textStatusInviteMatch;
      case ACCEPTED_STATUS:
        return styles.textStatusInvitationAccepted;
      case 'admin':
        return styles.textStatusInviteMatch;
      default:
        return null;
    }
  };

  const handleCheckStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return '#2EB263';
      case 'Full':
        return '#212727';
      case 'Cancelled':
        return '#676767';
      case 'Starts':
        return '#2E5BB2';

      default:
        return '';
    }
  };

  useEffect(() => {
    let hostSubscriber: any;
    let guestSubscriber: any;
    if (isHost) {
      hostSubscriber = firestore()
        .collection(apiMessagesCollection)
        .doc(activeEvent?.id)
        .onSnapshot(async documentSnapshot => {
          if (!documentSnapshot.exists) {
            return setMessages([]);
          }
          const data = documentSnapshot.data();
          const mappedMessagesData = [];
          for (const chat of data.chats) {
            if (!chat?.uid) {
              continue;
            }
            const {photos} = await getUserData(chat?.uid);
            mappedMessagesData.push({
              ...chat,
              avatar: photos?.[0]?.image || chat?.avatar,
            });
          }

          setMessages({...data, chats: mappedMessagesData});
          setLoading(false);
        });
    } else {
      guestSubscriber = firestore()
        .collection(apiMessagesCollection)
        .onSnapshot(async documentSnapshot => {
          if (documentSnapshot.empty) {
            return;
          }
          const chatData = documentSnapshot.docs.map(i => i.data());
          const filteredChats = chatData.filter(chatDataItem => {
            return chatDataItem?.chats?.some(chat => {
              return chat?.uid === user?.uid;
            });
          });

          const mappedChats: any = [];

          for (const chat of filteredChats) {
            const eventQuery = await firestore().collection(apiEventsCollection).doc(chat?.activeEvent).get();
            if (!eventQuery.exists) {
              continue;
            }
            const eventData = eventQuery.data();
            const {photos: hostPhotos} = await getUserData(eventData?.uid);
            const data = {
              id: chat?.activeEvent,
              girlInvitation: eventData?.female,
              maleInvitation: eventData?.male,
              date: eventData?.date,
              hour: eventData?.hour,
              status: eventData?.activeType,
              image: eventData?.photos[0]?.image,
              hostImage: eventData?.hostImage,
              title: eventData?.name,
              hostUid: eventData?.uid,
              activeEvent: chat?.activeEvent,
              usersList: eventData?.usersList,
              statusEvent: eventData?.statusEvent,
              chats: chat?.chats
                .filter(chat => chat.uid === user?.uid)
                .map(chat => ({
                  ...chat,
                  avatar: hostPhotos.length ? hostPhotos[0]?.image : eventData?.hostImage,
                  name: eventData?.hostName,
                })),
            };
            mappedChats.push(data);
          }

          const filterEventByDate = () => {
            if (activeEventDate === ALL) {
              return mappedChats;
            }
            if (activeEventDate === THIS_WEEK) {
              return filterEventsByThisWeek(mappedChats);
            }
            if (activeEventDate === THIS_MONTH) {
              return filterEventsByThisMonth(mappedChats);
            }
            return mappedChats;
          };

          const filteredDataEvents = filterEventByDate();
          setDATAEventsJoining(filteredDataEvents);
          setLoading(false);
        });
      // handleBuildGuestEventsData();
    }

    return () => {
      hostSubscriber && hostSubscriber();
      guestSubscriber && guestSubscriber();
    };
  }, [activeEvent?.id, loading, activeEventDate]);

  return (
    <View style={styles.container}>
      {isHost && eventData?.uid && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 7,
            borderWidth: 1,
            borderColor: whiteColor,
            borderRadius: 12,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi500,
                fontSize: RFValue(18, 812),
                textAlign: 'center',
              }}>
              {eventData?.name || eventData?.placeName}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={{uri: eventData?.photos?.[0]?.image || ''}}
              style={{width: 40, height: 40, borderRadius: 40, borderWidth: 1, borderColor: whiteColor}}
            />
            <View style={{alignItems: 'center', marginLeft: 12}}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(26, 812),
                }}>
                {getUsersListAccepted(eventData?.usersList)}/{eventData?.male + eventData?.female}
              </Text>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(12, 812),
                }}>
                Guest List
              </Text>
            </View>
          </View>
        </View>
      )}
      {userInfo?.photos?.length > 0 && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />}
      {acceptModalVisible && <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />}
      {changeAccountTypeModalVisible && !acceptModalVisible && <ModalChangeAccountType isVisible={changeAccountTypeModalVisible} userInfo={userInfo} setIsVisible={setChangeAccountModalVisible} />}
      {!loading ? (
        isHost ? (
          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={messages?.chats}
              contentContainerStyle={{flexGrow: 1}}
              ListEmptyComponent={() => (
                <View style={{justifyContent: 'center', flex: 1}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                    You don't have any chat
                  </Text>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
                    Get started to {isHost ? 'invite guests' : 'join events and begin receiving messages.'}
                  </Text>
                  <Button title={isHost ? 'Invite guests' : 'Join events'} onPress={() => navigation.navigate(IOPath as never)} />
                </View>
              )}
              renderItem={({item}) => {
                return (
                  <Item
                    inviteStatus={item?.invitedStatus}
                    story={item?.story}
                    online={item?.online}
                    title={item?.name}
                    message={item?.messages ? item?.messages[item?.messages?.length - 1]?.message : []}
                    messages={item?.messages}
                    image={item?.avatar}
                    superInvite={item?.superInvite}
                    invitedStatus={item?.invitedStatus}
                    id={item?.id}
                    uid={item?.uid}
                    hostUid={item?.hostUid}
                    newMessages={item?.newMessagesGuest}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={DATAEventsJoining}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, marginBottom: 20, marginHorizontal: 5}}
              ListEmptyComponent={() => (
                <View style={{justifyContent: 'center', flex: 1}}>
                  <Text style={styles.textYouNeedToJoin}>You need to join an event</Text>
                  <Text style={styles.textYouDontHaveAny}>You don't have any active event.</Text>
                  <Button onPress={() => navigation.navigate(IOPath as never)} buttonStyle={{marginTop: 34}} title="Join event" />
                </View>
              )}
              renderItem={({item}) => {
                return (
                  <ItemEventsJoining
                    image={item.image}
                    title={item.title}
                    chats={item.chats}
                    date={item.date}
                    activeEvent={item.activeEvent}
                    girlInvitation={item.girlInvitation}
                    maleInvitation={item.maleInvitation}
                    hostUid={item.hostUid}
                    status={item.status}
                    usersList={item.usersList}
                    newMessages={item?.chats[0].newMessagesHost}
                    hostImage={item?.hostImage}
                    statusEvent={item?.statusEvent}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      ) : null}
      {!userInfo?.accountConfirmed && !loading && <ModalLockAccount isVisibleButton={false} />}
    </View>
  );
};

export default Chat;
