import {lightGray10Color, transparentGray60Color, whiteColor} from 'constants/colors';
import {Text, TouchableOpacity, View, SafeAreaView, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import FakePlaceCircle from 'assets/images/app/fake-place-circle.png';
import Close from 'assets/images/icons/close.svg';
import MessageText from 'assets/images/icons/message-text.svg';
import CheckboxSelected from 'assets/images/icons/checkbox-selected.svg';
import {Outfit500, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import {FC, useEffect} from 'react';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay} from 'react-native-reanimated';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {chatCorrespondencePath, commonStackPath} from 'constants/pathLocations';
import {showToast} from 'helpers/showToast';
import firestore from '@react-native-firebase/firestore';
import {useUser} from 'src/store/userStore';

const widthScreen = Dimensions.get('screen').width;

console.log('screenHeight', screenHeight);

interface MatchData {
  type: string;
  name: string;
  imageUri: string;
  senderUid: string;
  recipientUid: string;
  eventId: string;
  superInvite: boolean;
}

const Match: FC<{isVisibleMatch: boolean; onCloseMatch: () => void; matchData: MatchData; userInfo: any}> = ({
  isVisibleMatch,
  onCloseMatch,
  matchData,
  userInfo,
}) => {
  const opacityWrapper = useSharedValue(0);
  const imagePosition = useSharedValue(-200 - widthScreen / 15.5);
  const textSize = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const figurePositin = useSharedValue(-screenHeight * 0.34 - 100);
  const buttonPosition = useSharedValue(-1000);

  const words = userInfo?.name?.split(' ');
  const wordTranslations = words?.map(() => useSharedValue(widthScreen));
  const nameAnimation = useSharedValue(widthScreen);

  const navigation = useAppNavigation();

  const userHost = useUser((i: any) => i?.user);

  const handleCreateChat = async () => {
    const querySnapshot = await firestore().collection('Events').where('uid', '==', `${userHost?.uid}`).get();
    const list = querySnapshot?.docs?.map(i => ({id: i.id, ...i?.data()})).find(i => i?.id === matchData.eventId);

    try {
      const messageCollection = await firestore().collection('messages').doc(list?.id).get();
      const chatCheck = messageCollection?.data()?.chats?.filter(i => i?.uid === matchData.recipientUid)[0];
      const activeEvent = messageCollection?.data()?.activeEvent;

      if (chatCheck) {
        await navigation.navigate(commonStackPath, {
          screen: chatCorrespondencePath,
          params: {
            image: chatCheck?.avatar,
            title: chatCheck?.name,
            online: false,
            messages: chatCheck?.messages,
            activeEvent: activeEvent,
            id: chatCheck?.id,
            superInvite: chatCheck?.superInvite,
            invitedStatus: chatCheck?.invitedStatus,
          },
        });
        onCloseMatch();
      } else {
        if (messageCollection?.data()) {
          const prevChats = messageCollection?.data()?.chats;
          const newChats = {
            avatar: matchData.imageUri,
            id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
            invitedStatus: 'invite_match',
            messages: [],
            name: matchData.name,
            superInvite: matchData.superInvite,
            uid: matchData.recipientUid,
          };
          await firestore()
            .collection('messages')
            .doc(list?.id)
            .update({
              chats: [...prevChats, newChats],
            });

          await navigation.navigate(commonStackPath, {
            screen: chatCorrespondencePath,
            params: {
              image: newChats?.avatar,
              title: newChats?.name,
              online: false,
              messages: [],
              activeEvent: activeEvent,
              id: newChats?.id,
              superInvite: newChats?.superInvite,
              invitedStatus: newChats?.invitedStatus,
            },
          });

          onCloseMatch();
        } else {
          const id = list?.id;

          await firestore().collection('messages').doc(id).set({
            activeEvent: id,
            avatarGuest: matchData.imageUri,
            avatarHost: userHost?.photos[0]?.image,
            chats: [],
            inviteStatus: 'invite_match',
            nameGuest: matchData.name,
            uidGuest: matchData.recipientUid,
            uidHost: userHost?.uid,
          });

          const newChats = {
            avatar: matchData.imageUri,
            id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
            invitedStatus: 'invite_match',
            messages: [],
            name: matchData.name,
            superInvite: matchData.superInvite,
            uid: matchData.recipientUid,
          };

          await firestore()
            .collection('messages')
            .doc(id)
            .update({
              chats: [newChats],
            });

          await navigation.navigate(commonStackPath, {
            screen: chatCorrespondencePath,
            params: {
              image: newChats?.avatar,
              title: newChats?.name,
              online: false,
              messages: [],
              activeEvent: id,
              id: newChats?.id,
              superInvite: newChats?.superInvite,
              invitedStatus: newChats?.invitedStatus,
            },
          });

          onCloseMatch();
        }
      }
    } catch (e) {
      console.log(e);
      showToast('inviteMatch', '', 'Error!');
    }
  };

  const handleApproveGuestFromHost = async () => {
    const eventQuerySnapshot = await firestore().collection('Events').doc(matchData.eventId).get();
    if (eventQuerySnapshot.exists) {
      const eventData = eventQuerySnapshot?.data();
      const usersList = [...eventData?.usersList];
      const userIndex = usersList.findIndex((user: any) => user.uid === matchData.recipientUid);
      usersList[userIndex].status = 'approved';
      await firestore().collection('Events').doc(matchData.eventId).update({usersList});
    }
  };

  const animatedOpacityWrapper = () => {
    opacityWrapper.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.linear),
    });
  };

  const animatedImages = () => {
    imagePosition.value = withTiming(0, {
      duration: 800,
      easing: Easing.bezier(0, 0.1, 0, 1),
    });
  };

  const animatedText = () => {
    textSize.value = withDelay(
      750,
      withTiming(46, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.5, 0.25, 1),
      }),
    );
  };

  const animTextOpacity = () => {
    textOpacity.value = withDelay(
      900,
      withTiming(1, {
        duration: 200,
      }),
    );
  };

  const animateWords = () => {
    setTimeout(() => {
      wordTranslations?.forEach((wordTranslation, index) => {
        wordTranslation.value = withDelay(
          (index + 1) * 100,
          withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.cubic),
          }),
        );
      });
    }, 300);
  };

  const animateName = () => {
    setTimeout(() => {
      nameAnimation.value = withDelay(
        0,
        withTiming(0, {
          duration: 500,
          easing: Easing.out(Easing.cubic),
        }),
      );
    }, 300);
  };

  const animateFigure = () => {
    figurePositin.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  };

  const animateButtons = () => {
    buttonPosition.value = withDelay(
      800,
      withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
    );
  };

  useEffect(() => {
    if (isVisibleMatch) {
      animatedOpacityWrapper();
      animatedImages();
      animatedText();
      animTextOpacity();
      animateWords();
      animateName();
      animateFigure();
      animateButtons();
    }
  }, [isVisibleMatch]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: buttonPosition.value}],
  }));

  const figureTopStyle = useAnimatedStyle(() => ({
    top: figurePositin.value,
  }));

  const figureBottomStyle = useAnimatedStyle(() => ({
    bottom: figurePositin.value,
  }));

  const opacityWrapperStyle = useAnimatedStyle(() => ({
    opacity: opacityWrapper.value,
  }));

  const textSizeStyle = useAnimatedStyle(() => ({
    fontSize: textSize.value,
  }));

  const textOpacityStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const leftImageStyle = useAnimatedStyle(() => ({
    left: imagePosition.value,
  }));

  const rightImageStyle = useAnimatedStyle(() => ({
    right: imagePosition.value,
  }));

  return (
    <View>
      <Modal
        isVisible={isVisibleMatch}
        coverScreen
        backdropOpacity={1}
        onBackdropPress={onCloseMatch}
        backdropColor={lightGray10Color}
        backdropTransitionInTiming={1000}
        animationIn={'fadeIn'}
        animationInTiming={1}>
        <SafeAreaView style={{flex: 1}}>
          <Animated.View
            style={[
              {
                backgroundColor: whiteColor,
                width: 141,
                height: screenHeight * 0.3,
                position: 'absolute',
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                justifyContent: 'flex-end',
                alignItems: 'center',
              },
              figureTopStyle,
            ]}>
            <View
              style={{
                width: 106,
                height: 106,
                borderRadius: 100,
                backgroundColor: 'black',
                marginBottom: 38,
              }}
            />
          </Animated.View>
          <Animated.View style={[{flex: 1, justifyContent: 'space-between'}, opacityWrapperStyle]}>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onCloseMatch}
                style={{
                  borderRadius: 100,
                  backgroundColor: transparentGray60Color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  alignSelf: 'flex-end',
                }}>
                <Close />
              </TouchableOpacity>
              {/* <LogoPrimary width={200} style={{ alignSelf: 'center', marginTop: screenHeight / 30 }} /> */}
            </View>
            <Animated.View style={[{flexDirection: 'column', marginTop: screenHeight / 20, width: '100%'}, opacityWrapperStyle]}>
              <View style={{position: 'absolute', flexDirection: 'row', right: 0, top: -70}}>
                {words?.map((word, index) => (
                  <Animated.Text
                    key={index}
                    style={[
                      {
                        color: whiteColor,
                        fontFamily: Outfit500,
                        fontSize: RFValue(57, 812),
                        letterSpacing: -6,
                        textAlign: 'center',
                        marginBottom: screenHeight / 20,
                      },
                      useAnimatedStyle(() => ({
                        transform: [{translateX: wordTranslations[index].value}],
                      })),
                    ]}>
                    {word}
                  </Animated.Text>
                ))}
              </View>
              <Text style={{color: whiteColor, position: 'absolute', right: 0, fontSize: RFValue(13, 812)}}>Guest</Text>
              <Animated.Image source={FakePlaceCircle} style={[{width: 200, height: 200, position: 'absolute'}, leftImageStyle]} />
              {matchData.imageUri && (
                <Animated.Image
                  source={{uri: matchData.imageUri}}
                  style={[{width: 200, height: 200, position: 'absolute'}, rightImageStyle]}
                />
              )}
              <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
                <View style={{alignItems: 'center', width: '100%'}}>
                  <View style={{height: 200, width: '100%'}} />
                  <Animated.Text
                    style={[
                      {
                        height: 100,
                        color: whiteColor,
                        fontFamily: Satoshi500,
                        marginTop: 30,
                      },
                      textSizeStyle,
                      textOpacityStyle,
                    ]}>
                    New invite match!
                  </Animated.Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Animated.View style={buttonAnimatedStyle}>
                  <TouchableOpacity
                    onPress={handleCreateChat}
                    style={{
                      width: 70,
                      height: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                      backgroundColor: 'black',
                      marginRight: 28,
                    }}>
                    <MessageText width={32} height={32} />
                  </TouchableOpacity>
                </Animated.View>
                {userHost?.accountType === 'host' && (
                  <Animated.View style={buttonAnimatedStyle}>
                    <TouchableOpacity
                      onPress={handleApproveGuestFromHost}
                      style={{
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        backgroundColor: 'black',
                        marginRight: 28,
                      }}>
                      <CheckboxSelected width={32} height={32} />
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </View>
            </Animated.View>
            <View style={{alignItems: 'flex-end'}}>
              <Animated.View
                style={[
                  {
                    backgroundColor: whiteColor,
                    width: 141,
                    height: screenHeight * 0.3,
                    position: 'absolute',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  },
                  figureBottomStyle,
                ]}>
                <View
                  style={{
                    width: 106,
                    height: 106,
                    borderRadius: 100,
                    backgroundColor: 'black',
                    marginTop: 38,
                  }}
                />
              </Animated.View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Match;
