import React, {FC, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';

// Import components
import useStyles from 'screens/App/Chat/screens/ChatCorrespondence/styles.ts';
import {blackColor, lightGray3Color, transparentWhite40Color, whiteColor} from 'constants/colors.ts';
import {isIos} from 'constants/common.ts';
import ModalUserMenu from 'components/Modal/ModalUserMenu/ModalUserMenu.tsx';
import ModalCancelOrConfirmInvitation from 'components/Modal/ModalCancelOrConfirmInvitation/ModalCancelOrConfirmInvitation.tsx';
import Button from 'components/Button/Button.tsx';
import {CLOUD_MESSAGING_SERVER_KEY} from '@env';

// Import icons
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import ThreeDots from 'assets/images/icons/more-white.svg';
import SendIcon from 'assets/images/icons/send.svg';
import CheckStar from 'assets/images/icons/check-star-white.svg';

// Import images
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../../../../store/userStore';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {calculateAge} from 'helpers/calculateAge';

interface MessageProps {
  message: {
    time: string;
    text: string;
    isSender: boolean;
    user: {
      avatar: any;
    };
  };
}

interface NavigationParams {
  navigation: NavigationProp<any, any>;
  route: any;
}

const ChatCorrespondence: FC<NavigationParams> = ({navigation, route}) => {
  const [messageUser, setMessageUser] = useState<string>('');
  const [messages, setMessages] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelInvitation, setCancelInvitation] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [currentUserName, setCurrentUserName] = useState('');
  let {image, title, online, activeEvent, id, superInvite, invitedStatus, uid} = route?.params;

  const user = useUser((i: any) => i?.user);

  useEffect(() => {
    if (title) {
      const name = title?.split(' ');
      setName(name[0]);
    }
  }, [title]);

  useEffect(() => {
    if (uid) {
      const fetchUserInfo = async () => {
        const user = auth().currentUser;
        if (user) {
          try {
            const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
            const currentUserInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();
            setCurrentUserName(currentUserInfoDoc?.data()?.name);
            if (userInfoDoc.exists) {
              const age = calculateAge(userInfoDoc.data().date);
              setAge(age);
            } else {
              Alert.alert('Error', 'No user data found in Firestore');
            }
          } catch (error: any) {
            Alert.alert('Error', error.message || 'Something went wrong');
          }
        }
      };
      fetchUserInfo();
    }
  }, [uid]);

  const userData = useUser((i: any) => i?.user);

  const styles = useStyles();
  const insets = useSafeAreaInsets();

  const handleInvitationApproved = () => (
    <View style={styles.wrapperInvitationApproved}>
      <Text style={styles.textInvitationApproved}>Invitation approved!</Text>
      <Button
        onPress={() => setCancelInvitation(true)}
        buttonTitleStyle={styles.buttonTitleStyle}
        buttonStyle={{height: 36, borderRadius: 10, marginLeft: 34}}
        title="Click to confirm >"
      />
    </View>
  );

  const headerInsets = {
    paddingTop: insets.top,
    backgroundColor: blackColor,
    flex: 1,
    paddingBottom: 0,
  };

  const generateRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const getFcmTokenFromUser = async (uid: string) => {
    const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
    return userInfoDoc.data()?.fcmToken;
  };

  const sendNotification = async (forUserUid: string, title: string, body: string) => {
    console.warn(forUserUid);

    const token = await getFcmTokenFromUser(forUserUid);

    console.warn(token);

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
      const userDoc = await firestore().collection('userInfo').doc(forUserUid).get();
      const userNotifications = userDoc.data()?.notifications;
      const id = generateRandomId(8);
      const notification = {
        id,
        title: title,
        body: body,
        mark: 'message',
        uid: userData?.uid,
      };
      try {
        await firestore()
          .collection('userInfo')
          .doc(forUserUid)
          .update({
            notifications: [...userNotifications, notification],
          });
      } catch (error) {
        console.log('error update notifications', error);
      }
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!messageUser) {
        return;
      }

      let updateData = {
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
        message: messageUser,
        timestamp: new Date().getTime(),
        userType: `${userData?.accountType}`,
        uid: `${userData?.uid}`,
      };

      const findChat = allChats?.filter(i => i?.id === id);
      findChat[0]?.messages.push(updateData);

      await firestore()
        .collection('messages')
        .doc(`${activeEvent}`)
        .update({
          chats: [...allChats],
        });
      await sendNotification(uid, 'Invited Only', `${currentUserName} sent you a new message`);
    } catch (e) {
      console.log(e);
    }

    setMessageUser('');
  };

  const getFormattedTime = timestamp => {
    const messageDate = moment(timestamp);
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const dayBeforeYesterday = moment().subtract(2, 'days').startOf('day');

    if (messageDate.isSame(today, 'day')) {
      return `Today at ${messageDate.format('h:mm')}`;
    } else if (messageDate.isSame(yesterday, 'day')) {
      return `Yesterday at ${messageDate.format('h:mm')}`;
    } else if (messageDate.isSame(dayBeforeYesterday, 'day')) {
      return `2 days ago at ${messageDate.format('h:mm')}`;
    } else {
      return messageDate.format('MMMM D [at] h:mm');
    }
  };

  const ChatMessage = ({messageUser, userAvatar, showDate}: {messageUser: MessageProps; userAvatar: string; showDate: boolean}) => {
    const {message, userType, timestamp, uid} = messageUser;

    const isCurrentUserMessage = user.uid === uid;

    const containerStyle = !isCurrentUserMessage ? styles.senderContainer : styles.receiverContainer;
    const textStyle = !isCurrentUserMessage ? styles.senderText : styles.receiverText;
    return (
      <View style={{width: '100%'}}>
        {showDate && (
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <View style={{backgroundColor: lightGray3Color, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4}}>
              <Text style={[styles.timeText]}>{getFormattedTime(timestamp)}</Text>
            </View>
          </View>
        )}
        <View style={[styles.messageContainer, containerStyle]}>
          {!isCurrentUserMessage && <Image source={{uri: userAvatar}} style={styles.avatar} />}
          <View>
            <View style={[{flexDirection: 'column'}, !isCurrentUserMessage && {alignItems: 'flex-end'}]}>
              <View style={[styles.messageContent, !isCurrentUserMessage ? styles.isSenderTrue : styles.isSenderFalse]}>
                <Text style={textStyle}>{message}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleGetMessages = documentSnapshot => {
    const data = documentSnapshot.data()?.chats;
    const findChat = data?.filter(j => j?.id === id);
    setAllChats(data);
    setMessages(findChat[0]?.messages);
  };

  useEffect(() => {
    const subscriber = firestore().collection('messages').doc(activeEvent).onSnapshot(handleGetMessages);

    return () => subscriber();
  }, [activeEvent]);

  return (
    <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={styles.keyboardAvoid}>
      <SafeAreaProvider style={headerInsets}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.fdrAlc}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft />
              </TouchableOpacity>
              <View style={[styles.fdrAlc, {marginLeft: 16}]}>
                <View>
                  <Image source={{uri: image}} style={styles.userPhoto} />
                  {online && <View style={styles.greenCircle} />}
                </View>
                <View style={styles.wrapperTitleOnline}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{backgroundColor: whiteColor, borderRadius: 4}}>
                        <Text style={{paddingHorizontal: 9, paddingVertical: 2, fontWeight: 'bold', fontSize: RFValue(10, 812)}}>
                          Guest
                        </Text>
                      </View>
                      <LinearGradient
                        colors={['#977B4A', '#E5D291', '#A28453']}
                        style={{borderRadius: 4, marginLeft: 4}}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text style={{paddingHorizontal: 9, paddingVertical: 2, fontWeight: 'bold', fontSize: RFValue(10, 812)}}>
                          Premium
                        </Text>
                      </LinearGradient>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.textNameUser}>
                        {name}, {age}
                      </Text>
                      <CheckStar />
                    </View>
                  </View>
                  {online && <Text style={styles.textOnline}>Online</Text>}
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ThreeDots />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            data={messages}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              const showDate = index === 0 || !moment(item.timestamp).isSame(moment(messages[index - 1].timestamp), 'day');
              return <ChatMessage userAvatar={image} messageUser={item} showDate={showDate} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/*{handleInvitationApproved()}*/}
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={transparentWhite40Color}
              value={messageUser}
              onChangeText={setMessageUser}
              style={styles.textInput}
              placeholder="Write your message"
            />
            <TouchableOpacity style={styles.buttonSend} onPress={handleSendMessage}>
              <SendIcon />
            </TouchableOpacity>
          </View>
        </View>
        <ModalCancelOrConfirmInvitation
          cancelInvitation={cancelInvitation}
          setCancelInvitation={setCancelInvitation}
          typeModal="confirm"
          title={'Namos Dubai'}
          name={title}
          imageBg={image}
          data="12.11.2023"
          girlInvitation={2}
        />
        <ModalUserMenu
          uid={uid}
          image={image}
          title={title}
          inviteStatus={invitedStatus}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          activeEvent={activeEvent}
        />
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  );
};

export default ChatCorrespondence;
