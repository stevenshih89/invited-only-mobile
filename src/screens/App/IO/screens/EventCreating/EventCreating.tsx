import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

//import icons
import TrashCanIcon from 'assets/images/icons/trash.svg';

//import components
import useStyles from 'screens/App/IO/screens/EventCreating/styles.ts';
import {whiteColor} from 'constants/colors.ts';
import InvitedOnly from 'screens/App/IO/screens/EventCreating/components/InvitedOnly/InvitedOnly.tsx';
import EventDetails from 'screens/App/IO/screens/EventCreating/components/EventDetails/EventDetails.tsx';
import {useRoute} from '@react-navigation/native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import ModalSaveEventChanges from 'screens/App/MyEvents/EventEditing/ModalSaveEventChanges';
import ModalCancelEvent from 'screens/App/MyEvents/EventEditing/ModalCancelEvent';
import {showToast} from 'helpers/showToast.ts';

const EventCreating: FC = () => {
  const INVITED_ONLY = 'invitedOnly';
  const EVENT_DETAILS = 'eventDetails';

  const [tabState, setTabState] = useState<string>(INVITED_ONLY);
  const [isVisibleSaveModal, setIsVisibleSaveModal] = useState<boolean>(false);
  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState<boolean>(false);
  const styles = useStyles();

  const [female, setFemale] = useState<number>(0);
  const [male, setMale] = useState<number>(0);
  const [femaleFriend, setFemaleFriend] = useState<number>(0);
  const [maleFriend, setMaleFriend] = useState<number>(0);

  const navigation = useAppNavigation();

  const handleSetTabState = (type: string): void => {
    setTabState(type);
  };

  const route = useRoute();

  const isEditing = (route?.params as {isEditing?: boolean})?.isEditing;
  const isEditingItem = (route?.params as {isEditingItems?: any})?.isEditingItems;

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisibleCancelModal(true)}>
            <TrashCanIcon style={{marginHorizontal: 20, marginVertical: 10}} />
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  const editingItems = {
    prevImages: isEditingItem?.photos ? [...isEditingItem?.photos] : [],
    prevActiveType: isEditingItem?.activeType,
    prevPlaceName: isEditingItem?.placeName,
    prevName: isEditingItem?.name,
    prevDescription: isEditingItem?.description,
    prevDate: isEditingItem?.date,
    prevHour: isEditingItem?.hour,
    prevAddress: isEditingItem?.address,
    prevMeetingSpot: isEditingItem?.meetingSpot,
    prevFemale: isEditingItem?.female,
    prevMale: isEditingItem?.male,
    prevFemaleFriend: isEditingItem?.femaleFriend,
    prevMaleFriend: isEditingItem?.maleFriend,
  };

  const handleSaveChanges = async () => {
    try {
      const id = isEditingItem?.id;
      await firestore().collection('Events').doc(id).update({
        female,
        male,
        femaleFriend,
        maleFriend,
      });
      navigation?.goBack();
      showToast('success', '', 'Event successfully changes!');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapperTabSelections}>
          <TouchableOpacity
            style={[styles.buttonInvitedOnly, tabState === INVITED_ONLY && {backgroundColor: whiteColor}]}
            onPress={() => handleSetTabState(INVITED_ONLY)}>
            <Text style={[styles.textInvitedOnly, tabState !== INVITED_ONLY && {color: whiteColor}]}>Invited only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonEventDetails, tabState === EVENT_DETAILS && {backgroundColor: whiteColor}]}
            onPress={() => handleSetTabState(EVENT_DETAILS)}>
            <Text style={[styles.textEventDetails, tabState !== EVENT_DETAILS && {color: whiteColor}]}>Event details</Text>
          </TouchableOpacity>
        </View>
        {tabState === 'invitedOnly' && (
          <InvitedOnly
            setMaleFriend={setMaleFriend}
            setFemaleFriend={setFemaleFriend}
            female={female}
            femaleFriend={femaleFriend}
            male={male}
            maleFriend={maleFriend}
            setMale={setMale}
            setFemale={setFemale}
            setTabState={setTabState}
            isEditing={isEditing}
            {...editingItems}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
          />
        )}
        {tabState === 'eventDetails' && (
          <EventDetails
            female={female}
            femaleFriend={femaleFriend}
            male={male}
            maleFriend={maleFriend}
            isEditing={isEditing}
            id={isEditingItem?.id}
            {...editingItems}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
          />
        )}
      </View>
      <ModalSaveEventChanges handleSaveChanges={handleSaveChanges} isVisible={isVisibleSaveModal} onClose={() => setIsVisibleSaveModal(false)} />
      <ModalCancelEvent
        id={isEditingItem?.id}
        image={isEditingItem?.photos[0]?.image}
        isVisible={isVisibleCancelModal}
        onClose={() => setIsVisibleCancelModal(false)}
      />
    </>
  );
};

export default EventCreating;
