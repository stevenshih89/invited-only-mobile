import React, {FC, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';

//import components
import useStyles from 'screens/App/Chat/screens/ChatCorrespondence/styles.ts';
import {blackColor, lightGray6Color} from 'constants/colors.ts';
import {isIos} from 'constants/common.ts';
import ModalUserMenu from 'components/Modal/ModalUserMenu/ModalUserMenu.tsx';
import ModalCancelOrConfirmInvitation from 'components/Modal/ModalCancelOrConfirmInvitation/ModalCancelOrConfirmInvitation.tsx';
import Button from 'components/Button/Button.tsx';

//import icons
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import ThreeDots from 'assets/images/icons/more-white.svg';
import FlashField from 'assets/images/icons/flash.svg';
import SendIcon from 'assets/images/icons/send.svg';

//import images
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

interface messageUserProps {
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
  const [messages, setMessages] = useState<string>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelInvitation, setCancelInvitation] = useState<boolean>(false);
  let {image, title, online, activeEvent, id, superInvite, invitedStatus} = route?.params;

  console.log('messages', messages);
  console.log('route?.params', route?.params);

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
    backgroundColor: lightGray6Color,
    flex: 1,
    paddingBottom: 0,
  };

  const handleSendMessage = async () => {
    try {
      if (!messageUser) {
        return;
      }
      await firestore()
        .collection('messages')
        .doc(`${activeEvent}`)
        .update({
          chats: {
            id: id,
            avatar: image,
            invitedStatus: invitedStatus,
            name: title,
            superInvite: superInvite,
            messages: [
              ...messages,
              {
                id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
                message: messageUser,
                timestamp: new Date().getTime(),
                userType: 'host', // change type user
              },
            ],
          },
        });

      setMessageUser('');
    } catch (e) {
      console.log(e);
    }
  };

  const ChatMessage = ({messageUser, userAvatar}: messageUserProps) => {
    const {message, userType, timestamp} = messageUser;
    const containerStyle = userType !== 'host' ? styles.senderContainer : styles.receiverContainer;
    const textStyle = userType !== 'host' ? styles.senderText : styles.receiverText;
    return (
      <View style={[styles.messageContainer, containerStyle]}>
        {userType !== 'host' && <Image source={{uri: userAvatar}} style={styles.avatar} />}
        <View>
          {userType !== 'host' && <Text style={styles.textNameUserMessage}>{title}</Text>}
          <View style={[{flexDirection: 'column'}, userType !== 'host' && {alignItems: 'flex-end'}]}>
            <View style={[styles.messageContent, userType !== 'host' ? styles.isSenderTrue : styles.isSenderFalse]}>
              <Text style={textStyle}>{message}</Text>
            </View>
            <Text style={[userType !== 'host' && {marginLeft: 10}, styles.timeText]}>{moment(timestamp).format('h:mm A')}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .doc(activeEvent)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data()?.chats?.messages;
        setMessages(data);
      });

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
                  <View style={styles.fdrAlc}>
                    <Text style={styles.textNameUser}>{title}</Text>
                    {superInvite && <FlashField width={14} height={14} />}
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
            renderItem={({item}) => <ChatMessage userAvatar={image} messageUser={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/*{handleInvitationApproved()}*/}
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={blackColor}
              value={messageUser}
              onChangeText={setMessageUser}
              style={styles.textInput}
              placeholder="Write your message"
            />
          </View>
          <TouchableOpacity style={styles.buttonSend} onPress={() => handleSendMessage()}>
            <SendIcon />
          </TouchableOpacity>
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
          image={image}
          title={title}
          approve={invitedStatus === 'accepted'}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  );
};

export default ChatCorrespondence;
