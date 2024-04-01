import React, {FC, useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

//import components
import useStyles from 'screens/App/Chat/styles.ts';
import {Badge} from '@rneui/themed';
import {chatCorrespondencePath} from 'constants/pathLocations.ts';
import ModalHostMenu from 'components/Modal/ModalHostMenu/ModalHostMenu.tsx';

//import images
import FakePhoto from 'assets/images/app/fake-photo.png';

//import icons
import FlashField from 'assets/images/icons/flash.svg';
import ThreeDoths from 'assets/images/icons/more-white.svg';
import PersonIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ChatIcon from 'assets/images/tab-bar/chat-active.svg';
import Button from 'components/Button/Button.tsx';
import {useChat} from '../../../store/chatStore';
import {EventContext} from 'contexts/EventContext.tsx';
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
  const [DATAEventsJoining, setDATAEventsJoining] = useState([]);

  const styles = useStyles();
  const navigation = useAppNavigation();
  const {myEvents} = useContext(EventContext);

  const activeEvent = useChat((i: any) => i?.activeEvent);

  const handleBuildEventsData = () => {
    let data: any[] = [];

    firestore()
      .collection('messages')
      .get()
      .then(i => {
        const chats = i?.docs?.map(j => j?.data());
        console.log('all chats', chats);
        console.log('myEvents', myEvents);

        myEvents?.map((events: any): void => {
          console.log('events', events);
          chats?.map((chat: FirebaseFirestoreTypes.DocumentData, index: number): void => {
            console.log('chat', chat);
            console.log('chat?.activeEvent === events?.id', chat?.activeEvent === events?.id);
            if (chat?.activeEvent === events?.id) {
              // @ts-ignore
              setDATAEventsJoining((prevState: never[]): void => [
                ...prevState,
                {
                  id: index,
                  chats: chat?.activeEvent === events?.id ? chat?.chats : [],
                  girlInvitation: events?.female + events?.femaleFriend,
                  data: events?.date,
                  status: events?.activeType,
                  image: events?.photos[0]?.image,
                  title: events?.placeName,
                },
              ]);
            }
          });
        });
      });

    console.log('data', data);
  };

  // const DATAEventsJoining = [
  //   {
  //     id: '1',
  //     chats: [
  //       {
  //         id: '2',
  //         image: FakePhoto,
  //         name: 'Simon',
  //         lastMessage: 'Hello ! Nazrul How are you?',
  //       },
  //       {
  //         id: '3',
  //         image: FakePhoto,
  //         name: 'Alex',
  //         lastMessage: 'Hello! Nazrul How are you?',
  //       },
  //     ],
  //     girlInvitation: 2,
  //     data: '12.11.2023',
  //     status: 'Active',
  //     image: FakeBg,
  //     title: 'Nammos Dubai',
  //   },
  //   {
  //     id: '4',
  //     chats: [
  //       {
  //         id: '3',
  //         image: FakeGirl3,
  //         name: 'Alex',
  //         lastMessage: 'Hello ! Nazrul How are you?',
  //       },
  //     ],
  //     girlInvitation: 2,
  //     data: '12.11.2023',
  //     status: 'Full',
  //     image: FakeBg,
  //     title: 'Nammos Dubai',
  //   },
  //   {
  //     id: '5',
  //     chats: [
  //       {
  //         id: '4',
  //         image: FakePhoto,
  //         name: 'Simon',
  //         lastMessage: 'Hello ! Nazrul How are you?',
  //       },
  //     ],
  //     girlInvitation: 2,
  //     data: '12.11.2023',
  //     status: 'Cancelled',
  //     image: FakeBg,
  //     title: 'Nammos Dubai',
  //   },
  //   {
  //     id: '6',
  //     chats: [
  //       {
  //         id: '5',
  //         image: FakePhoto,
  //         name: 'Simon',
  //         lastMessage: 'Hello ! Nazrul How are you?',
  //       },
  //     ],
  //     girlInvitation: 2,
  //     data: '12.11.2023',
  //     status: 'Starts',
  //     image: FakeBg,
  //     title: 'Nammos Dubai',
  //   },
  // ];

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
            <Image resizeMode="contain" source={{uri: image}} style={{width: 50, height: 50, borderRadius: 50}} />
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
                params: {image: i?.image, title: i?.name, online: false},
              });
            }}
            key={i?.id}
            style={styles.chatItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image source={{uri: i?.avatar}} style={{width: 50, height: 50, borderRadius: 50}} />
                {/*<View style={styles.greenCircleChat} />*/}
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
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <>
            {console.log('DATAEventsJoining', DATAEventsJoining)}
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
                  <>
                    {console.log('ItemEventsJoining', item)}
                    <ItemEventsJoining
                        image={item.image}
                        title={item.title}
                        chats={item.chats}
                        data={item.data}
                        girlInvitation={item.girlInvitation}
                        status={item.status}
                    />
                  </>

              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )
      ) : null}
    </View>
  );
};

export default Chat;
