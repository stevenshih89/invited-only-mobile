import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';

// Import components
import useStyles from 'screens/App/Chat/screens/ChatCorrespondence/styles.ts';
import {blackColor, lightGray3Color, transparentWhite40Color, whiteColor} from 'constants/colors.ts';
import {isIos} from 'constants/common.ts';
import ModalUserMenu from 'components/Modal/ModalUserMenu/ModalUserMenu.tsx';
import ModalCancelOrConfirmInvitation from 'components/Modal/ModalCancelOrConfirmInvitation/ModalCancelOrConfirmInvitation.tsx';

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

import {sendNotification} from 'helpers/fcmHelper';
import {checkIsFullGuests} from 'helpers/checkIsFullGuests';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {commonStackPath, myProfileViewPath} from 'constants/pathLocations';

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
  const [cancelInvitationModal, setCancelInvitationModal] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [currentUserName, setCurrentUserName] = useState('');
  const {image, title, online, activeEvent, id, superInvite, invitedStatus, uid, hostUid} = route?.params;
  console.log('route?.params', route?.params);
  
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);

  const clearChat = useRef(false);
  const user = useUser((i: any) => i?.user);

  const flatListRef = useRef<FlatList>(null);

  const handleCloseReport = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

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
              console.error('No user data found in Firestore');
              Alert.alert('Error', 'No user data found in Firestore');
            }
          } catch (error: any) {
            console.error(error);
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

  const headerInsets = {
    paddingTop: insets.top,
    backgroundColor: blackColor,
    flex: 1,
    paddingBottom: 0,
  };

  useEffect(() => {
    if (allChats && allChats.length > 0 && !clearChat.current) {
      handleBack();
      clearChat.current = true;
    }
  }, [allChats]);

  const handleBack = async () => {
    // console.log('handleBack');

    const doc = firestore().collection('messages').doc(`${activeEvent}`);

    const findChat = allChats?.filter(i => i?.id === id);

    if (findChat && findChat.length > 0) {
      if (user?.accountType === 'host') {
        if (typeof findChat[0].newMessagesGuest === 'number') {
          findChat[0].newMessagesGuest = 0;
        }
      } else {
        if (typeof findChat[0].newMessagesHost === 'number') {
          findChat[0].newMessagesHost = 0;
        }
      }
      await doc.update({
        chats: [...allChats],
      });
      // await sendNotification(uid, `${currentUserName} sent you a new message`, 'Invited Only', 'message', 'Message'.toUpperCase(), user);
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

      const doc = firestore().collection('messages').doc(`${activeEvent}`);

      const findChat = allChats?.filter(i => i?.id === id);

      const getDate = await firestore().collection('userInfo').doc(uid).get();
      const docData = getDate.data();

      if (findChat && findChat.length > 0) {
        findChat[0].messages.push(updateData);
        if (user?.accountType === 'host') {
          if (typeof findChat[0].newMessagesHost === 'number') {
            findChat[0].newMessagesHost = findChat[0].newMessagesHost + 1;
          } else {
            findChat[0].newMessagesHost = 1;
          }
        } else {
          if (typeof findChat[0].newMessagesGuest === 'number') {
            findChat[0].newMessagesGuest = findChat[0].newMessagesGuest + 1;
          } else {
            findChat[0].newMessagesGuest = 1;
          }
        }
        setMessageUser('');
        await doc.update({
          chats: [...allChats],
        });
        if (docData?.notificationSettings.chat) {
          await sendNotification(
            uid,
            `${currentUserName} sent you a new message`,
            'Invited Only',
            'message',
            'Message'.toUpperCase(),
            user,
          );
        }
      }
    } catch (e) {
      // console.log(e);
    }
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

  const goToProfileView = (currentUid: string) => {
    setModalVisible(false);
    // @ts-ignore
    navigation.navigate(commonStackPath, {
      screen: myProfileViewPath,
      params: {
        uid: currentUid,
        isShowEditButton: false,
      },
    });
  };

  const ChatMessage = useCallback(
    ({messageUser, userAvatar, showDate}: {messageUser: MessageProps; userAvatar: string; showDate: boolean}) => {
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
            {!isCurrentUserMessage && (
              <TouchableOpacity onPress={() => goToProfileView(uid)}>
                <Image source={{uri: userAvatar}} style={styles.avatar} />
              </TouchableOpacity>
            )}
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
    },
    [],
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .doc(activeEvent)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data()?.chats;
        const findChat = data?.find(j => j?.id === id);
        if (!findChat) {
          navigation.goBack();
        }
        setAllChats(data);
        setMessages(findChat ? findChat?.messages : null);
      });

    return () => subscriber();
  }, [activeEvent]);

  return (
    <>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={styles.keyboardAvoid}>
        <SafeAreaProvider style={headerInsets}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.fdrAlc}>
                <TouchableOpacity
                  onPress={() => {
                    handleBack();
                    navigation.goBack();
                  }}>
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
              keyExtractor={(item, index) => `${item.timestamp}${index}`}
              ref={flatListRef}
              onContentSizeChange={scrollToEnd}
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
                onFocus={scrollToEnd}
              />
              <TouchableOpacity style={styles.buttonSend} onPress={handleSendMessage}>
                <SendIcon />
              </TouchableOpacity>
            </View>
          </View>
          <ModalCancelOrConfirmInvitation
            cancelInvitation={cancelInvitationModal}
            setCancelInvitation={setCancelInvitationModal}
            typeModal="confirm"
            title={'Namos Dubai'}
            name={title}
            imageBg={image}
            data="12.11.2023"
            girlInvitation={2}
          />
          {isModalVisible && (
            <ModalUserMenu
              uid={uid}
              image={image}
              title={title}
              inviteStatus={invitedStatus}
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
              activeEvent={activeEvent}
              hostUid={hostUid}
              handleCloseReport={handleCloseReport}
              checkIsFullGuestsFun={() => checkIsFullGuests(activeEvent)}
              setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
            />
          )}
          {isVisibleModalFullEvent && (
            <ModalFullEvent
              isVisible={isVisibleModalFullEvent}
              idEvent={activeEvent}
              setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
            />
          )}
        </SafeAreaProvider>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatCorrespondence;
