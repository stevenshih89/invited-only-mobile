import React, {FC, useState} from 'react';
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
import Microfon from 'assets/images/icons/microfon.svg';

//import images
import ImageBg from 'assets/images/app/join-event-bg.png';

interface messageProps {
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
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelInvitation, setCancelInvitation] = useState<boolean>(false);
  const {image, title, online} = route?.params;

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

  const messages = [
    {
      id: '3',
      text: 'Hello! John abraham',
      user: {
        id: 'user2',
        name: 'Пользователь 2',
        avatar: image,
      },
      time: '10:05 AM',
      isSender: false,
    },
    {
      id: '1',
      text: 'Hello ! Nazrul How are you?',
      user: {
        id: 'user1',
        name: title,
        avatar: image,
      },
      time: '10:00 AM',
      isSender: true,
    },
    {
      id: '2',
      text: 'You did your job well!',
      user: {
        id: 'user2',
        name: 'Пользователь 2',
        avatar: image,
      },
      time: '09:25 AM',
      isSender: false,
    },
    {
      id: '5',
      text: 'Have a great working week!!',
      user: {
        id: 'user1',
        name: title,
        avatar: image,
      },
      time: '09:25 AM',
      isSender: true,
    },
  ];

  const ChatMessage = ({message}: messageProps) => {
    const {text, user, time, isSender} = message;
    const containerStyle = isSender ? styles.senderContainer : styles.receiverContainer;
    const textStyle = isSender ? styles.senderText : styles.receiverText;
    return (
      <View style={[styles.messageContainer, containerStyle]}>
        {isSender && <Image source={user.avatar} style={styles.avatar} />}
        <View>
          {isSender && <Text style={styles.textNameUserMessage}>{title}</Text>}
          <View style={[{flexDirection: 'column'}, !isSender && {alignItems: 'flex-end'}]}>
            <View style={[styles.messageContent, isSender ? styles.isSenderTrue : styles.isSenderFalse]}>
              <Text style={textStyle}>{text}</Text>
            </View>
            <Text style={[isSender && {marginLeft: 10}, styles.timeText]}>{time}</Text>
          </View>
        </View>
      </View>
    );
  };

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
                  <Image source={image} style={styles.userPhoto} />
                  {online && <View style={styles.greenCircle} />}
                </View>
                <View style={styles.wrapperTitleOnline}>
                  <View style={styles.fdrAlc}>
                    <Text style={styles.textNameUser}>{title}</Text>
                    <FlashField width={14} height={14} />
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
            contentContainerStyle={{height: '100%'}}
            data={messages}
            renderItem={({item}) => <ChatMessage message={item} />}
            keyExtractor={item => item.id}
          />
        </View>
        {handleInvitationApproved()}
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
          <TouchableOpacity>
            <Microfon />
          </TouchableOpacity>
        </View>
        <ModalCancelOrConfirmInvitation
          cancelInvitation={cancelInvitation}
          setCancelInvitation={setCancelInvitation}
          typeModal="confirm"
          title={'Namos Dubai'}
          name={title}
          imageBg={ImageBg}
          data="12.11.2023"
          girlInvitation={2}
        />
        <ModalUserMenu image={image} title={title} approve={false} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  );
};

export default ChatCorrespondence;
