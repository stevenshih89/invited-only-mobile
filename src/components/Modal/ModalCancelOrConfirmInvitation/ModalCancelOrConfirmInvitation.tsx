import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';
import PersonIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'components/Modal/ModalCancelOrConfirmInvitation/styles.ts';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {requestsPath} from 'constants/pathLocations.ts';
import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
interface ModalCancelInvitationProps {
  cancelInvitation?: boolean;
  setCancelInvitation?: any;
  setHostMenu?: any;
  imageBg?: any;
  name?: string;
  title?: string;
  girlInvitation?: number;
  data?: string;
  typeModal: 'cancel' | 'confirm';
  eventId: string;
}

const ModalCancelOrConfirmInvitation: FC<ModalCancelInvitationProps> = ({
  setHostMenu,
  girlInvitation,
  name,
  title,
  data,
  imageBg,
  setCancelInvitation,
  cancelInvitation,
  typeModal = 'cancel',
  eventId,
}) => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';

  const handleUnmatchEvent = async () => {
    try {
      const user = auth().currentUser;
      await firestore().collection(apiMessagesCollection).doc(eventId).delete();
      const getDoc = await firestore().collection(apiEventsCollection).doc(eventId).get();
      const data = getDoc.data();
      await firestore()
        .collection(apiEventsCollection)
        .doc(eventId)
        .update({
          usersList: data?.usersList.filter(item => item.uid !== user?.uid),
        });
      setCancelInvitation(false);
      setHostMenu(false);
      showToast('inviteMatch', 'You cancelled invitation');
    } catch (error) {
      console.log('error unmatch', error);
      showToast('inviteMatch', 'An issue occurred while processing the event. Please try again later.', 'Error');
      logErrorToSentry(error)
    }
  };

  return (
    <Modal
      isVisible={cancelInvitation}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => setCancelInvitation(false)}
      onSwipeComplete={() => setCancelInvitation(false)}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <View style={{width: '100%'}}>
          <Image resizeMode="contain" source={{uri: imageBg}} style={{width: '100%'}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 21}}>
            <Text style={{color: 'white'}}>{title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <PersonIcon width={12} height={12} />
              <Text style={{color: 'white', marginLeft: 5}}>{girlInvitation} x Guest invitation</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CalendarIcon width={12} height={12} />
              <Text style={{color: 'white', marginLeft: 5}}>{data}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.textAreYouSure}>
          {typeModal === 'cancel' ? 'Are you sure you want to cancel invitation?' : `${name} has approved your invitation! Confirm?`}
        </Text>
        <Button
          onPress={() => {
            if (typeModal === 'cancel') {
              handleUnmatchEvent();
            } else {
              setCancelInvitation(false);
              showToast('inviteMatch', 'Go to my events >', 'Successfully! See you on Nammos Dubai');
            }
          }}
          buttonStyle={{width: '100%'}}
          title={typeModal === 'cancel' ? 'Yes, cancel invitation' : 'Yes, accept invitation'}
        />
        <Button
          onPress={() => {
            if (typeModal === 'cancel') {
              setCancelInvitation(false);
            } else {
              setCancelInvitation(false);
              // @ts-ignore
              navigation.navigate(requestsPath);
              showToast('inviteMatch', '', 'You rejected invitation');
            }
          }}
          buttonStyle={{width: '100%'}}
          variant="transparent"
          title={typeModal === 'cancel' ? 'Cancel' : 'No, cancel invitation'}
        />
      </View>
    </Modal>
  );
};

export default ModalCancelOrConfirmInvitation;
