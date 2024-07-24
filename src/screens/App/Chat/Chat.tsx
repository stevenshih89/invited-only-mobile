import React, {FC, useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/Chat/styles.ts';

import {chatCorrespondencePath} from 'constants/pathLocations.ts';
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
};

type ItemEventsJoiningProps = {
  chats: [{id: string; image: any; name: string; lastMessage: string}] | any;
  girlInvitation: number;
  data: string;
  status: string;
  image: any;
  title: string;
  activeEvent: string;
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

  const styles = useStyles();
  const navigation = useAppNavigation();
  const {myEvents} = useContext(EventContext);

  const activeEvent = useChat((i: any) => i?.activeEvent);

  const fetchUserInfo = async () => {
    setLoading(true);
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {
        
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleBuildEventsData = () => {
    firestore()
      .collection('messages')
      .get()
      .then(i => {
        const chats = i?.docs?.map(j => j?.data());

        myEvents?.map((events: any): void => {
          chats?.map((chat: FirebaseFirestoreTypes.DocumentData, index: number): void => {
            if (chat?.activeEvent === events?.id) {
              // @ts-ignore
              setDATAEventsJoining((): void => [
                {
                  id: index,
                  chats: chat?.activeEvent === events?.id ? chat?.chats : [],
                  girlInvitation: events?.female + events?.femaleFriend,
                  data: events?.date,
                  status: events?.activeType,
                  image: events?.photos[0]?.image,
                  title: events?.placeName,
                  activeEvent: chat?.activeEvent,
                },
              ]);
            }
          });
        });
      });
  };

  const Item = ({title, message, image, online, story, inviteStatus, messages, id, superInvite, invitedStatus, uid}: ItemProps) => (
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
                messages: messages,
                activeEvent: activeEvent,
                id: id,
                superInvite: superInvite,
                invitedStatus: invitedStatus,
                uid: uid,
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
          <View style={[handleCheckTypeInvitedStyles(inviteStatus), {marginTop: 4}]}>
            <Text style={[styles.textStatusInvite, {color: inviteStatus === 'accepted' ? blackColor : whiteColor}]}>
              {handleCheckTypeInvitedText(inviteStatus)}
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
            <View style={styles.newMessage}>
              <Text style={styles.textCountNewMessages}>1</Text>
            </View>
          </View>
          {/* <TouchableOpacity>
          <ThreeDoths />
        </TouchableOpacity> */}
          {/*<Badge value={22} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />*/}
        </View>
      </View>
    </View>
  );

  const ItemEventsJoining = ({title, chats, girlInvitation, image, status, data, activeEvent}: ItemEventsJoiningProps) => {
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
                <Text style={styles.textDescription}>{i?.messages[0] && i?.messages[0]?.message}</Text>
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
      case 'invited':
        return 'Pending'.toUpperCase();
      case 'newInvited':
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
      case 'invited':
        return styles.textStatusPending;
      case 'newInvited':
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
    if (!activeEvent) {
      return;
    }

    handleBuildEventsData();

    const subscriber = firestore()
      .collection('messages')
      .doc(activeEvent)
      .onSnapshot(documentSnapshot => {
        setMessages(documentSnapshot.data());
        setLoading(false);
      });

    return () => subscriber();
  }, [activeEvent, loading]);

  return (
    <View style={styles.container}>
      {!loading ? (
        !typeEvents ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages?.chats}
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
                <Button buttonStyle={{marginTop: 34}} title="Join event" />
              </View>
            )}
            renderItem={({item}) => (
              <ItemEventsJoining
                image={item.image}
                title={item.title}
                chats={item.chats}
                data={item.data}
                activeEvent={item.activeEvent}
                girlInvitation={item.girlInvitation}
                status={item.status}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )
      ) : null}
      {!userInfo?.accountConfirmed && <ModalLockAccount isVisibleButton={false}/>}
    </View>
  );
};

export default Chat;
