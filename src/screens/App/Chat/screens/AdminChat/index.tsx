import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation, useRoute} from '@react-navigation/native';

// Import components
import useStyles from 'screens/App/Chat/screens/ChatCorrespondence/styles.ts';
import {blackColor, lightGray3Color, lightGreenColor, transparentWhite40Color, whiteColor} from 'constants/colors.ts';
import {isIos} from 'constants/common.ts';
// Import icons
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import SendIcon from 'assets/images/icons/send.svg';
import CheckStar from 'assets/images/icons/check-star-white.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';

// Import images
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../../../../store/userStore';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';

import {commonStackPath, myProfileViewPath} from 'constants/pathLocations';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';

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

const timeToUnixTimestamp = (timestamp: {_seconds: number, _nanoseconds: number} )  => {
  return (timestamp._seconds + (timestamp._nanoseconds/1000000000) *1000) * 1000

}

interface NavigationParams {
  navigation: NavigationProp<any, any>;
  route: any;
}

const AdminChat: FC<NavigationParams> = () => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiAdminChatsCollection = Config.API_ADMIN_CHATS_COLLECTION || 'adminChats';
  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState<{
    chatData: any;
    userData: any;
  }>({
    chatData: null,
    userData: null,
  });

  const navigation = useNavigation();
  const route = useRoute();

  const {chatId} = route?.params as {chatId: string};

  const {user: userData} = useUser();

  const isCurrentUserAdmin = userData?.isInvitedOnlyAdmin;

  const flatListRef = useRef<FlatList>(null);

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const styles = useStyles();
  const insets = useSafeAreaInsets();

  const headerInsets = {
    paddingTop: insets.top,
    backgroundColor: blackColor,
    flex: 1,
    paddingBottom: 0,
  };

  const getChatData = async () => {
    const chatDataQuery = await firestore().collection(apiAdminChatsCollection).doc(chatId).get();

    if (chatDataQuery.exists) {
      const chatDataRes = chatDataQuery.data();
      if (chatDataRes?.uid) {
        const userDataQuery = await firestore().collection(apiUserInfoCollection).doc(chatDataRes?.uid).get();
        if (userDataQuery.exists) {
          const userDataRes = userDataQuery.data();
          setChatData({
            chatData: chatDataRes,
            userData: userDataRes,
          });
        }
      }
    }
  };

  const handleSetLastSeen = async () => {
    try {
      const data: any = {};
      if (userData?.isInvitedOnlyAdmin) {
        data.lastSeenAdminTimestamp = firestore.FieldValue.serverTimestamp();
      } else {
        data.lastSeenUserTimestamp = firestore.FieldValue.serverTimestamp();
      }

      await firestore().collection(apiAdminChatsCollection).doc(chatId).update(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let unsubscribeMessages: () => any;

    if (chatId) {
      getChatData();
      handleSetLastSeen();
      try {
        unsubscribeMessages = firestore()
          .collection(apiAdminChatsCollection)
          .doc(chatId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
              return {
                ...doc.data(),
                timestamp: doc.data().timestamp ? timeToUnixTimestamp(doc.data().timestamp) : null, // Convert timestamp if it exists
              };
            });
            if (!querySnapshot.empty) {
              setMessages(data);
            }
          });
      } catch (err) {
        console.error(err);
      }
    }

    return () => {
      handleSetLastSeen();
      unsubscribeMessages();
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!messageText || !chatId) {
      return;
    }
    const data = {
      message: messageText,
      timestamp: firestore.FieldValue.serverTimestamp(),
      senderUid: userData?.uid,
    };

    const newChatData: any = {
      lastMessage: messageText,
      lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
      lastMessageSenderUid: userData?.uid,
    };

    if (userData?.isInvitedOnlyAdmin) {
      newChatData.lastSeenAdminTimestamp = firestore.FieldValue.serverTimestamp();
    } else {
      newChatData.lastSeenUserTimestamp = firestore.FieldValue.serverTimestamp();
    }

    await firestore().collection(apiAdminChatsCollection).doc(chatId).update(newChatData);
    await firestore().collection(apiAdminChatsCollection).doc(chatId).collection('messages').add(data);

    setMessageText('');
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
    }[chatData?.userData?.accountType as string]);

  const goToProfileView = (currentUid: string) => {
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
    ({messageUser, index}: {messageUser: MessageProps; index: number}) => {
      const {message, timestamp, senderUid} = messageUser;

      const showDate = index === 0 || !moment(timestamp).isSame(moment(messages[index - 1]?.timestamp), 'day');
      const isCurrentUserMessage = senderUid === userData?.uid;

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
              <TouchableOpacity onPress={() => goToProfileView(chatData?.userData?.uid)}>
                <FastImage source={{uri: chatData?.userData?.photos[0]?.image}} style={styles.avatar} />
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
    [chatData?.userData?.uid],
  );

  return (
    <>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={styles.keyboardAvoid}>
        <SafeAreaProvider style={headerInsets}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.fdrAlc}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <ArrowLeft />
                </TouchableOpacity>
                <View style={[styles.fdrAlc, {marginLeft: 16}]}>
                  <View
                    style={{
                      position: 'relative',
                      backgroundColor: '#212121',
                      borderRadius: 30,
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IOIcon width={24} height={24} />
                    <View
                      style={{
                        position: 'absolute',
                        right: 5,
                        bottom: 5,
                        backgroundColor: lightGreenColor,
                        borderRadius: 10,
                        width: 10,
                        height: 10,
                      }}
                    />
                  </View>
                  <View style={styles.wrapperTitleOnline}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        {isCurrentUserAdmin && (
                          <View style={{backgroundColor: whiteColor, borderRadius: 4}}>
                            <Text style={{paddingHorizontal: 9, paddingVertical: 2, fontWeight: 'bold', fontSize: RFValue(10, 812)}}>
                              {getUserAccountTypeTitle()}
                            </Text>
                          </View>
                        )}
                        {chatData?.userData?.accountPremium && isCurrentUserAdmin && (
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
                        <Text style={styles.textNameUser}>{!isCurrentUserAdmin ? 'Support Team' : chatData?.userData?.name}</Text>
                      </View>
                    </View>
                    {chatData?.userData?.online && <Text style={styles.textOnline}>Online</Text>}
                  </View>
                </View>
              </View>
            </View>
            <FlatList
              contentContainerStyle={{paddingBottom: 20}}
              data={messages}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return <ChatMessage messageUser={item} index={index} />;
              }}
              keyExtractor={(item, index) => `${item.timestamp}${index}`}
              ref={flatListRef}
              onContentSizeChange={scrollToEnd}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={transparentWhite40Color}
                value={messageText}
                onChangeText={setMessageText}
                style={styles.textInput}
                placeholder="Write your message"
                onFocus={scrollToEnd}
              />
              <TouchableOpacity style={styles.buttonSend} onPress={handleSendMessage}>
                <SendIcon />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaProvider>
      </KeyboardAvoidingView>
    </>
  );
};

export default AdminChat;
