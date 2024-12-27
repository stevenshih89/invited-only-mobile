import {Text, View, Image} from 'react-native';
import React from 'react';

//import components
import CreateEventImage from 'assets/images/auth/tutorial-host-1.png';
import useStyles from 'screens/Auth/TutorialsFlow/components/CreateEvent/styles.ts';

const CreateEvent = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} resizeMode="stretch" source={CreateEventImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textCreateEvent}>Share your table or event</Text>
        <Text style={styles.textAddYourEvent}>
          Provide your table or event details, choose your invitees, and specify how many invites you’d like to send.
        </Text>
      </View>
    </View>
  );
};

export default CreateEvent;
