import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//import components
import useStyles from 'screens/App/IO/screens/EventCreating/styles.ts';
import {whiteColor} from 'constants/colors.ts';
import InvitedOnly from 'screens/App/IO/screens/EventCreating/components/InvitedOnly/InvitedOnly.tsx';
import EventDetails from 'screens/App/IO/screens/EventCreating/components/EventDetails/EventDetails.tsx';

const EventCreating: FC = () => {
  const [tabState, setTabState] = useState<string>('invitedOnly');
  const styles = useStyles();

  const handleSetTabState = (type: string): void => {
    setTabState(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperTabSelections}>
        <TouchableOpacity
          style={[styles.buttonInvitedOnly, tabState === 'invitedOnly' && {backgroundColor: whiteColor}]}
          onPress={() => handleSetTabState('invitedOnly')}>
          <Text style={[styles.textInvitedOnly, tabState !== 'invitedOnly' && {color: whiteColor}]}>Invited only</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonEventDetails, tabState === 'eventDetails' && {backgroundColor: whiteColor}]}
          onPress={() => handleSetTabState('eventDetails')}>
          <Text style={[styles.textEventDetails, tabState !== 'eventDetails' && {color: whiteColor}]}>Event details</Text>
        </TouchableOpacity>
      </View>
      {tabState === 'invitedOnly' && <InvitedOnly setTabState={setTabState} />}
      {tabState === 'eventDetails' && <EventDetails />}
    </View>
  );
};

export default EventCreating;
