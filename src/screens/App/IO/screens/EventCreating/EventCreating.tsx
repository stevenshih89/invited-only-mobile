import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

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

const EventCreating: FC = () => {
  const INVITED_ONLY = 'invitedOnly';
  const EVENT_DETAILS = 'eventDetails';

  const [tabState, setTabState] = useState<string>(INVITED_ONLY);
  const [isVisibleSaveModal, setIsVisibleSaveModal] = useState<boolean>(false);
  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState<boolean>(false);
  const styles = useStyles();

  const navitation = useAppNavigation();

  const handleSetTabState = (type: string): void => {
    setTabState(type);
  };

  const route = useRoute();

  const isEditing = (route?.params as {isEditing?: boolean})?.isEditing;

  useEffect(() => {
    if (isEditing) {
      navitation.setOptions({
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisibleCancelModal(true)}>
            <TrashCanIcon style={{marginHorizontal: 20, marginVertical: 10}} />
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  const editingItems = {
    prevImages: [
      {
        id: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      },
      {
        id: 1,
        image: null,
      },
      {
        id: 2,
        image: null,
      },
      {
        id: 3,
        image: null,
      },
      {
        id: 4,
        image: null,
      },
    ],
    prevActiveType: 2,
    prevPlaceName: 'Place name',
    prevName: 'Event name',
    prevDescription: 'Description',
    prevDate: '20.12.2021',
    prevHour: '12:00',
    prevAddress: 'Address',
    prevMeetingSpot: 'Meeting spot',
    prevFemale: 4,
    prevMale: 6,
    prevFemaleFriend: 2,
    prevMaleFriend: 0,
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
          <InvitedOnly setTabState={setTabState} isEditing={isEditing} {...editingItems} setIsVisibleSaveModal={setIsVisibleSaveModal} />
        )}
        {tabState === 'eventDetails' && <EventDetails isEditing={isEditing} {...editingItems} setIsVisibleSaveModal={setIsVisibleSaveModal} />}
      </View>
      <ModalSaveEventChanges isVisible={isVisibleSaveModal} onClose={() => setIsVisibleSaveModal(false)} />
      <ModalCancelEvent isVisible={isVisibleCancelModal} onClose={() => setIsVisibleCancelModal(false)} />
    </>
  );
};

export default EventCreating;
