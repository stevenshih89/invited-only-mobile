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
import analytics from '@react-native-firebase/analytics';
import {chatCorrespondenceScreen} from 'constants/analitycs';
import Config from 'react-native-config';

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
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
  const [messageUser, setMessageUser] = useState<string>('');
  const [messages, setMessages] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelInvitationModal, setCancelInvitationModal] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [currentUserName, setCurrentUserName] = useState('');
  const [userAccountType, setUserAccountType] = useState('');
  const [anotherUserData, setAnotherUserData] = useState<any>(null);
  const {image, title, online, activeEvent, id, superInvite, invitedStatus, uid, hostUid} = route?.params;
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isSending, setIsSending] = useState(false);

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
        const currentUser = auth().currentUser;
        if (currentUser) {
          try {
            const chatQuery = await firestore().collection(apiMessagesCollection).doc(activeEvent).get();
            const chatData = chatQuery.data()?.chats;
            const currentChat = chatData?.find((i: any) => i?.id === id);
            const anotherUserUid = currentChat?.uid === user?.uid ? currentChat?.hostUid : currentChat?.uid;

            const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(anotherUserUid).get();
            setCurrentUserName(user?.name);
            setAnotherUserData(userInfoDoc.data());
            if (userInfoDoc.exists) {
              const age = calculateAge(userInfoDoc.data()?.date);
              setAge(age);
              setUserAccountType(userInfoDoc.data()?.accountType);
              setIsPremium(userInfoDoc.data()?.accountPremium);
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
      try {
        analytics().logScreenView({
          screen_name: chatCorrespondenceScreen,
        });
      } catch (e) {
        console.error(e);
      }
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

    const doc = firestore().collection(apiMessagesCollection).doc(`${activeEvent}`);

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
      if (!messageUser || isSending) {
        return;
      }

      setIsSending(true)

      let updateData = {
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
        message: messageUser,
        timestamp: new Date().getTime(),
        userType: `${userData?.accountType}`,
        uid: `${userData?.uid}`,
      };

      const doc = firestore().collection(apiMessagesCollection).doc(`${activeEvent}`);
      const chatDataQuery = await doc.get();      
      const chatData = chatDataQuery.data();
      const currentChat = chatData?.chats?.find((i: any) => i?.id === id);

      const findChat = allChats?.filter(i => i?.id === id);
      const currentChatGuestUid = currentChat?.uid;
      const currentChatHostUid = currentChat?.hostUid;

      const anotherUserUid = currentChatHostUid === user?.uid ? currentChatGuestUid : currentChatHostUid;

      const getDate = await firestore().collection(apiUserInfoCollection).doc(anotherUserUid).get();
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

        const name = userData?.accountType === 'host' ? title : userData?.name;
        const image = userData?.accountType === 'host' ? image : userData?.photos[0]?.image;
        setMessageUser('');

        console.warn({
          id: id,
          uid: anotherUserUid,
          hostUid: hostUid,
          name: name,
          image: image,
          activeEvent: activeEvent,
        });

        await doc.update({
          chats: [...allChats],
        });
        setIsSending(false)
        analytics().logEvent(`${chatCorrespondenceScreen}_send_message`, {
          hostUid: user?.uid,
          guestUid: uid,
        });
        if (docData?.notificationSettings.chat) {
          await sendNotification(
            anotherUserUid,
            `${currentUserName} sent you a new message`,
            'Invited Only',
            'message',
            'Message'.toUpperCase(),
            user,
            JSON.stringify({
              path: 'chat',
              data: {
                id: id,
                uid: anotherUserUid,
                hostUid: chatData?.uidHost || hostUid,
                name: name,
                image: image,
                activeEvent: chatData?.activeEvent || activeEvent,
              },
            }),
          );
        }
      }
    } catch (e) {
      setIsSending(false)
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

  const getUserAccountTypeTitle = () =>
    ({
      host: 'Host',
      guest: 'Guest',
    }[userAccountType]);

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
    ({messageUser, showDate}: {messageUser: MessageProps; showDate: boolean}) => {
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
                <Image source={{uri: anotherUserData?.photos[0]?.image}} style={styles.avatar} />
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
    [anotherUserData?.uid],
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection(apiMessagesCollection)
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
                    <Image source={{uri: anotherUserData?.photos[0]?.image}} style={styles.userPhoto} />
                    {anotherUserData?.online && <View style={styles.greenCircle} />}
                  </View>
                  <View style={styles.wrapperTitleOnline}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: whiteColor, borderRadius: 4}}>
                          <Text style={{paddingHorizontal: 9, paddingVertical: 2, fontWeight: 'bold', fontSize: RFValue(10, 812)}}>
                            {getUserAccountTypeTitle()}
                          </Text>
                        </View>
                        {isPremium && (
                          <LinearGradient
                            colors={['#977B4A', '#E5D291', '#A28453']}
                            style={{borderRadius: 4, marginLeft: 4}}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}>
                            <Text style={{paddingHorizontal: 9, paddingVertical: 2, fontWeight: 'bold', fontSize: RFValue(10, 812)}}>
                              Premium
                            </Text>
                          </LinearGradient>
                        )}
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.textNameUser}>
                          {anotherUserData?.name}, {age}
                        </Text>
                        <CheckStar />
                      </View>
                    </View>
                    {anotherUserData?.online && <Text style={styles.textOnline}>Online</Text>}
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
