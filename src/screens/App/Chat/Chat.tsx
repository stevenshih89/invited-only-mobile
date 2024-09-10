import React, {FC, useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/Chat/styles.ts';

import {chatCorrespondencePath, IOPath} from 'constants/pathLocations.ts';
import ModalHostMenu from 'components/Modal/ModalHostMenu/ModalHostMenu.tsx';

//import icons
import FlashField from 'assets/images/icons/flash.svg';
import ThreeDoths from 'assets/images/icons/more-white.svg';
import PersonIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ChatIcon from 'assets/images/tab-bar/chat-active.svg';
import Button from 'components/Button/Button.tsx';
import {useChat} from '../../../store/chatStore';
import {EventContext} from 'contexts/EventContext.tsx';
import moment from 'moment/moment';
import {blackColor, whiteColor} from 'constants/colors';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import {useFocusEffect} from '@react-navigation/native';
import {useUser} from 'src/store/userStore';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

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
  data: string;
  status: string;
  image: any;
  title: string;
  activeEvent: string;
  hostUid: string;
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
  const [eventData, setEventData] = useState<any>({});

  const styles = useStyles();
  const navigation = useAppNavigation();
  const {myEvents} = useContext(EventContext);

  const activeEvent = useChat((i: any) => i?.activeEvent);
  const setChat = useChat((i: any) => i.setActiveEvent);
  const user = useUser((i: any) => i?.user);

  const isHost = user?.accountType?.toLowerCase() === 'host';

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
    const eventDataDoc = await firestore().collection('Events').doc(activeEvent).get();
    if (eventDataDoc.exists) {
      const data = eventDataDoc.data();
      setEventData(data);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEventData();
    }, [activeEvent]),
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

    console.warn('userStatus', userStatus);

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
                  activeEvent: activeEvent,
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
              <Image resizeMode="cover" style={[styles.imageUser, story && styles.story]} source={{uri: image}} />
              {online && <View style={styles.greenCircle} />}
            </View>
            <View style={styles.wrapperItemElements}>
              <View style={styles.rowTextNameAndStatus}>
                <Text style={styles.textName}>
                  {title} {superInvite && <FlashField width={13} height={13} />}
                </Text>
              </View>
              <Text style={styles.textMessage}>{message}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.wrapperThreeDotsAndBadge}>
            <View style={[handleCheckTypeInvitedStyles(userStatus), {marginTop: 4}]}>
              <Text style={[styles.textStatusInvite, {color: userStatus === 'accepted' ? blackColor : whiteColor}]}>
                {handleCheckTypeInvitedText(userStatus)}
              </Text>
            </View>
            <View style={[styles.wrapperTextMessage, {flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between'}]}>
              {/* <View
                style={{
                  backgroundColor: inviteStatus === 'accepted' ? whiteColor : blackColor,
                  borderRadius: 50,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderColor: whiteColor,
                  borderStyle: 'solid',
                  borderWidth: inviteStatus === 'accepted' ? 0 : 1,
                  marginBottom: 4,
                }}>
                <Text style={{fontSize: RFValue(9, 812), color: inviteStatus === 'accepted' ? blackColor : whiteColor}}>
                  {getTextByStatus(inviteStatus)}
                </Text>
              </View> */}
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

  const ItemEventsJoining = ({title, chats, girlInvitation, image, status, data, activeEvent, hostUid}: ItemEventsJoiningProps) => {
    const statusColor = handleCheckStatusStyles(status);
    return (
      <View style={styles.itemEventsJoining}>
        <View style={styles.wrapperItemEventsJoining}>
          <TouchableOpacity style={styles.fdrAiC}>
            <Image resizeMode="contain" source={{uri: image}} style={{width: 50, height: 50, borderRadius: 50}} />
            <View style={{marginLeft: 15}}>
              <View style={styles.fdrAiC}>
                <Text style={styles.title}>{title}</Text>
                <View style={{backgroundColor: statusColor, borderRadius: 4}}>
                  <View style={[handleCheckTypeInvitedStyles(status)]}>
                    <Text style={styles.textStatusInvite}>{handleCheckTypeInvitedText(status)}</Text>
                  </View>
                  {/*<Text style={[styles.textStatus]}>{status}</Text>*/}
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={styles.fdrAiC}>
                  <PersonIcon width={14} height={14} />
                  <Text style={styles.textDescriptionUnderTitle}>{girlInvitation} x Girl invitation </Text>
                </View>
                <View style={styles.fdrAiC}>
                  <CalendarIcon style={{marginLeft: 10}} width={14} height={14} />
                  <Text style={styles.textDescriptionUnderTitle}>{moment(`${data}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHostMenu(true)}>
            <ThreeDoths />
          </TouchableOpacity>
        </View>
        <ModalHostMenu
          girlInvitation={girlInvitation}
          data={data}
          image={image}
          imageBg={image}
          name={title}
          setHostMenu={setHostMenu}
          hostMenu={hostMenu}
          hostUid={hostUid}
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
                  superInvite: false,
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
                <Image source={{uri: i?.avatar}} style={{width: 50, height: 50, borderRadius: 50}} />
                {/* <View style={styles.greenCircleChat} /> */}
              </View>
              <View style={{marginLeft: 15}}>
                <Text style={styles.textNameChat}>{i?.name}</Text>
                <Text style={styles.textDescription}>
                  {i?.messages[i?.messages.length - 1] && i?.messages[i?.messages.length - 1]?.message}
                </Text>
              </View>
            </View>
            <ChatIcon width={18} height={18} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleCheckTypeInvitedText = (type: string) => {
    switch (type) {
      case 'approved':
        return 'Approved'.toUpperCase();
      case 'invite_match':
        return 'Invite Match'.toUpperCase();
      case 'accepted':
        return 'Accepted'.toUpperCase();
      case 'admin':
        return 'Admin'.toUpperCase();
      default:
        return null;
    }
  };

  const handleCheckTypeInvitedStyles = (type: string) => {
    switch (type) {
      case 'approved':
        return styles.textStatusPending;
      case 'invite_match':
        return styles.textStatusInviteMatch;
      case 'accepted':
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
        .doc(activeEvent)
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
              id: chat?.id,
              girlInvitation: eventData?.female + eventData?.femaleFriend,
              data: eventData?.date,
              status: eventData?.activeType,
              image: eventData?.photos[0]?.image,
              title: eventData?.placeName,
              hostUid: eventData?.uid,
              activeEvent: chat?.activeEvent,
              chats: chat?.chats
                .filter(chat => chat.uid === user?.uid)
                .map(chat => ({...chat, avatar: eventData?.hostImage, name: eventData?.hostName})),
            };
            mappedChats.push(data);
          }

          setDATAEventsJoining(mappedChats);
          setLoading(false);
        });
      // handleBuildGuestEventsData();
    }

    return () => {
      hostSubscriber && hostSubscriber();
      guestSubscriber && guestSubscriber();
    };
  }, [activeEvent, loading]);

  return (
    <View style={styles.container}>
      {!loading ? (
        !typeEvents ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages?.chats}
            ListEmptyComponent={() => (
              <View style={{height: '100%', marginTop: 30}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(28, 812), marginBottom: 18}}>
                    You don't have any chat
                  </Text>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
                    Get started by swiping to {isHost ? 'invite guests' : 'join events and begin receiving messages.'}
                  </Text>
                  <Button title="Start swiping" onPress={() => navigation.navigate(IOPath as never)} />
                </View>
              </View>
            )}
            renderItem={({item}) => {
              console.log('item', item);

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
                  newMessages={item?.newMessages}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <FlatList
            data={DATAEventsJoining}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginBottom: 20}}
            ListEmptyComponent={() => (
              <View style={{height: '100%', marginTop: 104}}>
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
                  data={item.data}
                  activeEvent={item.activeEvent}
                  girlInvitation={item.girlInvitation}
                  hostUid={item.hostUid}
                  status={item.status}
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
