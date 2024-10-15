import {ImageBackground, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import TrashRed from 'assets/images/icons/trash-red.svg';
import {FC, useContext, useEffect} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {CLOUD_MESSAGING_SERVER_KEY} from '@env';
import auth from '@react-native-firebase/auth';
import {useUser} from 'src/store/userStore';
import {EventContext} from 'contexts/EventContext';

const ModalCancelEvent: FC<{isVisible: boolean; onClose: () => void; image: any; id?: string | undefined; nameEvent: string}> = ({
  id,
  isVisible,
  onClose,
  image,
  nameEvent,
}) => {
  const navigation = useAppNavigation();

  // const getFcmTokens = async (usersList: []) => {
  //   let tokens: string[] = [];

  //   const promises = usersList.map(async (item) => {
  //     const userInfo = await firestore().collection('userInfo').doc(item?.uid).get();
  //     // console.log('userInfo', userInfo);
  //     return userInfo.data().fcmToken;
  //   });

  //   tokens = await Promise.all(promises);

  //   return tokens;
  // };
  const {setActiveEvent} = useContext(EventContext);

  const userData = useUser((i: any) => i?.user);

  const generateRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const getFcmTokens = async (usersList: []) => {
    let users: Object[] = [];

    const promises = usersList.map(async item => {
      const userInfo = await firestore().collection('userInfo').doc(item?.uid).get();
      return {uid: userInfo?.data()?.uid, token: userInfo?.data()?.fcmToken};
    });

    users = await Promise.all(promises);

    return users;
  };

  const getUsersList = async () => {
    const eventInfoDoc = await firestore().collection('Events').doc(id).get();
    const usersList = eventInfoDoc.data()?.usersList;
    return usersList;
  };

  const sendNotification = async (title: string, body: string, mark: string) => {
    const usersList = await getUsersList();
    const users = await getFcmTokens(usersList);

    for (const user of users) {
      // console.log('const user of users', user);

      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
        },
        body: JSON.stringify({
          to: user.token,
          notification: {
            title: title,
            body: body,
          },
          data: {
            status: mark,
            image: image,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        // console.error('error sending notification:', error);
      } else {
        const data = await response.json();
        const userDoc = await firestore().collection('userInfo').doc(user.uid).get();
        const userNotifications = userDoc.data()?.notifications || [];
        const id = generateRandomId(8);
        const notification = {
          id,
          title: title,
          body: body,
          mark: mark,
          uid: userData?.uid,
        };

        try {
          await firestore()
            .collection('userInfo')
            .doc(user.uid)
            .update({
              notifications: [...userNotifications, notification],
            });
        } catch (error) {
          // console.log('error update notifications', error);
        }
      }
    }
    // const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `key=${CLOUD_MESSAGING_SERVER_KEY}`
    //   },
    //   body: JSON.stringify({
    //     registration_ids: tokens,
    //     notification: {
    //       title: title,
    //       body: body
    //     }
    //   })
    // });

    // if (!response.ok) {
    //   const error = await response.json();
    //   // console.error('error sending notification:', error);
    // } else {
    //   const data = await response.json();
    //   // console.log('notification sent successfully:', data);
    // }
  };

  const handleCancelEvent = async () => {
    // const uidUser = auth().currentUser?.uid;
    try {
      // await sendNotification(`${nameEvent} has been cancelled`, 'Swipe new events', 'cancelled');

      await firestore().collection('Events').doc(id).update({
        isCancelled: true,
      });
      // const userInfo = await firestore().collection('userInfo').doc(uidUser).get();
      // const eventList = userInfo?.data()?.eventsList;

      // const filterEvents = eventList.filter((item: string) => item != id);
      // await firestore().collection('userInfo').doc(uidUser).update({
      //   eventsList: filterEvents,
      // });
      setActiveEvent({});
      onClose();
      showToast('inviteMatch', 'Create new event', 'Event cancelled');
      navigation?.goBack();
    } catch (e) {
      showToast('inviteMatch', '', 'Error!');
      // console.log('error handleCancelEvent', e);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View
        style={{
          backgroundColor: blackColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 40,
          paddingTop: 16,
          paddingHorizontal: 30,
        }}>
        <View style={{backgroundColor: whiteColor, height: 2, borderRadius: 10, width: 40, alignSelf: 'center', marginBottom: 22}} />
        <ImageBackground
          source={{uri: image}}
          style={{width: 84, height: 84, alignSelf: 'center', marginBottom: 10}}
          imageStyle={{borderRadius: 160}}
          resizeMode="cover">
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: transparentWhite16Color,
              borderRadius: 160,
              zIndex: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TrashRed width={22} height={22} />
          </View>
        </ImageBackground>
        <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 812), marginBottom: 30, textAlign: 'center'}}>
          Cancel event?
        </Text>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), marginBottom: 40, textAlign: 'center'}}>
          Are you sure you want to cancel?
        </Text>
        <Button title="Yes, cancel event" onPress={() => handleCancelEvent()} />
        <Button title="Cancel" variant="transparent" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ModalCancelEvent;
