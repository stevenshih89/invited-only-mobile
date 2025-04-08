import {ImageBackground, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import TrashRed from 'assets/images/icons/trash-red.svg';
import {FC, useContext} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.tsx';
import {useUser} from 'src/store/userStore';
import {EventContext} from 'contexts/EventContext';
import {ACCEPTED_STATUS} from 'constants/common';
import {sendNotification} from 'helpers/fcmHelper';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

const ModalCancelEvent: FC<{isVisible: boolean; onClose: () => void; image: any; id?: string | undefined; nameEvent: string}> = ({
  id,
  isVisible,
  onClose,
  image,
  nameEvent,
}) => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const navigation = useAppNavigation();
  const {setActiveEvent} = useContext(EventContext);

  const userData = useUser((i: any) => i?.user);

  const getUsersList = async () => {
    try {
      const eventInfoDoc = await firestore().collection(apiEventsCollection).doc(id).get();
      const usersList = eventInfoDoc.data()?.usersList;
      return usersList;
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  interface usersListI {
    status: string;
  }

  const getUsersListAccepted = (usersList: usersListI[]) => {
    const filter = usersList?.filter(item => item.status === ACCEPTED_STATUS);
    return filter;
  };

  const sendNotificationAcceptedUser = async () => {
    const usersList = await getUsersList();
    const usersAccepted = getUsersListAccepted(usersList);
    for (const user of usersAccepted) {
      try {
        await sendNotification(user.uid, 'Event cancelled', `${nameEvent} event has been cancelled`, 'Cancel', 'Event', userData);
      } catch (error) {
        console.error('error sendNotificationAcceptedUser', error);
      }
    }
  };

  const handleCancelEvent = async () => {
    // const uidUser = auth().currentUser?.uid;
    try {
      // await sendNotification(`${nameEvent} has been cancelled`, 'Swipe new events', 'cancelled');

      await firestore().collection(apiEventsCollection).doc(id).update({
        isCancelled: true,
      });
      analytics().logEvent('modal_cancelled_event', {
        eventId: id,
      });

      await sendNotificationAcceptedUser();

      // const userInfo = await firestore().collection(apiUserInfoCollection).doc(uidUser).get();
      // const eventList = userInfo?.data()?.eventsList;

      // const filterEvents = eventList.filter((item: string) => item != id);
      // await firestore().collection(apiUserInfoCollection).doc(uidUser).update({
      //   eventsList: filterEvents,
      // });
      setActiveEvent({});
      onClose();
      showToast('inviteMatch', 'Create new event', 'Event cancelled');
      navigation?.goBack();
    } catch (e) {
      showToast('inviteMatch', 'Failed to cancel the event. Please try again later.', 'Error');
      logErrorToSentry(e);
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
