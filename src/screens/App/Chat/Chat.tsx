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
import CalendarIcon from 'assets/images/icons/calendar.svg';
import FlashField from 'assets/images/icons/flash.svg';
import ThreeDoths from 'assets/images/icons/more-white.svg';
import ChatIcon from 'assets/images/tab-bar/chat-active.svg';
import Button from 'components/Button/Button.tsx';
import {EventContext} from 'contexts/EventContext.tsx';
import {blackColor, grayScale700, whiteColor} from 'constants/colors';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import {useFocusEffect} from '@react-navigation/native';
import {useUser} from 'src/store/userStore';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {AccountInfoFlyWeight, useUserProfileChangeSubscription} from 'helpers/userProfile';
import {
  ACCEPTED_STATUS,
  ALL,
  APPROVED_STATUS,
  CANCEL_STATUS,
  INVITE_MATCH_STATUS,
  screenHeight,
  THIS_MONTH,
  THIS_WEEK,
} from 'constants/common';
import FastImage from 'react-native-fast-image';
import {getUsersListAccepted} from 'helpers/getUsersListAccepted';
import {filterEventsByThisMonth} from 'helpers/filterEventsByThisMonth';
import {filterEventsByThisWeek} from 'helpers/filterEventsByThisWeek';
import {EventsDate} from 'contexts/EventsDate';

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
  const [hostMenu, setHostMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState([]);
  const [DATAEventsJoining, setDATAEventsJoining] = useState([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [eventData, setEventData] = useState<any>();

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);

  const {activeEventDate} = useContext(EventsDate);

  const styles = useStyles();
  const navigation = useAppNavigation();

  const {activeEvent} = useContext(EventContext);
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
        const userInfoDoc = await firestore().collection('userInfo').doc(userData.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {}
    }
    setLoading(false);
  };

  const fetchEventData = async () => {
    setLoading(true);
    const eventDataDoc = await firestore().collection('Events').doc(activeEvent?.id).get();
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
            <View style={{flexDirection: 'row'}}>
              <View>
                <FastImage source={{uri: i?.avatar}} style={{width: 50, height: 50, borderRadius: 50}} />
              </View>
              <View style={{marginLeft: 15, flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.textNameChat}>{i?.name}</Text>
                  <ChatIcon width={18} height={18} style={{position: 'absolute', right: 0, top: 0}} />
                </View>
                <View>
                  <Text style={styles.textDescription}>
                    {i?.messages[i?.messages.length - 1] && i?.messages[i?.messages.length - 1]?.message}
                  </Text>
                  {!!newMessages && (
                    <View style={styles.newMessage}>
                      <Text style={styles.textCountNewMessages}>{newMessages}</Text>
                    </View>
                  )}
                </View>
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
        return 'Invite Match'.toUpperCase();
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
        .collection('messages')
        .doc(activeEvent?.id)
        .onSnapshot(documentSnapshot => {
          if (!documentSnapshot.exists) {
            return setMessages([]);
          }
          setMessages(documentSnapshot.data());
          setLoading(false);
        });
    } else {
      guestSubscriber = firestore()
        .collection('messages')
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
            const eventQuery = await firestore().collection('Events').doc(chat?.activeEvent).get();
            if (!eventQuery.exists) {
              continue;
            }
            const eventData = eventQuery.data();
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
                .map(chat => ({...chat, avatar: eventData?.hostImage, name: eventData?.hostName})),
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
                fontFamily: Satoshi700,
                fontSize: RFValue(18, 812),
                textAlign: 'center',
              }}>
              Join Requests: {eventData?.requestsList?.length}
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
      <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
      {!loading ? (
        !typeEvents ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages?.chats}
            ListEmptyComponent={() => (
              <View style={{height: '100%', marginTop: eventData ? screenHeight * 0.06 : screenHeight / 5.5}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                    You don't have any chat
                  </Text>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
                    Get started by swiping to {isHost ? 'invite guests' : 'join events and begin receiving messages.'}
                  </Text>
                  <Button title="Start swiping" onPress={() => navigation.navigate(IOPath as never)} />
                </View>
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
        ) : (
          <FlatList
            data={DATAEventsJoining}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginBottom: 20, marginHorizontal: 5}}
            ListEmptyComponent={() => (
              <View style={{height: '100%', marginTop: screenHeight / 8}}>
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
        )
      ) : null}
      {!userInfo?.accountConfirmed && !loading && <ModalLockAccount isVisibleButton={false} />}
    </View>
  );
};

export default Chat;
