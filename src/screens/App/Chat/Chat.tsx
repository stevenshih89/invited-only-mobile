import React, {FC, useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'screens/App/Chat/styles.ts';
import {Badge} from '@rneui/themed';
import {chatCorrespondencePath} from 'constants/pathLocations.ts';
import ModalHostMenu from 'components/Modal/ModalHostMenu/ModalHostMenu.tsx';

//import images
import FakeGirl1 from 'assets/images/app/fake-girl-1.png';
import FakeGirl2 from 'assets/images/app/fake-girl-2.png';
import FakeGirl3 from 'assets/images/app/fake-girl-3.png';
import FakePhoto from 'assets/images/app/fake-photo.png';
import FakeBg from 'assets/images/app/join-event-bg.png';

//import icons
import FlashField from 'assets/images/icons/flash.svg';
import ThreeDoths from 'assets/images/icons/more-white.svg';
import PersonIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ChatIcon from 'assets/images/tab-bar/chat-active.svg';
import Button from 'components/Button/Button.tsx';
import {useChat} from "../../../store/chatStore";
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
};

type ItemEventsJoiningProps = {
  chats: [{id: string; image: any; name: string; lastMessage: string}] | any;
  girlInvitation: number;
  data: string;
  status: string;
  image: any;
  title: string;
};

interface ChatProps {
  typeEvents?: boolean;
}

const Chat: FC<ChatProps> = ({typeEvents}) => {
  const [hostMenu, setHostMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState([]);
  const [activeEvent, setActiveEvent] = useState<string>('h3xsZpHqcPVMTSW9dsL9');
  const styles = useStyles();
  const navigation = useAppNavigation();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Carla',
      message: 'Hello ! Nazrul How are you?',
      image: FakeGirl1,
      online: true,
      story: true,
      inviteStatus: 'pending',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Alexa',
      message: 'Hello ! Nazrul How are you?',
      image: FakeGirl2,
      online: false,
      story: true,
      inviteStatus: 'accepted',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Cina',
      message: 'Hello ! Nazrul How are you?',
      image: FakeGirl3,
      online: false,
      story: false,
      inviteStatus: 'newInvited',
    },
  ];

  const DATAEventsJoining = [
    {
      id: '1',
      chats: [
        {
          id: '2',
          image: FakePhoto,
          name: 'Simon',
          lastMessage: 'Hello ! Nazrul How are you?',
        },
        {
          id: '3',
          image: FakePhoto,
          name: 'Alex',
          lastMessage: 'Hello! Nazrul How are you?',
        },
      ],
      girlInvitation: 2,
      data: '12.11.2023',
      status: 'Active',
      image: FakeBg,
      title: 'Nammos Dubai',
    },
    {
      id: '4',
      chats: [
        {
          id: '3',
          image: FakeGirl3,
          name: 'Alex',
          lastMessage: 'Hello ! Nazrul How are you?',
        },
      ],
      girlInvitation: 2,
      data: '12.11.2023',
      status: 'Full',
      image: FakeBg,
      title: 'Nammos Dubai',
    },
    {
      id: '5',
      chats: [
        {
          id: '4',
          image: FakePhoto,
          name: 'Simon',
          lastMessage: 'Hello ! Nazrul How are you?',
        },
      ],
      girlInvitation: 2,
      data: '12.11.2023',
      status: 'Cancelled',
      image: FakeBg,
      title: 'Nammos Dubai',
    },
    {
      id: '6',
      chats: [
        {
          id: '5',
          image: FakePhoto,
          name: 'Simon',
          lastMessage: 'Hello ! Nazrul How are you?',
        },
      ],
      girlInvitation: 2,
      data: '12.11.2023',
      status: 'Starts',
      image: FakeBg,
      title: 'Nammos Dubai',
    },
  ];

  const Item = ({title, message, image, online, story, inviteStatus, messages, id, superInvite, invitedStatus}: ItemProps) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          navigation.navigate(chatCorrespondencePath, {
            screen: chatCorrespondencePath,
            params: {
              image: image,
              title: title,
              online: online,
              messages: messages,
              activeEvent: activeEvent,
              id: id,
              superInvite: superInvite,
              invitedStatus: invitedStatus,
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
            <View style={[handleCheckTypeInvitedStyles(inviteStatus)]}>
              <Text style={styles.textStatusInvite}>{handleCheckTypeInvitedText(inviteStatus)}</Text>
            </View>
          </View>
          <Text style={styles.textMessage}>{message}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.wrapperThreeDotsAndBadge}>
        <TouchableOpacity>
          <ThreeDoths />
        </TouchableOpacity>
        {/*<Badge value={22} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />*/}
      </View>
    </View>
  );

  const ItemEventsJoining = ({title, chats, girlInvitation, image, status, data}: ItemEventsJoiningProps) => {
    const statusColor = handleCheckStatusStyles(status);
    return (
      <View style={styles.itemEventsJoining}>
        <View style={styles.wrapperItemEventsJoining}>
          <TouchableOpacity style={styles.fdrAiC}>
            <Image resizeMode="contain" source={image} style={{width: 50, height: 50, borderRadius: 50}} />
            <View style={{marginLeft: 15}}>
              <View style={styles.fdrAiC}>
                <Text style={styles.title}>{title}</Text>
                <View style={{backgroundColor: statusColor, borderRadius: 4}}>
                  <Text style={[styles.textStatus]}>{status}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={styles.fdrAiC}>
                  <PersonIcon width={14} height={14} />
                  <Text style={styles.textDescriptionUnderTitle}>{girlInvitation} x Girl invitation </Text>
                </View>
                <View style={styles.fdrAiC}>
                  <CalendarIcon style={{marginLeft: 10}} width={14} height={14} />
                  <Text style={styles.textDescriptionUnderTitle}>{data}</Text>
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
          image={FakePhoto}
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
                params: {image: i?.image, title: i?.name, online: true},
              });
            }}
            key={i?.id}
            style={styles.chatItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image source={i?.image} style={{width: 50, height: 50, borderRadius: 50}} />
                <View style={styles.greenCircleChat} />
              </View>
              <View style={{marginLeft: 15}}>
                <Text style={styles.textNameChat}>{i?.name}</Text>
                <Text style={styles.textDescription}>{i?.lastMessage}</Text>
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
      case 'pending':
        return 'Pending';
      case 'newInvited':
        return 'New Invite Match';
      case 'accepted':
        return 'Invitation Accepted';

      default:
        return null;
    }
  };

  const handleCheckTypeInvitedStyles = (type: string) => {
    switch (type) {
      case 'pending':
        return styles.textStatusPending;
      case 'newInvited':
        return styles.textStatusInviteMatch;
      case 'accepted':
        return styles.textStatusInvitationAccepted;

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
    const subscriber = firestore()
      .collection('messages')
      .doc(activeEvent)
      .onSnapshot(documentSnapshot => {
        setMessages(documentSnapshot.data());
        setLoading(false);
      });

    return () => subscriber();
  }, [activeEvent, loading]);

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      {!typeEvents ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[messages?.chats]}
          renderItem={({item}) => {
            console.log(item);
            console.log(item?.messages[item?.messages?.length - 1]?.message);
            return (
              <Item
                inviteStatus={item?.invitedStatus}
                story={item?.story}
                online={item?.online}
                title={item?.name}
                message={item?.messages[item?.messages?.length - 1]?.message}
                messages={item?.messages}
                image={messages?.avatarGuest}
                superInvite={item?.superInvite}
                invitedStatus={item?.invitedStatus}
                id={item?.id}
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
              girlInvitation={item.girlInvitation}
              status={item.status}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Chat;
